import React from "react";
import { siteConfig } from "@/data/portfolio";
import { Heart } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#050505]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-lg font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              {siteConfig.name}
            </span>
            <p className="text-sm text-zinc-500">{siteConfig.role}</p>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-violet-500/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] transition-all duration-300"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href={siteConfig.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-violet-500/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] transition-all duration-300"
              aria-label="Twitter"
            >
              <FaTwitter size={18} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-1 text-sm text-zinc-600">
          <span>© {new Date().getFullYear()} {siteConfig.name}. Built with</span>
          <Heart size={14} className="text-violet-500 fill-violet-500" />
        </div>
      </div>
    </footer>
  );
}
