import { useEffect, useRef, useState } from "react";
import { AnimatePresence }             from "framer-motion";
import { useScrollReveal }             from "./hooks/useScrollReveal";
import { useLenis }                    from "./hooks/useLenis";
import Navbar                          from "./components/Navbar";
import HeroSection                     from "./components/HeroSection";
import AboutSection                    from "./components/AboutSection";
import TechStackSection                from "./components/TechStackSection";
import ProjectsSection                 from "./components/ProjectsSection";
import TimelineSection                 from "./components/TimelineSection";
import ContactSection                  from "./components/ContactSection";
import Footer                          from "./components/Footer";
import FloatingProfileCard             from "./components/FloatingProfileCard";
import Preloader                       from "./components/Preloader";
import CustomCursor                    from "./components/CustomCursor";
import LineSidebar                     from "./components/LineSidebar";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  // Smooth scroll — Lenis
  useLenis();

  // Scroll-reveal animations (fires after load)
  useScrollReveal(120);

  /* Refs for the two anchor positions the floating card transitions between */
  const heroAnchorRef  = useRef(null);
  const aboutAnchorRef = useRef(null);

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
        className={`fixed left-4 xl:left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block transition-all duration-500 ease-in-out ${
          activeSection === 0 ? 'opacity-0 -translate-x-10 pointer-events-none' : 'opacity-100 translate-x-0'
        }`}
      >
        <LineSidebar
          items={['Hero', 'About', 'Tech Stack', 'Projects', 'Timeline', 'Contact']}
          activeIndex={activeSection}
          accentColor="#6366f1"
          textColor="#a1a1aa"
          markerColor="#3f3f46"
          showIndex={true}
          showMarker={true}
          proximityRadius={0}
          fontSize={0.7}
          markerLength={20}
          maxShift={10}
          itemGap={10}
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
        <HeroSection  heroAnchorRef={heroAnchorRef} />
        <AboutSection aboutAnchorRef={aboutAnchorRef} />
        <TechStackSection />
        <ProjectsSection />
        <TimelineSection />
        <ContactSection />
      </main>
      <Footer />

      {/* Floating profile card — portal, transitions between hero and about */}
      <FloatingProfileCard
        heroAnchorRef={heroAnchorRef}
        aboutAnchorRef={aboutAnchorRef}
      />
    </>
  );
}
