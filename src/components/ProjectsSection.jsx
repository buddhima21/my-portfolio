/**
 * ProjectsSection — Alternating large-image / text layout for featured projects.
 *
 * Update the PROJECTS array with your own data. Each project supports:
 *   title, description, tags[], image, imageAlt, sourceUrl, caseStudyUrl
 */

const PROJECTS = [
  {
    id: 'rentease',
    title: 'RentEase🏠',
    description:
      'A full-stack rental property management platform serving tenants, property owners, and administrators. Features interactive map-based listings, maintenance request workflows, secure JWT authentication, real-time notifications, and an AI chatbot-all wrapped in a fully responsive Light/Dark UI.',
    tags: ['React', 'Vite', 'Spring Boot', 'MongoDB', 'Tailwind CSS', 'Playwright'],
    image:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&auto=format&fit=crop',
    imageAlt: 'Modern apartment building facade representing rental property management',
    sourceUrl: 'https://github.com/buddhima21/RentEase',
    caseStudyUrl: '#',
    imageLeft: true,
  },
  {
    id: 'california-house-price',
    title: 'California House Price Prediction',
    description:
      'A regression-based ML project built during Y2S1 (AIML module) to predict California house prices. Trained and compared Linear Regression and Gradient Boosting models, evaluated with MSE, RMSE, and R² metrics on the classic California Housing Dataset.',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Jupyter Notebook'],
    image:
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=900&auto=format&fit=crop',
    imageAlt: 'Aerial view of a California residential neighbourhood representing house price prediction',
    sourceUrl: 'https://github.com/buddhima21/California-House-Price-Prediction',
    caseStudyUrl: '#',
    imageLeft: false,
  },
  {
    id: 'rentease-mobile',
    title: 'RentEase Mobile App📱',
    description:
      'A full-stack mobile rental management system  built with React Native and a MERN backend. Covers the full rental lifecycle like property listings, bookings, digital agreements, wallet payments, maintenance requests, push notifications, and multi-role dashboards for tenants, owners, and admins.',
    tags: ['React Native', 'Expo', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&auto=format&fit=crop',
    imageAlt: 'Modern residential property viewed from outside representing a mobile rental app',
    sourceUrl: 'https://github.com/buddhima21/RentEase-Mobile-App',
    caseStudyUrl: '#',
    imageLeft: true,
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
              style={{ fontSize: '11px', fontWeight: 600 }}
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
    <div
      className="lg:col-span-7 group relative overflow-hidden glass-card aspect-video cursor-pointer"
      style={{ borderRadius: '12px', transition: 'box-shadow 0.4s ease' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-primary), 0 24px 60px rgba(0,0,0,0.35)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = ''}
    >
      {/* Image — zooms on hover */}
      <img
        src={image}
        alt={imageAlt}
        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        loading="lazy"
      />

      {/* Sliding overlay — slides up from bottom on hover */}
      <div
        className="absolute inset-x-0 bottom-0 flex flex-col justify-end px-6 pb-6 pt-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
          transform: 'translateY(100%)',
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        ref={el => {
          if (el) {
            const parent = el.parentElement;
            parent.addEventListener('mouseenter', () => { el.style.transform = 'translateY(0)'; });
            parent.addEventListener('mouseleave', () => { el.style.transform = 'translateY(100%)'; });
          }
        }}
      >
        <span
          className="font-mono uppercase tracking-widest text-white flex items-center gap-2"
          style={{ fontSize: '12px' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_outward</span>
          View Project
        </span>
      </div>

      {/* Corner accent glow */}
      <div
        className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at top right, var(--color-primary) 0%, transparent 70%)',
          opacity: 0,
          transition: 'opacity 0.5s ease',
        }}
        ref={el => {
          if (el) {
            const parent = el.parentElement;
            parent.addEventListener('mouseenter', () => { el.style.opacity = '0.35'; });
            parent.addEventListener('mouseleave', () => { el.style.opacity = '0'; });
          }
        }}
      />
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
