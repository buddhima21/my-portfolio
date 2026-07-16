/**
 * TimelineSection — minimal dot spine with premium card design
 * ─ Scroll-driven cyan fill line + trailing glow head
 * ─ Small clean dots (12 px) on the centre spine
 * ─ Year pill markers between groups
 * ─ Category chip, accent-line cards, shimmer hover
 * ─ Ripple burst on dot activation
 * ─ Staggered children fade-in
 */

import { useEffect, useRef } from 'react';
import { gsap } from '../hooks/useGSAP';

const TIMELINE_ITEMS = [
  {
    id: 'sliit-it',
    year: '2024',
    period: 'Jan 2024',
    role: 'IT Undergraduate',
    org: 'Sri Lanka Institute of Information Technology (SLIIT)',
    category: 'Education',
    categoryColor: '#818cf8',
    categoryBg: 'rgba(99,102,241,0.12)',
    categoryBorder: 'rgba(99,102,241,0.28)',
    description:
      'Commenced undergraduate studies at SLIIT, diving into foundational computing, programming, and software development principles.',
    isActive: false,
    side: 'left',
    dotColor: '#6366f1',
    accentLine: '#6366f1',
    accentGradient: 'linear-gradient(135deg, rgba(99,102,241,0.14) 0%, rgba(139,92,246,0.04) 100%)',
  },
  {
    id: 'sliitxtreme',
    year: '2024',
    period: 'Oct 2024',
    role: 'Design Team Member',
    roleNote: 'Volunteer',
    org: 'SLIITXtreme · IEEE SLIIT CS Chapter',
    category: 'Volunteering',
    categoryColor: '#f472b6',
    categoryBg: 'rgba(236,72,153,0.10)',
    categoryBorder: 'rgba(236,72,153,0.25)',
    description:
      'Contributed as a Design Team Member for the SLIITXtreme programming competition, crafting visual design, promotional materials, and event branding.',
    isActive: false,
    side: 'right',
    dotColor: '#ec4899',
    accentLine: '#ec4899',
    accentGradient: 'linear-gradient(135deg, rgba(236,72,153,0.12) 0%, rgba(168,85,247,0.04) 100%)',
  },
  {
    id: 'sliit-se',
    year: '2025',
    period: 'Jan 2025',
    role: 'Software Engineering Undergraduate',
    org: 'Sri Lanka Institute of Information Technology (SLIIT)',
    category: 'Education',
    categoryColor: '#818cf8',
    categoryBg: 'rgba(99,102,241,0.12)',
    categoryBorder: 'rgba(99,102,241,0.28)',
    description:
      'Specialised in Software Engineering — full-stack development, software architecture, cloud computing, and AI/ML. Engaged across the full SDLC in group and individual projects.',
    isActive: false,
    side: 'left',
    dotColor: '#22d3ee',
    accentLine: '#22d3ee',
    accentGradient: 'linear-gradient(135deg, rgba(103,232,249,0.12) 0%, rgba(56,189,248,0.03) 100%)',
  },
  {
    id: 'ieee-embs',
    year: '2026',
    period: '2026 — Present',
    role: 'Assistant Treasurer',
    org: 'IEEE SLIIT EMBS Chapter',
    category: 'Leadership',
    categoryColor: '#4ade80',
    categoryBg: 'rgba(74,222,128,0.10)',
    categoryBorder: 'rgba(74,222,128,0.25)',
    description:
      'Appointed as Assistant Treasurer at the IEEE SLIIT Engineering in Medicine & Biology Society. Manages chapter finances, budgeting for events, and supports growth of the EMBS student community.',
    isActive: true,
    side: 'right',
    dotColor: '#4ade80',
    accentLine: '#22c55e',
    accentGradient: 'linear-gradient(135deg, rgba(74,222,128,0.12) 0%, rgba(103,232,249,0.03) 100%)',
  },
];

