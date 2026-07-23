import { useEffect, useRef, useState, useCallback, lazy, Suspense } from "react";
import { AnimatePresence }  from "framer-motion";
import { useLenis }         from "./hooks/useLenis";
import { gsap, ScrollTrigger } from "./hooks/useGSAP";
import Navbar               from "./components/Navbar";
import HeroSection          from "./components/HeroSection";
import AboutSection         from "./components/AboutSection";
import TechStackSection     from "./components/TechStackSection";
import TimelineSection      from "./components/TimelineSection";
import Footer               from "./components/Footer";
import Preloader            from "./components/Preloader";
import LineSidebar          from "./components/LineSidebar";
import FloatingProfileCard  from "./components/FloatingProfileCard";
import ClickSpark           from "./components/ClickSpark";

// Heavy sections — loaded on demand (code-split chunks)
const ProjectsSection = lazy(() => import("./components/ProjectsSection"));
const ContactSection  = lazy(() => import("./components/ContactSection"));

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  // Only animate the floating card on desktop (≥ 768px) — reactive
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const handler = (e) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Refs for FloatingProfileCard anchors
  const heroAnchorRef  = useRef(null);
  const aboutAnchorRef = useRef(null);

  // Smooth scroll — Lenis
  useLenis();

  // Stable callback for Preloader — avoids re-registering the load listener
  const handlePreloaderComplete = useCallback(() => setLoaded(true), []);

  // Global section entrance animations (fade + lift per section)
  useEffect(() => {
    // Wait a tick so all sections are mounted
    const timer = setTimeout(() => {
      const sections = document.querySelectorAll('section:not(#hero)');
      sections.forEach((sec) => {
        gsap.fromTo(
          sec,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [loaded]);



  // Global mouse-follow glow for glass cards
  useEffect(() => {
    const handler = (e) => {
      document.querySelectorAll(".glass-card").forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      });
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  // Track active section for LineSidebar
  useEffect(() => {
    const sections = ['hero', 'about', 'techstack', 'projects', 'timeline', 'contact'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.indexOf(entry.target.id);
            if (index !== -1) setActiveSection(index);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" } // Triggers when section is near the middle of the viewport
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loaded]);

  return (
    <ClickSpark
      sparkColor="#c0c1ff"
      sparkSize={10}
      sparkRadius={20}
      sparkCount={8}
      duration={500}
    >
      {/* ── Cinematic preloader ────────────────────────────── */}
      <AnimatePresence>
        {!loaded && (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      {/* ── Main portfolio ─────────────────────────────────── */}
      <Navbar />
      
      {/* ── Side Navigation (Desktop only) ─────────────────── */}
      <div 
        style={{
          position: 'fixed',
          left: '12px',
          top: '50%',
          transform: activeSection === 0
            ? 'translateY(-50%) translateX(-60px)'
            : 'translateY(-50%) translateX(0)',
          zIndex: 40,
          opacity: activeSection === 0 ? 0 : 1,
          pointerEvents: activeSection === 0 ? 'none' : 'auto',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
        className="hidden lg:block"
      >
        <LineSidebar
          items={['Hero', 'About', 'Tech Stack', 'Projects', 'Timeline', 'Contact']}
          activeIndex={activeSection}
          accentColor="#6366f1"
          textColor="#52525b"
          markerColor="#27272a"
          showIndex={false}
          showMarker={true}
          proximityRadius={80}
          fontSize={0.65}
          markerLength={24}
          markerGap={6}
          maxShift={8}
          itemGap={14}
          tickScale={0.4}
          onItemClick={(index) => {
            const sections = ['hero', 'about', 'techstack', 'projects', 'timeline', 'contact'];
            const target = document.getElementById(sections[index]);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />
      </div>

      <main>
        <HeroSection heroAnchorRef={heroAnchorRef} />
        <AboutSection aboutAnchorRef={aboutAnchorRef} />
        <TechStackSection />
        <Suspense fallback={null}>
          <ProjectsSection />
        </Suspense>
        <TimelineSection />
        <Suspense fallback={null}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />

      {/* ── Floating profile card — desktop only (no RAF waste on mobile) ─── */}
      {!isMobile && (
        <FloatingProfileCard
          heroAnchorRef={heroAnchorRef}
          aboutAnchorRef={aboutAnchorRef}
        />
      )}


    </ClickSpark>
  );
}
