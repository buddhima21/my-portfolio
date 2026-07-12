import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────
   CustomCursor — Magnetic Blob
   • A soft glowing liquid blob that follows the mouse with lag
   • On hover over interactive elements it STRETCHES toward them
     via scaleX/scaleY + skew transform (magnetic pull effect)
   • On mousedown it squishes (squash & stretch)
   • Glow intensifies on hover
   • Inner dot snaps exactly to cursor
   • Hides native cursor via body class
───────────────────────────────────────────────────────────── */

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, [data-cursor]";

export default function CustomCursor() {
  const blobRef = useRef(null);
  const dotRef  = useRef(null);

  useEffect(() => {
    const blob = blobRef.current;
    const dot  = dotRef.current;
    if (!blob || !dot) return;

    document.body.classList.add("custom-cursor-active");

    let mouseX = -300, mouseY = -300;
    let blobX  = -300, blobY  = -300;
    let targetX = -300, targetY = -300; // magnetic pull target
    let visible   = false;
    let hovering  = false;
    let pressing  = false;
    let raf;

    /* ── RAF animation loop ──────────────────────────────── */
    function tick() {
      raf = requestAnimationFrame(tick);

      // Blob lags behind with lerp
      const lerpSpeed = hovering ? 0.10 : 0.14;
      blobX += (mouseX - blobX) * lerpSpeed;
      blobY += (mouseY - blobY) * lerpSpeed;

      // Dot snaps to mouse
      dot.style.left = mouseX + "px";
      dot.style.top  = mouseY + "px";

      // Blob position
      blob.style.left = blobX + "px";
      blob.style.top  = blobY + "px";

      // Magnetic stretch: compute vector from blob to target element center
      if (hovering && targetX !== -300) {
        const dx = (targetX - blobX) * 0.022;
        const dy = (targetY - blobY) * 0.022;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const stretch = 1 + Math.min(dist * 0.8, 0.55);
        const squash  = 1 / Math.sqrt(stretch); // volume preservation

        blob.style.transform = `
          translate(-50%, -50%)
          rotate(${angle}deg)
          scaleX(${pressing ? 0.7 : stretch})
          scaleY(${pressing ? 1.4 : squash})
        `;
      } else if (pressing) {
        blob.style.transform = "translate(-50%, -50%) scale(0.75, 1.3)";
      } else {
        // Gentle idle breathe
        const t = performance.now() * 0.0008;
        const s = 1 + Math.sin(t) * 0.04;
        blob.style.transform = `translate(-50%, -50%) scale(${s}, ${1/s})`;
      }
    }
    raf = requestAnimationFrame(tick);

    /* ── Mouse events ─────────────────────────────────────── */
    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        blobX = mouseX; blobY = mouseY;
        visible = true;
        blob.style.opacity = "1";
        dot.style.opacity  = "1";
      }
    };
    const onLeave = () => {
      visible = false;
      blob.style.opacity = "0";
      dot.style.opacity  = "0";
    };
    const onEnter = () => {
      visible = true;
      blob.style.opacity = "1";
      dot.style.opacity  = "1";
    };
    const onDown  = () => { pressing = true;  };
    const onUp    = () => { pressing = false; };

    /* ── Hover detection ──────────────────────────────────── */
    function attachHover(el) {
      el._mEnter = () => {
        hovering = true;
        const r  = el.getBoundingClientRect();
        targetX  = r.left + r.width  / 2;
        targetY  = r.top  + r.height / 2;
        blob.style.width    = "52px";
        blob.style.height   = "52px";
        blob.style.background = "radial-gradient(circle at 35% 35%, rgba(167,139,250,0.55), rgba(99,102,241,0.25) 60%, transparent)";
        blob.style.boxShadow  = "0 0 22px 8px rgba(139,92,246,0.35), 0 0 60px 20px rgba(99,102,241,0.12)";
        blob.style.border     = "1px solid rgba(167,139,250,0.55)";
      };
      el._mLeave = () => {
        hovering = false;
        targetX  = -300; targetY = -300;
        blob.style.width    = "36px";
        blob.style.height   = "36px";
        blob.style.background = "radial-gradient(circle at 35% 35%, rgba(192,193,255,0.28), rgba(99,102,241,0.12) 60%, transparent)";
        blob.style.boxShadow  = "0 0 14px 4px rgba(99,102,241,0.22), 0 0 40px 12px rgba(99,102,241,0.07)";
        blob.style.border     = "1px solid rgba(192,193,255,0.30)";
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
      {/* Magnetic blob */}
      <div
        ref={blobRef}
        aria-hidden="true"
        style={{
          position:      "fixed",
          width:         "36px",
          height:        "36px",
          borderRadius:  "50%",
          background:    "radial-gradient(circle at 35% 35%, rgba(192,193,255,0.28), rgba(99,102,241,0.12) 60%, transparent)",
          border:        "1px solid rgba(192,193,255,0.30)",
          boxShadow:     "0 0 14px 4px rgba(99,102,241,0.22), 0 0 40px 12px rgba(99,102,241,0.07)",
          pointerEvents: "none",
          zIndex:        99998,
          left:          "-300px",
          top:           "-300px",
          opacity:       0,
          willChange:    "transform, left, top, width, height",
          /* smooth width/height/glow transitions only — transform is set each frame */
          transition:    "width 0.35s cubic-bezier(0.23,1,0.32,1), height 0.35s cubic-bezier(0.23,1,0.32,1), background 0.3s ease, box-shadow 0.3s ease, border 0.3s ease, opacity 0.2s ease",
        }}
      />

      {/* Precise inner dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position:      "fixed",
          width:         "5px",
          height:        "5px",
          borderRadius:  "50%",
          background:    "rgba(220,221,255,0.95)",
          boxShadow:     "0 0 5px rgba(192,193,255,0.9)",
          pointerEvents: "none",
          zIndex:        99999,
          transform:     "translate(-50%, -50%)",
          left:          "-300px",
          top:           "-300px",
          opacity:       0,
          transition:    "opacity 0.2s ease",
        }}
      />
    </>
  );
}
