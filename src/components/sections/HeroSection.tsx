"use client";

import React, { useRef, useState, useEffect } from "react";
import { siteConfig } from "@/data/portfolio";
import { useGSAP } from "@/lib/gsap";
import { gsap } from "@/lib/gsap";
import { ArrowDown, Sparkles } from "lucide-react";

const TypewriterText = ({ prefix, name }: { prefix: string, name: string }) => {
  const fullText = prefix + name;
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < fullText.length) {
          setText(fullText.substring(0, text.length + 1));
        } else {
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, 2000);
        }
      } else {
        if (text.length > 0) {
          setText(fullText.substring(0, text.length - 1));
        } else {
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(false);
          }, 500);
        }
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timer);
  }, [text, isDeleting, isPaused, fullText]);

  const currentPrefix = text.substring(0, prefix.length);
  const currentName = text.substring(prefix.length);

  return (
    <>
      <span className="text-white">{currentPrefix}</span>
      <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
        {currentName}
      </span>
      <span className="animate-pulse text-zinc-400 font-light ml-1">|</span>
    </>
  );
};

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from("[data-hero-badge]", { y: 30, opacity: 0, duration: 0.8 })
      .from("[data-hero-name]", { y: 50, opacity: 0, duration: 1 }, "-=0.4")
      .from("[data-hero-role]", { y: 50, opacity: 0, duration: 1 }, "-=0.6")
      .from("[data-hero-desc]", { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
      .from("[data-hero-cta]", { y: 20, opacity: 0, duration: 0.6 }, "-=0.3")
      .from("[data-hero-scroll]", { y: 20, opacity: 0, duration: 0.6 }, "-=0.2");
  }, { scope: containerRef });

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >

      {/* Gradient background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-600/20 rounded-full blur-[128px] animate-pulse [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-[200px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div
          data-hero-badge
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
        >
          <Sparkles size={14} className="text-violet-400" />
          <span className="text-sm text-zinc-400">Available for work</span>
        </div>

        {/* Name */}
        <h1
          data-hero-name
          className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-4"
        >
          <TypewriterText prefix="Hi, I'm " name={siteConfig.name} />
        </h1>

        {/* Role */}
        <p
          data-hero-role
          className="text-xl sm:text-2xl text-zinc-400 font-light mb-6"
        >
          {siteConfig.role}
        </p>

        {/* Description */}
        <p
          data-hero-desc
          className="max-w-2xl mx-auto text-lg text-zinc-500 leading-relaxed mb-10"
        >
          {siteConfig.description}
        </p>

        {/* CTAs */}
        <div data-hero-cta className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="px-8 py-3.5 rounded-full text-sm font-medium bg-gradient-to-r from-violet-600 to-cyan-600 text-white hover:from-violet-500 hover:to-cyan-500 transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:scale-105"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full text-sm font-medium border border-white/10 text-zinc-300 hover:bg-white/5 hover:border-white/20 transition-all duration-300"
          >
            Get In Touch
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          data-hero-scroll
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown size={16} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
}
