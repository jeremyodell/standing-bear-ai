"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useMobileMenu } from "@/hooks/useMobileMenu";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "/blog" },
];

export function Navigation() {
  const isScrolled = useScrollPosition(100);
  const { isOpen, toggle, close } = useMobileMenu();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Close mobile menu for any link
    close();

    // Only handle hash links with smooth scrolling
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        const navHeight = 60;
        const top = element.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Minimal nav - floats without background until scrolled */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div
          className="transition-all duration-300"
          style={{
            backgroundColor: isScrolled ? "rgba(10, 10, 10, 0.8)" : "transparent",
            backdropFilter: isScrolled ? "blur(12px)" : "none",
          }}
        >
          <div className="flex items-center justify-between h-20 md:h-24 px-6 md:px-12 lg:px-20">
            {/* Logo */}
            <Link
              href="#hero"
              onClick={(e) => handleLinkClick(e, "#hero")}
              className="block hover:opacity-80 transition-opacity"
            >
              <Image
                src="/images/standing-bear.webp"
                alt="Standing Bear"
                width={44}
                height={44}
                className="rounded"
                priority
              />
            </Link>

            {/* Desktop Navigation - sparse, right-aligned */}
            <ul className="hidden md:flex items-center gap-10">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="text-sm text-[var(--text-muted)] hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {/* Contact - slightly different treatment */}
              <li>
                <Link
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, "#contact")}
                  className="text-sm text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>

            {/* Mobile Menu Toggle - minimal */}
            <button
              onClick={toggle}
              className="md:hidden text-sm text-[var(--text-muted)] hover:text-white transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - full screen takeover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[var(--bg-primary)] flex flex-col justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="space-y-2">
              {[...navLinks, { label: "Contact", href: "#contact" }].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="block text-4xl font-bold text-white hover:text-[var(--accent)] transition-colors py-2"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
