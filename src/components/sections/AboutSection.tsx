"use client";

import React from "react";
import { siteConfig } from "@/data/portfolio";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Code2, Layers, Zap } from "lucide-react";

const highlights = [
  {
    icon: <Code2 size={24} />,
    title: "Clean Code",
    description: "Writing maintainable, scalable code that follows best practices and SOLID principles.",
  },
  {
    icon: <Layers size={24} />,
    title: "Full-Stack",
    description: "End-to-end development from database design to pixel-perfect frontend interfaces.",
  },
  {
    icon: <Zap size={24} />,
    title: "Performance",
    description: "Optimized applications with fast load times, lazy loading, and efficient data fetching.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-sm font-medium text-violet-400 uppercase tracking-widest mb-3">
              About Me
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Passionate about building{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                great software
              </span>
            </h2>
            <p className="max-w-2xl text-lg text-zinc-400 leading-relaxed">
              {siteConfig.description}
            </p>
          </div>
        </ScrollReveal>

        {/* Highlight cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.15}>
              <div className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-violet-500/20 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600/20 to-cyan-600/20 flex items-center justify-center text-violet-400 mb-5 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
