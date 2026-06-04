"use client";

import React, { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { gsap } from "@/lib/gsap";

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}

export function StaggerChildren({
  children,
  className,
  stagger = 0.1,
}: StaggerChildrenProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.children;

    gsap.from(items, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom-=80",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
