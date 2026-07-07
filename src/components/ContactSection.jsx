/**
 * ContactSection — Split layout: Contact Form (left) + Social Cards (right)
 * Beautiful glassmorphism design matching the portfolio's design system.
 */

import { useState, useEffect, useRef, Suspense } from 'react';
import ContactGlobe from './ContactGlobe';

/* ─── Contact info ───────────────────────────────────────────── */
const EMAIL = 'buddhimasandaru@gmail.com';
const WHATSAPP_URL = 'https://wa.me/94768575359?text=Hi%20Buddhima!%20I%20saw%20your%20portfolio';
const GITHUB_URL = 'https://github.com/buddhima21';
const LINKEDIN_URL = 'https://linkedin.com/in/buddhima';
const GMAIL_URL = `https://mail.google.com/mail/?view=cm&to=${EMAIL}&su=Hello%20from%20your%20Portfolio`;

/* ─── SVG Icons ──────────────────────────────────────────────── */
function GitHubIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function EmailIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function SendIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function CheckIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function LocationIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}

/* ─── Social link cards data ─────────────────────────────────── */
const SOCIAL_LINKS = [
  {
    id: 'email',
    label: 'Email',
    value: EMAIL,
    href: GMAIL_URL,
    Icon: EmailIcon,
    color: '#c0c1ff',
    bg: 'rgba(192, 193, 255, 0.10)',
    border: 'rgba(192, 193, 255, 0.22)',
    glow: 'rgba(192, 193, 255, 0.18)',
    description: 'Send me an email',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: '+94 768 575 359',
    href: WHATSAPP_URL,
    Icon: WhatsAppIcon,
    color: '#4ade80',
    bg: 'rgba(74, 222, 128, 0.10)',
    border: 'rgba(74, 222, 128, 0.22)',
    glow: 'rgba(74, 222, 128, 0.18)',
    description: 'Message me on WhatsApp',
  },
];

/* ─── useReveal hook ─────────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ─── Floating orbs decoration ──────────────────────────────── */
function FloatingOrbs() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div style={{
        position: 'absolute', width: 520, height: 520, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(192,193,255,0.07) 0%, transparent 70%)',
        top: '-8%', left: '-8%', filter: 'blur(70px)',
        animation: 'orbDrift 14s ease-in-out infinite alternate',
      }} />
      <div style={{
        position: 'absolute', width: 420, height: 420, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(103,232,249,0.06) 0%, transparent 70%)',
        bottom: '5%', right: '-6%', filter: 'blur(70px)',
        animation: 'orbDrift 18s ease-in-out infinite alternate-reverse',
      }} />
      <div style={{
        position: 'absolute', width: 320, height: 320, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(74,222,128,0.05) 0%, transparent 70%)',
        top: '55%', left: '44%', filter: 'blur(55px)',
        animation: 'orbDrift 22s ease-in-out infinite alternate',
      }} />
    </div>
  );
}

