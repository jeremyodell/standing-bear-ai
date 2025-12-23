import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-block px-2.5 py-1 text-xs font-medium text-[var(--text-muted)] bg-white/5 rounded",
        className
      )}
    >
      {children}
    </span>
  );
}
