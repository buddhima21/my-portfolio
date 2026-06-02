import ShaderBackground from './ShaderBackground';
import ThreeCanvas from './ThreeCanvas';

/**
 * HeroSection — Full-viewport hero with WebGL shader background,
 * Three.js 3-D visualization, and animated headline.
 *
 * Props (all optional — update to match your own content):
 *   tagline   {string}  Small caps text above headline
 *   headline  {string}  Primary display headline
 *   ctaPrimary   { label, href }
 *   ctaSecondary { label, href }
 */
export default function HeroSection({
  tagline = 'Software Engineering Undergraduate',
  headline = 'Building Scalable Software, Intelligent Systems, and Cloud Solutions',
  ctaPrimary  = { label: 'View Projects', href: '#projects' },
  ctaSecondary = { label: 'Contact Me',   href: '#contact'  },
}) {
  return (
    <section
      id="hero"
      className="relative w-full h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* ── WebGL Shader Background ─────────────────────── */}
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        <ShaderBackground className="absolute inset-0 w-full h-full" />
      </div>

      {/* ── Radial gradient overlay ─────────────────────── */}
      <div className="absolute inset-0 hero-gradient pointer-events-none" />

      {/* ── Vignette edges ──────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, #131315 100%)',
        }}
      />

      {/* ── Content grid ────────────────────────────────── */}
      <div className="relative z-10 container mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 items-center gap-12">

        {/* Left — Text block */}
        <div className="flex flex-col gap-6 max-w-2xl">
          {/* Tagline */}
          <p
            className="font-mono uppercase text-primary tracking-[0.28em]"
            style={{ fontSize: '11px', fontWeight: 500 }}
          >
            {tagline}
          </p>

          {/* Headline */}
          <h1
            className="text-on-surface font-bold leading-[1.05] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}
          >
            {headline}
          </h1>

          {/* Subtitle */}
          <p
            className="text-on-surface-variant max-w-lg"
            style={{ fontSize: '17px', lineHeight: '1.7' }}
          >
            Driven by the intersection of computational efficiency and
            intelligent design — turning complex problems into elegant,
            scalable systems.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              id="hero-cta-primary"
              href={ctaPrimary.href}
              className="px-8 py-4 bg-on-surface text-surface font-mono uppercase tracking-widest text-xs hover:opacity-90 active:scale-95 transition-all duration-200"
            >
              {ctaPrimary.label}
            </a>
            <a
              id="hero-cta-secondary"
              href={ctaSecondary.href}
              className="px-8 py-4 border border-white/15 hover:border-white/50 hover:bg-white/5 font-mono uppercase tracking-widest text-xs backdrop-blur-sm transition-all duration-300"
            >
              {ctaSecondary.label}
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="hidden md:flex items-center gap-3 pt-8 text-on-surface-variant">
            <div className="w-px h-10 bg-white/20 animate-pulse" />
            <span
              className="font-mono uppercase tracking-[0.2em] opacity-60"
              style={{ fontSize: '10px' }}
            >
              Scroll to explore
            </span>
          </div>
        </div>

        {/* Right — Three.js visualization */}
        <div className="hidden md:block relative h-[580px]">
          <ThreeCanvas className="absolute inset-0 w-full h-full" />
        </div>
      </div>
    </section>
  );
}
