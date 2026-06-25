/**
 * ContactSection — Terminal with auto boot sequence + interactive mode
 *
 * Phase 1 (auto): Pre-scripted lines type in on scroll-entry.
 * Phase 2 (interactive): After boot, visitor can type real commands.
 *
 * Commands: help · whoami · contact · links · skills · about · hire · clear
 */

import { useEffect, useRef, useState, useCallback } from 'react';

/* ─── Config ────────────────────────────────────────────────── */
const EMAIL    = 'buddhimassandaru@gmail.com';
const WHATSAPP = '0768575359';
const WHATSAPP_URL       = `https://wa.me/94768575359?text=Hi%20Buddhima!%20I%20saw%20your%20portfolio`;
const GMAIL_COMPOSE_URL  = `https://mail.google.com/mail/?view=cm&to=${EMAIL}&su=Hello%20from%20your%20Portfolio`;

/* ─── Boot sequence lines ───────────────────────────────────── */
const BOOT_LINES = [
  { delay: 0,    type: 'cmd',    text: 'ssh connect buddhima.dev' },
  { delay: 500,  type: 'output', text: '> Establishing secure connection...' },
  { delay: 950,  type: 'output', text: '> Connected. Welcome.' },
  { delay: 1350, type: 'gap' },
  { delay: 1500, type: 'cmd',    text: 'whoami' },
  { delay: 1850, type: 'output', text: 'Buddhima Hewage — Software Engineering Undergraduate at SLIIT' },
  { delay: 2100, type: 'gap' },
  { delay: 2200, type: 'cmd',    text: 'status --availability' },
  { delay: 2600, type: 'output', text: '✦  Open to internships, collabs & open-source' },
  { delay: 2850, type: 'gap' },
  { delay: 2950, type: 'cmd',    text: 'echo $LOCATION' },
  { delay: 3300, type: 'output', text: 'Sri Lanka · GMT+5:30' },
  { delay: 3550, type: 'gap' },
  { delay: 3650, type: 'cmd',    text: `send --to ${EMAIL}` },
  { delay: 4050, type: 'link',   text: EMAIL,   href: GMAIL_COMPOSE_URL, color: '#67e8f9' },
  { delay: 4300, type: 'gap' },
  { delay: 4400, type: 'cmd',    text: 'open --links' },
  { delay: 4750, type: 'links',  items: [
    { label: 'github.com/buddhima21',   href: 'https://github.com/buddhima21' },
    { label: 'linkedin.com/in/buddhima',href: 'https://linkedin.com/in/buddhima' },
  ]},
  { delay: 5100, type: 'gap' },
  { delay: 5250, type: 'output', text: '─────────────────────────────────────────────' },
  { delay: 5400, type: 'output', text: '  Interactive mode unlocked.  Type  help  to explore.', color: '#4ade80' },
  { delay: 5650, type: 'output', text: '─────────────────────────────────────────────' },
  { delay: 5800, type: 'gap' },
];

const BOOT_DONE_DELAY = 5900; // ms when interactive mode activates

/* ─── Interactive command definitions ───────────────────────── */
const CMD_RESPONSES = {
  help: [
    { type: 'output', text: 'Available commands:', color: '#c0c1ff' },
    { type: 'output', text: '  whoami    →  who is Buddhima?' },
    { type: 'output', text: '  about     →  background & interests' },
    { type: 'output', text: '  skills    →  tech stack' },
    { type: 'output', text: '  contact   →  email address' },
    { type: 'output', text: '  links     →  social profiles' },
    { type: 'output', text: '  hire      →  hire me!' },
    { type: 'output', text: '  clear     →  clear screen' },
  ],
  whoami: [
    { type: 'output', text: 'Buddhima Hewage', color: '#67e8f9' },
    { type: 'output', text: 'Software Engineering Undergraduate @ SLIIT' },
    { type: 'output', text: 'Assistant Treasurer · IEEE SLIIT EMBS Chapter' },
    { type: 'output', text: 'Location: Sri Lanka · GMT+5:30' },
  ],
  about: [
    { type: 'output', text: 'Passionate about building meaningful software.', color: '#c0c1ff' },
    { type: 'output', text: 'Interests: full-stack dev, cloud, AI/ML,' },
    { type: 'output', text: '           open-source & design systems.' },
    { type: 'output', text: 'Currently exploring internship & research opportunities.' },
  ],
  skills: [
    { type: 'output', text: 'Languages:   JavaScript · Python · Java · C++', color: '#818cf8' },
    { type: 'output', text: 'Frontend:    React · Next.js · Tailwind · HTML/CSS' },
    { type: 'output', text: 'Backend:     Node.js · Express · Spring Boot' },
    { type: 'output', text: 'Cloud & DB:  Firebase · MongoDB · MySQL · AWS basics' },
    { type: 'output', text: 'Tools:       Git · Docker · Figma · VS Code' },
  ],
  contact: [
    { type: 'output', text: 'Email:', color: '#c0c1ff' },
    { type: 'link',   text: `✉  ${EMAIL}`, href: GMAIL_COMPOSE_URL, color: '#67e8f9' },
    { type: 'output', text: '(Opens Gmail in your browser)' },
  ],
  links: [
    { type: 'output', text: 'Profiles:', color: '#c0c1ff' },
    { type: 'links',  items: [
      { label: 'github.com/buddhima21',    href: 'https://github.com/buddhima21' },
      { label: 'linkedin.com/in/buddhima', href: 'https://linkedin.com/in/buddhima' },
    ]},
  ],
  hire: [
    { type: 'output', text: "Excellent choice! 🚀", color: '#4ade80' },
    { type: 'output', text: "Let's build something great together." },
    { type: 'link',   text: `Send a message → ${EMAIL}`, href: GMAIL_COMPOSE_URL, color: '#67e8f9' },
  ],
};

