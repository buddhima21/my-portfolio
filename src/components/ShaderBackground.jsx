import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────
   WebGL shader background — slow drifting aurora gradient
   Extracted as a self-contained hook + canvas element.
───────────────────────────────────────────────────────────── */

const VERTEX_SHADER = /* glsl */ `
  attribute vec2 a_position;
  varying vec2 v_texCoord;
  void main() {
    v_texCoord = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;
  uniform float u_time;
  uniform vec2  u_resolution;
  uniform vec2  u_mouse;
  varying vec2  v_texCoord;

  void main() {
    vec2 uv = v_texCoord;

    float noise1 = sin(uv.x * 2.0 + u_time * 0.18) * 0.5 + 0.5;
    float noise2 = cos(uv.y * 1.5 - u_time * 0.09) * 0.5 + 0.5;

    vec3 color1 = vec3(0.05, 0.05, 0.10);
    vec3 color2 = vec3(0.08, 0.04, 0.13);
    vec3 accent1 = vec3(0.30, 0.40, 1.00);
    vec3 accent2 = vec3(0.60, 0.30, 1.00);

    vec3 base = mix(color1, color2, noise1 * noise2);

    float g1 = smoothstep(0.42, 0.0,
      length(uv - vec2(0.5 + sin(u_time * 0.28) * 0.18,
                       0.5 + cos(u_time * 0.19) * 0.18)));
    base = mix(base, accent1, g1 * 0.055);

    float g2 = smoothstep(0.52, 0.0,
      length(uv - vec2(0.78 + cos(u_time * 0.37) * 0.26,
                       0.22 + sin(u_time * 0.45) * 0.26)));
    base = mix(base, accent2, g2 * 0.045);

    // subtle mouse interaction
    vec2 mouse = u_mouse / u_resolution;
    float mg = smoothstep(0.35, 0.0, length(uv - mouse));
    base = mix(base, accent1, mg * 0.035);

    gl_FragColor = vec4(base, 1.0);
  }
`;

function createShader(gl, type, src) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  return shader;
}

function useWebGLShader(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    // Size sync
    function syncSize() {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }
    const ro = new ResizeObserver(syncSize);
    ro.observe(canvas);
    syncSize();

    // Compile & link
    const prog = gl.createProgram();
    gl.attachShader(prog, createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
    gl.attachShader(prog, createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Quad geometry
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uTime  = gl.getUniformLocation(prog, 'u_time');
    const uRes   = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      mouse = {
        x: ((e.clientX - rect.left) / rect.width) * canvas.width,
        y: (1 - (e.clientY - rect.top) / rect.height) * canvas.height,
      };
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let raf;
    function render(t) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uTime, t * 0.001);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    }
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [canvasRef]);
}

export default function ShaderBackground({ className = '' }) {
  const canvasRef = useRef(null);
  useWebGLShader(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}
