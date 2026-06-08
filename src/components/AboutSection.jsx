export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-32 px-6 md:px-20 reveal"
      aria-label="About me"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-2">
          <span
            className="font-mono uppercase text-primary tracking-[0.28em]"
            style={{ fontSize: '11px', fontWeight: 500 }}
          >
            Who I Am
          </span>
          <h2
            className="text-on-surface font-semibold leading-tight tracking-tight mt-2"
            style={{ fontSize: 'clamp(32px, 4vw, 42px)', letterSpacing: '-0.03em' }}
          >
            Building Through Education.
          </h2>
        </div>

        {/* About Me Text */}
        <p className="text-on-surface-variant leading-relaxed text-[16px] md:text-[18px] max-w-4xl">
          Currently pursuing a degree in Software Engineering with a CGPA of 3.44, I am continuously expanding my knowledge through academic studies, practical projects, and self-learning. My interests lie in software development, AI technologies, and cloud computing, where I enjoy exploring innovative solutions and transforming ideas into impactful applications.
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Focused On */}
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 hover:border-white/10 transition-colors">
            <h3 className="text-[12px] font-mono text-primary uppercase tracking-widest mb-5">Focused On</h3>
            <ul className="flex flex-col gap-4">
              {['Full-Stack Development', 'AI & Machine Learning', 'Cloud Computing', 'Software Architecture'].map(item => (
                <li key={item} className="text-[14px] md:text-[15px] text-on-surface-variant flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" /> 
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Currently Learning */}
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 hover:border-white/10 transition-colors">
            <h3 className="text-[12px] font-mono text-[#67e8f9] uppercase tracking-widest mb-5">Learning</h3>
            <ul className="flex flex-col gap-4">
              {['AWS Cloud Fundamentals', 'Advanced React', 'ML Applications', 'DevOps Practices'].map(item => (
                <li key={item} className="text-[14px] md:text-[15px] text-on-surface-variant flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#67e8f9]/60 mt-1.5 flex-shrink-0" /> 
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Beyond Technology */}
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 hover:border-white/10 transition-colors">
            <h3 className="text-[12px] font-mono text-[#fde047] uppercase tracking-widest mb-5">Beyond Tech</h3>
            <ul className="flex flex-col gap-4">
              {['Event Organization', 'Team Collaboration', 'Continuous Learning', 'Problem Solving'].map(item => (
                <li key={item} className="text-[14px] md:text-[15px] text-on-surface-variant flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fde047]/60 mt-1.5 flex-shrink-0" /> 
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
