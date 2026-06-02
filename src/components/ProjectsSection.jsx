/**
 * ProjectsSection — Alternating large-image / text layout for featured projects.
 *
 * Update the PROJECTS array with your own data. Each project supports:
 *   title, description, tags[], image, imageAlt, sourceUrl, caseStudyUrl
 */

const PROJECTS = [
  {
    id: 'neural-insights',
    title: 'NeuralInsights AI',
    description:
      'A real-time data analysis platform leveraging transformer models to predict market volatility. Architected for low-latency processing and high-frequency data ingestion at scale.',
    tags: ['PyTorch', 'Python', 'React', 'FastAPI'],
    image:
      'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&auto=format&fit=crop',
    imageAlt: 'Neural network visualization with glowing blue nodes',
    sourceUrl: '#',
    caseStudyUrl: '#',
    imageLeft: true,
  },
  {
    id: 'stratus-mesh',
    title: 'Stratus Mesh',
    description:
      'A cloud-native infrastructure automation tool that simplifies multi-region service mesh deployments. Reduces configuration time by 60% using declarative templates and a smart diff engine.',
    tags: ['AWS', 'Terraform', 'Go', 'Docker'],
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&auto=format&fit=crop',
    imageAlt: 'Abstract cloud computing network globe visualization',
    sourceUrl: '#',
    caseStudyUrl: '#',
    imageLeft: false,
  },
];

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="py-40 px-6 md:px-20 reveal"
      aria-label="Featured projects"
    >
      <div className="max-w-container-max mx-auto">

        {/* Header */}
        <div className="flex justify-between items-end mb-20">
          <div>
            <span
              className="font-mono uppercase text-primary tracking-[0.28em]"
              style={{ fontSize: '11px', fontWeight: 500 }}
            >
              Selection
            </span>
            <h2
              className="text-on-surface font-semibold mt-3"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.03em' }}
            >
              Featured Projects
            </h2>
          </div>
        </div>

        {/* Project rows */}
        <div className="flex flex-col gap-32">
          {PROJECTS.map((project) => (
            <ProjectRow key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ id, title, description, tags, image, imageAlt, sourceUrl, caseStudyUrl, imageLeft }) {
  const imageCol = (
    <div className="lg:col-span-7 group relative overflow-hidden glass-card aspect-video">
      <img
        src={image}
        alt={imageAlt}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
        loading="lazy"
      />
      {/* Overlay shimmer */}
      <div className="absolute inset-0 bg-gradient-to-t from-surface/60 to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />
    </div>
  );

  const textCol = (
    <div className={`lg:col-span-5 flex flex-col gap-5 ${imageLeft ? 'lg:pl-12' : 'lg:pr-12'}`}>
      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-surface-container-high font-mono text-primary"
            style={{ fontSize: '12px' }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h3
        id={`project-${id}`}
        className="text-on-surface font-semibold"
        style={{ fontSize: 'clamp(24px, 3vw, 32px)', letterSpacing: '-0.02em' }}
      >
        {title}
      </h3>

      {/* Description */}
      <p className="text-on-surface-variant leading-relaxed" style={{ fontSize: '16px' }}>
        {description}
      </p>

      {/* Links */}
      <div className="flex gap-8 pt-2">
        <a
          href={sourceUrl}
          aria-label={`View source code for ${title}`}
          className="flex items-center gap-2 font-mono uppercase tracking-widest text-on-surface hover:text-primary transition-colors duration-300"
          style={{ fontSize: '11px' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>code</span>
          Source
        </a>
        <a
          href={caseStudyUrl}
          aria-label={`Read case study for ${title}`}
          className="flex items-center gap-2 font-mono uppercase tracking-widest text-on-surface hover:text-primary transition-colors duration-300"
          style={{ fontSize: '11px' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>open_in_new</span>
          Case Study
        </a>
      </div>
    </div>
  );

  return (
    <article
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
      aria-labelledby={`project-${id}`}
    >
      {imageLeft ? (
        <>
          {imageCol}
          <div className="lg:col-span-5">{textCol}</div>
        </>
      ) : (
        <>
          <div className="lg:col-span-5 order-2 lg:order-1">{textCol}</div>
          <div className="order-1 lg:order-2 lg:col-span-7">{imageCol}</div>
        </>
      )}
    </article>
  );
}
