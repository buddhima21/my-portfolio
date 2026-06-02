import { useEffect } from 'react';

/**
 * useScrollReveal — Adds the `active` class to elements with `.reveal`
 * when they scroll into the viewport.
 *
 * @param {number} threshold  px from bottom of viewport to trigger (default 120)
 */
export function useScrollReveal(threshold = 120) {
  useEffect(() => {
    function check() {
      document.querySelectorAll('.reveal').forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - threshold) {
          el.classList.add('active');
        }
      });
    }

    // Use IntersectionObserver when available (more performant)
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
              observer.unobserve(entry.target); // fire once
            }
          });
        },
        { rootMargin: `0px 0px -${threshold}px 0px` },
      );

      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }

    // Fallback: scroll listener
    window.addEventListener('scroll', check, { passive: true });
    check(); // run on mount
    return () => window.removeEventListener('scroll', check);
  }, [threshold]);
}
