import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

/* ─── helpers ─────────────────────────────────────────────── */
const TABS = ['Overview', 'Tech Stack', 'Features'];

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}

/* ─── Main Modal ───────────────────────────────────────────── */
export default function ProjectModal({ project, onClose }) {
  const [activeTab, setActiveTab]   = useState(0);
  const [galleryIdx, setGalleryIdx] = useState(0);

  /* Lock body scroll */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* Escape to close */
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);
  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  if (!project) return null;

  const { title, emoji, description, details, tags, image, gallery, imageAlt, sourceUrl, liveUrl, accent } = project;
  const images = gallery?.length ? gallery : [image];
  const hasLive = liveUrl && liveUrl !== '#';
  const hasSrc  = sourceUrl && sourceUrl !== '#';

  /* ── Tab content ── */
  const tabContent = {
    0: (
      <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', lineHeight: 1.85 }}>
        {details ? (
          <div className="project-details-content">{details}</div>
        ) : (
          <p>{description}</p>
        )}
      </div>
    ),
    1: (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {tags.map((tag, i) => (
          <span
            key={tag}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '12px',
              fontFamily: 'JetBrains Mono, Fira Code, monospace',
              fontWeight: 600,
              letterSpacing: '0.06em',
              background: `${accent}12`,
              border: `1px solid ${accent}30`,
              color: accent,
              animation: `fadeUp 0.4s ${i * 0.06}s both`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    ),
    2: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Extract bullet points from description for the features tab */}
        {description.split('. ').filter(s => s.trim()).map((feat, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: '14px',
              alignItems: 'flex-start',
              animation: `fadeUp 0.4s ${i * 0.07}s both`,
            }}
          >
            <span style={{
              flexShrink: 0,
              marginTop: '4px',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: `${accent}20`,
              border: `1px solid ${accent}50`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: accent, display: 'block' }} />
            </span>
            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', lineHeight: 1.75 }}>
              {feat.trim().replace(/\.$/, '')}.
            </span>
          </div>
        ))}
      </div>
    ),
  };

  return createPortal(
    <AnimatePresence>
      {/* ── Backdrop ── */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          background: 'rgba(4,4,10,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
        aria-hidden="true"
      />

      {/* ── Panel ── */}
      <motion.div
        key="panel"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 38, mass: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          maxHeight: '92dvh',
          borderRadius: '24px 24px 0 0',
          background: '#0b0b14',
          border: '1px solid rgba(255,255,255,0.08)',
          borderBottom: 'none',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: `0 -20px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04), 0 -2px 0 ${accent}55`,
        }}
      >
        {/* Top accent line */}
        <div style={{
          position: 'absolute',
          top: 0, left: '15%', right: '15%',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${accent}80 40%, ${accent}80 60%, transparent)`,
          zIndex: 10,
        }} />

        {/* Drag handle */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '40px',
          height: '4px',
          borderRadius: '2px',
          background: 'rgba(255,255,255,0.15)',
          zIndex: 10,
        }} />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 20,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s, color 0.2s',
            backdropFilter: 'blur(8px)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        {/* ── Inner scroll container ── */}
        <div style={{ overflowY: 'auto', flex: 1 }} data-lenis-prevent="true">

          {/* ── Two-panel layout (stacked on mobile, side-by-side on md+) ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', minHeight: '60dvh' }} className="md-panel-grid">

            {/* LEFT — Image Gallery */}
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: '280px', background: '#050508' }}>
              {/* Ambient glow from accent */}
              <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${accent}22, transparent 70%)`,
                zIndex: 1, pointerEvents: 'none',
              }} />

              {/* Image */}
              <motion.img
                key={galleryIdx}
                src={images[galleryIdx]}
                alt={imageAlt}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                  minHeight: '280px',
                }}
              />

              {/* Bottom fade */}
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: '100px',
                background: 'linear-gradient(to top, #0b0b14, transparent)',
                zIndex: 2,
              }} />

              {/* Gallery dots (if multiple images) */}
              {images.length > 1 && (
                <div style={{
                  position: 'absolute', bottom: '16px', left: 0, right: 0,
                  display: 'flex', justifyContent: 'center', gap: '7px', zIndex: 5,
                }}>
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setGalleryIdx(i)}
                      aria-label={`View image ${i + 1}`}
                      style={{
                        width: galleryIdx === i ? '24px' : '7px',
                        height: '7px',
                        borderRadius: '4px',
                        background: galleryIdx === i ? accent : 'rgba(255,255,255,0.25)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'width 0.3s ease, background 0.3s ease',
                        padding: 0,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Arrow controls */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setGalleryIdx(i => (i - 1 + images.length) % images.length)}
                    style={{
                      position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                      zIndex: 5, width: '34px', height: '34px', borderRadius: '50%',
                      background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.8)', cursor: 'pointer', backdropFilter: 'blur(8px)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                    aria-label="Previous image"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                  </button>
                  <button
                    onClick={() => setGalleryIdx(i => (i + 1) % images.length)}
                    style={{
                      position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                      zIndex: 5, width: '34px', height: '34px', borderRadius: '50%',
                      background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.8)', cursor: 'pointer', backdropFilter: 'blur(8px)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                    aria-label="Next image"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                </>
              )}
            </div>

            {/* RIGHT — Details */}
            <div style={{ padding: '36px 28px 40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Eyebrow */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: accent, boxShadow: `0 0 8px ${accent}`,
                  display: 'inline-block', flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: 'JetBrains Mono, Fira Code, monospace',
                  fontSize: '10px', fontWeight: 600, letterSpacing: '0.22em',
                  textTransform: 'uppercase', color: accent, opacity: 0.9,
                }}>
                  Featured Project
                </span>
              </div>

              {/* Title */}
              <div>
                <h2 style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 'clamp(26px, 4vw, 40px)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  color: '#fff',
                  marginBottom: '6px',
                }}>
                  {emoji} {title}
                </h2>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', fontFamily: 'JetBrains Mono, monospace' }}>
                  {tags.slice(0, 3).join(' · ')}
                </p>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {hasSrc && (
                  <a
                    href={sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      padding: '10px 20px', borderRadius: '10px',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.85)',
                      fontSize: '13px', fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'background 0.2s, border-color 0.2s',
                      backdropFilter: 'blur(8px)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.11)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                  >
                    <GitHubIcon /> View Source
                  </a>
                )}
                {hasLive && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      padding: '10px 20px', borderRadius: '10px',
                      background: accent,
                      border: `1px solid ${accent}`,
                      color: '#000',
                      fontSize: '13px', fontWeight: 700,
                      textDecoration: 'none',
                      boxShadow: `0 0 24px ${accent}55`,
                      transition: 'opacity 0.2s, transform 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <ExternalIcon /> Live Demo
                  </a>
                )}
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />

              {/* Tabs */}
              <div>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '24px' }} role="tablist">
                  {TABS.map((tab, i) => (
                    <button
                      key={tab}
                      role="tab"
                      aria-selected={activeTab === i}
                      onClick={() => setActiveTab(i)}
                      style={{
                        padding: '7px 16px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        fontFamily: 'JetBrains Mono, Fira Code, monospace',
                        letterSpacing: '0.04em',
                        cursor: 'pointer',
                        border: 'none',
                        transition: 'background 0.2s, color 0.2s',
                        background: activeTab === i ? `${accent}20` : 'transparent',
                        color: activeTab === i ? accent : 'rgba(255,255,255,0.35)',
                        outline: activeTab === i ? `1px solid ${accent}40` : 'none',
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab panel */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    role="tabpanel"
                  >
                    {tabContent[activeTab]}
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
