"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cardHover } from "@/lib/animations";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  as?: "div" | "article" | "section";
}

export function GlassCard({
  children,
  className,
  hover = true,
  as = "div",
}: GlassCardProps) {
  const Component = motion[as] as typeof motion.div;

  if (!hover) {
    return (
      <Component
        className={cn(
          "bg-[var(--bg-elevated)] backdrop-blur-xl border border-[var(--border)] rounded-2xl",
          className
        )}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      className={cn(
        "bg-[var(--bg-elevated)] backdrop-blur-xl border border-[var(--border)] rounded-2xl transition-colors",
        "hover:bg-[var(--bg-elevated-hover)] hover:border-[var(--border-hover)]",
        className
      )}
      variants={cardHover}
      initial="rest"
      whileHover="hover"
    >
      {children}
    </Component>
  );
}
