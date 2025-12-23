"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const values = [
  {
    id: "01",
    title: "Craftsmanship",
    description: "Every line of code, every architecture decision — we build things right the first time.",
  },
  {
    id: "02",
    title: "Clarity",
    description: "No buzzwords. No fluff. We speak plainly and deliver what we promise.",
  },
  {
    id: "03",
    title: "Partnership",
    description: "Your project gets our full attention. We're invested in your success, not just the invoice.",
  },
];

export function Philosophy() {
  const [ref, isInView] = useInView<HTMLElement>();

  return (
    <section id="philosophy" ref={ref} className="py-32 md:py-48 bg-[var(--bg-secondary)]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[var(--text-muted)] block mb-4">
            How we work
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Three principles.
          </h2>
        </motion.div>

        {/* Values - horizontal layout with numbers */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
          {values.map((value, index) => (
            <motion.div
              key={value.id}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              {/* Large number */}
              <span className="text-6xl md:text-7xl font-bold text-[var(--bg-elevated)] mb-4 block leading-none">
                {value.id}
              </span>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-4">
                {value.title}
              </h3>

              {/* Description */}
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
