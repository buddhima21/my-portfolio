import { useEffect, useRef } from 'react';

/* ── Tech Icons ──────────────────────────────────────────── */
const ICONS = [
  { name: 'Java', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'JavaScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Next.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
  { name: 'Tailwind', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'HTML5', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'CSS3', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { name: 'Node.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'Spring Boot', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
  { name: 'MySQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
  { name: 'MongoDB', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
  { name: 'PostgreSQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
  { name: 'AWS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Docker', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
  { name: 'Git', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { name: 'GitHub', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
  { name: 'Gradle', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gradle/gradle-original.svg' },
  { name: 'Postman', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
];

/* ── Split into two rows for variety ── */
const ROW_1 = ICONS.slice(0, 10);
const ROW_2 = ICONS.slice(10, 20);

/* ── Tech Icon Card ──────────────────────────────────────────── */
function TechCard({ name, src }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 w-[140px] h-[130px] rounded-[20px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] backdrop-blur-md transition-all duration-300 hover:bg-[rgba(255,255,255,0.06)] hover:-translate-y-2 hover:border-[rgba(255,255,255,0.15)] hover:shadow-[0_8px_30px_-10px_rgba(139,92,246,0.3)] shrink-0 group">
      <img
        src={src}
        alt={name}
        className="w-12 h-12 object-contain filter transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] group-hover:scale-110"
        loading="lazy"
      />
      <span className="text-[11px] font-mono text-white/50 tracking-[0.1em] uppercase transition-colors duration-300 group-hover:text-white/90">
        {name}
      </span>
    </div>
  );
}

/* ── Main Section ────────────────────────────────────────────── */
export default function TechStackSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current?.querySelector('.ts-reveal');
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('ts-visible');
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="techstack"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      aria-label="Tech stack"
    >
      <style>{`
        /* ── Reveal ── */
        .ts-reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.8s cubic-bezier(.22,1,.36,1),
                      transform 0.8s cubic-bezier(.22,1,.36,1);
        }
        .ts-visible { opacity: 1; transform: translateY(0); }

        /* ── Marquee Keyframes ── */
        @keyframes scrollLeftToRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0%); }
        }
        @keyframes scrollRightToLeft {
          from { transform: translateX(0%); }
          to   { transform: translateX(-50%); }
        }

        /* ── Marquee Container ── */
        .marquee-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          position: relative;
          /* Edge fades */
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }

        .marquee-track {
          display: flex;
          gap: 24px;
          width: max-content;
          /* Pause on hover */
          transition: animation-play-state 0.3s ease;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        .track-ltr {
          animation: scrollLeftToRight 35s linear infinite;
        }

        .track-rtl {
          animation: scrollRightToLeft 40s linear infinite;
        }
      `}</style>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-20 ts-reveal">

        {/* Header */}
        <div className="mb-16 text-center">
          <span
            className="font-mono uppercase text-teal-400 tracking-[0.28em]"
            style={{ fontSize: '11px', fontWeight: 500 }}
          >
            Capabilities
          </span>
          <h2
            className="font-display text-white font-semibold mt-3 leading-tight"
            style={{ fontSize: 'clamp(30px, 4vw, 46px)', letterSpacing: '-0.02em' }}
          >
            Tech Stack
          </h2>
          <p
            className="text-white/40 mt-4 max-w-md mx-auto"
            style={{ fontSize: '15px', lineHeight: 1.8 }}
          >
            Languages, frameworks, and tools I work with across the full stack-from local development to cloud deployment.
          </p>
        </div>

        {/* Marquee Area */}
        <div className="marquee-container">

          {/* Row 1: Left to Right */}
          <div className="marquee-track track-ltr">
            {/* Render items twice for seamless looping */}
            {[...ROW_1, ...ROW_1].map((icon, idx) => (
              <TechCard key={`r1-${idx}`} name={icon.name} src={icon.src} />
            ))}
          </div>

          {/* Row 2: Right to Left */}
          <div className="marquee-track track-rtl">
            {/* Render items twice for seamless looping */}
            {[...ROW_2, ...ROW_2].map((icon, idx) => (
              <TechCard key={`r2-${idx}`} name={icon.name} src={icon.src} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
