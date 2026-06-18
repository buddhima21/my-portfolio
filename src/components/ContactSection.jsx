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
const EMAIL = 'buddhimasandaru@gmail.com';
const GMAIL_COMPOSE_URL  = `https://mail.google.com/mail/?view=cm&to=${EMAIL}&su=Hello%20from%20your%20Portfolio`;

/* ─── Boot sequence lines ───────────────────────────────────── */
const BOOT_LINES = [
  { delay: 0,    type: 'cmd',    text: 'ssh connect buddhima.dev' },
  { delay: 500,  type: 'output', text: '> Establishing secure connection...' },
  { delay: 950,  type: 'output', text: '> Connected. Welcome.' },
  { delay: 1350, type: 'gap' },
  { delay: 1500, type: 'cmd',    text: 'whoami' },
  { delay: 1850, type: 'output', text: 'Buddhima Hewage — Software Engineering Undergraduate' },
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
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-10">

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
            Let&rsquo;s build something.
          </h2>
        </div>

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

        {/* ── CTA button ────────────────────────────────────────── */}
        <a
          id="contact-email-cta"
          href={GMAIL_COMPOSE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden flex items-center gap-3 px-8 py-4 rounded-xl font-mono font-semibold"
          style={{
            fontSize: '13px',
            letterSpacing: '0.08em',
            background: 'rgba(103,232,249,0.07)',
            border: '1px solid rgba(103,232,249,0.2)',
            color: '#67e8f9',
            textDecoration: 'none',
            transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
            boxShadow: '0 0 24px rgba(103,232,249,0.05)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background  = 'rgba(103,232,249,0.13)';
            e.currentTarget.style.borderColor = 'rgba(103,232,249,0.4)';
            e.currentTarget.style.boxShadow   = '0 0 32px rgba(103,232,249,0.18)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background  = 'rgba(103,232,249,0.07)';
            e.currentTarget.style.borderColor = 'rgba(103,232,249,0.2)';
            e.currentTarget.style.boxShadow   = '0 0 24px rgba(103,232,249,0.05)';
          }}
        >
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
            style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(103,232,249,0.07) 50%, transparent 65%)' }}
          />
          <span style={{ fontSize: '15px' }}>✉</span>
          send message
          <span style={{ opacity: 0.45, marginLeft: '2px' }}>↗</span>
        </a>

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
