"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

export function Services() {
  const [ref, isInView] = useInView<HTMLElement>();

  return (
    <section id="services" ref={ref} className="py-32 md:py-48 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section intro - asymmetric */}
        <motion.div
          className="mb-24 md:mb-32"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[var(--text-muted)] block mb-4">
            What we do
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-2xl">
            Two things, done exceptionally.
          </h2>
        </motion.div>

        {/* Service 1 - Development (large, dominant) */}
        <motion.div
          className="relative mb-32 md:mb-48"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 items-start">
            {/* Label */}
            <div className="lg:sticky lg:top-32">
              <span className="text-8xl md:text-[10rem] lg:text-[12rem] font-bold text-[var(--bg-elevated)] leading-none select-none">
                01
              </span>
            </div>

            {/* Content */}
            <div className="lg:-mt-20">
              <h3 className="text-2xl md:text-4xl font-bold mb-6 tracking-tight">
                AI Application Development
              </h3>
              <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-10 max-w-xl">
                We build custom AI-powered applications from the ground up. Whether you need a prototype to prove a concept or a production system ready to scale, we handle it all.
              </p>

              {/* Features - horizontal flow, not vertical list */}
              <div className="flex flex-wrap gap-3">
                {[
                  "Custom AI applications",
                  "Prototype to production",
                  "AWS architecture",
                  "API integration",
                  "Scalable code",
                ].map((feature) => (
                  <span
                    key={feature}
                    className="px-4 py-2 text-sm text-[var(--text-secondary)] border border-[var(--border)] rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Service 2 - Consulting (different treatment, offset) */}
        <motion.div
          className="relative lg:ml-auto lg:max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative">
            {/* Large background number - positioned differently */}
            <span className="absolute -right-4 md:right-0 -top-16 md:-top-24 text-8xl md:text-[10rem] lg:text-[12rem] font-bold text-[var(--bg-elevated)] leading-none select-none">
              02
            </span>

            {/* Content with border treatment instead of card */}
            <div className="relative border-l-2 border-[var(--accent)] pl-8 md:pl-12">
              <h3 className="text-2xl md:text-4xl font-bold mb-6 tracking-tight">
                AI Consulting
              </h3>
              <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-10">
                Need guidance on your AI strategy? We provide hands-on consulting that goes beyond slide decks. We&apos;ll help you understand what&apos;s possible and how to get there.
              </p>

              {/* Features - different layout than service 1 */}
              <ul className="space-y-4 text-[var(--text-secondary)]">
                {[
                  "AI strategy & roadmapping",
                  "Technical leadership",
                  "Architecture review",
                  "Team augmentation",
                  "Implementation support",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-4">
                    <span className="w-8 h-px bg-[var(--accent)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
