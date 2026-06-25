import { useState, useEffect, useRef } from 'react';
import ShaderBackground from './ShaderBackground';
import profileImg from '../assets/profile.jpg';

/* ─── Typewriter hook ──────────────────────────────────────────
   Cycles through `words` array: types → pauses → deletes → next
───────────────────────────────────────────────────────────── */
const ROLES = ['Full-Stack Developer', 'Cloud Solutions Architect', 'ML Enthusiast'];

function useTypewriter(words, typingSpeed = 75, deletingSpeed = 40, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx]     = useState(0);
  const [phase, setPhase]         = useState('typing');

  useEffect(() => {
    const word = words[wordIdx % words.length];
    let delay;
    if (phase === 'typing') {
      if (displayed.length < word.length) {
        delay = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), typingSpeed);
      } else {
        delay = setTimeout(() => setPhase('deleting'), pauseMs);
      }
    } else {
      if (displayed.length > 0) {
        delay = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deletingSpeed);
      } else {
        setWordIdx((i) => (i + 1) % words.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(delay);
  }, [displayed, phase, wordIdx, words, typingSpeed, deletingSpeed, pauseMs]);

  return displayed;
}

/* ─── Social icons ─────────────────────────────────────────── */
function GitHubIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* ─── ProfileCard ──────────────────────────────────────────────
   Layered glass card stack, hanging from a belt/clip visual.

   PHYSICS: spring-pendulum fires ONLY when mouse is inside the
   right-column wrapper (pc-wrap), never the whole window.
   When the mouse leaves, targets spring back to 0 automatically.
   Photo is slightly zoomed to clarify the face.
