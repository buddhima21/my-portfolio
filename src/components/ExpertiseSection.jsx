/**
 * ExpertiseSection — 3-column grid of skill cards with glass morphism,
 * material icons, and mouse-follow glow effect (driven by CSS vars set
 * in App.jsx's global mousemove listener).
 */

const SKILLS = [
  {
    icon: 'terminal',
    title: 'Software Engineering',
    description:
      'Clean code principles, design patterns, and robust architecture for enterprise-grade applications.',
  },
  {
    icon: 'layers',
    title: 'Frontend Development',
    description:
      'Crafting high-fidelity, performant user interfaces with React, TypeScript, and Framer Motion.',
  },
  {
    icon: 'database',
    title: 'Backend & APIs',
    description:
      'Scalable REST & GraphQL APIs and distributed systems using Node.js, Python, and SQL/NoSQL databases.',
  },
  {
    icon: 'neurology',
    title: 'AI & Machine Learning',
    description:
      'Developing predictive models and integrating LLMs into production workflows via PyTorch & HuggingFace.',
  },
  {
    icon: 'cloud',
    title: 'Cloud Computing',
    description:
      'Infrastructure as Code, serverless deployments, and cloud-native scaling on AWS and GCP.',
  },
  {
    icon: 'all_inclusive',
    title: 'DevOps & CI/CD',
    description:
      'Docker containerization, GitHub Actions pipelines, and automated observability with Prometheus & Grafana.',
  },
];

export default function ExpertiseSection() {
  return (
    <section
      id="expertise"
      className="py-40 px-6 md:px-20 bg-surface-container-lowest reveal"
      aria-label="Expertise and skills"
    >
      <div className="max-w-container-max mx-auto">

        {/* Section header */}
        <div className="mb-16">
          <span
            className="font-mono uppercase text-primary tracking-[0.28em]"
            style={{ fontSize: '11px', fontWeight: 600 }}
          >
            Expertise
          </span>
          <h2
            className="font-heading text-on-surface font-semibold mt-3"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.02em' }}
          >
            Core Disciplines
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILLS.map(({ icon, title, description }) => (
            <SkillCard key={title} icon={icon} title={title} description={description} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ icon, title, description }) {
  return (
    <div className="glass-card p-8 flex flex-col gap-4 hover:scale-[1.02] transition-transform duration-300 group cursor-default">
      {/* Icon */}
      <span
        className="material-symbols-outlined text-primary transition-transform duration-300 group-hover:scale-110"
        style={{ fontSize: '32px' }}
        aria-hidden="true"
      >
        {icon}
      </span>

      {/* Title */}
      <h3
        className="font-heading text-on-surface font-semibold"
        style={{ fontSize: '20px', letterSpacing: '-0.02em' }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="text-on-surface-variant leading-relaxed flex-1"
        style={{ fontSize: '15px' }}
      >
        {description}
      </p>

      {/* Bottom accent line */}
      <div className="h-px bg-gradient-to-r from-primary/40 to-transparent mt-2 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
}
