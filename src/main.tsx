import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TechSnow } from "@/components/motion/TechSnow";
import App from "./App";
import "./globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="min-h-full flex flex-col relative h-full antialiased font-sans">
      <TechSnow />
      <App />
    </div>
  </StrictMode>
);
