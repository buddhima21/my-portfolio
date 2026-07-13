import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────
   CustomCursor — Simple & Elegant
   • Inner dot snaps exactly to cursor
   • Outer ring follows with smooth lag
   • Hover effect scales the outer ring
───────────────────────────────────────────────────────────── */

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, [data-cursor]";

export default function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef  = useRef(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot  = dotRef.current;
    if (!ring || !dot) return;

    document.body.classList.add("custom-cursor-active");

    let mouseX = -300, mouseY = -300;
    let ringX  = -300, ringY  = -300;
    let visible = false;
    let hovering = false;
    let pressing = false;
    let raf;

    function tick() {
      raf = requestAnimationFrame(tick);

      // Lerp for smooth ring following
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      // Snappy dot
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${hovering ? 0 : 1})`;
      
      // Ring transform
      const scale = pressing ? 0.8 : (hovering ? 1.5 : 1);
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;
    }
    raf = requestAnimationFrame(tick);

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        ringX = mouseX;
        ringY = mouseY;
        visible = true;
        ring.style.opacity = "1";
        dot.style.opacity  = "1";
      }
    };
    
    const onLeave = () => {
      visible = false;
      ring.style.opacity = "0";
      dot.style.opacity  = "0";
    };
    
    const onEnter = () => {
      visible = true;
      ring.style.opacity = "1";
      dot.style.opacity  = "1";
    };
    
    const onDown = () => { pressing = true; };
    const onUp   = () => { pressing = false; };

    function attachHover(el) {
      el._mEnter = () => {
        hovering = true;
        ring.style.backgroundColor = "rgba(99, 102, 241, 0.1)"; // Very subtle accent fill
        ring.style.borderColor = "rgba(99, 102, 241, 0.8)";
      };
      el._mLeave = () => {
        hovering = false;
        ring.style.backgroundColor = "transparent";
        ring.style.borderColor = "rgba(255, 255, 255, 0.4)";
      };
      el.addEventListener("mouseenter", el._mEnter);
      el.addEventListener("mouseleave", el._mLeave);
    }

    function detach(el) {
      if (el._mEnter) el.removeEventListener("mouseenter", el._mEnter);
      if (el._mLeave) el.removeEventListener("mouseleave", el._mLeave);
    }

    function refresh() {
      document.querySelectorAll(INTERACTIVE).forEach(el => { detach(el); attachHover(el); });
    }
    refresh();

    const mo = new MutationObserver(refresh);
    mo.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove",  onMove,  { passive: true });
    window.addEventListener("mouseleave", onLeave, { passive: true });
    window.addEventListener("mouseenter", onEnter, { passive: true });
    window.addEventListener("mousedown",  onDown,  { passive: true });
    window.addEventListener("mouseup",    onUp,    { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
      document.querySelectorAll(INTERACTIVE).forEach(detach);
    };
  }, []);

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position:      "fixed",
          width:         "32px",
          height:        "32px",
          borderRadius:  "50%",
          border:        "1.5px solid rgba(255, 255, 255, 0.4)",
          background:    "transparent",
          pointerEvents: "none",
          zIndex:        99998,
          left:          "0",
          top:           "0",
          opacity:       0,
          willChange:    "transform",
          transition:    "background-color 0.3s ease, border-color 0.3s ease, opacity 0.3s ease",
        }}
      />

      {/* Inner Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position:      "fixed",
          width:         "6px",
          height:        "6px",
          borderRadius:  "50%",
          background:    "rgba(255, 255, 255, 0.9)",
          pointerEvents: "none",
          zIndex:        99999,
          left:          "0",
          top:           "0",
          opacity:       0,
          willChange:    "transform",
          transition:    "transform 0.3s ease, opacity 0.3s ease",
        }}
      />
    </>
  );
}
