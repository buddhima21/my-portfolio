import { useEffect } from "react";
import Lenis from "lenis";

/* ─────────────────────────────────────────────────────────────
   useLenis — buttery smooth momentum scroll
   Replaces native scroll-behavior with Lenis physics-based
   easing. Works seamlessly with existing scroll events.
───────────────────────────────────────────────────────────── */

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration:    1.25,
      easing:      (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
      orientation: "vertical",
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Forward lenis scroll events so IntersectionObserver / scroll listeners still fire.
    // Guard flag prevents re-entrancy (Lenis scroll → dispatched Event → Lenis scroll → …).
    let dispatching = false;
    lenis.on("scroll", () => {
      if (dispatching) return;
      dispatching = true;
      window.dispatchEvent(new Event("scroll", { bubbles: false }));
      dispatching = false;
    });

    let raf;
    function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    // Allow anchor links (e.g. #projects) to work with Lenis
    document.querySelectorAll("a[href^='#']").forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const id = anchor.getAttribute("href").slice(1);
        const target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: -80, duration: 1.4 });
        }
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}
