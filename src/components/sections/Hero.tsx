"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[var(--bg-primary)]"
    >
      {/* Subtle gradient - intentionally minimal */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(ellipse 100% 80% at 70% 20%, rgba(59, 130, 246, 0.12), transparent)`,
        }}
      />

      {/* Main content - asymmetric, left-aligned */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end pb-16 md:pb-24 lg:pb-32">
        <div className="px-6 md:px-12 lg:px-20 max-w-[1600px]">
          {/* Small tag - positioned unexpectedly */}
          <motion.span
            className="inline-block text-xs tracking-[0.3em] uppercase text-[var(--text-muted)] mb-8 md:mb-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            AI Solutions
          </motion.span>

          {/* The name - MASSIVE, stacked, left-aligned */}
          <div className="relative">
            <motion.h1
              className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-bold leading-[0.85] tracking-[-0.04em] text-white"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              STANDING
            </motion.h1>

            {/* BEAR - the screenshot moment */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
              }}
            >
              {/* Outline text behind - creates depth */}
              <span
                className="absolute text-[15vw] md:text-[12vw] lg:text-[10vw] font-bold leading-[0.85] tracking-[-0.04em] select-none pointer-events-none"
                style={{
                  WebkitTextStroke: "1px rgba(59, 130, 246, 0.3)",
                  WebkitTextFillColor: "transparent",
                  transform: "translate(8px, 8px)",
                }}
                aria-hidden="true"
              >
                BEAR
              </span>
              {/* Main text */}
              <span
                className="relative text-[15vw] md:text-[12vw] lg:text-[10vw] font-bold leading-[0.85] tracking-[-0.04em]"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #3B82F6 50%, #60A5FA 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                BEAR
              </span>
            </motion.div>
          </div>

          {/* Tagline - small, offset right, lots of whitespace */}
          <motion.p
            className="mt-12 md:mt-16 text-base md:text-lg text-[var(--text-secondary)] max-w-md md:ml-auto md:mr-[20%] leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            We build AI that works. No hype, no vaporware—just intelligent systems that solve real problems and scale.
          </motion.p>

          {/* CTAs - subtle, text-based, not buttons */}
          <motion.div
            className="mt-10 md:mt-12 flex flex-wrap gap-8 md:gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 text-sm font-medium text-white hover:text-[var(--accent)] transition-colors"
            >
              View work
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-colors"
            >
              Start a project
            </a>
          </motion.div>
        </div>
      </div>

      {/* Vertical text - breaks the expected pattern */}
      <motion.div
        className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3 }}
      >
        <span
          className="text-xs tracking-[0.4em] uppercase text-[var(--text-muted)]"
          style={{ writingMode: "vertical-rl" }}
        >
          Houston, TX
        </span>
      </motion.div>

      {/* Scroll hint - minimal, bottom right instead of center */}
      <motion.div
        className="absolute bottom-8 right-8 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-white transition-colors"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-xs tracking-wider">Scroll</span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ↓
          </motion.span>
        </a>
      </motion.div>
    </section>
  );
}
