/**
 * FloatingProfileCard
 *
 * Rendered at App level via a React portal (position: fixed).
 * Reads two anchor rects:
 *   heroAnchorRef  — transparent placeholder in HeroSection (right col)
 *   aboutAnchorRef — landing zone in AboutSection (left col)
 *
 * Scroll progress 0→1 is computed between hero bottom and about midpoint.
 * All visual properties (position, size, borderRadius, tilt) are lerped.
 */

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import profileImg from '../assets/profile.jpg';


/* ── lerp helper ────────────────────────────────────────────── */
const lerp = (a, b, t) => a + (b - a) * t;

/* ─── Main component ────────────────────────────────────────── */
export default function FloatingProfileCard({ heroAnchorRef, aboutAnchorRef }) {
  const wrapRef  = useRef(null);
  const innerRef = useRef(null);

  /* Scroll-driven progress 0→1 */
  const [progress, setProgress] = useState(0);

  /* Auto-sway output angles (updated by RAF loop) */
  const [swayZ, setSwayZ] = useState(0);
  const [swayX, setSwayX] = useState(0);

  /* Whether mouse is hovering the card — pauses the sway */
  const hoveredRef = useRef(false);

  /* Card geometry state */
  const [rect, setRect] = useState({ left: -999, top: -999, width: 260, height: 340 });
  const [visible, setVisible] = useState(false);

  /* ── Scroll / resize → update card position ── */
  useEffect(() => {
    let rafId;

    function getAnchorRect(ref) {
      if (!ref?.current) return null;
      const r = ref.current.getBoundingClientRect();
      return { left: r.left, top: r.top, width: r.width, height: r.height };
    }

    function update() {
      const heroR  = getAnchorRect(heroAnchorRef);
      const aboutR = getAnchorRect(aboutAnchorRef);
      if (!heroR || !aboutR) return;

      const heroSection  = document.getElementById('hero');
      if (!heroSection) return;

      const heroRect  = heroSection.getBoundingClientRect();

      /* Fire on the very first pixel of scroll, done at 55% of hero height */
      const scrollStart = 0;
      const scrollEnd   = heroRect.height * 0.55;
      const scrolled    = window.scrollY;

      const raw   = (scrolled - scrollStart) / (scrollEnd - scrollStart);
      const p     = Math.min(Math.max(raw, 0), 1);
      /* Ease-out quad — moves fast immediately, decelerates to settle */
      const eased = 1 - (1 - p) * (1 - p);

      setProgress(eased);

      const destW = aboutR.width;
      const destH = aboutR.height;

      const w  = lerp(260,   destW, eased);
      const h  = lerp(340,   destH, eased);
      const cx = lerp(heroR.left + heroR.width  / 2, aboutR.left + aboutR.width  / 2, eased);
      const cy = lerp(heroR.top  + heroR.height / 2, aboutR.top  + aboutR.height / 2, eased);

      setRect({ left: cx - w / 2, top: cy - h / 2, width: w, height: h });
      setVisible(true);
    }

    function onScroll() { rafId = requestAnimationFrame(update); }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(rafId);
    };
  }, [heroAnchorRef, aboutAnchorRef]);

  /* ── Auto-sway RAF loop ─────────────────────────────────────
     Runs a sine wave continuously.
     • Pauses (freezes phase) when mouse is over the card.
     • Amplitude damps to 0 as scroll progress rises.
  ─────────────────────────────────────────────────────────── */
  useEffect(() => {
    let raf;
    let phase = 0;
    const SPEED = 0.012;   // radians/frame → ~4 s per full swing
    const MAX_Z = 6;       // ±6° side-to-side
    const MAX_X = 2.5;     // ±2.5° forward-back

    function tick() {
      if (!hoveredRef.current) phase += SPEED;

      /* Amplitude shrinks to 0 as card leaves hero */
      const amp = 1 - Math.min(progress * 3, 1);

      setSwayZ(Math.sin(phase)            * MAX_Z * amp);
      setSwayX(Math.sin(phase * 0.55 + 1) * MAX_X * amp);

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  /* ── Hover handlers on the card wrapper ── */
  const onMouseEnter = () => { hoveredRef.current = true;  };
  const onMouseLeave = () => { hoveredRef.current = false; };

  if (!visible) return null;

  /* ── border radius ── */
  const borderRadius = lerp(20, 24, progress);

  /* ── shadow ── */
  const shadowBlur = lerp(40, 60, progress);

  const cardStyle = {
    position: 'fixed',
    left:     rect.left,
    top:      rect.top,
    width:    rect.width,
    height:   rect.height,
    zIndex:   45,
    pointerEvents: progress > 0.95 ? 'none' : 'auto',
    transform: `perspective(900px) rotateZ(${swayZ}deg) rotateX(${swayX}deg)`,
    transformOrigin: 'center -52px',
    transition: 'none',
    willChange: 'transform, left, top, width, height',
  };

  /* ── lanyard fade ── */
  const lanyardOpacity = Math.max(0, 1 - progress * 4);

  return createPortal(
    <div
      ref={wrapRef}
      style={cardStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* ── Belt (fades on scroll) ─────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          opacity: lanyardOpacity,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translate(-50%, -100%)',
          paddingBottom: 2,
          transition: 'opacity 0.1s linear',
        }}
      >
        {/* Horizontal bar */}
        <div style={{
          width: 80, height: 10, borderRadius: 5,
          background: 'linear-gradient(to bottom, rgba(192,193,255,0.35), rgba(99,102,241,0.20))',
          border: '1px solid rgba(192,193,255,0.30)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
          position: 'relative',
        }}>
          {/* Left rivet */}
          <span style={{ position:'absolute', top:'50%', left:10, transform:'translateY(-50%)', width:6, height:6, borderRadius:'50%', background:'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5), rgba(99,102,241,0.6))', border:'1px solid rgba(255,255,255,0.2)' }} />
          {/* Right rivet */}
          <span style={{ position:'absolute', top:'50%', right:10, transform:'translateY(-50%)', width:6, height:6, borderRadius:'50%', background:'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5), rgba(99,102,241,0.6))', border:'1px solid rgba(255,255,255,0.2)' }} />
        </div>
        {/* Hook */}
        <div style={{ width:20, height:14, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={{ display:'block', width:18, height:10, border:'2px solid rgba(192,193,255,0.45)', borderBottom:'none', borderRadius:'9px 9px 0 0', boxShadow:'0 -2px 6px rgba(99,102,241,0.3)' }} />
        </div>
        {/* Thread */}
        <div style={{ width:2, height:28, background:'linear-gradient(to bottom, rgba(192,193,255,0.50), rgba(192,193,255,0.06))', borderRadius:1 }} />
      </div>

      {/* ── Card stack container ──────────────────────── */}
      <div ref={innerRef} style={{ position:'relative', width:'100%', height:'100%' }}>

        {/* Back card */}
        <div style={{
          position:'absolute',
          top: lerp(20, 0, progress),
          left: lerp(18, 0, progress),
          width: lerp(260, rect.width, progress),
          height: lerp(340, rect.height, progress),
          borderRadius,
          overflow:'hidden',
          background:'linear-gradient(135deg, rgba(99,102,241,0.38) 0%, rgba(139,92,246,0.22) 50%, rgba(103,232,249,0.14) 100%)',
          border:'1px solid rgba(192,193,255,0.20)',
          backdropFilter:'blur(20px)',
          transform:`rotate(${lerp(-6, 0, progress)}deg) translate(${lerp(-6, 0, progress)}px, ${lerp(6, 0, progress)}px)`,
          zIndex:1,
          opacity: lerp(1, 0, progress),
        }}>
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 60% at 50% 15%, rgba(192,193,255,0.14), transparent 70%)' }} />
        </div>

        {/* Mid card */}
        <div style={{
          position:'absolute',
          top: lerp(12, 0, progress),
          left: lerp(10, 0, progress),
          width: lerp(260, rect.width, progress),
          height: lerp(340, rect.height, progress),
          borderRadius,
          overflow:'hidden',
          background:'rgba(18,18,30,0.60)',
          border:'1px solid rgba(255,255,255,0.10)',
          borderTopColor:'rgba(255,255,255,0.18)',
          backdropFilter:'blur(24px)',
          transform:`rotate(${lerp(-3, 0, progress)}deg) translate(${lerp(-3, 0, progress)}px, ${lerp(3, 0, progress)}px)`,
          zIndex:2,
          opacity: lerp(1, 0, progress),
        }} />

        {/* Front card — photo */}
        <div style={{
          position:'absolute',
          inset:0,
          borderRadius,
          overflow:'hidden',
          border:'1px solid rgba(255,255,255,0.13)',
          borderTopColor:'rgba(255,255,255,0.24)',
          boxShadow:`0 ${lerp(10, 20, progress)}px ${shadowBlur}px rgba(0,0,0,0.65), 0 3px 10px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.10)`,
          zIndex:3,
          background:'#0a0a12',
        }}>
          {/* Shimmer top edge */}
          <div style={{
            position:'absolute', top:0, left:0, right:0, height:1,
            background:'linear-gradient(90deg, transparent, rgba(192,193,255,0.60) 40%, rgba(103,232,249,0.60) 60%, transparent)',
            zIndex:10,
          }} />

          {/* Photo */}
          <img
            src={profileImg}
            alt="Buddhima Hewage"
            draggable={false}
            style={{
              position:'absolute',
              top: lerp(-15, 0, progress) + '%',
              left: lerp(-25, 0, progress) + '%',
              width: lerp(150, 100, progress) + '%',
              height: lerp(150, 100, progress) + '%',
              maxWidth:'none',
              objectFit:'cover',
              objectPosition: lerp(50, 50, progress) + '% ' + lerp(20, 15, progress) + '%',
              display:'block',
              transform:'translateZ(0.1px)',
            }}
          />

          {/* Gradient overlay */}
          <div style={{
            position:'absolute', inset:0,
            background:`linear-gradient(to top, rgba(10,10,18,${lerp(0.6, 0.3, progress)}) 0%, transparent 55%)`,
            zIndex:4,
          }} />

          {/* Open-to-work chip */}
          <div style={{
            position:'absolute', bottom:16, left:16,
            display:'inline-flex', alignItems:'center', gap:7,
            padding:'6px 14px', borderRadius:100,
            background:'rgba(10,10,18,0.88)',
            border:'1px solid rgba(74,222,128,0.3)',
            backdropFilter:'blur(14px)',
            fontSize:12, fontWeight:500,
            color:'rgba(255,255,255,0.85)',
            whiteSpace:'nowrap',
            boxShadow:'0 4px 20px rgba(0,0,0,0.4)',
            zIndex:5,
            opacity: Math.max(0, 1 - progress * 3),
            transform:`translateY(${lerp(0, 8, progress)}px)`,
            transition:'none',
          }}>
            <span style={{
              display:'inline-block', width:8, height:8, borderRadius:'50%',
              background:'#4ade80',
              animation:'statusPulse 2s ease-out infinite',
            }} />
            Open to Work
          </div>
        </div>

        {/* Name tag */}
        <div style={{
          position:'absolute', bottom:-14, right:-14,
          zIndex:10,
          display:'flex', alignItems:'center', gap:8,
          padding:'7px 14px', borderRadius:10,
          background:'rgba(8,8,18,0.92)',
          border:'1px solid rgba(255,255,255,0.10)',
          borderTopColor:'rgba(255,255,255,0.20)',
          backdropFilter:'blur(16px)',
          fontSize:12, fontWeight:600,
          color:'rgba(255,255,255,0.88)',
          boxShadow:'0 4px 20px rgba(0,0,0,0.55)',
          whiteSpace:'nowrap',
          opacity: Math.max(0, 1 - progress * 3),
          transition:'none',
        }}>
          <span style={{ display:'inline-block', width:3, height:16, borderRadius:2, background:'linear-gradient(to bottom, #c0c1ff, #6366f1)' }} />
          Buddhima Hewage
        </div>
      </div>
    </div>,
    document.body
  );
}
