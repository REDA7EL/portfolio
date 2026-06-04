"use client";

import React, { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
}

export function FloatingCard({ children, className }: FloatingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;
    
    // Initial entrance animation
    gsap.from(cardRef.current, {
      y: 50,
      opacity: 0,
      rotationX: -15,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    });

    // Floating hover effect
    const onEnter = () => gsap.to(cardRef.current, { y: -10, scale: 1.02, duration: 0.4, ease: "power2.out", boxShadow: "0 25px 50px rgba(0,0,0,0.15)" });
    const onLeave = () => gsap.to(cardRef.current, { y: 0, scale: 1, duration: 0.4, ease: "power2.out", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" });

    cardRef.current.addEventListener("mouseenter", onEnter);
    cardRef.current.addEventListener("mouseleave", onLeave);

    return () => {
      cardRef.current?.removeEventListener("mouseenter", onEnter);
      cardRef.current?.removeEventListener("mouseleave", onLeave);
    };
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className={cn(
        "glassmorphism p-6 rounded-2xl transition-colors duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}
