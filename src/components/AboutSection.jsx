import profileImg from '../assets/profile.jpg';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-32 px-6 md:px-20 reveal"
      aria-label="About me"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-20">

        {/* ── Top row: photo (left) + header & bio (right) ── */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">

          {/* LEFT — profile photo card */}
          <div className="hidden md:block flex-shrink-0">
            <div
              style={{
                width: 220,
                height: 280,
                borderRadius: 24,
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(192,193,255,0.15)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
              }}
            >
              <img
                src={profileImg}
                alt="Buddhima Hewage"
                draggable={false}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: '50% 15%',
                  display: 'block',
                }}
              />
              {/* Bottom gradient */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(10,10,18,0.55) 0%, transparent 60%)',
              }} />
              {/* Open-to-work chip */}
              <div style={{
                position: 'absolute', bottom: 14, left: 14,
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '5px 12px', borderRadius: 100,
                background: 'rgba(10,10,18,0.88)',
                border: '1px solid rgba(74,222,128,0.3)',
                backdropFilter: 'blur(14px)',
                fontSize: 11, fontWeight: 500,
                color: 'rgba(255,255,255,0.85)',
                whiteSpace: 'nowrap',
              }}>
                <span style={{
                  display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
                  background: '#4ade80',
                  animation: 'statusPulse 2s ease-out infinite',
                }} />
                Open to Work
              </div>
            </div>
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
