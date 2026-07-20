import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Preloader — cinematic loading screen
   • Letters drop in one by one
   • Thin gradient progress bar with percentage
   • Dramatic slide-up exit revealing the portfolio beneath
───────────────────────────────────────────────────────────── */

const NAME    = "BUDDHIMA";
const LETTERS = NAME.split("");

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting]   = useState(false);

  useEffect(() => {
    let raf;
    const ANIM_MS = 1500; // minimum display time for the animation
    const start   = performance.now();

    // Tick the progress bar based on elapsed time (up to 90% max before real load)
    function tick(ts) {
      const elapsed = ts - start;
      // Show up to 90% during animation, snap to 100 on real load
      const p = Math.min(Math.round((elapsed / ANIM_MS) * 90), 90);
      setProgress(p);
      if (elapsed < ANIM_MS) {
        raf = requestAnimationFrame(tick);
      }
    }
    raf = requestAnimationFrame(tick);

    // Wait for real page load AND minimum anim time
    const minWait  = new Promise((res) => setTimeout(res, ANIM_MS));
    const loadWait = new Promise((res) => {
      if (document.readyState === 'complete') return res();
      window.addEventListener('load', res, { once: true });
    });

    Promise.all([minWait, loadWait]).then(() => {
      cancelAnimationFrame(raf);
      setProgress(100);
      setTimeout(() => {
        setExiting(true);
        setTimeout(onComplete, 900);
      }, 350);
    });

    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: "-105%",
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "#080810",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "52px",
          }}
        >
          {/* Subtle radial glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.12), transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Name letters */}
          <div
            role="status"
            aria-label="Loading portfolio"
            style={{ display: "flex", gap: "6px", position: "relative", zIndex: 1 }}
          >
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 48, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.15 + i * 0.07,
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "clamp(44px, 9vw, 80px)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  background:
                    "linear-gradient(135deg, #c0c1ff 0%, #a78bfa 48%, #67e8f9 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  userSelect: "none",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontSize: "11px",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              position: "relative",
              zIndex: 1,
              marginTop: "-28px",
            }}
          >
            Software Engineer · Sri Lanka
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            style={{
              position: "relative",
              zIndex: 1,
              width: "min(220px, 55vw)",
            }}
          >
            {/* Track */}
            <div
              style={{
                height: "1px",
                background: "rgba(255,255,255,0.07)",
                borderRadius: "1px",
                overflow: "hidden",
              }}
            >
              {/* Fill */}
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background:
                    "linear-gradient(90deg, #6366f1, #a78bfa 55%, #67e8f9)",
                  borderRadius: "1px",
                  transition: "width 0.1s linear",
                  boxShadow: "0 0 8px rgba(167,139,250,0.5)",
                }}
              />
            </div>

            {/* Percentage */}
            <span
              style={{
                position: "absolute",
                right: 0,
                top: "8px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                color: "rgba(255,255,255,0.2)",
                letterSpacing: "0.05em",
              }}
            >
              {progress}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
