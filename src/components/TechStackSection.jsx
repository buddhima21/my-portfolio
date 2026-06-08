import { useEffect, useRef } from 'react';

/* ── Tech categories ──────────────────────────────────────────── */
const TECH_CATEGORIES = [
  {
    label: 'Languages',
    accent: '#818cf8',
    items: ['Java', 'Python', 'JavaScript', 'TypeScript'],
  },
  {
    label: 'Frontend',
    accent: '#38bdf8',
    items: ['React', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3'],
  },
  {
    label: 'Backend',
    accent: '#34d399',
    items: ['Node.js', 'Express.js', 'Spring Boot'],
  },
  {
    label: 'Databases',
    accent: '#fb923c',
    items: ['MySQL', 'MongoDB', 'PostgreSQL'],
  },
  {
    label: 'Cloud & DevOps',
    accent: '#e879f9',
    items: ['AWS', 'Docker', 'GitHub Actions', 'Maven', 'Gradle'],
  },
  {
    label: 'Testing & Tools',
    accent: '#facc15',
    items: ['JUnit', 'Git', 'GitHub', 'Postman'],
  },
];

/* ── Floating icon definitions ──────────────────────────────────
   Each entry: { src, x (%), y (%), size (px), dur (s), delay (s), opacity }
*/
const FLOATING_ICONS = [
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',           x: 3,   y: 8,   size: 52, dur: 7,   delay: 0,   opacity: 0.18 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',       x: 90,  y: 5,   size: 44, dur: 9,   delay: 1.2, opacity: 0.16 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', x: 78, y: 55, size: 38, dur: 6,   delay: 0.5, opacity: 0.15 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',  x: 8,  y: 65, size: 36, dur: 8,   delay: 2,   opacity: 0.14 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',         x: 50,  y: 3,  size: 48, dur: 10,  delay: 0.8, opacity: 0.17 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',       x: 62,  y: 88, size: 40, dur: 7.5, delay: 1.5, opacity: 0.15 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', x: 20, y: 88, size: 38, dur: 6.5, delay: 3, opacity: 0.16 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',         x: 93,  y: 30, size: 40, dur: 8.5, delay: 0.3, opacity: 0.15 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',           x: 85,  y: 78, size: 36, dur: 9.5, delay: 1.8, opacity: 0.14 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',       x: 35,  y: 92, size: 44, dur: 7,   delay: 2.5, opacity: 0.16 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg',       x: 5,   y: 40, size: 38, dur: 6,   delay: 1,   opacity: 0.15 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',         x: 73,  y: 18, size: 46, dur: 11,  delay: 0.6, opacity: 0.14 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',     x: 15,  y: 22, size: 38, dur: 8,   delay: 2.2, opacity: 0.15 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', x: 48, y: 80, size: 40, dur: 7,   delay: 3.5, opacity: 0.15 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', x: 87, y: 45, size: 48, dur: 9, delay: 1.4, opacity: 0.14 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',       x: 28,  y: 5,  size: 44, dur: 6.5, delay: 0.9, opacity: 0.17 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',             x: 58,  y: 12, size: 38, dur: 10,  delay: 2.8, opacity: 0.16 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',       x: 3,   y: 82, size: 36, dur: 7.5, delay: 1.6, opacity: 0.15 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gradle/gradle-original.svg',       x: 42,  y: 50, size: 34, dur: 8,   delay: 4,   opacity: 0.12 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg',     x: 96,  y: 68, size: 36, dur: 9,   delay: 0.4, opacity: 0.15 },
];

