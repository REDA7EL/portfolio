import React from "react";


export const siteConfig = {
  name: "Reda",
  role: "Full-Stack Developer",
  tagline: "Bridging the gap between modern development and AI-driven workflows.",
  description:
    "I am a Full-Stack Developer with 2 years of intensive hands-on experience building robust web applications. I specialize in modern web technologies and leverage AI-assisted development to accelerate workflows and solve complex problems efficiently. With a strong foundation in core programming languages and an eye for design, I craft scalable, user-centric digital experiences.",
  email: "contact@redael.dev", // Update with your real email
  socials: {
    github: "https://github.com/REDA7EL",
    linkedin: "https://linkedin.com/in/redael",
    twitter: "https://twitter.com/redael",
  },
};

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

// I have left placeholder projects here. You can update them with your actual projects later!
export const projects: Project[] = [
  {
    id: 1,
    title: "MorocanLocation",
    description:
      "",
    tags: ["Html", "CSS", "JAVASCRIPT"],
    image: "/projects/MorocanLocation.png",
    liveUrl: "#",
    githubUrl: "https://github.com/REDA7EL/MorocanLocation",
  },
  {
  id: 2,
  title: "Management System",
  description: "A full-stack management system built with PHP and MySQL",
  tags: ["PHP", "MySQL", "XAMPP","React"],
  image: "/projects/Management-System.png",
  liveUrl: "",
  githubUrl: "https://github.com/REDA7EL/Management-System",
},
];

export interface Experience {
  id: number;
  role: string;
  company: string;
  date: string;
  description: string;
}

export const experiences: Experience[] = [

];

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Product Manager",
    content: "Reda is an exceptional developer who consistently delivers high-quality code. His ability to integrate AI into our product accelerated our launch timeline significantly.",
  },
  {
    id: 2,
    name: "Ahmed O.",
    role: "Tech Lead",
    content: "Working with Reda is a breeze. He has a deep understanding of full-stack architecture, from designing MySQL databases to crafting beautiful React interfaces.",
  },
  {
    id: 3,
    name: "Yassine B.",
    role: "Client",
    content: "The e-commerce platform Reda built for us exceeded all expectations. It's incredibly fast, user-friendly, and the backend is very easy to manage.",
  },
];

export interface Skill {
  name: string;
  iconKey: string;
  color: string;
  category: "frontend" | "backend" | "database" | "tools" | "design";
}

export const skills: Skill[] = [
  // Frontend
  { name: "React", iconKey: "react", color: "#61DAFB", category: "frontend" },
  { name: "JavaScript", iconKey: "javascript", color: "#F7DF1E", category: "frontend" },
  { name: "HTML & CSS", iconKey: "html", color: "#E34F26", category: "frontend" },

  // Backend & Core Languages
  { name: "PHP", iconKey: "php", color: "#8892BF", category: "backend" },
  { name: "Java", iconKey: "java", color: "#E76F00", category: "backend" },
  { name: "C / C++", iconKey: "cplusplus", color: "#659AD2", category: "backend" },

  // Database
  { name: "MySQL", iconKey: "mysql", color: "#4479A1", category: "database" },

  // Tools & AI
  { name: "AI-Assisted Dev", iconKey: "ai", color: "#A855F7", category: "tools" },
  { name: "Prompt Engineering", iconKey: "prompt", color: "#E879F9", category: "tools" },
  { name: "Git / GitHub", iconKey: "github", color: "#FFFFFF", category: "tools" },

  // Design
  { name: "Adobe Illustrator", iconKey: "illustrator", color: "#FF9A00", category: "design" },
  { name: "Canva", iconKey: "canva", color: "#00C4CC", category: "design" },
  { name: "Photoshop", iconKey: "photoshop", color: "#31A8FF", category: "design" },
  { name: "Marketing Basics", iconKey: "marketing", color: "#34D399", category: "design" },
];

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
