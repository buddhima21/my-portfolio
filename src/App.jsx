import { useEffect, useRef } from 'react';
import { useScrollReveal }  from './hooks/useScrollReveal';
import Navbar               from './components/Navbar';
import HeroSection          from './components/HeroSection';
import AboutSection         from './components/AboutSection';
import TechStackSection     from './components/TechStackSection';
import ProjectsSection      from './components/ProjectsSection';
import TimelineSection      from './components/TimelineSection';
import ContactSection       from './components/ContactSection';
import Footer               from './components/Footer';
import FloatingProfileCard  from './components/FloatingProfileCard';

export default function App() {
  // Activate scroll-reveal animations
  useScrollReveal(120);

  /* Refs for the two anchor positions the floating card transitions between */
  const heroAnchorRef  = useRef(null);
  const aboutAnchorRef = useRef(null);

  // Global mouse-follow glow for glass cards
  useEffect(() => {
    const handler = (e) => {
      document.querySelectorAll('.glass-card').forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection  heroAnchorRef={heroAnchorRef} />
        <AboutSection aboutAnchorRef={aboutAnchorRef} />
        <TechStackSection />
        <ProjectsSection />
        <TimelineSection />
        <ContactSection />
      </main>
      <Footer />

      {/* Floating profile card — rendered as a portal, transitions between hero and about */}
      <FloatingProfileCard
        heroAnchorRef={heroAnchorRef}
        aboutAnchorRef={aboutAnchorRef}
      />
    </>
  );
}
