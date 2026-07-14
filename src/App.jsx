import { useEffect, useState } from "react";
import { AnimatePresence }  from "framer-motion";
import { useScrollReveal }  from "./hooks/useScrollReveal";
import { useLenis }         from "./hooks/useLenis";
import Navbar               from "./components/Navbar";
import HeroSection          from "./components/HeroSection";
import AboutSection         from "./components/AboutSection";
import TechStackSection     from "./components/TechStackSection";
import ProjectsSection      from "./components/ProjectsSection";
import TimelineSection      from "./components/TimelineSection";
import ContactSection       from "./components/ContactSection";
import Footer               from "./components/Footer";
import Preloader            from "./components/Preloader";
import CustomCursor         from "./components/CustomCursor";
import LineSidebar          from "./components/LineSidebar";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  // Smooth scroll — Lenis
  useLenis();

  // Scroll-reveal animations (fires after load)
  useScrollReveal(120);



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
    <>
      {/* ── Custom cursor (always on top) ──────────────────── */}
      <CustomCursor />

      {/* ── Cinematic preloader ────────────────────────────── */}
      <AnimatePresence>
        {!loaded && (
          <Preloader key="preloader" onComplete={() => setLoaded(true)} />
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
        <HeroSection />
        <AboutSection />
        <TechStackSection />
        <ProjectsSection />
        <TimelineSection />
        <ContactSection />
      </main>
      <Footer />


    </>
  );
}
