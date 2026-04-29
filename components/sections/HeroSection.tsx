"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const ROLES = [
  "Python Engineer",
  "AI Architect",
  "LLM Specialist",
  "Full-Stack Developer",
  "Kaggle Competitor",
];

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx % words.length];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setText(word.slice(0, text.length + 1));
          if (text.length + 1 === word.length)
            setTimeout(() => setDeleting(true), pause);
        } else {
          setText(word.slice(0, text.length - 1));
          if (text.length - 1 === 0) {
            setDeleting(false);
            setIdx((i) => i + 1);
          }
        }
      },
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, idx, words, speed, pause]);

  return text;
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const dur = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            setVal(Math.round(p * to));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to]);

  return (
    <div ref={ref} className="text-5xl font-display text-film-gold glow-gold" style={{ fontFamily: "var(--font-bebas)" }}>
      {val}
      {suffix}
    </div>
  );
}

export default function HeroSection() {
  const role = useTypewriter(ROLES);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const stats = [
    { n: 4, s: "+", label: "AI Agents Built" },
    { n: 500, s: "+", label: "APIs Engineered" },
    { n: 40, s: "%", label: "Perf Gained" },
    { n: 2, s: "", label: "Kaggle Battles" },
  ];

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: 80 }}
    >
      {/* Cinematic background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Deep atmospheric glow */}
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[10%] right-[-5%] w-[50vw] h-[50vw] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(76, 201, 240, 0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Parallax content wrapper */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-[1400px] mx-auto px-8 w-full"
      >
        {/* Frame number / top label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex items-center gap-4 mb-12"
        >
          <span
            className="section-label opacity-50"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            Frame 001
          </span>
          <div className="h-px flex-1 max-w-[60px] bg-film-gold opacity-30" />
          <span className="section-label">Python · AI Engineer · LLM Architect</span>
        </motion.div>

        {/* Main display type */}
        <div className="overflow-hidden mb-2">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 1 }}
            className="display-hero text-[clamp(72px,12vw,180px)] text-film-white leading-[0.88]"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            <span className="text-gold-gradient">ARUN</span>
          </motion.div>
        </div>
        <div className="overflow-hidden mb-2">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 1.12 }}
            className="display-hero text-[clamp(72px,12vw,180px)] text-film-white leading-[0.88]"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            KUMAR S
          </motion.div>
        </div>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex items-center gap-3 mt-8 mb-8"
        >
          <div
            className="h-px w-16"
            style={{ background: "linear-gradient(90deg, transparent, var(--film-gold))" }}
          />
          <span
            className="text-film-silver"
            style={{ fontFamily: "var(--font-space-mono)", fontSize: 13, letterSpacing: "0.2em" }}
          >
            {role}
            <span className="animate-pulse text-film-gold">_</span>
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
          className="max-w-xl text-film-silver leading-relaxed mb-12"
          style={{ fontSize: 15, fontWeight: 300 }}
        >
          I build intelligent systems that think, learn, and evolve. From fine-tuning
          LLMs to architecting production AI agents — I don't just write code,{" "}
          <em className="text-film-white not-italic">I engineer minds.</em>
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.65 }}
          className="flex flex-wrap gap-4 mb-20"
        >
          <button
            className="btn-primary"
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span>Explore My Work</span>
          </button>
          <button
            className="btn-ghost"
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Start a Project
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="flex flex-wrap gap-12 pt-10 border-t border-[#1a1a1f]"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9 + i * 0.1 }}
              className="group"
            >
              <Counter to={s.n} suffix={s.s} />
              <div
                className="mt-1 section-label opacity-50 group-hover:opacity-100 transition-opacity"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-16 right-8 flex flex-col items-center gap-3"
      >
        <span
          className="text-film-gold opacity-40 rotate-90"
          style={{ fontFamily: "var(--font-space-mono)", fontSize: 9, letterSpacing: "0.3em" }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-16 bg-gradient-to-b from-film-gold to-transparent opacity-40"
        />
      </motion.div>
    </section>
  );
}