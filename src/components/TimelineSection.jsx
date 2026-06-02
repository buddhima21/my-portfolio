/**
 * TimelineSection — Centred vertical timeline with alternating left/right cards.
 * Update the TIMELINE_ITEMS array with your own experience and education entries.
 */

const TIMELINE_ITEMS = [
  {
    id: 'cloud-intern',
    period: '2023 — Present',
    role: 'Cloud Architecture Intern',
    org: 'Vanguard Systems',
    description:
      'Leading the migration of microservices to AWS Fargate and implementing Terraform modules for infrastructure automation across 3 regions.',
    isActive: true,
    side: 'left',
  },
  {
    id: 'ml-research',
    period: '2022 — 2023',
    role: 'ML Research Assistant',
    org: 'University AI Lab',
    description:
      'Optimizing distributed training pipelines for large-scale language models, improving inference throughput by 30% through quantization and batching strategies.',
    isActive: false,
    side: 'right',
  },
  {
    id: 'bscs',
    period: '2021 — Present',
    role: 'B.S. Software Engineering',
    org: 'State Institute of Technology',
    description:
      "Dean's List for 4 consecutive semesters. Core focus on Algorithms, Distributed Systems, and Machine Learning. Senior Thesis: \"Efficient LLM Inference on Edge Devices\".",
    isActive: false,
    side: 'left',
  },
];

export default function TimelineSection() {
  return (
    <section
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
            Experience &amp; Education
          </h2>
        </div>

        {/* Timeline container — vertical line sits at center on md+ */}
        <div className="relative ml-4 md:ml-0 border-l border-white/10 md:border-l-0">
          {/* Centre line on desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

          {TIMELINE_ITEMS.map((item, i) => (
            <TimelineItem key={item.id} {...item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ period, role, org, description, isActive, side, index }) {
  const isLeft = side === 'left';

  return (
    <div className={`relative mb-16 md:flex md:items-start ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      {/* Dot */}
      <div
        className={`absolute md:static md:flex-shrink-0 -left-[9px] top-1 md:mx-0 md:z-10
          flex items-center justify-center
          w-4 h-4 rounded-full border-2
          ${isActive
            ? 'bg-primary border-primary shadow-[0_0_12px_rgba(192,193,255,0.6)]'
            : 'bg-surface-container-lowest border-white/20'
          }`}
        style={{ marginLeft: isLeft ? undefined : undefined }}
      />

      {/* Hidden spacer for centering on desktop */}
      <div className="hidden md:block md:w-1/2 md:flex-shrink-0" />

      {/* Card */}
      <div
        className={`ml-6 md:ml-0 md:w-1/2
          ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}
          glass-card p-6 flex flex-col gap-2`}
        style={{ animationDelay: `${index * 150}ms` }}
      >
        <span
          className="font-mono uppercase text-on-surface-variant tracking-widest"
          style={{ fontSize: '10px' }}
        >
          {period}
        </span>
        <h3
          className="text-on-surface font-semibold"
          style={{ fontSize: '20px', letterSpacing: '-0.02em' }}
        >
          {role}
        </h3>
        <p className="text-primary font-medium" style={{ fontSize: '14px' }}>
          {org}
        </p>
        <p className="text-on-surface-variant leading-relaxed" style={{ fontSize: '14px' }}>
          {description}
        </p>

        {isActive && (
          <div className="flex items-center gap-2 mt-1">
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
