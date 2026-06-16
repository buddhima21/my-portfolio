/**
 * TimelineSection — Three premium animations:
 * 1. Scroll-driven line fill with a trailing cyan glow-ball at the tip
 * 2. Ripple pulse rings that fire when the line activates each dot
 * 3. Staggered card children — period → role → org → description fade in one by one
 */

import { useEffect, useRef } from 'react';

const TIMELINE_ITEMS = [
  {
    id: 'sliit-it',
    period: '2024',
    role: 'IT Undergraduate',
    org: 'Sri Lanka Institute of Information Technology (SLIIT)',
    description:
      'Commenced my undergraduate studies at SLIIT, diving into foundational computing, programming, and software development principles.',
    isActive: false,
    side: 'left',
  },
  {
    id: 'sliitxtreme',
    period: '2024',
    role: 'Design Team Member — Volunteer',
    org: 'SLIITXtreme · IEEE SLIIT CS Chapter',
    description:
      'Volunteered as a Design Team Member for the SLIITXtreme programming competition, an event organised by the IEEE SLIIT Computer Society Chapter. Contributed to visual design, promotional material, and event branding.',
    isActive: false,
    side: 'right',
  },
  {
    id: 'sliit-se',
    period: '2025',
    role: 'Software Engineering Undergraduate',
    org: 'Sri Lanka Institute of Information Technology (SLIIT)',
    description:
      'Specialised in Software Engineering, focusing on full-stack development, software architecture, cloud computing, and AI/ML applications. Engaged in group and individual projects spanning the full software development lifecycle.',
    isActive: false,
    side: 'left',
  },
  {
    id: 'ieee-embs',
    period: '2026 — Present',
    role: 'Assistant Treasurer',
    org: 'IEEE SLIIT EMBS Chapter',
    description:
      'Appointed as Assistant Treasurer at the IEEE SLIIT Engineering in Medicine & Biology Society (EMBS) Chapter. Responsible for managing chapter finances, supporting budgeting for events, and contributing to the growth of the EMBS student community.',
    isActive: true,
    side: 'right',
  },
];

