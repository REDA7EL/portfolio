"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { siteConfig } from "@/data/portfolio";
import { motion } from "framer-motion";
import { Send, Mail, CheckCircle2, Loader2 } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    // Simulate network request — replace with your real form submission (e.g., Web3Forms)
    await new Promise((r) => setTimeout(r, 1500));
    console.log("Form submitted:", data);
    setLoading(false);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputBase =
    "w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-zinc-600 text-sm outline-none transition-all duration-300 focus:border-cyan-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(6,182,212,0.1)]";

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Glow accents */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-sm font-medium text-violet-400 uppercase tracking-widest mb-3">
              Let&apos;s Talk
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5">
              Get In{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <p className="text-zinc-400 max-w-lg text-base leading-relaxed">
              Have a project in mind or want to collaborate? Send me a message and
              I&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* Left column — info */}
          <ScrollReveal className="md:col-span-2" delay={0.1}>
            <div className="flex flex-col gap-5 h-full">
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-7 backdrop-blur-sm">
                <h3 className="text-white font-semibold text-lg mb-2">Direct Email</h3>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm flex items-center gap-2"
                >
                  <Mail size={14} />
                  {siteConfig.email}
                </a>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-7 backdrop-blur-sm">
                <h3 className="text-white font-semibold text-lg mb-4">Socials</h3>
                <div className="flex flex-col gap-3">
                  <a
                    href={siteConfig.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all">
                      <FaGithub size={16} />
                    </div>
                    <span className="text-sm">GitHub</span>
                  </a>
                  <a
                    href={siteConfig.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all">
                      <FaLinkedin size={16} />
                    </div>
                    <span className="text-sm">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right column — form */}
          <ScrollReveal className="md:col-span-3" delay={0.2}>
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm relative overflow-hidden">
              {/* Success overlay */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-sm z-10 rounded-2xl gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-green-400" />
                  </div>
                  <p className="text-white font-semibold text-lg">Message Sent!</p>
                  <p className="text-zinc-400 text-sm">I&apos;ll get back to you soon.</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-name" className="text-xs text-zinc-400 uppercase tracking-widest">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      {...register("name")}
                      placeholder="Your name"
                      className={cn(inputBase, errors.name && "border-red-500/50")}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-email" className="text-xs text-zinc-400 uppercase tracking-widest">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      {...register("email")}
                      placeholder="your@email.com"
                      className={cn(inputBase, errors.email && "border-red-500/50")}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-subject" className="text-xs text-zinc-400 uppercase tracking-widest">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    {...register("subject")}
                    placeholder="What's this about?"
                    className={cn(inputBase, errors.subject && "border-red-500/50")}
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-xs">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-message" className="text-xs text-zinc-400 uppercase tracking-widest">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    {...register("message")}
                    placeholder="Tell me about your project..."
                    className={cn(inputBase, "resize-none", errors.message && "border-red-500/50")}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  id="contact-submit"
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold text-sm hover:from-violet-500 hover:to-cyan-500 transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
