import { useState, useEffect } from 'react';

/**
 * Navbar — sticky top navigation bar.
 * Props: none (all data is internal; update NAV_LINKS to your sections).
 */

const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Contact', href: '#contact' },
];

/* ─── SVG Social Icons ────────────────────────────────────────── */
function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-20 py-4 transition-all duration-500 ${
        scrolled
          ? 'bg-surface/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      {/* Logo / Name */}
      <a
        href="#"
        className="text-headline-lg font-bold tracking-tight text-on-surface hover:text-primary transition-colors duration-300"
        style={{ fontSize: '20px', letterSpacing: '-0.02em' }}
      >
        BUDDHIMA HEWAGE
      </a>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="nav-link text-body-md text-on-surface-variant hover:text-on-surface transition-colors duration-300"
            style={{ fontSize: '15px' }}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Action Group: Socials + Resume */}
      <div className="hidden md:flex items-center gap-6">
        <div className="flex items-center gap-4 border-r border-white/10 pr-6 mr-1">
          <a
            href="https://github.com/Buddhima21"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-on-surface transition-colors duration-300"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/buddhima-hewage"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-on-surface transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
        </div>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 border border-white/20 hover:border-white/60 hover:bg-white/5 font-mono text-label-caps text-on-surface uppercase tracking-widest transition-all duration-300"
          style={{ fontSize: '11px', letterSpacing: '0.18em' }}
        >
          Resume
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        id="mobile-menu-toggle"
        className="md:hidden flex flex-col gap-1.5 p-2 text-on-surface"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Toggle mobile menu"
        aria-expanded={mobileOpen}
      >
        <span
          className={`block w-6 h-px bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
        />
        <span
          className={`block w-6 h-px bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}
        />
        <span
          className={`block w-6 h-px bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}
        />
      </button>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-x-0 top-[65px] bg-surface/95 backdrop-blur-xl border-b border-white/5 md:hidden transition-all duration-500 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col p-6 gap-6">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="text-on-surface-variant hover:text-on-surface text-lg font-medium transition-colors"
            >
              {label}
            </a>
          ))}
          
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-6 py-3 border border-white/20 text-center font-mono text-label-caps text-on-surface uppercase tracking-widest"
            style={{ fontSize: '11px' }}
          >
            Resume
          </a>

          {/* Social Icons in mobile menu */}
          <div className="flex items-center justify-center gap-8 mt-4 pt-6 border-t border-white/5">
            <a
              href="https://github.com/Buddhima21"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-on-surface transition-colors duration-300 flex items-center gap-2"
              aria-label="GitHub"
            >
              <GitHubIcon /> <span className="text-sm font-medium">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/buddhima-hewage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-on-surface transition-colors duration-300 flex items-center gap-2"
              aria-label="LinkedIn"
            >
              <LinkedInIcon /> <span className="text-sm font-medium">LinkedIn</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
