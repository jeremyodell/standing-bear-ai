import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const variantClasses = {
  primary:
    "bg-[var(--accent)] text-white shadow-[0_4px_20px_var(--accent-glow)] hover:bg-[var(--accent-light)] hover:shadow-[0_6px_30px_var(--accent-glow)]",
  secondary:
    "bg-transparent text-[var(--text-primary)] border border-[var(--border)] hover:bg-[var(--bg-elevated)] hover:border-[var(--border-hover)]",
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  href,
  onClick,
  type = "button",
  disabled = false,
  className,
}: ButtonProps) {
  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-250 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0",
    sizeClasses[size],
    variantClasses[variant],
    fullWidth && "w-full",
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {children}
    </button>
  );
}
