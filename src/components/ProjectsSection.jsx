/**
 * ProjectsSection — 2×2 equal glassmorphism card grid.
 *
 * Update the PROJECTS array with your own data. Each project supports:
 *   title, description, tags[], image, imageAlt, sourceUrl, liveUrl, accent
 *
 * accent: a CSS color used for the card's glow and tag highlight
 */

import { useEffect, useRef, useState } from 'react';
import ProjectModal from './ProjectModal';
import { gsap } from '../hooks/useGSAP';

// Project cover images — hosted CDN (no local large files)
const rentEaseImg      = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&auto=format&fit=crop&q=70';
const renteaseAppImg   = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&auto=format&fit=crop&q=70';
const smileDentalImg   = 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=900&auto=format&fit=crop&q=70';

// RentEase gallery — lightweight CDN
const rentEaseImg1 = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=65';
const rentEaseImg2 = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=65';
const rentEaseImg3 = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=65';
const rentEaseImg4 = 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop&q=65';
const rentEaseImg5 = 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop&q=65';
const rentEaseImg6 = 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&auto=format&fit=crop&q=65';
const rentEaseImg7 = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=65';
const rentEaseImg8 = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=65';

const PROJECTS = [
  {
    id: 'rentease',
    title: 'RentEase',
    emoji: '🏠',
    description:
      'A full-stack rental property management platform serving tenants, property owners, and administrators. Features interactive map-based listings, maintenance request workflows, secure JWT authentication, real-time notifications, and an AI chatbot.',
    details: (
      <div className="space-y-4 text-on-surface-variant text-sm md:text-base leading-relaxed">
        <p>
          RentEase is a modern, full-stack rental property management platform designed to revolutionize the way tenants, property owners, and administrators interact with real estate. Moving beyond traditional listings, it integrates intelligent automation and interactive tools to create a seamless, end-to-end rental experience.
        </p>
        <p>
          At its core, RentEase features a robust Property Listing and Lifecycle Management module. Users can explore available properties through an intuitive, location-aware map interface, making property discovery both visual and highly contextual. 
        </p>
        <p>
          To further enhance the user experience, the platform integrates an AI-powered chatbot that acts as a virtual assistant, helping users find their ideal homes based on natural language queries and preferences.
        </p>
        <div className="mt-4">
          <strong className="text-on-surface text-base">🔹 Key Features:</strong>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Interactive map-based property visualization for location-aware browsing 📍</li>
            <li>AI-powered virtual assistant for intelligent property discovery 🤖</li>
            <li>Comprehensive admin moderation workflows for property approvals</li>
            <li>Secure authentication and authorization using JWT with Role-Based Access Control (Admin, Owner, Tenant) 🔐</li>
            <li>End-to-end digital lifecycle: from booking to agreement management and maintenance requests</li>
          </ul>
        </div>
        <div className="mt-4">
          <strong className="text-on-surface text-base">🔹 Technologies Used:</strong>
          <p className="mt-1">React, Spring Boot, MongoDB, REST APIs, JWT Authentication, AI API Integration, Map Integration</p>
        </div>
        <p className="italic mt-4 border-l-2 border-primary/50 pl-4 py-1 text-on-surface/80">
          Built with scalability and user-centric design in mind, RentEase bridges the gap between property management workflows and modern consumer expectations.
        </p>
      </div>
    ),
    tags: ['React', 'Vite', 'Spring Boot', 'MongoDB', 'Tailwind CSS'],
    image: rentEaseImg,
    gallery: [
      rentEaseImg1,
      rentEaseImg2,
      rentEaseImg3,
      rentEaseImg4,
      rentEaseImg5,
      rentEaseImg6,
      rentEaseImg7,
      rentEaseImg8,
    ],
    imageAlt: 'RentEase — full-stack rental property management platform',
    sourceUrl: 'https://github.com/buddhima21/RentEase',
    liveUrl: '#',
    accent: '#6366f1',
  },
  {
    id: 'california-house-price',
    title: 'House Price Prediction',
    emoji: '🏡',
    description:
      'A regression-based ML project to predict California house prices. Trained and compared Linear Regression and Gradient Boosting models, evaluated with MSE, RMSE, and R² metrics on the California Housing Dataset.',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Jupyter'],
    image:
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=900&auto=format&fit=crop',
    imageAlt: 'Aerial view of a California residential neighbourhood',
    sourceUrl: 'https://github.com/buddhima21/California-House-Price-Prediction',
    liveUrl: '#',
    accent: '#06b6d4',
  },
  {
    id: 'rentease-mobile',
    title: 'RentEase Mobile',
    emoji: '📱',
    description:
      'A full-stack mobile rental management system built with React Native and a MERN backend. Covers the full rental lifecycle — listings, bookings, digital agreements, wallet payments, maintenance requests, and push notifications.',
    tags: ['React Native', 'Expo', 'Node.js', 'Express.js', 'MongoDB'],
    image: renteaseAppImg,
    imageAlt: 'RentEase Mobile App — full-stack mobile rental management system',
    sourceUrl: 'https://github.com/buddhima21/RentEase-Mobile-App',
    liveUrl: '#',
    accent: '#a78bfa',
  },
  {
    id: 'smile-dental',
    title: 'Smile Dental',
    emoji: '🦷',
    description:
      'A full-stack web-based Dental Management System to digitize and streamline clinic operations. Provides a centralized platform for managing patient records, appointment scheduling, billing, and inventory tracking with role-based dashboards. Secured with JWT & Spring Security across 6 user roles.',
    tags: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'MySQL', 'HTML', 'CSS'],
    image: smileDentalImg,
    imageAlt: 'Smile Dental — web-based dental clinic management system',
    sourceUrl: 'https://github.com/buddhima21',
    liveUrl: '#',
    accent: '#10b981',
  },
];

