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
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/buddhima-hewage' },
            { label: 'GitHub',   href: 'https://github.com/Buddhima21' },
            { label: 'Email',    href: 'https://mail.google.com/mail/?view=cm&to=buddhimasandaru@gmail.com&su=Hello%20from%20your%20Portfolio' },
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