export default function TimelineSection() {
  const sectionRef  = useRef(null);
  const lineRef     = useRef(null);
  const glowHeadRef = useRef(null);
  const dotRefs     = useRef([]);
  const rippleRefs  = useRef([]);
  const headerRef   = useRef(null);

  /* ── GSAP heading entrance ── */
  useEffect(() => {
    if (!headerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.85, stagger: 0.18, ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section  = sectionRef.current;
    const fill     = lineRef.current;
    const glowHead = glowHeadRef.current;
    const dots     = dotRefs.current;
    const ripples  = rippleRefs.current;
    if (!section || !fill) return;

    const rippleFired = new Set();

    TIMELINE_ITEMS.forEach((item, i) => {
      if (item.isActive && dots[i]) {
        dots[i].setAttribute('data-active', '1');
        rippleFired.add(i);
      }
    });

    const onScroll = () => {
      const sRect    = section.getBoundingClientRect();
      const totalH   = sRect.height;
      const progress = Math.min(
        Math.max((-sRect.top + window.innerHeight * 0.72) / totalH, 0),
        1,
      );

      fill.style.transform = `scaleY(${progress})`;

      if (glowHead) {
        glowHead.style.top     = `calc(${progress * 100}% - 6px)`;
        glowHead.style.opacity = progress > 0.01 && progress < 1.0 ? '1' : '0';
      }

      dots.forEach((dot, i) => {
        if (!dot) return;
        const dRect = dot.getBoundingClientRect();
        if (dRect.width === 0 && dRect.height === 0) return;

        const dotRelTop = dRect.top + dRect.height / 2 - sRect.top;
        const dotFrac   = dotRelTop / totalH;
        const reached   = progress >= dotFrac - 0.02;

        if (reached) {
          dot.setAttribute('data-active', '1');
          if (!rippleFired.has(i) && ripples[i]) {
            rippleFired.add(i);
            ripples[i].classList.remove('tl-ripple--burst');
            void ripples[i].offsetWidth;
            ripples[i].classList.add('tl-ripple--burst');
          }
        } else if (!TIMELINE_ITEMS[i]?.isActive) {
          dot.removeAttribute('data-active');
          rippleFired.delete(i);
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
      className="py-40 px-6 md:px-20 bg-surface-container-lowest section-sep"
      aria-label="Experience and education timeline"
    >
      <div className="max-w-5xl mx-auto">

        {/* ── Header ──────────────────────────────────────── */}
        <div ref={headerRef} className="text-center mb-24">
          <span
            className="font-mono uppercase tracking-[0.28em]"
            style={{ fontSize: '11px', fontWeight: 600, color: '#c0c1ff' }}
          >
            Trajectory
          </span>
          <h2
            className="font-heading text-on-surface font-semibold mt-3"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.02em' }}
          >
            Journey & Milestones
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div style={{ width: '32px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(103,232,249,0.4))' }} />
            <p className="text-on-surface-variant" style={{ fontSize: '15px', lineHeight: 1.8 }}>
              From the lecture hall to leadership.
            </p>
            <div style={{ width: '32px', height: '1px', background: 'linear-gradient(to left, transparent, rgba(103,232,249,0.4))' }} />
          </div>
        </div>

        {/* ── Timeline body ───────────────────────────────────── */}
        <div className="relative ml-6 md:ml-0">

          {/* Mobile left track */}
          <div
            className="md:hidden absolute left-0 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 10%, rgba(255,255,255,0.08) 90%, transparent)' }}
          />

          {/* Desktop dim track */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
            style={{ width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 8%, rgba(255,255,255,0.08) 92%, transparent)' }}
          />

          {/* Desktop scroll-fill line */}
          <div
            ref={lineRef}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 origin-top"
            style={{
              width: '2px',
              background: 'linear-gradient(to bottom, #67e8f9 0%, #38bdf8 60%, rgba(103,232,249,0.2) 100%)',
              transform: 'scaleY(0)',
              transformOrigin: 'top',
              transition: 'transform 0.07s linear',
              filter: 'drop-shadow(0 0 5px #67e8f9) drop-shadow(0 0 12px rgba(103,232,249,0.4))',
            }}
          />

          {/* Trailing glow head */}
          <div
            ref={glowHeadRef}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 z-30 pointer-events-none"
            style={{
              top: '-6px',
              opacity: 0,
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #fff 15%, #67e8f9 55%, transparent 100%)',
              transition: 'top 0.07s linear, opacity 0.25s ease',
              boxShadow: '0 0 0 3px rgba(103,232,249,0.18), 0 0 14px 4px rgba(103,232,249,0.6), 0 0 30px 8px rgba(103,232,249,0.2)',
            }}
          />

          {/* Items with year markers */}
          {(() => {
            let lastYear = null;
            const nodes = [];
            TIMELINE_ITEMS.forEach((item, i) => {
              if (item.year !== lastYear) {
                lastYear = item.year;
                nodes.push(<YearMarker key={`year-${item.year}`} year={item.year} />);
              }
              nodes.push(
                <TimelineItem
                  key={item.id}
                  {...item}
                  index={i}
                  dotRef={(el) => { dotRefs.current[i] = el; }}
                  rippleRef={(el) => { rippleRefs.current[i] = el; }}
                />,
              );
            });
            return nodes;
          })()}
        </div>
      </div>
    </section>
  );
}

/* ─── Year pill marker ──────────────────────────────────────── */
function YearMarker({ year }) {
  return (
    <div className="relative flex items-center justify-center my-6 md:my-8">
      <div
        className="hidden md:block absolute left-0 right-1/2 mr-16 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(103,232,249,0.12))' }}
      />
      <div
        className="hidden md:block absolute left-1/2 right-0 ml-16 h-px"
        style={{ background: 'linear-gradient(to left, transparent, rgba(103,232,249,0.12))' }}
      />
      <div
        className="relative z-20 px-4 py-1 rounded-full font-mono font-semibold"
        style={{
          fontSize: '11px',
          letterSpacing: '0.16em',
          color: '#67e8f9',
          background: 'rgba(8,8,18,0.88)',
          border: '1px solid rgba(103,232,249,0.2)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 0 16px rgba(103,232,249,0.1)',
        }}
      >
        {year}
      </div>
    </div>
  );
}

/* ─── Timeline item ─────────────────────────────────────────── */
function TimelineItem({
  period, role, roleNote, org, category,
  categoryColor, categoryBg, categoryBorder,
  description, isActive, side, index,
  dotRef, rippleRef,
  dotColor, accentLine, accentGradient,
}) {
  const cardRef = useRef(null);
  const isLeft  = side === 'left';

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const children = Array.from(card.querySelectorAll('.card-child'));
    children.forEach((c) => {
      c.style.opacity   = '0';
      c.style.transform = 'translateY(12px)';
    });

    card.style.opacity    = '0';
    card.style.transform  = `translateX(${isLeft ? '-44px' : '44px'})`;
    card.style.transition = `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms,
                              transform 0.75s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms`;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        card.style.opacity   = '1';
        card.style.transform = 'translateX(0)';
        children.forEach((c, ci) => {
          setTimeout(() => {
            c.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            c.style.opacity    = '1';
            c.style.transform  = 'translateY(0)';
          }, index * 120 + ci * 85 + 160);
        });
        obs.disconnect();
      }
    }, { threshold: 0.1 });

    obs.observe(card);
    return () => obs.disconnect();
  }, [isLeft, index]);

  return (
    <div className={`relative mb-12 md:flex md:items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

      {/* ── Mobile dot ─────────────────────────────────────── */}
      <div className="absolute md:hidden -left-[17px] top-6 z-10">
        <div
          className="tl-dot w-3 h-3 rounded-full border-2"
          style={{
            background: isActive ? dotColor : 'rgba(18,18,28,1)',
            borderColor: isActive ? dotColor : 'rgba(255,255,255,0.18)',
            boxShadow: isActive ? `0 0 10px ${dotColor}90` : 'none',
          }}
        />
      </div>

      {/* ── Desktop dot + ripple ────────────────────────────── */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20 items-center justify-center">
        {/* Ripple ring */}
        <div
          ref={rippleRef}
          className="tl-ripple absolute"
          style={{ width: '12px', height: '12px' }}
        />
        {/* Dot */}
        <div
          ref={dotRef}
          className="tl-dot relative z-10 rounded-full"
          style={{
            width: '12px',
            height: '12px',
            background: isActive ? dotColor : 'rgba(18,18,28,1)',
            border: `2px solid ${isActive ? dotColor : 'rgba(255,255,255,0.18)'}`,
            boxShadow: isActive ? `0 0 0 3px ${dotColor}25, 0 0 14px ${dotColor}70` : 'none',
            transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
          }}
        />
      </div>

      {/* Spacer */}
      <div className="hidden md:block md:w-1/2 md:flex-shrink-0" />

      {/* ── Card ─────────────────────────────────────────────── */}
      <div
        ref={cardRef}
        className={`ml-8 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-14' : 'md:pl-14'}`}
      >
        <div
          className="group relative overflow-hidden rounded-2xl p-6 flex flex-col gap-3 cursor-default"
          style={{
            background: 'rgba(12,12,22,0.65)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderTop: '1px solid rgba(255,255,255,0.11)',
            transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = `${accentLine}30`;
            e.currentTarget.style.boxShadow   = `0 8px 36px rgba(0,0,0,0.35), 0 0 0 1px ${accentLine}18`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '';
            e.currentTarget.style.boxShadow   = '';
          }}
        >
          {/* Hover accent overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
            style={{ background: accentGradient }}
          />

          {/* Left accent stripe */}
          <div
            className="absolute top-5 bottom-5 left-0 w-[2px] rounded-r-full"
            style={{
              background: `linear-gradient(to bottom, ${accentLine}, transparent)`,
              opacity: isActive ? 0.9 : 0.3,
              transition: 'opacity 0.35s ease',
            }}
          />

          {/* Shimmer top edge */}
          <div
            className="absolute top-0 left-6 right-6 h-px pointer-events-none"
            style={{
              background: `linear-gradient(to right, transparent, ${accentLine}55, transparent)`,
              opacity: 0.5,
            }}
          />

          {/* Category chip + period */}
          <div className={`card-child relative flex items-center gap-2.5 flex-wrap ${isLeft ? 'md:flex-row-reverse' : ''}`}>
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full font-mono uppercase font-semibold"
              style={{
                fontSize: '9px',
                letterSpacing: '0.13em',
                color: categoryColor,
                background: categoryBg,
                border: `1px solid ${categoryBorder}`,
              }}
            >
              {category}
            </span>
            <span
              className="font-mono"
              style={{ fontSize: '11px', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.38)' }}
            >
              {period}
            </span>
          </div>

          {/* Role */}
          <div className={`card-child relative ${isLeft ? 'md:text-right' : ''}`}>
            <h3
              className="font-heading text-on-surface font-semibold leading-snug"
              style={{ fontSize: '18px', letterSpacing: '-0.02em' }}
            >
              {role}
              {roleNote && (
                <span
                  className="ml-2 font-normal"
                  style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', letterSpacing: 0 }}
                >
                  · {roleNote}
                </span>
              )}
            </h3>
          </div>

          {/* Org */}
          <p
            className={`card-child relative font-medium ${isLeft ? 'md:text-right' : ''}`}
            style={{ fontSize: '13px', color: accentLine, opacity: 0.85, letterSpacing: '0.01em' }}
          >
            {org}
          </p>

          {/* Description */}
          <p
            className={`card-child relative text-on-surface-variant leading-relaxed ${isLeft ? 'md:text-right' : ''}`}
            style={{ fontSize: '13.5px', lineHeight: 1.75, opacity: 0.7 }}
          >
            {description}
          </p>

          {/* Active badge */}
          {isActive && (
            <div className={`card-child relative flex items-center gap-1.5 mt-1 ${isLeft ? 'md:justify-end' : ''}`}>
              <span
                className="inline-block w-[7px] h-[7px] rounded-full animate-pulse"
                style={{ background: '#4ade80', boxShadow: '0 0 6px rgba(74,222,128,0.65)' }}
              />
              <span
                className="font-mono uppercase font-semibold"
                style={{ fontSize: '9px', color: '#4ade80', letterSpacing: '0.18em' }}
              >
                Current
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