/* ── Category Card ───────────────────────────────────────────── */
function CategoryCard({ label, accent, items }) {
  return (
    <div className="ts-card ts-reveal" style={{ '--accent': accent }}>
      <div className="ts-topline" />
      <p className="ts-cat-label" style={{ color: accent }}>{label}</p>
      <div className="flex flex-wrap gap-2 mt-5">
        {items.map((tech) => (
          <span key={tech} className="ts-pill" style={{ '--accent': accent }}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Main Section ────────────────────────────────────────────── */
export default function TechStackSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.ts-reveal');
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          els.forEach((el, i) =>
            setTimeout(() => el.classList.add('ts-visible'), i * 90)
          );
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const total = TECH_CATEGORIES.reduce((a, c) => a + c.items.length, 0);

  return (
    <section
      id="techstack"
      ref={sectionRef}
      className="relative py-32 px-6 md:px-20 reveal"
      style={{ overflow: 'hidden' }}
      aria-label="Tech stack"
    >
      <style>{`
        /* ── Float keyframes ── */
        @keyframes floatUp {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          33%      { transform: translateY(-14px) rotate(2deg); }
          66%      { transform: translateY(-6px) rotate(-1.5deg); }
        }
        @keyframes floatDown {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          33%      { transform: translateY(12px) rotate(-2deg); }
          66%      { transform: translateY(5px) rotate(1.5deg); }
        }

        /* ── Floating icon ── */
        .ts-float-icon {
          position: absolute;
          pointer-events: none;
          user-select: none;
          filter: blur(0.4px);
          transition: opacity 0.4s;
        }
        .ts-float-icon:nth-child(odd)  { animation: floatUp   var(--dur,7s) ease-in-out var(--delay,0s) infinite; }
        .ts-float-icon:nth-child(even) { animation: floatDown var(--dur,7s) ease-in-out var(--delay,0s) infinite; }

        /* ── Entrance ── */
        .ts-reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.6s cubic-bezier(.22,1,.36,1),
                      transform 0.6s cubic-bezier(.22,1,.36,1);
        }
        .ts-visible { opacity: 1; transform: translateY(0); }

        /* ── Card ── */
        .ts-card {
          position: relative;
          padding: 26px 24px;
          border-radius: 12px;
          background: rgba(10,10,18,0.55);
          border: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
        }
        .ts-card:hover {
          border-color: color-mix(in srgb, var(--accent) 30%, transparent);
          box-shadow: 0 8px 36px -10px var(--accent, transparent);
          transform: translateY(-4px);
        }
        .ts-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 10% 0%, var(--accent, transparent), transparent 65%);
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }
        .ts-card:hover::before { opacity: 0.06; }

        /* Top accent line */
        .ts-topline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--accent, #fff) 0%, transparent 75%);
          border-radius: 12px 12px 0 0;
          opacity: 0.65;
          transition: opacity 0.3s;
        }
        .ts-card:hover .ts-topline { opacity: 1; }

        /* ── Category label ── */
        .ts-cat-label {
          font-family: 'Courier New', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }

        /* ── Pill ── */
        .ts-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 13px;
          border-radius: 4px;
          font-size: 12.5px;
          font-weight: 500;
          border: 1px solid rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.55);
          background: rgba(255,255,255,0.02);
          transition: color 0.2s, border-color 0.2s, background 0.2s, transform 0.18s;
          cursor: default;
          white-space: nowrap;
        }
        .ts-pill::before {
          content: '';
          width: 4px; height: 4px;
          border-radius: 50%;
          background: var(--accent, rgba(255,255,255,0.4));
          opacity: 0.35;
          flex-shrink: 0;
          transition: opacity 0.2s;
        }
        .ts-pill:hover {
          color: #fff;
          border-color: color-mix(in srgb, var(--accent) 40%, transparent);
          background: rgba(255,255,255,0.05);
          transform: translateY(-1px);
        }
        .ts-pill:hover::before { opacity: 1; }

        /* ── Footer divider ── */
        .ts-rule { height: 1px; flex: 1; background: rgba(255,255,255,0.05); }
        .ts-count-badge {
          font-family: 'Courier New', monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.22);
          padding: 5px 18px;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 999px;
        }
      `}</style>

      {/* ── Floating background icons ── */}
      {FLOATING_ICONS.map(({ src, x, y, size, dur, delay, opacity }, i) => (
        <img
          key={i}
          src={src}
          alt=""
          aria-hidden="true"
          className="ts-float-icon"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: size,
            height: size,
            opacity,
            '--dur': `${dur}s`,
            '--delay': `${delay}s`,
          }}
          loading="lazy"
        />
      ))}

      {/* ── Main content (above icons) ── */}
      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-20 ts-reveal">
          <span
            className="font-mono uppercase text-primary tracking-[0.28em]"
            style={{ fontSize: '11px', fontWeight: 500 }}
          >
            Technologies
          </span>
          <h2
            className="text-on-surface font-semibold mt-3 leading-tight"
            style={{ fontSize: 'clamp(30px, 4vw, 46px)', letterSpacing: '-0.03em' }}
          >
            Tech Stack
          </h2>
          <p
            className="text-on-surface-variant mt-4 max-w-md"
            style={{ fontSize: '15px', lineHeight: 1.8 }}
          >
            Languages, frameworks, and tools I work with across the full stack — from local development to cloud deployment.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TECH_CATEGORIES.map(({ label, accent, items }) => (
            <CategoryCard key={label} label={label} accent={accent} items={items} />
          ))}
        </div>

        {/* Footer */}
        <div className="ts-reveal mt-16 flex items-center gap-5">
          <div className="ts-rule" />
          <span className="ts-count-badge">{total} technologies</span>
          <div className="ts-rule" />
        </div>

      </div>
    </section>
  );
}
