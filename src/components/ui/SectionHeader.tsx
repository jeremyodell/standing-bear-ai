"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";

interface SectionHeaderProps {
  label: string;
  title: string;
  className?: string;
}

export function SectionHeader({ label, title, className }: SectionHeaderProps) {
  const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      className={`text-center mb-12 md:mb-16 ${className || ""}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
    >
      <span className="inline-block text-sm font-medium text-[var(--accent)] uppercase tracking-widest mb-4">
        {label}
      </span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
        {title}
      </h2>
    </motion.div>
  );
}
