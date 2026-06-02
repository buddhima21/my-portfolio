import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* ─────────────────────────────────────────────────────────────
   Three.js floating cube matrix — hero right-column visual.
   Self-contained: creates scene, handles resize, cleans up.
───────────────────────────────────────────────────────────── */

function buildScene() {
  const scene = new THREE.Scene();

  // Cube matrix
  const group = new THREE.Group();
  const SIZE    = 3;
  const SPACING = 1.2;
  const BOX     = 0.38;

  for (let x = 0; x < SIZE; x++) {
    for (let y = 0; y < SIZE; y++) {
      for (let z = 0; z < SIZE; z++) {
        const geo = new THREE.BoxGeometry(BOX, BOX, BOX);
        const mat = new THREE.MeshPhongMaterial({
          color:       0x6366f1,
          emissive:    0x2a2bb8,
          emissiveIntensity: 0.25,
          transparent: true,
          opacity:     0.7,
          shininess:   120,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(
          (x - (SIZE - 1) / 2) * SPACING,
          (y - (SIZE - 1) / 2) * SPACING,
          (z - (SIZE - 1) / 2) * SPACING,
        );
        group.add(mesh);
      }
    }
  }
  scene.add(group);

  // Lights
  const pLight = new THREE.PointLight(0xc0c1ff, 1.8, 100);
  pLight.position.set(8, 10, 10);
  scene.add(pLight);

  const pLight2 = new THREE.PointLight(0xddb7ff, 0.8, 80);
  pLight2.position.set(-8, -6, 5);
  scene.add(pLight2);

  scene.add(new THREE.AmbientLight(0x1a1a2e, 2));

  return { scene, group };
}

export default function ThreeCanvas({ className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = container.clientWidth  || 600;
    const h = container.clientHeight || 600;

    const { scene, group } = buildScene();

    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Mouse parallax
    let targetRotX = 0;
    let targetRotY = 0;
    const onMouseMove = (e) => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      targetRotY = ((e.clientX - cx) / cx) *  0.3;
      targetRotX = ((e.clientY - cy) / cy) * -0.15;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Resize
    const ro = new ResizeObserver(() => {
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    });
    ro.observe(container);

    // Animate
    let raf;
    function animate() {
      raf = requestAnimationFrame(animate);

      group.rotation.y += 0.004;
      group.rotation.x += 0.002;

      // Smooth parallax
      group.rotation.y += (targetRotY - group.rotation.y) * 0.04;
      group.rotation.x += (targetRotX - group.rotation.x) * 0.04;

      const t = performance.now() * 0.001;
      group.children.forEach((cube, i) => {
        cube.rotation.x += 0.008;
        cube.position.y += Math.sin(t * 0.9 + i * 0.7) * 0.0012;
      });

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