/* ─── Stagger delays for card reveal ─────────────────────── */
const STAGGER_DELAYS = ['0ms', '120ms', '240ms', '360ms'];

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const cardRefs = useRef([]);
  const [selectedProject, setSelectedProject] = useState(null);

  /* ── GSAP: staggered card entrances from alternating sides ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Header */
      if (headerRef.current) {
        gsap.fromTo(headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.14, ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
      /* Cards — alternate left/right */
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const xFrom = i % 2 === 0 ? -80 : 80;
        gsap.fromTo(card,
          { opacity: 0, x: xFrom, y: 20 },
          {
            opacity: 1, x: 0, y: 0,
            duration: 0.85,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* ── Mouse-tilt effect on each card ─────────────────────── */
  useEffect(() => {
    const cards = cardRefs.current;

    const handlers = cards.map((card) => {
      if (!card) return {};

      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotY = ((x - cx) / cx) * 6;   // max ±6deg
        const rotX = -((y - cy) / cy) * 4;  // max ±4deg

        card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(6px)`;

        // move radial spotlight
        const pctX = (x / rect.width) * 100;
        const pctY = (y / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${pctX}%`);
        card.style.setProperty('--mouse-y', `${pctY}%`);
      };

      const onLeave = () => {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)';
      };

      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);

      return { card, onMove, onLeave };
    });

    return () => {
      handlers.forEach(({ card, onMove, onLeave }) => {
        if (card) {
          card.removeEventListener('mousemove', onMove);
          card.removeEventListener('mouseleave', onLeave);
        }
      });
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-40 px-6 md:px-20 section-sep"
      aria-label="Featured projects"
    >
      <div className="max-w-container-max mx-auto">

        {/* ── Header ────────────────────────────── */}
        <div ref={headerRef} className="mb-16 text-center">
          <span
            className="font-mono uppercase text-primary tracking-[0.28em]"
            style={{ fontSize: '11px', fontWeight: 600 }}
          >
            Selection
          </span>
          <h2
            className="font-heading text-on-surface font-semibold mt-3"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.02em' }}
          >
            Featured Projects
          </h2>
          <p
            className="mt-4 max-w-xl mx-auto"
            style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}
          >
            A curated selection of work spanning full-stack web, mobile, and machine learning.
          </p>
        </div>

        {/* ── 2×2 Grid ───────────────────────────────────────── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          style={{ perspective: '1200px' }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              {...project}
              delay={STAGGER_DELAYS[i]}
              cardRef={(el) => (cardRefs.current[i] = el)}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* ── Modal ────────────────────────────────────────────── */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
}

/* ─── Individual Glass Card ────────────────────────────────── */
function ProjectCard({
  id, title, emoji, description, tags, image, imageAlt,
  sourceUrl, liveUrl, accent, delay, cardRef, onClick
}) {
  return (
    <article
      ref={cardRef}
      onClick={onClick}
      aria-labelledby={`project-${id}`}
      className="project-glass-card group"
      style={{
        '--accent': accent,
        transitionDelay: delay,
        transition: 'transform 0.25s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s ease',
        willChange: 'transform',
        borderRadius: '20px',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid rgba(255,255,255,0.08)',
        borderTop: '1px solid rgba(255,255,255,0.15)',
        background: 'rgba(14,14,22,0.55)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
        cursor: 'pointer',
        minHeight: '420px',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 1.5px ${accent}55, 0 20px 60px rgba(0,0,0,0.5), 0 0 80px ${accent}18`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.35)';
      }}
    >
      {/* Radial spotlight (follows mouse via CSS var) */}
      <div
        className="pointer-events-none"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(500px circle at var(--mouse-x,50%) var(--mouse-y,50%), color-mix(in srgb, var(--accent) 12%, transparent), transparent 60%)',
          zIndex: 1,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Shimmer sweep on hover */}
      <div
        className="pointer-events-none group-hover:opacity-100"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.045) 50%, transparent 70%)',
          backgroundSize: '200% 100%',
          backgroundPosition: '100% 0',
          animation: 'none',
          zIndex: 2,
          opacity: 0,
          transition: 'opacity 0.4s ease',
        }}
        ref={(el) => {
          if (!el) return;
          const card = el.parentElement;
          card.addEventListener('mouseenter', () => {
            el.style.opacity = '1';
            el.style.animation = 'shimmerSweep 0.7s ease forwards';
          });
          card.addEventListener('mouseleave', () => {
            el.style.opacity = '0';
            el.style.animation = 'none';
          });
        }}
      />

      {/* ── Image ────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          height: '200px',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.7s cubic-bezier(0.23,1,0.32,1)',
          }}
          className="group-hover:scale-110"
        />
        {/* Bottom gradient fade into card body */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 35%, rgba(14,14,22,0.98) 100%)',
          }}
        />

        {/* Accent top-left corner glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '120px',
            height: '120px',
            background: `radial-gradient(circle at top left, ${accent}55 0%, transparent 70%)`,
            opacity: 0.6,
            pointerEvents: 'none',
          }}
        />

        {/* Floating tag — top right of image */}
        <div
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            padding: '5px 12px',
            borderRadius: '100px',
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${accent}44`,
            color: accent,
            fontSize: '11px',
            fontFamily: 'JetBrains Mono, Fira Code, monospace',
            fontWeight: 600,
            letterSpacing: '0.08em',
            zIndex: 3,
          }}
        >
          {emoji} {tags[0]}
        </div>
      </div>

      {/* ── Card Body ────────────────────────────────────────── */}
      <div
        style={{
          padding: '22px 24px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          flex: 1,
          position: 'relative',
          zIndex: 3,
        }}
      >
        {/* Title */}
        <h3
          id={`project-${id}`}
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            color: 'rgba(255,255,255,0.95)',
            lineHeight: 1.2,
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: '13.5px',
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.7,
            flex: 1,
          }}
        >
          {description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontFamily: 'JetBrains Mono, Fira Code, monospace',
                fontWeight: 500,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.09)',
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: '0.04em',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, rgba(255,255,255,0.08), transparent)',
            marginTop: '4px',
          }}
        />

        {/* Links */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`View source code for ${title}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              fontFamily: 'JetBrains Mono, Fira Code, monospace',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.5)',
              transition: 'color 0.2s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>code</span>
            Source
          </a>

          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`View live demo for ${title}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              fontFamily: 'JetBrains Mono, Fira Code, monospace',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.5)',
              transition: 'color 0.2s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>open_in_new</span>
            Live
          </a>

          {/* Arrow button — accent coloured */}
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Open ${title}`}
            style={{
              marginLeft: 'auto',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `${accent}18`,
              border: `1px solid ${accent}33`,
              color: accent,
              transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${accent}30`;
              e.currentTarget.style.transform = 'scale(1.1) rotate(-45deg)';
              e.currentTarget.style.boxShadow = `0 0 14px ${accent}44`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${accent}18`;
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_outward</span>
          </a>
        </div>
      </div>
    </article>
  );
}
