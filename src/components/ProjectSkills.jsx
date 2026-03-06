import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DualText } from './HonestMask';

const ProjectRow = ({ professional, honest, index, stats }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full border-b border-muted py-12 flex flex-col md:flex-row justify-between items-center group relative"
        >
            <div className="relative">
                <span className="text-muted text-xs font-mono mb-4 block tracking-[0.3em]">0{index + 1}</span>
                <h3 className="font-syne text-[clamp(1.2rem,4vw,5rem)] font-black leading-none uppercase text-outline group-hover:text-primary transition-all duration-500 whitespace-nowrap overflow-visible">
                    <DualText professional={professional} honest={honest} />
                </h3>
            </div>

            <div className="relative text-right mt-4 md:mt-0 font-mono text-muted text-sm tracking-[0.2em] uppercase">
                {stats}
            </div>

            {/* Background Parallax Reveal (Mock) */}
            <div className="absolute inset-x-0 inset-y-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
                <div className="w-full h-full bg-accent mix-blend-overlay blur-3xl opacity-20" />
            </div>
        </motion.div>
    );
};

export const Projects = () => {
    const projects = [
        { professional: "AI AR KEYBOARD", honest: "TYPING ENGINE OF CHAOS", stats: "500+ DAILY USERS" },
        { professional: "MGIT BUS TRACKER", honest: "BUS IS NEVER ON TIME", stats: "10K+ CONVERSIONS" },
        { professional: "FILE CONVERTER", honest: "FFMPEG IS MAGIC", stats: "PYTHON + BOT API" }
    ];

    return (
        <section id="work" className="py-32 px-12">
            <h2 className="text-[10px] tracking-[0.5em] text-accent font-bold uppercase mb-24">Work / Legacy</h2>
            <div className="flex flex-col">
                {projects.map((p, i) => (
                    <ProjectRow key={i} index={i} {...p} />
                ))}
            </div>
        </section>
    );
};

export const Skills = () => {
    const categories = [
        {
            name: "Expert",
            skills: [
                { name: "Python", honest: "VARS X, XX, XXX" },
                { name: "Problem Solving", honest: "GOOGLE + CHATGPT" },
                { name: "Algorithms", honest: "LEETCODE GRIND" }
            ]
        },
        {
            name: "Advanced",
            skills: [
                { name: "React", honest: "HOOKS & PRAYERS" },
                { name: "JavaScript", honest: "STRINGS AS OBJECTS?" },
                { name: "Firebase", honest: "FREE TIER LIMITS" }
            ]
        }
    ];

    return (
        <section id="skills" className="py-32 px-12">
            <h2 className="text-[10px] tracking-[0.5em] text-accent font-bold uppercase mb-24">Neural Stack / Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                {categories.map((cat, i) => (
                    <div key={i}>
                        <h3 className="text-muted text-xs tracking-[0.3em] uppercase mb-12">{cat.name}</h3>
                        <div className="flex flex-wrap gap-4">
                            {cat.skills.map((skill, si) => (
                                <div key={si} className="px-6 py-3 border border-muted hover:border-accent transition-colors group">
                                    <DualText professional={skill.name} honest={skill.honest} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