/* ─── Helpers ─────────────────────────────────────────────────── */
function buildOutputNodes(responses) {
  return responses.map((r, i) => ({ ...r, id: Date.now() + i }));
}

/* ─── Main component ──────────────────────────────────────────── */
export default function ContactSection() {
  const sectionRef     = useRef(null);
  const inputRef       = useRef(null);
  const bottomRef      = useRef(null);
  const timerRefs      = useRef([]);

  const [bootVisible,  setBootVisible]  = useState([]); // indices of shown boot lines
  const [started,      setStarted]      = useState(false);
  const [interactive,  setInteractive]  = useState(false);

  // Interactive state
  const [inputVal,     setInputVal]     = useState('');
  const [history,      setHistory]      = useState([]);   // command history
  const [histIdx,      setHistIdx]      = useState(-1);   // -1 = not browsing
  const [sessionLines, setSessionLines] = useState([]);   // rendered interactive lines
  const [currentTyping, setCurrentTyping] = useState(null); // cmd being typed in boot

  /* ── Scroll trigger ─────────────────────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.2 },
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, [started]);

  /* ── Schedule boot lines ────────────────────────────────────── */
  useEffect(() => {
    if (!started) return;
    timerRefs.current.forEach(clearTimeout);

    BOOT_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setBootVisible((prev) => [...prev, i]);
        if (line.type === 'cmd') setCurrentTyping(i);
      }, line.delay);
      timerRefs.current.push(t);
    });

    // Unlock interactive mode after boot
    const unlockTimer = setTimeout(() => {
      setInteractive(true);
      setCurrentTyping(null);
    }, BOOT_DONE_DELAY);
    timerRefs.current.push(unlockTimer);

    return () => timerRefs.current.forEach(clearTimeout);
  }, [started]);

  /* ── Auto-scroll to bottom ─────────────────────────────────── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [bootVisible, sessionLines]);

  /* ── Focus input when interactive ─────────────────────────── */
  useEffect(() => {
    if (interactive) inputRef.current?.focus();
  }, [interactive]);

  /* ── Handle command submit ─────────────────────────────────── */
  const handleCommand = useCallback((raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    // Add the typed command line to session
    const cmdLine = { id: Date.now(), type: 'typed-cmd', text: cmd };

    if (cmd === 'clear') {
      setSessionLines([]);
      setHistory((h) => [raw, ...h]);
      setHistIdx(-1);
      return;
    }

    const responses = CMD_RESPONSES[cmd]
      ? buildOutputNodes(CMD_RESPONSES[cmd])
      : [{ id: Date.now(), type: 'output', text: `Command not found: ${cmd}. Try 'help'.`, color: '#f87171' }];

    setSessionLines((prev) => [...prev, cmdLine, { id: Date.now() + 999, type: 'gap' }, ...responses, { id: Date.now() + 1000, type: 'gap' }]);
    setHistory((h) => [raw, ...h]);
    setHistIdx(-1);
  }, []);

  /* ── Keyboard handler ──────────────────────────────────────── */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHistIdx((idx) => {
        const next = Math.min(idx + 1, history.length - 1);
        setInputVal(history[next] ?? '');
        return next;
      });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHistIdx((idx) => {
        const next = Math.max(idx - 1, -1);
        setInputVal(next === -1 ? '' : history[next] ?? '');
        return next;
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-40 px-6 md:px-20 reveal"
      aria-label="Contact"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-10">

        {/* ── Header ──────────────────────────────────────────── */}
        <div className="text-center">
          <span
            className="font-mono uppercase tracking-[0.28em]"
            style={{ fontSize: '11px', fontWeight: 600, color: '#c0c1ff' }}
          >
            Connect
          </span>
          <h2
            className="text-on-surface font-semibold mt-3"
            style={{ fontSize: 'clamp(28px, 4vw, 42px)', letterSpacing: '-0.03em' }}
          >
            Contact Me.
          </h2>
        </div>

        {/* ── Terminal + Cards grid ─────────────────────────── */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">

        {/* ── Terminal window ──────────────────────────────────── */}
        <div
          className="w-full rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(8,8,16,0.94)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderTop: '1px solid rgba(255,255,255,0.13)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(103,232,249,0.04), inset 0 1px 0 rgba(255,255,255,0.05)',
            backdropFilter: 'blur(24px)',
          }}
          onClick={() => interactive && inputRef.current?.focus()}
        >
          {/* Chrome bar */}
          <div
            className="flex items-center gap-2 px-4 py-3 select-none"
            style={{
              background: 'rgba(255,255,255,0.025)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
            <span
              className="ml-auto mr-auto font-mono"
              style={{ fontSize: '12px', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.04em' }}
            >
              buddhima@portfolio:~
            </span>
            <span
              className="inline-flex items-center gap-1.5 font-mono"
              style={{ fontSize: '10px', color: interactive ? '#4ade80' : 'rgba(255,255,255,0.28)' }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{
                  background: interactive ? '#4ade80' : 'rgba(255,255,255,0.2)',
                  boxShadow: interactive ? '0 0 6px rgba(74,222,128,0.6)' : 'none',
                  animation: interactive ? 'termCursorBlink 2s ease-in-out infinite' : 'none',
                }}
              />
              {interactive ? 'interactive' : 'booting...'}
            </span>
          </div>

          {/* Terminal body */}
          <div
            className="p-5 md:p-7 font-mono overflow-y-auto"
            style={{
              fontSize: '13px',
              lineHeight: '1.9',
              minHeight: '320px',
              maxHeight: '480px',
              cursor: interactive ? 'text' : 'default',
            }}
          >
            {/* ── Boot lines ────────────────────────────────── */}
            {BOOT_LINES.map((line, i) => {
              if (!bootVisible.includes(i)) return null;
              return (
                <BootLine
                  key={i}
                  line={line}
                  isTyping={currentTyping === i}
                />
              );
            })}

            {/* ── Session lines (interactive) ─────────────── */}
            {sessionLines.map((line) => <SessionLine key={line.id} line={line} />)}

            {/* ── Input row ───────────────────────────────── */}
            {interactive && (
              <div className="flex items-center gap-2 mt-0.5">
                <span style={{ color: '#4ade80', userSelect: 'none' }}>$</span>
                <div className="relative flex-1">
                  {/* Visible text mirror */}
                  <span style={{ color: '#e2e8f0' }}>{inputVal}</span>
                  {/* Blinking block cursor */}
                  <span
                    style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '14px',
                      background: '#67e8f9',
                      borderRadius: '1px',
                      verticalAlign: 'middle',
                      marginLeft: '1px',
                      animation: 'termCursorBlink 0.8s step-end infinite',
                      boxShadow: '0 0 8px rgba(103,232,249,0.55)',
                    }}
                  />
                  {/* Hidden real input */}
                  <input
                    ref={inputRef}
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    aria-label="Terminal input"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      cursor: 'text',
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: 'transparent',
                      caretColor: 'transparent',
                    }}
                  />
                </div>
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={bottomRef} />
          </div>

          {/* Hint bar — shown once interactive */}
          {interactive && (
            <div
              className="px-5 py-2 flex items-center gap-2 select-none"
              style={{
                borderTop: '1px solid rgba(255,255,255,0.05)',
                background: 'rgba(255,255,255,0.015)',
              }}
            >
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.22)', fontFamily: 'monospace', letterSpacing: '0.04em' }}>
                ↑↓ history &nbsp;·&nbsp; enter to run &nbsp;·&nbsp; type{' '}
                <span style={{ color: '#67e8f9' }}>help</span> to explore
              </span>
            </div>
          )}
        </div>

        {/* ── Right: Contact cards ─────────────────────────────── */}
        <div className="flex flex-col gap-4">

          {/* Let's Chat label */}
          <p
            className="font-mono uppercase tracking-[0.22em]"
            style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(192,193,255,0.5)', marginBottom: '4px' }}
          >
            Reach out via
          </p>

          {/* WhatsApp card */}
          <a
            id="contact-whatsapp"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-reach-card"
            aria-label="Chat on WhatsApp"
          >
            <span className="contact-reach-icon" style={{ background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.25)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#25d366" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </span>
            <div className="contact-reach-info">
              <span className="contact-reach-label">Let's Chat</span>
              <span className="contact-reach-value">{WHATSAPP}</span>
            </div>
            <span className="contact-reach-arrow">↗</span>
          </a>

          {/* OR divider */}
          <div className="flex items-center gap-3">
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace', letterSpacing: '0.12em' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
          </div>

          {/* Email card */}
          <a
            id="contact-email-card"
            href={GMAIL_COMPOSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-reach-card"
            aria-label="Send an email"
          >
            <span className="contact-reach-icon" style={{ background: 'rgba(103,232,249,0.10)', border: '1px solid rgba(103,232,249,0.22)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#67e8f9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </span>
            <div className="contact-reach-info">
              <span className="contact-reach-label">Send an Email</span>
              <span className="contact-reach-value" style={{ fontSize: '11px' }}>{EMAIL}</span>
            </div>
            <span className="contact-reach-arrow">↗</span>
          </a>

          {/* Divider note */}
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.22)', lineHeight: 1.6, marginTop: '4px' }}>
            I typically respond within <span style={{ color: 'rgba(192,193,255,0.6)' }}>24 hours</span>. Feel free to reach out for collaborations, internships, or just a chat!
          </p>

        </div>{/* /right cards */}

        </div>{/* /grid */}

      </div>
    </section>
  );
}

/* ─── Boot line renderer ────────────────────────────────────── */
function BootLine({ line, isTyping }) {
  if (line.type === 'gap') return <div style={{ height: '5px' }} />;

  if (line.type === 'cmd') {
    return (
      <div className="flex items-center gap-2">
        <span style={{ color: '#4ade80', userSelect: 'none' }}>$</span>
        <span style={{ color: '#e2e8f0' }}>
          {isTyping ? <TypedText text={line.text} /> : line.text}
        </span>
      </div>
    );
  }

  if (line.type === 'link') {
    return (
      <div style={{ paddingLeft: '18px' }}>
        <span style={{ color: 'rgba(255,255,255,0.35)' }}>→{'  '}</span>
        <TermLink href={line.href} color={line.color}>{line.text}</TermLink>
      </div>
    );
  }

  if (line.type === 'links') {
    return (
      <div className="flex flex-wrap gap-x-6" style={{ paddingLeft: '18px' }}>
        {line.items.map((item) => (
          <span key={item.label}>
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>→{'  '}</span>
            <TermLink href={item.href} color="#c0c1ff">{item.label}</TermLink>
          </span>
        ))}
      </div>
    );
  }

  // plain output
  return (
    <div style={{ paddingLeft: '18px', color: line.color ?? 'rgba(255,255,255,0.38)' }}>
      {line.text}
    </div>
  );
}

/* ─── Session line renderer ─────────────────────────────────── */
function SessionLine({ line }) {
  if (line.type === 'gap') return <div style={{ height: '4px' }} />;

  if (line.type === 'typed-cmd') {
    return (
      <div className="flex items-center gap-2">
        <span style={{ color: '#4ade80', userSelect: 'none' }}>$</span>
        <span style={{ color: '#e2e8f0' }}>{line.text}</span>
      </div>
    );
  }

  if (line.type === 'link') {
    return (
      <div style={{ paddingLeft: '18px' }}>
        <TermLink href={line.href} color={line.color}>{line.text}</TermLink>
      </div>
    );
  }

  if (line.type === 'links') {
    return (
      <div className="flex flex-wrap gap-x-6" style={{ paddingLeft: '18px' }}>
        {line.items.map((item) => (
          <span key={item.label}>
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>→{'  '}</span>
            <TermLink href={item.href} color="#c0c1ff">{item.label}</TermLink>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div style={{ paddingLeft: '18px', color: line.color ?? 'rgba(255,255,255,0.4)' }}>
      {line.text}
    </div>
  );
}

/* ─── Reusable terminal link ────────────────────────────────── */
function TermLink({ href, color, children }) {
  const base = { color, textDecoration: 'none', borderBottom: `1px solid ${color}55`, transition: 'color 0.2s, border-color 0.2s' };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={base}
      onMouseEnter={(e) => { e.target.style.color = '#fff'; e.target.style.borderColor = color; }}
      onMouseLeave={(e) => { e.target.style.color = color; e.target.style.borderColor = `${color}55`; }}
    >
      {children}
    </a>
  );
}

/* ─── Typewriter ────────────────────────────────────────────── */
function TypedText({ text }) {
  const [shown, setShown] = useState('');
  useEffect(() => {
    let i = 0;
    setShown('');
    const iv = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(iv);
    }, 36);
    return () => clearInterval(iv);
  }, [text]);
  return <span>{shown}</span>;
}
