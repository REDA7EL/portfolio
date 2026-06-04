"use client";

import React, { useState } from "react";
import { testimonials } from "@/data/portfolio";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

export function TestimonialsSection() {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="relative py-32 overflow-hidden">
      {/* Glow accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-600/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-sm font-medium text-cyan-400 uppercase tracking-widest mb-3">
              Kind Words
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              What People{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Say
              </span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Carousel */}
        <ScrollReveal delay={0.1}>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-10 md:p-14 text-center shadow-[0_0_60px_rgba(6,182,212,0.05)]"
              >
                {/* Quote icon */}
                <div className="flex justify-center mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center">
                    <Quote size={24} className="text-cyan-400" />
                  </div>
                </div>

                <p className="text-xl md:text-2xl text-zinc-200 leading-relaxed font-light italic mb-10 max-w-3xl mx-auto">
                  &ldquo;{testimonials[active].content}&rdquo;
                </p>

                <div className="flex flex-col items-center gap-1">
                  <span className="text-white font-semibold text-lg">
                    {testimonials[active].name}
                  </span>
                  <span className="text-cyan-400 text-sm font-medium">
                    {testimonials[active].role}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                id="testimonial-prev"
                onClick={prev}
                className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    id={`testimonial-dot-${i}`}
                    onClick={() => setActive(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      i === active
                        ? "w-8 h-2 bg-cyan-400"
                        : "w-2 h-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <button
                id="testimonial-next"
                onClick={next}
                className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
