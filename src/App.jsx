import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CursorProvider, DualText } from './components/HonestMask';
import { Projects, Skills } from './components/ProjectSkills';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', backgroundColor: '#991b1b', color: 'white', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 'bold' }}>Application Crashed</h1>
          <pre style={{ whiteSpace: 'pre-wrap', backgroundColor: 'rgba(0,0,0,0.5)', padding: '20px', borderRadius: '8px' }}>
            {this.state.error?.stack || this.state.error?.toString()}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const Splash = ({ onComplete }) => {
  const scripts = [
    "Initializing AI modules...",
    "Loading Neural Engine...",
    "Compiling Portfolio...",
    "Syncing Dual Reality...",
    "Ready."
  ];

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#0D0D0D] text-[#B7AB98] z-[10000] flex flex-col items-center justify-center p-8 font-mono group cursor-auto"
    >
      <div className="w-full max-w-lg">
        {scripts.map((text, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.4 }}
            className="text-[#555555] text-sm"
          >
            {`> ${text}`}
          </motion.p>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="mt-12 flex flex-col items-center gap-8"
      >
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
            <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-[#555555]" />
            <motion.circle
              cx="64" cy="64" r="60"
              stroke="currentColor" strokeWidth="2" fill="transparent"
              strokeDasharray="377"
              initial={{ strokeDashoffset: 377 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 2, delay: 0.5 }}
              className="text-[#EB5E28]"
            />
          </svg>
          <span className="text-[#EB5E28] font-bold">100%</span>
        </div>

        <button
          onClick={onComplete}
          className="px-12 py-4 border border-[#EB5E28] text-[#EB5E28] font-syne uppercase tracking-[0.3em] hover:bg-[#EB5E28] hover:text-white transition-all duration-300 pointer-events-auto"
        >
          Start
        </button>
      </motion.div>
    </motion.div>
  );
};

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative w-full overflow-hidden shrink-0">
      <h1 className="font-syne text-[clamp(1.5rem,5vw,6rem)] font-black leading-[0.8] tracking-tighter text-center uppercase w-full">
        <DualText
          professional="SHISHIR KATAKAM"
          honest="STILL FIGURING IT OUT"
        />
      </h1>

      <div className="mt-8 md:mt-12 text-center w-full max-w-4xl px-4">
        <p className="text-[#555555] text-sm md:text-lg tracking-[0.2em] md:tracking-[0.4em] uppercase">
          <DualText
            professional="Building the Future with AI & Innovation"
            honest="Hating every line of code that doesn't work"
          />
        </p>
      </div>
    </section>
  );
};

const Navbar = () => {
  const links = ['HOME', 'WORK', 'SKILLS', 'CONTACT'];
  return (
    <nav className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-8 md:gap-12 z-50 hidden md:flex">
      {links.map(link => (
        <a key={link} href={`#${link.toLowerCase()}`} className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#555555] hover:text-[#EB5E28] transition-colors [writing-mode:vertical-rl]">
          {link}
        </a>
      ))}
    </nav>
  );
};

const Sidebar = () => {
  const links = [
    { name: 'GitHub', url: 'https://github.com/shishir-katakam' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/shishir-katakam/' }
  ];
  return (
    <div className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 flex flex-col gap-8 md:gap-12 z-50 hidden md:flex">
      {links.map(link => (
        <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#555555] hover:text-[#EB5E28] transition-colors [writing-mode:vertical-rl] rotate-180">
          {link.name}
        </a>
      ))}
    </div>
  );
};

function PortfolioContent() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <CursorProvider>
      <div className="bg-[#0D0D0D] text-[#B7AB98] min-h-screen font-mono w-full overflow-x-hidden">
        <AnimatePresence>
          {!isLoaded && <Splash onComplete={() => setIsLoaded(true)} />}
        </AnimatePresence>

        <main className={`w-full overflow-x-hidden transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <Navbar />
          <Sidebar />
          <Hero />
          <Projects />
          <Skills />

          <section id="contact" className="py-32 md:py-64 flex flex-col items-center justify-center px-4 text-center w-full">
            <h2 className="font-syne text-[clamp(1.5rem,5vw,6rem)] font-black text-outline hover:text-[#EB5E28] transition-all duration-700 uppercase px-4">
              <DualText professional="GET IN TOUCH" honest="50% CHANCE I REPLY" />
            </h2>
          </section>

          <footer className="p-8 text-center text-[8px] md:text-[10px] tracking-widest text-[#555555] uppercase pb-24 md:pb-8">
            © 2025 Shishir Katakam / Designed with Brutalism
          </footer>
        </main>
      </div>
    </CursorProvider>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <PortfolioContent />
    </ErrorBoundary>
  );
}

export default App;
