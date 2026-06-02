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

      {/* CTA Button */}
      <div className="hidden md:block">
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
        </nav>
      </div>
    </header>
  );
}
