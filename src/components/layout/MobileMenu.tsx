"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { navigation } from "@/lib/constants";
import { slideInFromRight } from "@/lib/animations";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export function MobileMenu({ isOpen, onClose, onLinkClick }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            className="fixed top-20 left-0 right-0 bottom-0 z-40 bg-[var(--bg-primary)]/98 backdrop-blur-xl md:hidden"
            variants={slideInFromRight}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <nav className="flex flex-col p-8 gap-6">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.isCta ? (
                    <Link
                      href={item.href}
                      onClick={(e) => onLinkClick(e, item.href)}
                      className="inline-flex px-6 py-3 bg-[var(--accent)] text-white rounded-lg font-semibold text-lg hover:bg-[var(--accent-light)] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={(e) => onLinkClick(e, item.href)}
                      className="text-xl font-medium text-[var(--text-secondary)] hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
