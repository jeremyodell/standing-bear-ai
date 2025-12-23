"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

export function About() {
  const [ref, isInView] = useInView<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className="py-32 md:py-48"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Large pull quote - the visual anchor */}
        <motion.div
          className="mb-20 md:mb-32"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight max-w-4xl">
            Small team.{" "}
            <span className="text-[var(--text-muted)]">Serious capability.</span>
          </p>
        </motion.div>

        {/* Two column content - asymmetric */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - narrative */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Founded in Texas, Standing Bear is built on principles of
              resilience, craftsmanship, and lasting value. We&apos;re not a sprawling
              agency—we&apos;re a focused team that knows how to ship.
            </p>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Every project gets our full attention. We&apos;re not trying to be the
              biggest. We&apos;re trying to be the best at what we do: creating AI
              solutions that actually solve problems and stand the test of time.
            </p>
          </motion.div>

          {/* Right - specifics, different treatment */}
          <motion.div
            className="lg:pt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="border-l border-[var(--border)] pl-8 space-y-8">
              <div>
                <span className="text-sm text-[var(--text-muted)] block mb-2">Team</span>
                <p className="text-white">System architect, AI engineer, development team</p>
              </div>
              <div>
                <span className="text-sm text-[var(--text-muted)] block mb-2">Location</span>
                <p className="text-white">Houston, TX</p>
              </div>
              <div>
                <span className="text-sm text-[var(--text-muted)] block mb-2">Focus</span>
                <p className="text-white">AI applications & consulting</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
