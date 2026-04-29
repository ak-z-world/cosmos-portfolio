"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Skill {
  name: string;
  pct: number;
}

const SKILL_GROUPS: { label: string; skills: Skill[] }[] = [
  {
    label: "AI · ML · LLM",
    skills: [
      { name: "LLM Integration", pct: 95 },
      { name: "Prompt Engineering", pct: 92 },
      { name: "QLoRA Fine-Tuning", pct: 85 },
      { name: "RLHF / AI Eval", pct: 80 },
      { name: "NLP / ML", pct: 78 },
    ],
  },
  {
    label: "Backend · APIs",
    skills: [
      { name: "Python / Django", pct: 95 },
      { name: "FastAPI / DRF", pct: 90 },
      { name: "Redis / Caching", pct: 85 },
      { name: "PostgreSQL / MySQL", pct: 82 },
      { name: "WebSocket", pct: 75 },
    ],
  },
  {
    label: "Frontend · DevOps",
    skills: [
      { name: "React / Next.js", pct: 88 },
      { name: "TypeScript / JS", pct: 82 },
      { name: "Docker / Jenkins", pct: 80 },
      { name: "Linux / Git", pct: 85 },
      { name: "AWS (Basics)", pct: 60 },
    ],
  },
];

const TAGS = [
  "Python", "LLM APIs", "HuggingFace", "QLoRA", "RLHF", "Prompt Eng.",
  "Django", "FastAPI", "React", "Next.js", "Docker", "Jenkins", "Redis",
  "PostgreSQL", "NLP", "ML / AI", "TypeScript", "Linux",
];

function SkillBar({ name, pct, delay }: { name: string; pct: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span
          className="text-film-silver"
          style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, letterSpacing: "0.05em" }}
        >
          {name}
        </span>
        <span
          className="text-film-gold"
          style={{ fontFamily: "var(--font-space-mono)", fontSize: 10 }}
        >
          {pct}%
        </span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-bar-fill"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: pct / 100 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: delay + 0.2 }}
          style={{ transformOrigin: "left", height: "100%" }}
        />
      </div>
    </motion.div>
  );
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="py-40 px-8 max-w-[1400px] mx-auto">
      <FadeIn>
        <div className="flex items-center gap-4 mb-6">
          <span className="section-label" style={{ fontFamily: "var(--font-space-mono)" }}>
            Frame 003
          </span>
          <div className="h-px w-12 bg-film-gold opacity-30" />
          <span className="section-label">Capabilities</span>
        </div>
      </FadeIn>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="display-hero text-[clamp(52px,7vw,96px)] leading-[0.88] text-film-white"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            Technical{" "}
            <span className="text-gold-gradient">Arsenal</span>
          </motion.div>
        </div>
      </div>

      {/* Skill groups */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
        {SKILL_GROUPS.map((group, gi) => (
          <FadeIn key={group.label} delay={gi * 0.1}>
            <div className="film-card p-8 space-y-6">
              <div
                className="section-label mb-6 pb-4 border-b border-[#1a1a1f]"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                {group.label}
              </div>
              {group.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  pct={skill.pct}
                  delay={gi * 0.1 + si * 0.08}
                />
              ))}
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Tag cloud */}
      <FadeIn delay={0.3}>
        <div className="flex flex-wrap gap-3">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 border border-[#1a1a1f] text-film-silver text-xs tracking-widest uppercase transition-all duration-300 hover:border-film-gold/30 hover:text-film-gold hover:bg-film-gold/5"
              style={{ fontFamily: "var(--font-space-mono)", cursor: "none" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}