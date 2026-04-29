"use client";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Work", id: "projects" },
  { label: "Services", id: "services" },
  { label: "Awards", id: "achievements" },
  { label: "Contact", id: "contact" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-[rgba(8,8,8,0.92)] backdrop-blur-xl border-b border-[#1a1a1f]"
          : "bg-transparent"
      }`}
      style={{ paddingTop: 40 }}
    >
      <div className="max-w-[1400px] mx-auto px-8 py-5 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          className="font-display text-2xl tracking-widest text-film-gold glow-gold"
          style={{ fontFamily: "var(--font-bebas)", cursor: "none" }}
        >
          AK<span className="text-white opacity-40">.</span>WORLD
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="nav-link"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button
          onClick={() => scrollTo("contact")}
          className="hidden md:block btn-primary"
        >
          <span>Let's Build →</span>
        </button>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setOpen(!open)}
          style={{ cursor: "none" }}
          aria-label="Menu"
        >
          <span className={`block w-6 h-px bg-film-gold transition-all duration-300 ${open ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block w-4 h-px bg-film-gold transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-film-gold transition-all duration-300 ${open ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden md:hidden bg-[rgba(8,8,8,0.98)] border-t border-[#1a1a1f]"
      >
        <div className="px-8 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => { scrollTo(link.id); setOpen(false); }}
              className="nav-link text-left"
            >
              {link.label}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.header>
  );
}