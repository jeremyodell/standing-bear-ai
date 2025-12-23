export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 md:py-16 border-t border-[var(--border)]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left - brand */}
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-white">Standing Bear</span>
            <span className="text-xs text-[var(--text-muted)]">AI Solutions</span>
          </div>

          {/* Right - minimal info */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-xs text-[var(--text-muted)]">
            <span>Houston, TX</span>
            <span>&copy; {currentYear}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
