import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Projects, Skills, Experience, Academics, Certificates } from './components/ProjectSkills';
import './index.css';

// ─── ERROR BOUNDARY ───────────────────────────────────────────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) return (
      <div style={{ padding: 40, background: '#000', color: '#00FF41', fontFamily: 'monospace', minHeight: '100vh' }}>
        <pre style={{ color: '#FF0066' }}>FATAL ERROR: {this.state.error?.message}</pre>
        <pre style={{ color: '#555', fontSize: 11 }}>{this.state.error?.stack}</pre>
      </div>
    );
    return this.props.children;
  }
}

// ─── CUSTOM CURSOR ────────────────────────────────────────────────────────────
const Cursor = () => {
  const pos = useRef({ x: 0, y: 0 });
  const dotRef = useRef(null);
  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <div ref={dotRef} className="fixed top-0 left-0 w-3 h-3 bg-[#FF0066] z-[99999] pointer-events-none mix-blend-difference" style={{ transition: 'none' }} />
  );
};

// ─── GLITCH TEXT ──────────────────────────────────────────────────────────────
const GlitchText = ({ children, className = '', style = {} }) => (
  <span className={`glitch ${className}`} data-text={children} style={style}>
    {children}
  </span>
);

// ─── SPLASH SCREEN ────────────────────────────────────────────────────────────
const Splash = ({ onComplete }) => {
  const lines = [
    'INITIALIZING SK_OS v1.0...',
    'LOADING NEURAL ENGINE...',
    'COMPILING PORTFOLIO...',
    'INJECTING GLITCH PROTOCOL...',
    'CORRUPTING YOUR SCREEN...',
    'READY.',
  ];
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.05, transition: { duration: 0.6 } }}
      className="fixed inset-0 bg-black z-[10000] flex flex-col items-start justify-center px-12 font-mono"
    >
      {/* scanning line */}
      <motion.div
        animate={{ top: ['-5%', '105%'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-x-0 h-[2px] bg-[#FF0066]/20 pointer-events-none"
        style={{ position: 'absolute' }}
      />

      <div className="w-full max-w-lg">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.28, duration: 0.3 }}
            className="text-sm mb-1"
          >
            <span className="text-[#FF0066] mr-3">{'>'}</span>
            <span className={i === lines.length - 1 ? 'text-[#00FF41] font-bold' : 'text-[#555]'}>
              {line}
            </span>
            {i === lines.length - 1 && (
              <span className="inline-block w-2 h-4 bg-[#00FF41] ml-1" style={{ animation: 'blink 0.8s step-end infinite' }} />
            )}
          </motion.p>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: lines.length * 0.28 + 0.4 }}
        onClick={onComplete}
        className="mt-16 px-12 py-4 border border-[#FF0066] text-[#FF0066] text-xs tracking-[0.4em] uppercase font-mono font-bold hover:bg-[#FF0066] hover:text-black transition-all duration-200 relative overflow-hidden group"
      >
        <span className="relative z-10">$ ./enter_portfolio</span>
      </motion.button>
    </motion.div>
  );
};

