"use client";

import React, { useState } from "react";
import { skills } from "@/data/portfolio";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaReact, FaHtml5, FaPhp, FaJava, FaGithub, FaRobot, FaChartLine,
} from "react-icons/fa";
import { SiJavascript, SiCplusplus, SiCanva, SiMysql } from "react-icons/si";
import { TbBrandAdobeIllustrator, TbBrandAdobePhotoshop } from "react-icons/tb";
import { Sparkles } from "lucide-react";

// Map iconKey → rendered icon element (all icons live here, not in data)
const iconMap: Record<string, React.ReactNode> = {
  react:        <FaReact size={32} />,
  javascript:   <SiJavascript size={28} />,
  html:         <FaHtml5 size={32} />,
  php:          <FaPhp size={36} />,
  java:         <FaJava size={32} />,
  cplusplus:    <SiCplusplus size={28} />,
  mysql:        <SiMysql size={32} />,
  ai:           <FaRobot size={30} />,
  prompt:       <Sparkles size={28} />,
  github:       <FaGithub size={30} />,
  illustrator:  <TbBrandAdobeIllustrator size={32} />,
  canva:        <SiCanva size={30} />,
  photoshop:    <TbBrandAdobePhotoshop size={32} />,
  marketing:    <FaChartLine size={28} />,
};

const FILTERS = ["All", "Frontend", "Backend", "Tools", "Design"] as const;
type Filter = (typeof FILTERS)[number];

const categoryMap: Record<string, Filter> = {
  frontend: "Frontend",
  backend:  "Backend",
  database: "Backend",
  tools:    "Tools",
  design:   "Design",
};

export function SkillsSection() {
  const [active, setActive] = useState<Filter>("All");

  const filtered = skills.filter((s) =>
    active === "All" ? true : categoryMap[s.category] === active
  );

  return (
    <section id="skills" className="relative py-32 overflow-hidden bg-[#050505]">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
      {/* Glow orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-700/8 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-700/8 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-sm font-medium text-violet-400 uppercase tracking-widest mb-3">
              Expertise
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Skills &amp;{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Technologies
              </span>
            </h2>
            <p className="text-zinc-500 max-w-md text-sm">
              Technologies I work with daily and tools I use to bring ideas to life.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-14">
            {FILTERS.map((f) => (
              <button
                key={f}
                id={`skills-filter-${f.toLowerCase()}`}
                onClick={() => setActive(f)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  active === f
                    ? "bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-[0_0_18px_rgba(139,92,246,0.4)]"
                    : "bg-white/[0.03] text-zinc-500 border border-white/8 hover:text-white hover:bg-white/[0.07]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Skills grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                className="group relative flex flex-col items-center gap-3 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] cursor-default transition-all duration-300 overflow-hidden"
                style={{
                  // Glow border on hover — done via box-shadow driven by CSS var
                  // We use inline style + group-hover via Tailwind
                }}
                whileHover={{ y: -4 }}
              >
                {/* Glow behind icon */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at 50% 40%, ${skill.color}18 0%, transparent 70%)`,
                  }}
                />

                {/* Bottom border glow */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-3/4 transition-all duration-500 rounded-full"
                  style={{ background: skill.color }}
                />

                {/* Icon */}
                <div
                  className="relative z-10 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: skill.color }}
                >
                  {iconMap[skill.iconKey] ?? <span className="text-2xl">?</span>}
                </div>

                {/* Name */}
                <span className="relative z-10 text-xs font-medium text-zinc-400 group-hover:text-white text-center leading-tight transition-colors duration-300">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
