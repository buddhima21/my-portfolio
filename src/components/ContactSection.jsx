/**
 * ContactSection — Minimal, dramatic CTA with email link.
 * Update EMAIL and AVAILABILITY to match your own details.
 */

const EMAIL        = 'hello@buddhima.dev';
const AVAILABILITY = 'Currently open to internship opportunities, research collaborations, and open-source contributions.';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-40 px-6 md:px-20 reveal"
      aria-label="Contact"
    >
      <div className="max-w-container-max mx-auto flex flex-col items-center text-center gap-8">

        <span
          className="font-mono uppercase text-primary tracking-[0.28em]"
          style={{ fontSize: '11px', fontWeight: 500 }}
        >
          Connect
        </span>

        <h2
          className="text-on-surface font-bold leading-[1.05]"
          style={{ fontSize: 'clamp(40px, 8vw, 72px)', letterSpacing: '-0.04em' }}
        >
          Ready to build
          <br className="hidden md:block" />
          the future?
        </h2>

        <p
          className="text-on-surface-variant max-w-xl leading-relaxed"
          style={{ fontSize: '17px' }}
        >
          {AVAILABILITY}
        </p>

        {/* Email link — hero-sized, hover animates color */}
        <div className="pt-6 group">
          <a
            id="contact-email-link"
            href={`mailto:${EMAIL}`}
            className="text-on-surface group-hover:text-primary transition-colors duration-500 font-semibold block"
            style={{
              fontSize: 'clamp(24px, 4vw, 48px)',
              letterSpacing: '-0.03em',
              textDecoration: 'none',
            }}
          >
            {EMAIL}
          </a>
          <div className="h-px bg-on-surface group-hover:bg-primary transition-colors duration-500 mt-1" />
        </div>

        {/* Social links */}
        <div className="flex gap-8 pt-4">
          {[
            { label: 'LinkedIn',  href: '#' },
            { label: 'GitHub',    href: '#' },
            { label: 'Twitter',   href: '#' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono uppercase text-on-surface-variant hover:text-primary transition-colors duration-300 tracking-widest"
              style={{ fontSize: '11px' }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
