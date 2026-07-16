import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./useGSAP";

/* ─────────────────────────────────────────────────────────────
   useLenis — buttery smooth momentum scroll
   Bridges Lenis position into GSAP ScrollTrigger so that all
   ScrollTrigger animations fire at the correct scroll position
   even when Lenis intercepts native scroll events.
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

    // ── Bridge: forward Lenis scroll position into GSAP ScrollTrigger ──
    lenis.on("scroll", ScrollTrigger.update);

    // ── Feed Lenis into GSAP's ticker so both run on the same RAF ──
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // ── Proxy: tell ScrollTrigger to read scroll from Lenis ──
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    // Forward lenis scroll events so IntersectionObserver / FloatingProfileCard still fire.
    let dispatching = false;
    lenis.on("scroll", () => {
      if (dispatching) return;
      dispatching = true;
      window.dispatchEvent(new Event("scroll", { bubbles: false }));
      dispatching = false;
    });

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
      gsap.ticker.remove(lenis.raf);
      ScrollTrigger.scrollerProxy(null);
      lenis.destroy();
    };
  }, []);
}
