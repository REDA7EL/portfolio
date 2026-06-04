"use client";

import React, { useState, useEffect } from "react";
import { navLinks, siteConfig } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { Menu, X, Download } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="text-xl font-bold tracking-tight bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"
        >
          {siteConfig.name}
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-violet-400 after:to-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="/cv.pdf"
            download="Reda_CV.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-white/10 text-zinc-300 hover:bg-white/5 hover:border-white/20 hover:text-white transition-all duration-300"
          >
            <Download size={16} /> CV
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-violet-600 to-cyan-600 text-white hover:from-violet-500 hover:to-cyan-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
          >
            Let&apos;s Talk
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5 transition-all duration-300 overflow-hidden",
          isMobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="flex flex-col items-center gap-6 py-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="text-lg text-zinc-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="flex flex-col items-center gap-4">
            <a
              href="/cv.pdf"
              download="Reda_CV.pdf"
              onClick={() => setIsMobileOpen(false)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium border border-white/10 text-zinc-300 w-full justify-center"
            >
              <Download size={16} /> Download CV
            </a>
            <a
              href="#contact"
              onClick={() => setIsMobileOpen(false)}
              className="inline-flex px-6 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-violet-600 to-cyan-600 text-white w-full justify-center"
            >
              Let&apos;s Talk
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
