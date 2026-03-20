import React from 'react';
import { motion } from 'framer-motion';

// ─── SHARED HELPERS ───────────────────────────────────────────────────────────
const SectionHeader = ({ index, title }) => (
  <div className="mb-12 md:mb-16">
    <h2 className="font-syne font-black text-[clamp(1.8rem,5vw,4.5rem)] leading-none text-white glitch" data-text={`[${index}] // ${title}`}>
      [{index}] // {title}
    </h2>
    <div className="w-full h-px bg-white/10 mt-4" />
  </div>
);

const TerminalCard = ({ children, accent = '#FF0066', label }) => (
  <div className="terminal-window w-full">
    <div className="terminal-bar">
      <span className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-none" style={{ background: accent }} />
        <span className="text-[#00FF41]">◉ RUNNING</span>
        <span className="text-white/30 ml-2">— {label}</span>
      </span>
      <span className="text-white/20">× □ −</span>
    </div>
    <div className="p-5 md:p-6 font-mono text-xs leading-6">{children}</div>
  </div>
);

const Tag = ({ children }) => (
  <span className="text-[10px] font-mono border border-white/20 px-2 py-0.5 text-white/50 uppercase tracking-widest">
    [ {children} ]
  </span>
);

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
export const Projects = () => (
  <React.Fragment>
    <section id="flagship-projects" className="py-20 md:py-32 px-6 md:px-12 border-t border-white/10">
      <p className="text-[10px] text-white/30 font-mono tracking-[0.4em] uppercase mb-2">{'>'} loading project_manifest.json ... DONE</p>
      <SectionHeader index="02" title="PROJECTS_" />

      <div className="flex flex-col gap-6">
        {/* CODEVANCE */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <TerminalCard accent="#FF0066" label="codevance.exe">
            <p className="text-white/40 mb-2">$ run --project codevance --env production</p>
            <div className="text-[#00FF41] mb-4 space-y-0.5">
              <p>{'>'} AI-Powered Coding Journey Tracker</p>
              <p>{'>'} Track programming progress across multiple coding platforms</p>
              <p>{'>'} Visualize stats • Link accounts • Get AI-powered insights + learning paths</p>
              <p>{'>'} <span className="text-white font-bold">STATUS: LIVE ✓</span></p>
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              <Tag>USERS: 500+</Tag><Tag>PLATFORM: WEB</Tag><Tag>STACK: AI+FULL-STACK</Tag>
            </div>
            <a href="https://code.endiidishishir.qzz.io" target="_blank" rel="noopener noreferrer"
              className="inline-block border border-[#FF0066] text-[#FF0066] text-[10px] tracking-[0.25em] uppercase font-mono px-5 py-2 hover:bg-[#FF0066] hover:text-black transition-all duration-150">
              $ ./launch → code.endiidishishir.qzz.io
            </a>
          </TerminalCard>
        </motion.div>

        {/* NIORA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <TerminalCard accent="#00FFFF" label="niora.exe">
            <p className="text-white/40 mb-2">$ run --project niora --mode immersive</p>
            <div className="text-[#00FF41] mb-4 space-y-0.5">
              <p>{'>'} Immersive music platform engineered for deep focus</p>
              <p>{'>'} Curated rain sounds + endless audio odysseys</p>
              <p>{'>'} Distraction-free interface • Engineered for flow states</p>
              <p>{'>'} <span className="text-white font-bold">STATUS: LIVE ✓</span></p>
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              <Tag>TYPE: MUSIC PLATFORM</Tag><Tag>MODE: FOCUS</Tag><Tag>STACK: WEB</Tag>
            </div>
            <a href="https://music.endiidishishir.qzz.io" target="_blank" rel="noopener noreferrer"
              className="inline-block border border-[#00FFFF] text-[#00FFFF] text-[10px] tracking-[0.25em] uppercase font-mono px-5 py-2 hover:bg-[#00FFFF] hover:text-black transition-all duration-150">
              $ ./launch → music.endiidishishir.qzz.io
            </a>
          </TerminalCard>
        </motion.div>
      </div>
    </section>

    {/* LEGACY PROJECTS — ls -la style */}
    <section id="work" className="pb-20 md:pb-32 px-6 md:px-12 border-t border-white/10">
      <div className="pt-12">
        <p className="text-[10px] text-white/30 font-mono tracking-[0.4em] uppercase mb-6">{'>'} ls -la ./legacy_projects/</p>
        <div className="font-mono text-xs border border-white/10">
          {[
            { name: 'AI AR KEYBOARD', stats: 'MEDIAPIPE + JS', honest: 'typing engine of chaos' },
            { name: 'FILE CONVERTER', stats: 'PYTHON + FFMPEG', honest: 'ffmpeg is magic' },
          ].map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-4 py-3 border-b border-white/10 last:border-0 group hover:bg-white/5 transition-colors"
            >
              <span className="text-white/20 shrink-0">drwxr-xr-x</span>
              <span className="text-white font-bold flex-shrink-0 w-48">{p.name}</span>
              <span className="text-[#00FF41] shrink-0">[{p.stats}]</span>
              <span className="text-white/30 italic">{p.honest}</span>
              <span className="ml-auto text-[#FF0066] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </motion.div>
          ))}
        </div>
        <p className="text-[10px] text-[#00FF41] font-mono tracking-[0.2em] mt-3">
          [END OF PROJECT_MANIFEST // 5 ITEMS FOUND // 0 ERRORS]
        </p>
      </div>
    </section>
  </React.Fragment>
);

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
export const Experience = () => {
  const items = [
    {
      pid: '001',
      process: 'uber_fare_prediction.py',
      company: 'ASPIRE KNOWLEDGE AND SKILLS (P) LTD',
      role: 'ML ENGINEER',
      honest: 'LINEAR REGRESSION GO BRRR',
      duration: 'JULY – AUG 2025',
      desc: 'Developed and evaluated regression models (Linear, Lasso, Ridge) for fare prediction. Applied advanced data preprocessing, feature engineering, and outlier removal to achieve high accuracy on real-world ride data.',
      tags: ['MACHINE LEARNING', 'PYTHON', 'SCIKIT-LEARN', 'DATA ANALYSIS'],
      link: 'https://raw.githubusercontent.com/shishir-katakam/portfolio1/main/certificates/3.png',
    },
    {
      pid: '002',
      process: 'cisco_internship.exe',
      company: 'CISCO',
      role: 'VIRTUAL INTERN',
      honest: 'PACKET TRACER SIMULATOR',
      duration: 'JULY 2025',
      desc: 'Completed Introduction to Cybersecurity and Network Essentials programs. Gained hands-on experience with network protocols, security fundamentals, and infrastructure management.',
      tags: ['NETWORK SECURITY', 'PROTOCOLS', 'INFRASTRUCTURE', 'CYBERSECURITY'],
    },
    {
      pid: '003',
      process: 'summer_of_ai.sh',
      company: 'VISWAM AI // IIIT-HYDERABAD',
      role: 'AI RESEARCHER',
      honest: 'GPU FANS GOING BRRR',
      duration: 'MARCH 2025',
      desc: 'Collaborative AI development projects under IIITH faculty mentorship. Practical experience in ML model development, open-source tools, and research methodologies.',
      tags: ['AI DEVELOPMENT', 'RESEARCH', 'COLLABORATION', 'OPEN SOURCE'],
    },
  ];

  return (
    <section id="experience" className="py-20 md:py-32 px-6 md:px-12 border-t border-white/10">
      <SectionHeader index="03" title="EXPERIENCE_" />
      <div className="flex flex-col gap-6">
        {items.map((exp, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <TerminalCard accent="#00FF41" label={exp.process}>
              <p className="text-white/30 mb-3 text-[10px] tracking-widest">
                [PROCESS: {exp.process}]  [PID: {exp.pid}]
              </p>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                <div>
                  <p className="text-[#00FF41] text-[10px] tracking-[0.3em] uppercase mb-1">{exp.company}</p>
                  <p className="text-white font-bold text-sm uppercase tracking-wide">
                    $ execute --role "{exp.role}"
                  </p>
                  <p className="text-white/30 text-[10px] italic">// {exp.honest}</p>
                </div>
                <span className="text-[#00FF41] text-[10px] tracking-widest shrink-0">[{exp.duration}]</span>
              </div>
              <p className="text-white/50 mb-4 leading-relaxed lowercase">{exp.desc}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {exp.tags.map(t => <Tag key={t}>{t}</Tag>)}
              </div>
              {exp.link && (
                <a href={exp.link} target="_blank" rel="noopener noreferrer"
                  className="text-[#FF0066] text-[10px] tracking-widest uppercase font-mono hover:underline">
                  $ ./click_to_view →
                </a>
              )}
            </TerminalCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ─── SKILLS ───────────────────────────────────────────────────────────────────
export const Skills = () => {
  const cats = [
    { label: '// cloud_and_backend', skills: ['GOOGLE CLOUD PLATFORM', 'FIREBASE', 'SUPABASE'] },
    { label: '// automation_and_data', skills: ['N8N', 'RAG (BASIC)', 'NEO4J (BASIC)', 'WEB AUTOMATION'] },
  ];
  return (
    <section id="skills" className="py-20 md:py-32 px-6 md:px-12 border-t border-white/10">
      <p className="text-[10px] text-white/30 font-mono tracking-[0.4em] uppercase mb-3">
        {'>'} cat skills.json | python3 -m json.tool
      </p>
      <SectionHeader index="04" title="NEURAL_STACK_" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {cats.map((cat, i) => (
          <div key={i}>
            <p className="text-[#00FF41] font-mono text-[10px] tracking-[0.3em] mb-6">{cat.label}</p>
            <div className="flex flex-wrap gap-3">
              {cat.skills.map(s => (
                <motion.div key={s} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  className="px-4 py-2 border border-white/20 font-mono text-xs text-white/70 tracking-widest uppercase hover:border-[#FF0066] hover:text-[#FF0066] transition-colors cursor-none">
                  [ {s} ]
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── ACADEMICS ────────────────────────────────────────────────────────────────
export const Academics = () => (
  <section id="academics" className="py-20 md:py-32 px-6 md:px-12 border-t border-white/10">
    <p className="text-[10px] text-white/30 font-mono tracking-[0.4em] uppercase mb-3">
      {'>'} ls -la /education/
    </p>
    <SectionHeader index="05" title="ACADEMICS_" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        {
          status: 'STATUS: ONGOING', statusColor: '#00FF41',
          name: 'MGIT', detail: 'B.TECH IN INFORMATION TECHNOLOGY',
          tag: '// SO_CALLED_A_TOP_COLLEGE', num: '01', accent: '#FF0066',
        },
        {
          status: '2012 – 2022', statusColor: '#555',
          name: 'UoH KENDRIYA VIDYALAYA', detail: 'SCHOOLING',
          tag: '// 10_YEARS_OF_UNIFORMS', num: '02', accent: '#FFFFFF',
        },
      ].map((ac, i) => (
        <motion.div key={i} initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
          className="terminal-window relative overflow-hidden group">
          <div className="h-0.5 w-full" style={{ background: ac.accent }} />
          <div className="p-6 md:p-8 flex flex-col h-full min-h-[200px] justify-between">
            <div>
              <p className="font-mono text-[10px] tracking-widest mb-4" style={{ color: ac.statusColor }}>[{ac.status}]</p>
              <h3 className="font-syne font-black text-2xl md:text-3xl text-white uppercase mb-2 glitch" data-text={ac.name}>{ac.name}</h3>
              <p className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">{ac.detail}</p>
            </div>
            <div className="flex justify-between items-end mt-8">
              <span className="font-mono text-[10px] text-[#00FF41]">{ac.tag}</span>
              <span className="text-[100px] font-black text-white/[0.04] leading-none select-none">{ac.num}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

// ─── CERTIFICATES ─────────────────────────────────────────────────────────────
export const Certificates = () => {
  const certs = [
    { id: '001', org: 'SONY PICTURES ANIMATION & IMAGEWORKS', title: '"This is Animation" Course', link: 'https://raw.githubusercontent.com/shishir-katakam/portfolio1/main/certificates/1.png', featured: true, easter: '// SPIDER-VERSE_IN_THE_MAKING' },
    { id: '002', org: 'GOOGLE x KAGGLE', title: '5-Day AI Agents Intensive Course', link: 'https://raw.githubusercontent.com/shishir-katakam/portfolio1/main/certificates/2.png' },
    { id: '003', org: 'AWS x FORAGE', title: 'Solutions Architecture Job Simulation', link: 'https://raw.githubusercontent.com/shishir-katakam/portfolio1/main/certificates/3.png' },
    { id: '004', org: 'VISWAM AI, IIIT-H, META', title: 'Summer of AI Internship (4 Weeks)', link: 'https://raw.githubusercontent.com/shishir-katakam/portfolio1/main/certificates/4.png' },
    { id: '005', org: 'HACKWITHINDIA — TOP 1000', title: 'HackWithIndia VibeHack', link: 'https://raw.githubusercontent.com/shishir-katakam/portfolio1/main/certificates/5.png' },
    { id: '006', org: 'ASPIRE SKILLS x UBER', title: 'Regression Model for Ride Fare Prediction', link: 'https://raw.githubusercontent.com/shishir-katakam/portfolio1/main/certificates/6.png' },
    { id: '007', org: 'UNIVERSITY OF HELSINKI x REAKTOR', title: 'Elements of AI', link: 'https://raw.githubusercontent.com/shishir-katakam/portfolio1/main/certificates/7.png' },
    { id: '008', org: 'AICTE x MICROSOFT ELEVATE', title: 'Microsoft Azure Internship (4 Weeks)', link: 'https://raw.githubusercontent.com/shishir-katakam/portfolio1/main/certificates/8.png' },
    { id: '009', org: 'CISCO', title: 'Introduction to Cybersecurity', link: 'https://raw.githubusercontent.com/shishir-katakam/portfolio1/main/certificates/9.png' },
    { id: '010', org: 'ONEROADMAP', title: 'Data Analyst Certification', link: 'https://raw.githubusercontent.com/shishir-katakam/portfolio1/main/certificates/10.png' },
    { id: '011', org: 'DELOITTE x FORAGE', title: 'Data Analytics Job Simulation', link: 'https://raw.githubusercontent.com/shishir-katakam/portfolio1/main/certificates/11.png' },
    { id: '012', org: 'FREECODECAMP', title: 'Machine Learning with Python', link: 'https://raw.githubusercontent.com/shishir-katakam/portfolio1/main/certificates/12.png' },
    { id: '013', org: 'NEO4J', title: 'Neo4j Certified Professional', link: 'https://raw.githubusercontent.com/shishir-katakam/portfolio1/main/certificates/13.png' },
  ];

  const featured = certs[0];
  const rest = certs.slice(1);

  return (
    <section id="certificates" className="py-20 md:py-32 px-6 md:px-12 border-t border-white/10">
      <p className="text-[10px] text-[#00FF41] font-mono tracking-[0.3em] mb-3">
        {'>'} SELECT * FROM certificates WHERE verified = TRUE; -- 13 rows found
      </p>
      <SectionHeader index="06" title="VERIFIED_CREDENTIALS_" />

      {/* Featured cert */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="terminal-window border-t-2 border-t-[#FF0066] mb-6">
        <div className="terminal-bar">
          <span className="text-white/30 text-[10px]">
            [CERT_ID: {featured.id}]  [ISSUER: {featured.org}]  [STATUS: VERIFIED ✓]
          </span>
        </div>
        <div className="p-6 md:p-8">
          <h3 className="font-syne font-black text-xl md:text-2xl text-white glitch mb-3" data-text={featured.title}>
            {featured.title}
          </h3>
          <p className="font-mono text-xs text-white/40 mb-6">{featured.easter}</p>
          <a href={featured.link} target="_blank" rel="noopener noreferrer"
            className="inline-block border border-[#FF0066] text-[#FF0066] text-[10px] tracking-[0.25em] uppercase font-mono px-5 py-2 hover:bg-[#FF0066] hover:text-black transition-all duration-150">
            [VIEW CERT →]
          </a>
        </div>
      </motion.div>

      {/* Grid of remaining 12 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rest.map((cert, i) => (
          <motion.div key={cert.id}
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
            className="cert-card p-5 flex flex-col justify-between group">
            <div>
              <p className="font-mono text-[9px] text-white/20 tracking-widest mb-1">[{cert.id}]</p>
              <p className="font-mono text-[9px] text-[#00FF41] tracking-[0.2em] uppercase mb-2">{cert.org}</p>
              <p className="font-syne font-bold text-sm text-white leading-snug mb-4">{cert.title}</p>
            </div>
            <a href={cert.link} target="_blank" rel="noopener noreferrer"
              className="text-[#FF0066] font-mono text-[10px] tracking-widest uppercase hover:underline">
              [VIEW CERT →]
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