export default function TimelineSection() {
  const sectionRef  = useRef(null);
  const lineRef     = useRef(null);    // cyan fill bar
  const glowHeadRef = useRef(null);   // trailing glow ball
  const dotRefs     = useRef([]);     // desktop dot elements
  const rippleRefs  = useRef([]);     // ripple ring elements (one per dot)

  useEffect(() => {
    const section  = sectionRef.current;
    const fill     = lineRef.current;
    const glowHead = glowHeadRef.current;
    const dots     = dotRefs.current;
    const ripples  = rippleRefs.current;
    if (!section || !fill) return;

    // Track which dots have already fired their ripple in this scroll pass.
    // Plain Set — no React state, no re-renders.
    const rippleFired = new Set();

    // Pre-activate isActive dots via data-attribute.
    // React does NOT reset data-* attributes it doesn't own in JSX, so this
    // survives reconciliation (unlike classList which React resets on re-render).
    TIMELINE_ITEMS.forEach((item, i) => {
      if (item.isActive && dots[i]) {
        dots[i].setAttribute('data-active', '1');
        rippleFired.add(i); // never fire ripple for always-on dots
      }
    });

    const onScroll = () => {
      const sRect  = section.getBoundingClientRect();
      const totalH = sRect.height;
      // Use 0.72 × viewport height so the line comfortably reaches the last dot
      const progress = Math.min(
        Math.max((-sRect.top + window.innerHeight * 0.72) / totalH, 0),
        1
      );

      // 1. Grow fill line
      fill.style.transform = `scaleY(${progress})`;

      // 2. Move trailing glow ball — hide only when fully at 0 or fully past end
      if (glowHead) {
        glowHead.style.top     = `calc(${progress * 100}% - 6px)`;
        glowHead.style.opacity = progress > 0.01 && progress < 1.0 ? '1' : '0';
      }

      // 3. Activate / deactivate dots + ripples
      dots.forEach((dot, i) => {
        if (!dot) return;
        const dRect = dot.getBoundingClientRect();
        if (dRect.width === 0 && dRect.height === 0) return; // skip display:none

        const dotRelTop = dRect.top + dRect.height / 2 - sRect.top;
        const dotFrac   = dotRelTop / totalH;
        const reached   = progress >= dotFrac - 0.02;

        if (reached) {
          dot.setAttribute('data-active', '1');      // React never resets this
          if (!rippleFired.has(i) && ripples[i]) {
            rippleFired.add(i);
            ripples[i].classList.remove('tl-ripple--burst');
            void ripples[i].offsetWidth;             // reflow → restart animation
            ripples[i].classList.add('tl-ripple--burst');
          }
        } else if (!TIMELINE_ITEMS[i]?.isActive) {
          dot.removeAttribute('data-active');
          rippleFired.delete(i);                     // allow re-fire on next pass
          if (ripples[i]) ripples[i].classList.remove('tl-ripple--burst');
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="py-40 px-6 md:px-20 bg-surface-container-lowest reveal"
      aria-label="Experience and education timeline"
    >
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <span
            className="font-mono uppercase text-primary tracking-[0.28em]"
            style={{ fontSize: '11px', fontWeight: 500 }}
          >
            Trajectory
          </span>
          <h2
            className="text-on-surface font-semibold mt-3"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.03em' }}
          >
            Journey &amp; Milestones
          </h2>
          <p
            className="text-on-surface-variant mt-4 mx-auto"
            style={{ fontSize: '15px', maxWidth: '420px', lineHeight: 1.8 }}
          >
            From the lecture hall to leadership — a snapshot of my academic and volunteer path.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative ml-4 md:ml-0">

          {/* Mobile static left border */}
          <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-white/10" />

          {/* Desktop track (dim base) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

          {/* Desktop fill line — scroll-driven scaleY */}
          <div
            ref={lineRef}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 origin-top"
            style={{
              background: 'linear-gradient(to bottom, #67e8f9 0%, #38bdf8 70%, rgba(103,232,249,0.15) 100%)',
              transform: 'scaleY(0)',
              transformOrigin: 'top',
              transition: 'transform 0.07s linear',
              filter: 'drop-shadow(0 0 5px #67e8f9) drop-shadow(0 0 10px rgba(103,232,249,0.5))',
            }}
          />

          {/* Trailing glow ball — rides the tip of the fill line */}
          <div
            ref={glowHeadRef}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 z-30 pointer-events-none"
            style={{
              top: '-6px',
              opacity: 0,
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#67e8f9',
              transition: 'top 0.07s linear, opacity 0.25s ease',
              boxShadow:
                '0 0 0 3px rgba(103,232,249,0.25), 0 0 12px 4px rgba(103,232,249,0.7), 0 0 28px 8px rgba(103,232,249,0.3)',
            }}
          />

          {TIMELINE_ITEMS.map((item, i) => (
            <TimelineItem
              key={item.id}
              {...item}
              index={i}
              dotRef={el => { dotRefs.current[i] = el; }}
              rippleRef={el => { rippleRefs.current[i] = el; }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ period, role, org, description, isActive, side, index, dotRef, rippleRef }) {
  const cardRef = useRef(null);
  const isLeft  = side === 'left';

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // ── Staggered children: start hidden ──────────────────────
    const children = Array.from(card.querySelectorAll('.card-child'));
    children.forEach((child) => {
      child.style.opacity   = '0';
      child.style.transform = 'translateY(12px)';
    });

    // ── Card slide-in ──────────────────────────────────────────
    card.style.opacity   = '0';
    card.style.transform = `translateX(${isLeft ? '-44px' : '44px'})`;
    card.style.transition = `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 130}ms,
                             transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 130}ms`;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Card appears
        card.style.opacity   = '1';
        card.style.transform = 'translateX(0)';

        // Children stagger in after card arrives
        children.forEach((child, ci) => {
          setTimeout(() => {
            child.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            child.style.opacity    = '1';
            child.style.transform  = 'translateY(0)';
          }, index * 130 + ci * 90 + 180);
        });

        observer.disconnect();
      }
    }, { threshold: 0.12 });

    observer.observe(card);
    return () => observer.disconnect();
  }, [isLeft, index]);

  return (
    <div className={`relative mb-16 md:flex md:items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

      {/* ── Mobile dot ── */}
      <div className="absolute md:hidden -left-[9px] top-5 w-4 h-4 flex items-center justify-center">
        <div
          className={`tl-dot w-4 h-4 rounded-full border-2 z-10
            ${isActive
              ? 'bg-[#67e8f9] border-[#67e8f9] shadow-[0_0_14px_rgba(103,232,249,0.7)]'
              : 'bg-surface-container-lowest border-white/25'
            }`}
        />
      </div>

      {/* ── Desktop dot + ripple ring ── */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20 items-center justify-center">
        {/* Ripple ring — burst fires on activation */}
        <div
          ref={rippleRef}
          className="tl-ripple absolute rounded-full"
          style={{ width: '16px', height: '16px' }}
        />
        {/* Dot */}
        <div
          ref={dotRef}
          className={`tl-dot relative w-4 h-4 rounded-full border-2 z-10
            ${isActive
              ? 'bg-[#67e8f9] border-[#67e8f9]'
              : 'bg-surface-container-lowest border-white/25'
            }`}
        />
      </div>

      {/* Spacer */}
      <div className="hidden md:block md:w-1/2 md:flex-shrink-0" />

      {/* ── Card ── */}
      <div
        ref={cardRef}
        className={`ml-6 md:ml-0 md:w-1/2
          ${isLeft ? 'md:pr-14 md:text-right' : 'md:pl-14'}
          glass-card p-6 flex flex-col gap-2
          hover:border-[rgba(103,232,249,0.25)] transition-all duration-300
          hover:shadow-[0_8px_40px_rgba(103,232,249,0.07)]`}
        style={{ borderRadius: '12px' }}
      >
        <span
          className="card-child font-mono uppercase text-primary tracking-widest"
          style={{ fontSize: '10px' }}
        >
          {period}
        </span>

        <h3
          className="card-child text-on-surface font-semibold"
          style={{ fontSize: '18px', letterSpacing: '-0.02em' }}
        >
          {role}
        </h3>

        <p
          className="card-child font-medium"
          style={{ fontSize: '13px', color: '#67e8f9' }}
        >
          {org}
        </p>

        <p className="card-child text-on-surface-variant leading-relaxed" style={{ fontSize: '14px' }}>
          {description}
        </p>

        {isActive && (
          <div className={`card-child flex items-center gap-2 mt-1 ${isLeft ? 'md:justify-end' : ''}`}>
            <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ background: '#67e8f9' }} />
            <span className="font-mono uppercase tracking-widest" style={{ fontSize: '9px', color: '#67e8f9' }}>
              Current
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
