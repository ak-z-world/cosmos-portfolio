"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <footer
      ref={ref}
      className="border-t border-[#1a1a1f] py-12 px-8"
      style={{ background: "rgba(8,8,8,0.95)" }}
    >
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="text-film-gold glow-gold"
          style={{ fontFamily: "var(--font-bebas)", fontSize: 32, letterSpacing: "0.1em" }}
        >
          AK<span className="text-white opacity-30">.</span>WORLD
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-film-silver text-xs text-center"
          style={{ fontFamily: "var(--font-space-mono)" }}
        >
          © 2025 Arun Kumar S — Built beyond imagination
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex items-center gap-8"
        >
          {[
            { label: "GitHub", href: "https://github.com/ak-z-world" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/arun-kumar-76a825200/" },
            { label: "Email", href: "mailto:sivaarun10@gmail.com" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="nav-link"
              style={{ cursor: "none" }}
            >
              {l.label}
            </a>
          ))}
        </motion.div>
      </div>
    </footer>
  );
}