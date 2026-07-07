/**
 * ContactGlobe — Particle wireframe sphere
 *
 * - ~800 glowing dots distributed on a sphere surface (Fibonacci lattice)
 * - Colors alternate violet (#8b5cf6) / teal (#14b8a6)
 * - Auto-rotates on Y axis via useFrame — no drag interaction
 * - ~60 ambient floating particles slowly drifting around the globe
 * - Transparent Canvas background — page orbs/dot-grid show through
 * - Soft radial glow div sits behind the canvas for depth
 */

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── Constants ────────────────────────────────────────────── */
const SPHERE_RADIUS  = 1.35;
const SPHERE_POINTS  = 800;
const AMBIENT_COUNT  = 55;
const VIOLET = new THREE.Color('#8b5cf6');
const TEAL   = new THREE.Color('#14b8a6');

/* ─── Fibonacci-lattice sphere distribution ────────────────── */
function fibonacciSphere(n, r) {
  const pts = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y   = 1 - (i / (n - 1)) * 2;          // −1 → +1
    const rad = Math.sqrt(1 - y * y);
    const th  = golden * i;
    pts.push(
      r * rad * Math.cos(th),
      r * y,
      r * rad * Math.sin(th),
    );
  }
  return new Float32Array(pts);
}

/* ─── Wireframe sphere points ──────────────────────────────── */
function WireframeSphere() {
  const meshRef = useRef();

  const { positions, colors } = useMemo(() => {
    const positions = fibonacciSphere(SPHERE_POINTS, SPHERE_RADIUS);
    const colors = new Float32Array(SPHERE_POINTS * 3);
    for (let i = 0; i < SPHERE_POINTS; i++) {
      const c = i % 2 === 0 ? VIOLET : TEAL;
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.22;
      meshRef.current.rotation.x += delta * 0.04;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={SPHERE_POINTS}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={SPHERE_POINTS}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.88}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Ambient drifting particles ───────────────────────────── */
function AmbientParticles() {
  const ref = useRef();

  const { positions, colors, speeds } = useMemo(() => {
    const positions = new Float32Array(AMBIENT_COUNT * 3);
    const colors    = new Float32Array(AMBIENT_COUNT * 3);
    const speeds    = new Float32Array(AMBIENT_COUNT * 3);
    for (let i = 0; i < AMBIENT_COUNT; i++) {
      // Random shell between 1.6× and 2.4× globe radius
      const r   = SPHERE_RADIUS * (1.6 + Math.random() * 0.8);
      const th  = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(th);
      positions[i * 3 + 1] = r * Math.cos(phi);
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(th);
      // Random drift speed per axis
      speeds[i * 3]     = (Math.random() - 0.5) * 0.18;
      speeds[i * 3 + 1] = (Math.random() - 0.5) * 0.12;
      speeds[i * 3 + 2] = (Math.random() - 0.5) * 0.18;
      // Alternate colours
      const c = i % 2 === 0 ? VIOLET : TEAL;
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors, speeds };
  }, []);

  // Store mutable positions in a ref so we can mutate each frame
  const posRef = useRef(positions.slice());

  useFrame((_, delta) => {
    if (!ref.current) return;
    const attr = ref.current.geometry.attributes.position;
    for (let i = 0; i < AMBIENT_COUNT; i++) {
      posRef.current[i * 3]     += speeds[i * 3]     * delta;
      posRef.current[i * 3 + 1] += speeds[i * 3 + 1] * delta;
      posRef.current[i * 3 + 2] += speeds[i * 3 + 2] * delta;

      // Bounce back toward origin if too far
      const px = posRef.current[i * 3];
      const py = posRef.current[i * 3 + 1];
      const pz = posRef.current[i * 3 + 2];
      const dist = Math.sqrt(px * px + py * py + pz * pz);
      if (dist > SPHERE_RADIUS * 2.6 || dist < SPHERE_RADIUS * 1.4) {
        speeds[i * 3]     *= -1;
        speeds[i * 3 + 1] *= -1;
        speeds[i * 3 + 2] *= -1;
      }

      attr.array[i * 3]     = posRef.current[i * 3];
      attr.array[i * 3 + 1] = posRef.current[i * 3 + 1];
      attr.array[i * 3 + 2] = posRef.current[i * 3 + 2];
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={AMBIENT_COUNT}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={AMBIENT_COUNT}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.50}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Export ───────────────────────────────────────────────── */
export default function ContactGlobe() {
  return (
    <div style={{ width: '100%', height: 360, position: 'relative' }}>

      {/* Soft radial glow behind the canvas */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          margin: 'auto',
          width: '70%',
          height: '70%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(20,184,166,0.12) 55%, transparent 75%)',
          filter: 'blur(38px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
        style={{ background: 'transparent', position: 'relative', zIndex: 1 }}
      >
        <WireframeSphere />
        <AmbientParticles />
      </Canvas>
    </div>
  );
}
