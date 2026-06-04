"use client";

import React, { useState } from "react";
import { projects } from "@/data/portfolio";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const categories = ["All", "React", "PHP", "Tailwind CSS"];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = projects.filter((project) =>
    activeFilter === "All" ? true : project.tags.includes(activeFilter)
  );

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-sm font-medium text-cyan-400 uppercase tracking-widest mb-3">
              Portfolio
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Featured{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-12 relative z-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeFilter === category
                    ? "bg-gradient-to-r from-cyan-600 to-violet-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                    : "bg-white/[0.03] text-zinc-400 border border-white/10 hover:bg-white/[0.1] hover:text-white"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="group relative rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-cyan-500/20 transition-all duration-500"
              >
                {/* Project image */}
                <div className="relative h-52 bg-gradient-to-br from-violet-600/10 to-cyan-600/10 overflow-hidden">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(139,92,246,0.05)_25%,rgba(139,92,246,0.05)_50%,transparent_50%,transparent_75%,rgba(6,182,212,0.05)_75%)] bg-[length:20px_20px]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl font-bold text-white/5 group-hover:text-white/10 transition-colors duration-500">
                          0{project.id}
                        </span>
                      </div>
                    </>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent opacity-80" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="flex gap-2 relative z-20">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
                          aria-label={`${project.title} GitHub`}
                        >
                          <FaGithub size={16} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
                          aria-label={`${project.title} Live Demo`}
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-medium border border-white/5 bg-white/[0.03] text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