───────────────────────────────────────────────────────────── */
function ProfileCard({ img }) {
  const wrapRef  = useRef(null);  // right-col wrapper — mouse zone
  const outerRef = useRef(null);  // pendulum pivot — receives CSS vars

  useEffect(() => {
    const wrap  = wrapRef.current;
    const outer = outerRef.current;
    if (!wrap || !outer) return;

    /* Spring physics state */
    let rz = 0, rx = 0;      // current rotation: Z = swing, X = tilt
    let vz = 0, vx = 0;      // velocity
    let tZ = 0, tX = 0;      // target rotation
    const DAMP  = 0.80;       // damping  — lower = bouncier
    const STIFF = 0.055;      // stiffness — lower = lazier spring
    let raf;

    /* Mouse within right column only */
    const onMove = (e) => {
      const rect = outer.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top;                        // pivot at TOP edge
      const nx   = (e.clientX - cx) / (rect.width  / 2);   // −1 → +1
      const ny   = (e.clientY - cy) / (rect.height / 2);   //  0 → +1
      tZ =  nx * 13;  // pendulum swing ±13°
      tX = -ny * 5;   // slight tilt ±5°
    };

    /* Leaving right column → spring back */
    const onLeave = () => { tZ = 0; tX = 0; };

    /* RAF spring loop — runs every frame regardless of mouse position */
    function tick() {
      vz = (vz + (tZ - rz) * STIFF) * DAMP;
      vx = (vx + (tX - rx) * STIFF) * DAMP;
      rz += vz;
      rx += vx;
      outer.style.setProperty('--rz', `${rz}deg`);
      outer.style.setProperty('--rx', `${rx}deg`);
      raf = requestAnimationFrame(tick);
    }

    wrap.addEventListener('mousemove', onMove,  { passive: true });
    wrap.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    /* Full right-column hit zone */
    <div ref={wrapRef} className="pc-wrap">

      {/* Pendulum pivot — everything below hangs from this point */}
      <div ref={outerRef} className="pc-outer">

        {/* ── Belt / clip visual ─────────────────────────────── */}
        <div className="pc-belt" aria-hidden="true">
          {/* Horizontal bar (the "belt") */}
          <div className="pc-belt-bar">
            <span className="pc-belt-rivet pc-belt-rivet--l" />
            <span className="pc-belt-rivet pc-belt-rivet--r" />
          </div>
          {/* Metal hook hanging from bar */}
          <div className="pc-belt-hook">
            <span className="pc-belt-arch" />
          </div>
          {/* Thread from hook to card top */}
          <div className="pc-belt-thread" />
        </div>

        {/* ── Card stack ──────────────────────────────────────── */}
        <div className="pc-scene">

          {/* Back card — accent gradient */}
          <div className="pc-card pc-card--back" aria-hidden="true">
            <div className="pc-card-inner">
              <span className="pc-tag">Software Engineer</span>
              <span className="pc-tag pc-tag--accent">Open Source</span>
            </div>
            <div className="pc-card-gradient" />
          </div>

          {/* Mid card — glass */}
          <div className="pc-card pc-card--mid" aria-hidden="true">
            <div className="pc-card-inner pc-card-inner--mid">
              <span className="pc-tag">Cloud ☁️</span>
              <span className="pc-tag pc-tag--cyan">Full-Stack</span>
            </div>
          </div>

          {/* Front card — photo */}
          <div className="pc-card pc-card--front">
            <img
              src={img}
              alt="Buddhima Hewage — Software Engineer"
              className="pc-photo"
              draggable={false}
            />
            <div className="pc-shimmer" aria-hidden="true" />
          </div>

          {/* Open-to-Work chip — top-left */}
          <div className="profile-status-chip" aria-label="Open to work">
            <span className="profile-status-dot" />
            Open to Work
          </div>

          {/* Name tag — bottom-right */}
          <div className="pc-name-tag" aria-hidden="true">
            <span className="pc-name-tag-line" />
            <span>Buddhima Hewage</span>
          </div>

        </div>{/* /pc-scene */}
      </div>{/* /pc-outer */}
    </div>   /* /pc-wrap */
  );
}

/* ─── HeroSection ──────────────────────────────────────────── */
export default function HeroSection({
  ctaPrimary   = { label: 'View Projects', href: '#projects' },
  ctaSecondary = { label: 'Contact Me',   href: '#contact'  },
  githubUrl    = 'https://github.com/Buddhima21',
  linkedinUrl  = 'https://www.linkedin.com/in/buddhima-hewage',
}) {
  const role = useTypewriter(ROLES);

  return (
    <section
      id="hero"
      className="relative w-full h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* WebGL Shader Background */}
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        <ShaderBackground className="absolute inset-0 w-full h-full" />
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 hero-gradient pointer-events-none" />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, #131315 100%)' }}
      />

      {/* Decorative orbs */}
      <div className="hero-orb hero-orb--purple" aria-hidden="true" />
      <div className="hero-orb hero-orb--cyan"   aria-hidden="true" />

      {/* 2-column grid */}
      <div className="relative z-10 w-full max-w-container-max mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-8">

        {/* ── LEFT: Text ──────────────────────────────────── */}
        <div className="flex flex-col gap-5">


          {/* Name headline */}
          <h1
            className="text-on-surface font-bold leading-[1.08] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(36px, 4.8vw, 68px)' }}
          >
            Hi, I'm{' '}
            <span className="hero-gradient-text">Buddhima<br />Hewage</span>
          </h1>

          {/* Subtitle line */}
          <p
            className="text-on-surface-variant font-medium"
            style={{ fontSize: 'clamp(15px, 1.6vw, 20px)', letterSpacing: '-0.01em', opacity: 0.7 }}
          >
            Software Engineering Undergraduate · SLIIT
          </p>

          {/* Typewriter */}
          <div className="flex items-center gap-0" style={{ minHeight: '36px' }}>
            <span className="hero-typewriter" style={{ fontSize: 'clamp(16px, 1.8vw, 22px)' }}>
              {role}
              <span className="hero-cursor" aria-hidden="true">|</span>
            </span>
          </div>

          {/* Description */}
          <p
            className="text-on-surface-variant"
            style={{ fontSize: '15px', lineHeight: '1.8', maxWidth: '420px', opacity: 0.65 }}
          >
            Driven by the intersection of computational efficiency and
            intelligent design — turning complex problems into elegant,
            scalable systems.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a id="hero-cta-primary"   href={ctaPrimary.href}   className="hero-btn-primary">{ctaPrimary.label}</a>
            <a id="hero-cta-secondary" href={ctaSecondary.href}  className="hero-btn-secondary">{ctaSecondary.label}</a>
          </div>


          {/* Scroll indicator */}
          <div className="hidden md:flex items-center gap-3 pt-1 text-on-surface-variant">
            <div className="hero-scroll-line" aria-hidden="true" />
            <span className="font-mono uppercase tracking-[0.2em] opacity-40" style={{ fontSize: '10px' }}>
              Scroll to explore
            </span>
          </div>
        </div>

        {/* ── RIGHT: Hanging card stack ───────────────────── */}
        <div className="hidden md:flex items-center justify-center">
          <ProfileCard img={profileImg} />
        </div>

      </div>
    </section>
  );
}
