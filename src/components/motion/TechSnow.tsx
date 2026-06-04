"use client";

import React, { useEffect, useState } from "react";
import {
  FaReact, FaHtml5, FaPhp, FaJava, FaGithub, FaRobot, FaChartLine,
} from "react-icons/fa";
import { SiJavascript, SiCplusplus, SiCanva, SiMysql } from "react-icons/si";
import { TbBrandAdobeIllustrator, TbBrandAdobePhotoshop } from "react-icons/tb";
import { Sparkles } from "lucide-react";

const iconsList = [
  <FaReact key="react" color="#61DAFB" />,
  <SiJavascript key="js" color="#F7DF1E" />,
  <FaHtml5 key="html" color="#E34F26" />,
  <FaPhp key="php" color="#8892BF" />,
  <FaJava key="java" color="#E76F00" />,
  <SiCplusplus key="cpp" color="#659AD2" />,
  <SiMysql key="mysql" color="#4479A1" />,
  <FaRobot key="ai" color="#A855F7" />,
  <Sparkles key="prompt" color="#E879F9" />,
  <FaGithub key="github" color="#FFFFFF" />,
  <TbBrandAdobeIllustrator key="ill" color="#FF9A00" />,
  <SiCanva key="canva" color="#00C4CC" />,
  <TbBrandAdobePhotoshop key="ps" color="#31A8FF" />,
  <FaChartLine key="chart" color="#34D399" />,
];

interface Snowflake {
  id: number;
  iconIndex: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  opacity: number;
  scale: number;
}

export function TechSnow() {
  const [flakes, setFlakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    // Generate random flakes on client side to avoid hydration mismatch
    const newFlakes = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      iconIndex: Math.floor(Math.random() * iconsList.length),
      left: Math.random() * 100, // 0 to 100 vw
      animationDuration: Math.random() * 15 + 10, // 10s to 25s
      animationDelay: Math.random() * -20, // Start randomly throughout the cycle so we don't wait for them
      opacity: Math.random() * 0.3 + 0.1, // 0.1 to 0.4 opacity for subtlety
      scale: Math.random() * 1 + 0.5, // 0.5x to 1.5x size
    }));
    setFlakes(newFlakes);
  }, []);

  if (flakes.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes tech-snow-fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
          }
        }
      `}</style>
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute text-3xl"
          style={{
            left: `${flake.left}vw`,
            opacity: flake.opacity,
            scale: flake.scale, // Scale here
            animation: `tech-snow-fall ${flake.animationDuration}s linear ${flake.animationDelay}s infinite`,
            top: '-10vh' // Start safely above screen
          }}
        >
          {iconsList[flake.iconIndex]}
        </div>
      ))}
    </div>
  );
}