/* ─── Social Card Component ──────────────────────────────────── */
function SocialCard({ card, index, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={card.href}
      target="_blank"
      rel="noopener noreferrer"
      id={`contact-link-${card.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '16px 20px',
        borderRadius: 16,
        textDecoration: 'none',
        color: 'inherit',
        background: hovered ? card.bg : 'rgba(255,255,255,0.025)',
        border: `1px solid ${hovered ? card.border : 'rgba(255,255,255,0.06)'}`,
        borderTopColor: hovered ? card.border : 'rgba(255,255,255,0.10)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: hovered
          ? `0 8px 32px ${card.glow}, 0 0 0 1px ${card.border}`
          : '0 2px 12px rgba(0,0,0,0.18)',
        transform: hovered
          ? 'translateY(-3px)'
          : visible
            ? 'translateY(0)'
            : 'translateY(20px)',
        opacity: visible ? 1 : 0,
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 90 + 200}ms,
                     transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 90 + 200}ms,
                     background 0.25s ease, border-color 0.25s ease, box-shadow 0.3s ease`,
        cursor: 'pointer',
      }}
    >
      {/* Icon bubble */}
      <div style={{
        flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 44, height: 44, borderRadius: 12,
        background: card.bg,
        border: `1px solid ${card.border}`,
        color: card.color,
        transition: 'transform 0.25s ease',
        transform: hovered ? 'scale(1.12)' : 'scale(1)',
      }}>
        <card.Icon size={19} />
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 13,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.9)',
          letterSpacing: '-0.01em',
          marginBottom: 3,
        }}>
          {card.label}
        </div>
        <div style={{
          fontSize: 12,
          color: 'rgba(255,255,255,0.38)',
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {card.value}
        </div>
      </div>

      {/* Arrow */}
      <div style={{
        fontSize: 18,
        color: hovered ? card.color : 'rgba(255,255,255,0.18)',
        flexShrink: 0,
        transition: 'color 0.2s ease, transform 0.2s ease',
        transform: hovered ? 'translate(2px, -2px)' : 'none',
      }}>
        ↗
      </div>
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main ContactSection
═══════════════════════════════════════════════════════════════ */
export default function ContactSection() {
  const { ref: sectionRef, visible } = useReveal();

  /* ── Form state ── */
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [focused, setFocused] = useState(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(err => ({ ...err, [e.target.name]: '' }));
    if (submitError) setSubmitError(false);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSending(true);
    setSubmitError(false);

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('subject', form.subject);
    formData.append('message', form.message);

    try {
      const response = await fetch('https://formspree.io/f/xkolepyn', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData,
      });

      if (response.ok) {
        setSent(true);
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitError(true);
      }
    } catch (err) {
      setSubmitError(true);
    } finally {
      setSending(false);
    }
  };

  /* ── Shared input / label styles ── */
  const inputStyle = (name) => ({
    width: '100%',
    background: focused === name ? 'rgba(255,255,255,0.045)' : 'rgba(255,255,255,0.02)',
    border: errors[name]
      ? '1px solid rgba(248,113,113,0.55)'
      : focused === name
        ? '1px solid rgba(192,193,255,0.4)'
        : '1px solid rgba(255,255,255,0.07)',
    borderRadius: 12,
    padding: '13px 15px',
    fontSize: 14,
    fontFamily: "'Inter', sans-serif",
    color: 'rgba(255,255,255,0.88)',
    outline: 'none',
    resize: 'none',
    transition: 'border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',
    boxShadow: focused === name && !errors[name]
      ? '0 0 0 3px rgba(192,193,255,0.08)'
      : errors[name]
        ? '0 0 0 3px rgba(248,113,113,0.08)'
        : 'none',
  });

  const labelStyle = (name) => ({
    display: 'block',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    color: errors[name]
      ? 'rgba(248,113,113,0.9)'
      : focused === name
        ? '#c0c1ff'
        : 'rgba(255,255,255,0.4)',
    marginBottom: 7,
    transition: 'color 0.2s ease',
  });

  /* ── Render ── */
  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ position: 'relative', padding: '120px 24px', overflow: 'hidden' }}
    >
      <FloatingOrbs />

      {/* Top border accent */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '55%', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(192,193,255,0.22), transparent)',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Section header ── */}
        <div style={{
          textAlign: 'center',
          marginBottom: 64,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
        }}>
          {/* Location pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '5px 15px',
            borderRadius: 100,
            background: 'rgba(192,193,255,0.07)',
            border: '1px solid rgba(192,193,255,0.14)',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: '#c0c1ff',
            marginBottom: 22,
          }}>
            <LocationIcon size={12} />
            Sri Lanka · GMT+5:30 · Open to Remote
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: 'rgba(255,255,255,0.95)',
              margin: '0 0 18px',
            }}
          >
            Let's Build Something{' '}
            <span style={{
              background: 'linear-gradient(135deg, #c0c1ff 0%, #a78bfa 50%, #67e8f9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Together
            </span>
          </h2>

          <p style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.46)',
            maxWidth: 480,
            margin: '0 auto',
            lineHeight: 1.75,
          }}>
            I'm open to internships, collaborations &amp; open-source projects.
            Drop a message! I reply within 24 hours.
          </p>
        </div>

        {/* ── Two-column grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 28,
          alignItems: 'start',
        }}>

          {/* ════════ LEFT — Contact Form ════════ */}
          <div style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderTopColor: 'rgba(255,255,255,0.12)',
            borderRadius: 24,
            padding: '36px 32px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s',
          }}>
            <h3 style={{
              fontSize: 18, fontWeight: 700,
              color: 'rgba(255,255,255,0.92)',
              letterSpacing: '-0.02em',
              margin: '0 0 6px',
            }}>
              Send a Message
            </h3>
            <p style={{
              fontSize: 13, color: 'rgba(255,255,255,0.35)',
              margin: '0 0 28px', lineHeight: 1.55,
            }}>
              Please contact me directly at{' '}
              <a
                href={GMAIL_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#c0c1ff',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(192,193,255,0.4)',
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderBottomColor = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#c0c1ff';
                  e.currentTarget.style.borderBottomColor = 'rgba(192,193,255,0.4)';
                }}
              >
                {EMAIL}
              </a>{' '}
              or drop your info here.
            </p>

            {sent ? (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                borderRadius: 16,
                background: 'rgba(34, 197, 94, 0.05)',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                animation: 'contactFadeUp 0.5s ease forwards'
              }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16, color: '#4ade80' }}>
                  <CheckIcon size={40} />
                </div>
                <h4 style={{ fontSize: 18, color: '#4ade80', marginBottom: 8, fontWeight: 700 }}>Message sent!</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.5 }}>
                  I'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form id="contact-form" onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

                {/* Name + Email row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label htmlFor="contact-name" style={labelStyle('name')}>Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      style={inputStyle('name')}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <span style={{ fontSize: 11, color: 'rgba(248,113,113,0.85)', marginTop: 5, display: 'block' }}>
                        {errors.name}
                      </span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-email" style={labelStyle('email')}>Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="yourname@example.com"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      style={inputStyle('email')}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <span style={{ fontSize: 11, color: 'rgba(248,113,113,0.85)', marginTop: 5, display: 'block' }}>
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" style={labelStyle('subject')}>
                    Subject{' '}
                    <span style={{ opacity: 0.45, fontWeight: 400, textTransform: 'none', letterSpacing: 0, fontSize: 11 }}>
                      (optional)
                    </span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    placeholder="Project collab, internship inquiry…"
                    value={form.subject}
                    onChange={handleChange}
                    onFocus={() => setFocused('subject')}
                    onBlur={() => setFocused(null)}
                    style={inputStyle('subject')}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" style={labelStyle('message')}>Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Hi Buddhima, I'd love to…"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    style={inputStyle('message')}
                  />
                  {errors.message && (
                    <span style={{ fontSize: 11, color: 'rgba(248,113,113,0.85)', marginTop: 5, display: 'block' }}>
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit */}
                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={sending}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    padding: '14px 28px',
                    borderRadius: 12,
                    border: 'none',
                    cursor: sending ? 'default' : 'pointer',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #14b8a6 100%)',
                    color: '#fff',
                    boxShadow: '0 4px 22px rgba(167,139,250,0.38)',
                    transform: sending ? 'scale(0.97)' : 'scale(1)',
                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                    opacity: sending ? 0.8 : 1,
                    width: '100%',
                    marginTop: 4,
                  }}
                >
                  {sending ? (
                    <>
                      <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
                        style={{ animation: 'contactSpin 0.9s linear infinite' }} aria-hidden="true">
                        <path d="M21 12a9 9 0 11-6.219-8.56" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <SendIcon size={17} />
                      Send Message
                    </>
                  )}
                </button>

                {submitError && (
                  <div style={{
                    fontSize: 13,
                    color: 'rgba(248,113,113,0.9)',
                    textAlign: 'center',
                    marginTop: 8,
                    lineHeight: 1.4
                  }}>
                    Something went wrong, please email me directly at <a href={GMAIL_URL} style={{ color: '#c0c1ff', textDecoration: 'underline' }}>{EMAIL}</a>
                  </div>
                )}
              </form>
            )}
          </div>

          {/* ════════ RIGHT — Globe + Contact Cards ════════ */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s',
          }}>


            {/* 3D Particle Globe — transparent, no card wrapper */}
            <Suspense fallback={
              <div style={{ height: 360, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13, fontFamily: 'monospace' }}>✦ Loading…</span>
              </div>
            }>
              <ContactGlobe />
            </Suspense>


            {/* Social cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SOCIAL_LINKS.map((card, i) => (
                <SocialCard key={card.id} card={card} index={i} visible={visible} />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes contactSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes contactPulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(74,222,128,0.2); }
          50%       { box-shadow: 0 0 0 7px rgba(74,222,128,0.06); }
        }
        @keyframes contactFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
