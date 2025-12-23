"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface ScrollIndicatorProps {
  targetId: string;
}

export function ScrollIndicator({ targetId }: ScrollIndicatorProps) {
  const handleClick = () => {
    const element = document.querySelector(`#${targetId}`);
    if (element) {
      const navHeight = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className="flex flex-col items-center gap-2 text-[var(--text-muted)] text-xs uppercase tracking-widest hover:text-[var(--text-secondary)] transition-colors"
      animate={{ y: [0, 8, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-label={`Scroll to ${targetId} section`}
    >
      <span>Scroll</span>
      <ChevronDown size={20} strokeWidth={2} />
    </motion.button>
  );
}
