/**
 * TimelineSection — Centred vertical timeline.
 * - Vertical line fills progressively as you scroll through the section.
 * - Each card slides in from its side on scroll.
 * - Dots activate (glow) as the line reaches them.
 * - No emojis — clean minimal dot design.
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
  const lineRef     = useRef(null);   // the coloured fill bar
  const dotRefs     = useRef([]);     // one ref per dot

  useEffect(() => {
    const section = sectionRef.current;
    const fill    = lineRef.current;
    const dots    = dotRefs.current;
    if (!section || !fill) return;

    const onScroll = () => {
      const sRect   = section.getBoundingClientRect();
      const totalH  = sRect.height;
      const viewH   = window.innerHeight;

      // How far the centre of the viewport has travelled into the section (0 → 1)
      const progress = Math.min(
        Math.max((-sRect.top + viewH * 0.55) / totalH, 0),
        1
      );

      fill.style.transform = `scaleY(${progress})`;

      // Activate each dot when the line has reached its vertical position
      dots.forEach((dot) => {
        if (!dot) return;
        const dRect      = dot.getBoundingClientRect();
        const dotRelTop  = dRect.top + dRect.height / 2 - sRect.top;
        const dotFrac    = dotRelTop / totalH;
        const reached    = progress >= dotFrac - 0.02;

        if (reached) {
          dot.classList.add('tl-dot--active');
        } else {
          dot.classList.remove('tl-dot--active');
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on mount
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

        {/* Timeline container */}
        <div className="relative ml-4 md:ml-0">

          {/* Mobile left border */}
          <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-white/10" />

          {/* Desktop centre track (dim base) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

          {/* Desktop centre fill — grows with scroll, cyan-blue glow */}
          <div
            className="hidden md:block absolute left-1/2 top-0 w-[2px] -translate-x-1/2"
            style={{
              bottom: 0,
              background: 'linear-gradient(to bottom, #67e8f9 0%, #38bdf8 60%, rgba(103,232,249,0.2) 100%)',
              transform: 'scaleY(0)',
              transformOrigin: 'top',
              transition: 'transform 0.08s linear',
              filter: 'drop-shadow(0 0 6px #67e8f9) drop-shadow(0 0 12px rgba(103,232,249,0.5))',
            }}
            ref={lineRef}
          />

          {TIMELINE_ITEMS.map((item, i) => (
            <TimelineItem
              key={item.id}
              {...item}
              index={i}
              dotRef={el => { dotRefs.current[i] = el; }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ period, role, org, description, isActive, side, index, dotRef }) {
  const cardRef = useRef(null);
  const isLeft  = side === 'left';

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    el.style.opacity   = '0';
    el.style.transform = `translateX(${isLeft ? '-40px' : '40px'})`;
    el.style.transition = `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms,
                           transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity   = '1';
          el.style.transform = 'translateX(0)';
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isLeft, index]);

  return (
    <div className={`relative mb-16 md:flex md:items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

      {/* Mobile dot */}
      <div
        ref={dotRef}
        className={`tl-dot absolute md:hidden -left-[9px] top-5 w-4 h-4 rounded-full border-2
          ${isActive
            ? 'border-[#67e8f9] bg-[#67e8f9] shadow-[0_0_14px_rgba(103,232,249,0.7)]'
            : 'bg-surface-container-lowest border-white/25'
          }`}
      />

      {/* Desktop dot — centre */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 items-center justify-center">
        <div
          ref={dotRef}
          className={`tl-dot w-4 h-4 rounded-full border-2
            ${isActive
              ? 'bg-[#67e8f9] border-[#67e8f9]'
              : 'bg-surface-container-lowest border-white/25'
            }`}
        />
      </div>

      {/* Spacer */}
      <div className="hidden md:block md:w-1/2 md:flex-shrink-0" />

      {/* Card */}
      <div
        ref={cardRef}
        className={`ml-6 md:ml-0 md:w-1/2
          ${isLeft ? 'md:pr-14 md:text-right' : 'md:pl-14'}
          glass-card p-6 flex flex-col gap-2
          hover:border-primary/30 transition-all duration-300
          hover:shadow-[0_8px_40px_rgba(192,193,255,0.08)]`}
        style={{ borderRadius: '12px' }}
      >
        <span
          className="font-mono uppercase text-primary tracking-widest"
          style={{ fontSize: '10px' }}
        >
          {period}
        </span>

        <h3
          className="text-on-surface font-semibold"
          style={{ fontSize: '18px', letterSpacing: '-0.02em' }}
        >
          {role}
        </h3>

        <p className="font-medium" style={{ fontSize: '13px', color: 'var(--color-primary)' }}>
          {org}
        </p>

        <p className="text-on-surface-variant leading-relaxed" style={{ fontSize: '14px' }}>
          {description}
        </p>

        {isActive && (
          <div className={`flex items-center gap-2 mt-1 ${isLeft ? 'md:justify-end' : ''}`}>
            <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-primary uppercase tracking-widest" style={{ fontSize: '9px' }}>
              Current
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
