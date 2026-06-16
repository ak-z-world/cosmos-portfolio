"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  // Trigger background styling when scrolled past 20px
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 20));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#000000]/80 backdrop-blur-xl border-b border-neutral-900 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent border-b border-transparent"
      }`}
      // RESTORED: This 40px padding prevents the top from getting cut off by your browser/frame
      style={{ paddingTop: 40 }}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
        
        {/* Left: Logo Section */}
        <Link
          href="/"
          className="block relative flex-shrink-0"
          style={{ cursor: "none" }}
        >
          {/* Sized appropriately so it doesn't render tiny */}
          <Image
            src="/logo.png"
            alt="AK Logo"
            width={140} 
            height={148}
            className="object-contain h-12 w-auto" 
            priority
          />
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center gap-10 lg:gap-14 flex-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-400 hover:text-[#D4AF37] transition-colors duration-300"
              style={{ cursor: "none" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: CTA Button */}
        <Link
          href="/contact"
          className="hidden md:flex items-center justify-center px-7 py-2.5 border border-[#D4AF37]/50 rounded-full text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all duration-300 text-[12px] tracking-[0.15em] font-light flex-shrink-0"
          style={{ cursor: "none" }}
        >
          Let's Build →
        </Link>

        {/* Mobile Hamburger Toggle */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 relative z-50 ml-auto"
          onClick={() => setOpen(!open)}
          style={{ cursor: "none" }}
          aria-label="Toggle Menu"
        >
          <span className={`block w-6 h-px bg-[#D4AF37] transition-all duration-300 ${open ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block w-4 h-px bg-[#D4AF37] transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-[#D4AF37] transition-all duration-300 ${open ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden md:hidden bg-[#030303] border-t border-neutral-900 absolute w-full left-0 top-full shadow-2xl"
      >
        <div className="px-8 py-8 flex flex-col gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-400 hover:text-[#D4AF37] transition-colors duration-300 block text-center"
              style={{ cursor: "none" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 flex items-center justify-center w-full px-6 py-3 border border-[#D4AF37]/50 rounded-full text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300 text-[11px] tracking-[0.2em] uppercase font-light"
            style={{ cursor: "none" }}
          >
            Let's Build →
          </Link>
        </div>
      </motion.div>
    </motion.header>
  );
}