export default function AboutSection({ aboutAnchorRef }) {
  return (
    <section
      id="about"
      className="py-32 px-6 md:px-20 reveal"
      aria-label="About me"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-20">

        {/* ── Top row: photo anchor (left) + header & bio (right) ── */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">

          {/* LEFT — anchor where the floating card lands */}
          <div className="hidden md:block flex-shrink-0">
            <div
              ref={aboutAnchorRef}
              style={{
                width: 220,
                height: 280,
                borderRadius: 24,
                /* Faint ghost so layout stays stable before card arrives */
                background: 'rgba(255,255,255,0.02)',
                border: '1px dashed rgba(255,255,255,0.06)',
              }}
              aria-hidden="true"
            />
          </div>

          {/* RIGHT — text content */}
          <div className="flex flex-col gap-6 flex-1">
            <span
              className="font-mono uppercase text-primary tracking-[0.28em]"
              style={{ fontSize: '11px', fontWeight: 600 }}
            >
              Who I Am
            </span>
            <h2
              className="font-heading text-on-surface font-semibold leading-tight"
              style={{ fontSize: 'clamp(32px, 4vw, 42px)', letterSpacing: '-0.02em' }}
            >
              Building Through Education.
            </h2>
            <p
              className="text-on-surface-variant leading-relaxed"
              style={{ fontSize: '16px', lineHeight: 1.9 }}
            >
              I am a Software Engineering Undergraduate at SLIIT, currently pursuing my degree with a CGPA of 3.44. I am
              continuously expanding my knowledge through academic studies, practical projects,
              and self-learning. My interests lie in software development, AI technologies, and
              cloud computing where I enjoy exploring innovative solutions and transforming
              ideas into impactful applications. I believe in writing clean, maintainable code
              and building software that makes a real difference in people's everyday lives.
            </p>
          </div>
        </div>

        {/* ── Hairline divider ── */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

        {/* ── Three detail columns ── */}
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
