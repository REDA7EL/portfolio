"use client";

import React, { useRef } from "react";
import { experiences } from "@/data/portfolio";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Briefcase, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      {/* Glow accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-20">
            <span className="text-sm font-medium text-violet-400 uppercase tracking-widest mb-3">
              Career
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Work{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-cyan-500/30 to-transparent hidden sm:block" />

          <div className="flex flex-col gap-12">
            {experiences.map((exp, i) => (
              <ScrollReveal key={exp.id} delay={i * 0.15}>
                <motion.div
                  className="relative flex gap-8"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {/* Timeline dot */}
                  <div className="relative hidden sm:flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600/30 to-cyan-600/20 border border-white/10 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                      <Briefcase size={20} className="text-violet-400" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 rounded-2xl border border-white/5 bg-white/[0.02] p-7 hover:border-violet-500/20 hover:bg-white/[0.04] transition-all duration-500 group backdrop-blur-sm">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-violet-300 transition-colors duration-300">
                          {exp.role}
                        </h3>
                        <p className="text-cyan-400 font-medium mt-1">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-zinc-400 text-sm">
                        <Calendar size={14} />
                        <span>{exp.date}</span>
                      </div>
                    </div>
                    <p className="text-zinc-400 leading-relaxed text-sm">{exp.description}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
