/**
 * Footer — Simple three-column footer with name, social links, and copyright.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full px-6 md:px-20 py-8 border-t border-white/5 bg-surface">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Name */}
        <div
          className="font-bold text-on-surface tracking-tight"
          style={{ fontSize: '18px', letterSpacing: '-0.02em' }}
        >
          BUDDHIMA HEWAGE
        </div>

        {/* Social links */}
        <nav aria-label="Social links" className="flex gap-8">
          {[
            { label: 'LinkedIn', href: '#' },
            { label: 'GitHub',   href: '#' },
            { label: 'Twitter',  href: '#' },
            { label: 'Email',    href: 'mailto:hello@buddhima.dev' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="font-mono uppercase text-on-surface-variant hover:text-primary transition-colors duration-300 tracking-widest"
              style={{ fontSize: '11px' }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p
          className="font-mono text-on-surface-variant text-center md:text-right"
          style={{ fontSize: '11px' }}
        >
          © {year} BUDDHIMA HEWAGE. ENGINEERED WITH PRECISION.
        </p>
      </div>
    </footer>
  );
}
