/**
 * AboutSection — Two-column layout with portrait photo and bio text.
 *
 * Props (all optional):
 *   imageSrc  {string}  URL or import path of portrait image
 *   imageAlt  {string}  Alt text for the portrait
 */
export default function AboutSection({
  imageSrc = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop',
  imageAlt = 'Professional portrait of Buddhima Hewage',
}) {
  return (
    <section
      id="about"
      className="py-40 px-6 md:px-20 reveal"
      aria-label="About me"
    >
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

        {/* Portrait column */}
        <div className="md:col-span-5 relative">
          {/* Decorative border accent */}
          <div className="absolute -top-4 -left-4 w-32 h-32 border border-primary/30 pointer-events-none" />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-primary/20 pointer-events-none" />

          <div className="aspect-[4/5] overflow-hidden grayscale contrast-110 relative">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover transition-all duration-700 hover:grayscale-0 hover:scale-105"
              loading="lazy"
            />
            {/* Subtle color wash */}
            <div className="absolute inset-0 bg-primary/5 mix-blend-color pointer-events-none" />
          </div>
        </div>

        {/* Text column */}
        <div className="md:col-span-7 md:pl-16 flex flex-col gap-6">
          <span
            className="font-mono uppercase text-primary tracking-[0.28em]"
            style={{ fontSize: '11px', fontWeight: 500 }}
          >
            About Me
          </span>

          <h2
            className="text-on-surface font-semibold leading-tight tracking-tight"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.03em' }}
          >
            Precision as a standard,&nbsp;
            <br className="hidden md:block" />
            innovation as a requirement.
          </h2>

          <p className="text-on-surface-variant leading-relaxed" style={{ fontSize: '17px' }}>
            I am an engineer driven by the intersection of computational
            efficiency and intelligent design. My journey in software engineering
            is defined by a relentless curiosity for how complex systems can be
            simplified through elegant code.
          </p>
          <p className="text-on-surface-variant leading-relaxed" style={{ fontSize: '17px' }}>
            Specializing in AI/ML architectures and Cloud&nbsp;Native
            development, I focus on building products that aren&rsquo;t just
            functional, but architecturally sound and scalable for the future.
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/8">
            {[
              { value: '3+', label: 'Years coding' },
              { value: '12+', label: 'Projects shipped' },
              { value: '4×', label: "Dean's List" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span
                  className="text-primary font-bold"
                  style={{ fontSize: '28px', letterSpacing: '-0.04em' }}
                >
                  {value}
                </span>
                <span
                  className="text-on-surface-variant font-mono uppercase tracking-widest"
                  style={{ fontSize: '10px' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
