import { useRef, useEffect, useCallback } from 'react';

const ClickSpark = ({
  sparkColor = '#c0c1ff',
  sparkSize = 10,
  sparkRadius = 20,
  sparkCount = 8,
  duration = 500,
  easing = 'ease-out',
  extraScale = 1.0,
  // Trail props
  trailEnabled = true,
  trailSparkCount = 2,
  trailSparkSize = 5,
  trailSparkRadius = 10,
  trailDuration = 350,
  trailThreshold = 12, // px of movement before emitting
  children
}) => {
  const canvasRef    = useRef(null);
  const sparksRef    = useRef([]);
  const startTimeRef = useRef(null);
  const lastTrailPos = useRef({ x: null, y: null });

  /* ── Resize canvas to match parent ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    let resizeTimeout;
    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width  = width;
        canvas.height = height;
      }
    };
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    });
    ro.observe(parent);
    resizeCanvas();
    return () => { ro.disconnect(); clearTimeout(resizeTimeout); };
  }, []);

  /* ── Easing ── */
  const easeFunc = useCallback(t => {
    switch (easing) {
      case 'linear':      return t;
      case 'ease-in':     return t * t;
      case 'ease-in-out': return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      default:            return t * (2 - t); // ease-out
    }
  }, [easing]);

  /* ── Draw loop ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const draw = ts => {
      if (!startTimeRef.current) startTimeRef.current = ts;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter(spark => {
        const elapsed = ts - spark.startTime;
        if (elapsed >= spark.duration) return false;

        const progress  = elapsed / spark.duration;
        const eased     = easeFunc(progress);
        const distance  = eased * spark.radius * extraScale;
        const lineLen   = spark.size * (1 - eased);
        const alpha     = (1 - eased) * (spark.isTrail ? 0.55 : 1); // trail sparks dimmer

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLen) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLen) * Math.sin(spark.angle);

        ctx.globalAlpha = Math.max(0, alpha);
        ctx.strokeStyle = sparkColor;
        ctx.lineWidth   = spark.isTrail ? 1.2 : 2;
        ctx.lineCap     = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.globalAlpha = 1;

        return true;
      });

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [sparkColor, easeFunc, extraScale]);

  /* ── Helper: push sparks ── */
  const pushSparks = (x, y, count, size, radius, dur, isTrail = false) => {
    const now = performance.now();
    // For trail: random spread in forward direction; for click: full 360°
    const newSparks = Array.from({ length: count }, (_, i) => ({
      x, y,
      angle: isTrail
        ? Math.random() * 2 * Math.PI          // random scatter
        : (2 * Math.PI * i) / count,           // evenly spaced
      startTime: now,
      duration: dur,
      size,
      radius,
      isTrail,
    }));
    sparksRef.current.push(...newSparks);
  };

  /* ── Click handler ── */
  const handleClick = e => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    pushSparks(
      e.clientX - rect.left,
      e.clientY - rect.top,
      sparkCount, sparkSize, sparkRadius, duration, false
    );
  };

  /* ── Mouse move handler (trail) ── */
  const handleMouseMove = e => {
    if (!trailEnabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const prev = lastTrailPos.current;
    if (prev.x !== null) {
      const dx = x - prev.x;
      const dy = y - prev.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < trailThreshold) return; // throttle by distance
    }

    lastTrailPos.current = { x, y };
    pushSparks(x, y, trailSparkCount, trailSparkSize, trailSparkRadius, trailDuration, true);
  };

  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100%' }}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          userSelect: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99999,
        }}
      />
      {children}
    </div>
  );
};

export default ClickSpark;