// ─── TOP STATUS BAR ───────────────────────────────────────────────────────────
const TopBar = () => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(`${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const marqueeText = 'AI DEVELOPER · BUILDER · CREATOR · MGIT · HYDERABAD · AI DEVELOPER · BUILDER · CREATOR · MGIT · HYDERABAD · ';

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-9 border-b border-white/10 bg-black/90 backdrop-blur-sm flex items-center">
      {/* left */}
      <div className="px-4 text-[10px] text-[#00FF41] tracking-widest shrink-0 border-r border-white/10 h-full flex items-center">
        [SK_OS v1.0]
      </div>
      {/* marquee */}
      <div className="flex-1 overflow-hidden h-full flex items-center">
        <div className="flex whitespace-nowrap" style={{ animation: 'marquee 22s linear infinite' }}>
          <span className="text-[9px] text-white/30 tracking-[0.3em] uppercase pr-8">{marqueeText}{marqueeText}</span>
        </div>
      </div>
      {/* right */}
      <div className="px-4 text-[10px] tracking-widest shrink-0 border-l border-white/10 h-full flex items-center gap-3">
        <span className="text-[#555]">{time}</span>
        <span className="flex items-center gap-1 text-[#00FF41]">
          <span className="w-1.5 h-1.5 bg-[#00FF41] rounded-full" style={{ animation: 'blink 1s step-end infinite' }} />
          STATUS: ONLINE_
        </span>
      </div>
    </div>
  );
};

// ─── VERTICAL NAV ─────────────────────────────────────────────────────────────
const VerticalNav = () => {
  const links = [
    { label: 'INDEX', href: '#home' },
    { label: 'WORKS', href: '#flagship-projects' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'CERTS', href: '#certificates' },
    { label: 'CONTACT', href: '#contact' },
  ];
  return (
    <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6">
      {links.map(l => (
        <a
          key={l.label}
          href={l.href}
          className="text-[9px] tracking-[0.4em] uppercase font-bold text-white/30 hover:text-[#FF0066] transition-colors [writing-mode:vertical-rl]"
        >
          {l.label}
        </a>
      ))}
    </nav>
  );
};

// ─── MOBILE BOTTOM NAV ────────────────────────────────────────────────────────
const MobileNav = () => {
  const links = [
    { label: 'Home', href: '#home' },
    { label: 'Works', href: '#flagship-projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Certs', href: '#certificates' },
    { label: 'Contact', href: '#contact' },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden bg-black/95 backdrop-blur border-t border-white/10">
      {links.map(l => (
        <a key={l.label} href={l.href}
          className="flex-1 py-3 text-center text-[9px] tracking-[0.2em] uppercase font-bold text-white/40 hover:text-[#FF0066] transition-colors">
          {l.label}
        </a>
      ))}
    </nav>
  );
};

// ─── HERO ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const gitLog = [
    { hash: 'fc00bc5', msg: 'fix: restore corrupted project files' },
    { hash: '3f1fed0', msg: 'feat: add direct certificate links' },
    { hash: '4164e76', msg: 'chore: remove tracked node_modules' },
    { hash: '2d68c67', msg: 'feat: map raw cert image urls' },
    { hash: 'a45aafe', msg: 'first commit' },
  ];

  return (
    <section id="home" className="min-h-screen pt-9 flex flex-col md:flex-row items-stretch w-full">
      {/* LEFT: Name + intro */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 py-16 relative">
        {/* ID label */}
        <p className="text-[10px] text-[#00FF41] tracking-[0.4em] uppercase mb-6 font-mono">
          {'>'} IDENTITY_FILE: SK_001
        </p>

        {/* Glitched name */}
        <h1 className="font-syne font-black leading-[0.85] tracking-tighter mb-6">
          <GlitchText className="block text-[clamp(3rem,10vw,9rem)] text-white">SHISHIR</GlitchText>
          <GlitchText className="block text-[clamp(2.5rem,8vw,7.5rem)] text-white">KATAKAM</GlitchText>
        </h1>

        <div className="w-24 h-px bg-white/30 mb-6" />

        {/* Role — garbled */}
        <p className="text-[#00FF41] font-mono text-sm md:text-base tracking-[0.15em] mb-3">
          A1/ML D3V3L0P3R // FULL-5TACK
        </p>
        <p className="text-white/40 font-mono text-xs tracking-wide lowercase mb-10 max-w-sm">
          building systems that think / learning at MGIT / currently corrupting your screen
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <a href="#flagship-projects"
            className="px-6 py-3 border border-white/30 text-white text-xs tracking-[0.25em] uppercase font-mono font-bold hover:bg-white hover:text-black transition-all duration-150">
            $ ./view_projects
          </a>
          <a href="#contact"
            className="px-6 py-3 border border-[#FF0066] text-[#FF0066] text-xs tracking-[0.25em] uppercase font-mono font-bold hover:bg-[#FF0066] hover:text-black transition-all duration-150">
            $ ./contact_me
          </a>
        </div>

        {/* Bottom binary strip */}
        <p className="absolute bottom-6 left-6 right-6 text-[8px] text-white/15 font-mono tracking-widest overflow-hidden whitespace-nowrap select-none">
          01001011 01000001 01010100 01000001 01001011 01000001 01001101 00100000 01010011 01001000 01001001 01010011 01001000 01001001 01010010
        </p>

        {/* Decorative page number */}
        <span className="absolute bottom-4 right-6 text-[180px] md:text-[280px] font-black text-outline-white opacity-[0.04] leading-none select-none pointer-events-none">
          001
        </span>
      </div>

      {/* RIGHT: Terminal window */}
      <div className="w-full md:w-[42%] border-t md:border-t-0 md:border-l border-white/10 flex items-center justify-center p-6 md:p-10">
        <div className="terminal-window w-full max-w-md">
          <div className="terminal-bar">
            <span>
              <span className="terminal-dot bg-[#FF0066]" />
              <span className="terminal-dot bg-yellow-500" />
              <span className="terminal-dot bg-[#00FF41]" />
            </span>
            <span className="text-white/40">TERMINAL — shishir@sk-os:~</span>
            <span>× □ −</span>
          </div>
          <div className="p-4 text-[11px] leading-6 font-mono">
            <TermLine cmd="whoami" out="shishir_katakam" />
            <TermLine cmd="cat status.log" out={['AGE: 20  /  LOCATION: HYDERABAD, IN', 'COLLEGE: MGIT (B.TECH IT, ONGOING)']} />
            <TermLine cmd="ls projects/" out={['codevance/  niora/  ai-ar-keyboard/', 'file-converter/']} />
            <TermLine cmd="git log --oneline -5" />
            <div className="mt-1 ml-2 space-y-0.5">
              {gitLog.map(g => (
                <p key={g.hash}>
                  <span className="text-[#FF0066]">{g.hash}</span>
                  <span className="text-white/40"> {g.msg}</span>
                </p>
              ))}
            </div>
            <p className="mt-2 text-[#555]">$ <span className="text-[#00FF41]" style={{ animation: 'blink 0.8s step-end infinite' }}>▮</span></p>
          </div>
        </div>
      </div>
    </section>
  );
};

const TermLine = ({ cmd, out }) => (
  <div className="mb-1">
    <p><span className="text-[#555]">$</span> <span className="text-white">{cmd}</span></p>
    {out && (Array.isArray(out) ? out : [out]).map((o, i) => (
      <p key={i} className="text-[#00FF41] ml-2">{o}</p>
    ))}
  </div>
);

// ─── CONTACT ──────────────────────────────────────────────────────────────────
const Contact = () => (
  <section id="contact" className="py-24 md:py-40 px-6 md:px-12 border-t border-white/10 text-center">
    <p className="text-[10px] text-white/30 tracking-[0.4em] uppercase mb-6 font-mono">[07] // CONTACT_</p>
    <h2 className="font-syne font-black text-[clamp(2rem,7vw,6rem)] leading-none mb-3">
      <GlitchText>GET IN TOUCH_</GlitchText>
    </h2>
    <p className="text-[#00FF41] font-mono text-xs tracking-widest mb-12">// 50% CHANCE I REPLY — honest.log</p>
    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
      <a href="https://github.com/shishir-katakam" target="_blank" rel="noopener noreferrer"
        className="px-8 py-4 border border-[#FF0066] text-[#FF0066] text-xs tracking-[0.3em] uppercase font-mono font-bold hover:bg-[#FF0066] hover:text-black transition-all duration-150">
        $ open github.com/shishir-katakam
      </a>
      <a href="https://www.linkedin.com/in/shishir-katakam/" target="_blank" rel="noopener noreferrer"
        className="px-8 py-4 border border-white/30 text-white text-xs tracking-[0.3em] uppercase font-mono font-bold hover:bg-white hover:text-black transition-all duration-150">
        $ open linkedin/shishir-katakam
      </a>
    </div>
    <p className="mt-20 text-[10px] text-[#00FF41] font-mono tracking-widest">
      [END_OF_FILE // sk_portfolio.exe — 0 ERRORS — PROCESS COMPLETE]
    </p>
  </section>
);

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="border-t border-white/10 px-6 md:px-12 py-5 font-mono text-[9px] text-white/20 tracking-widest uppercase flex flex-col md:flex-row justify-between gap-2 pb-16 md:pb-5">
    <span>© 2025 SHISHIR KATAKAM</span>
    <span className="text-[#FF0066]/40">[CORRUPTED_SIGNAL v1.0]</span>
    <span>DESIGNED WITH BRUTALISM // MGIT</span>
  </footer>
);

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
function PortfolioContent() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="bg-black text-white font-mono w-full overflow-x-hidden edge-lines">
      <Cursor />
      <AnimatePresence>
        {!loaded && <Splash onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      <div className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <TopBar />
        <VerticalNav />
        <MobileNav />

        <main>
          <Hero />
          <Projects />
          <Experience />
          <Skills />
          <Academics />
          <Certificates />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return <ErrorBoundary><PortfolioContent /></ErrorBoundary>;
}
