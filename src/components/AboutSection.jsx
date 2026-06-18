export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-32 px-6 md:px-20 reveal"
      aria-label="About me"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-20">

        {/* Section Header + Intro */}
        <div className="flex flex-col gap-6">
          <span
            className="font-mono uppercase text-primary tracking-[0.28em]"
            style={{ fontSize: '11px', fontWeight: 600 }}
          >
            Who I Am
          </span>
          <h2
            className="text-on-surface font-semibold leading-tight"
            style={{ fontSize: 'clamp(32px, 4vw, 42px)', letterSpacing: '-0.03em' }}
          >
            Building Through Education.
          </h2>
          {/* Paragraph — full width, no constraint */}
          <p
            className="text-on-surface-variant leading-relaxed w-full"
            style={{ fontSize: '16px', lineHeight: 1.9 }}
          >
            Currently pursuing a degree in Software Engineering with a CGPA of 3.44, I am
            continuously expanding my knowledge through academic studies, practical projects,
            and self-learning. My interests lie in software development, AI technologies, and
            cloud computing where I enjoy exploring innovative solutions and transforming
            ideas into impactful applications. I believe in writing clean, maintainable code
            and building software that makes a real difference in people's everyday lives.
          </p>
        </div>

        {/* ── Hairline divider ── */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

        {/* ── Three detail columns — full width, open, no boxes ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 md:divide-x md:divide-white/[0.06]">

          {/* Focused On */}
          <div className="md:pr-14">
            <p
              className="font-mono uppercase tracking-widest mb-6"
              style={{ fontSize: '10px', fontWeight: 600, color: '#c0c1ff' }}
            >
              Focused On
            </p>
            <ul className="flex flex-col gap-3">
              {['Full-Stack Development', 'AI & Machine Learning', 'Cloud Computing', 'Software Architecture'].map(item => (
                <li
                  key={item}
                  className="text-on-surface-variant"
                  style={{ fontSize: '15px', lineHeight: 1.7 }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Currently Learning */}
          <div className="md:px-14">
            <p
              className="font-mono uppercase tracking-widest mb-6"
              style={{ fontSize: '10px', fontWeight: 600, color: '#c0c1ff' }}
            >
              Learning
            </p>
            <ul className="flex flex-col gap-3">
              {['AWS Cloud Fundamentals', 'Advanced React', 'ML Applications', 'DevOps Practices'].map(item => (
                <li
                  key={item}
                  className="text-on-surface-variant"
                  style={{ fontSize: '15px', lineHeight: 1.7 }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Beyond Tech */}
          <div className="md:pl-14">
            <p
              className="font-mono uppercase tracking-widest mb-6"
              style={{ fontSize: '10px', fontWeight: 600, color: '#c0c1ff' }}
            >
              Beyond Tech
            </p>
            <ul className="flex flex-col gap-3">
              {['Event Organization', 'Team Collaboration', 'Continuous Learning', 'Problem Solving'].map(item => (
                <li
                  key={item}
                  className="text-on-surface-variant"
                  style={{ fontSize: '15px', lineHeight: 1.7 }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
