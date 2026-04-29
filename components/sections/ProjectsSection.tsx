"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PROJECTS = [
  {
    num: "01",
    featured: true,
    title: "ATS Resume Builder & AI Checker",
    desc:
      "LLM-powered app that scores resumes, finds keyword gaps, and auto-generates optimised drafts using NLP pipelines and prompt engineering. 85%+ keyword match accuracy.",
    tags: ["Python", "Django", "LLM APIs", "NLP", "React.js", "Redis"],
    metrics: [
      { val: "85%+", label: "Keyword match accuracy" },
      { val: "3×", label: "Faster than manual" },
    ],
    link: "https://github.com/ak-z-world",
  },
  {
    num: "02",
    featured: false,
    title: "HRMS AI Agent — QLoRA Fine-Tuned",
    desc:
      "HR AI assistant fine-tuned on custom HRMS datasets. 35% domain accuracy gain over baseline. Halved HR query resolution time in production.",
    tags: ["QLoRA", "HuggingFace", "FastAPI", "RLHF", "Docker"],
    metrics: [{ val: "35%", label: "Domain accuracy gain" }],
    link: "https://github.com/ak-z-world",
  },
  {
    num: "03",
    featured: false,
    title: "Django LMS — Performance Overhaul",
    desc:
      "Redis caching + query optimisation cut response time 40%, tripled concurrent user capacity. Sub-100ms average response achieved.",
    tags: ["Django", "DRF", "Redis", "React.js"],
    metrics: [{ val: "40%", label: "Faster response time" }],
    link: "https://github.com/ak-z-world",
  },
  {
    num: "04",
    featured: false,
    title: "FastAPI LMS + Next.js Frontend",
    desc:
      "High-performance async LMS. Sub-100ms API latency. Docker + Jenkins CI/CD pipeline. Full TypeScript frontend.",
    tags: ["FastAPI", "Next.js", "TypeScript", "Docker"],
    metrics: [{ val: "<100ms", label: "API latency" }],
    link: "https://github.com/ak-z-world",
  },
];

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
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-40 px-8 max-w-[1400px] mx-auto">
      <FadeIn>
        <div className="flex items-center gap-4 mb-6">
          <span className="section-label" style={{ fontFamily: "var(--font-space-mono)" }}>
            Frame 004
          </span>
          <div className="h-px w-12 bg-film-gold opacity-30" />
          <span className="section-label">Work</span>
        </div>
      </FadeIn>

      <div className="overflow-hidden mb-20">
        <motion.div
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="display-hero text-[clamp(52px,7vw,96px)] leading-[0.88] text-film-white"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          Projects That <span className="text-gold-gradient">Matter</span>
        </motion.div>
      </div>

      <div className="space-y-8">
        {/* Featured project */}
        <FadeIn delay={0.1}>
          <div
            className="film-card p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start relative overflow-hidden"
            style={{ borderColor: "rgba(201,168,76,0.15)" }}
          >
            {/* Accent corner */}
            <div
              className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
              style={{
                background: "radial-gradient(circle at top right, rgba(201,168,76,0.06), transparent 70%)",
              }}
            />
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-4">
                <span
                  className="text-film-gold"
                  style={{ fontFamily: "var(--font-space-mono)", fontSize: 10, letterSpacing: "0.3em" }}
                >
                  01 — FEATURED
                </span>
              </div>
              <div
                className="text-3xl lg:text-4xl font-black text-film-white leading-tight"
                style={{ fontFamily: "var(--font-bebas)", letterSpacing: "0.02em", fontSize: "clamp(28px,3.5vw,52px)" }}
              >
                {PROJECTS[0].title}
              </div>
              <p className="text-film-silver leading-relaxed" style={{ fontWeight: 300 }}>
                {PROJECTS[0].desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {PROJECTS[0].tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 text-film-gold border border-film-gold/20 bg-film-gold/5 text-[10px] tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-space-mono)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={PROJECTS[0].link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-film-gold text-xs tracking-widest uppercase transition-all hover:gap-4"
                style={{ fontFamily: "var(--font-space-mono)", cursor: "none" }}
              >
                View on GitHub →
              </a>
            </div>
            <div className="space-y-6">
              {PROJECTS[0].metrics.map((m) => (
                <div key={m.label} className="border-l-2 border-film-gold/30 pl-6">
                  <div
                    className="text-4xl text-film-gold mb-1"
                    style={{ fontFamily: "var(--font-bebas)" }}
                  >
                    {m.val}
                  </div>
                  <div
                    className="text-film-silver text-xs tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-space-mono)" }}
                  >
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Other projects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROJECTS.slice(1).map((p, i) => (
            <FadeIn key={p.num} delay={0.1 + i * 0.1}>
              <div className="film-card p-8 h-full flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-film-gold opacity-60"
                      style={{ fontFamily: "var(--font-space-mono)", fontSize: 10, letterSpacing: "0.3em" }}
                    >
                      {p.num}
                    </span>
                    {p.metrics[0] && (
                      <span
                        className="text-film-gold text-sm"
                        style={{ fontFamily: "var(--font-bebas)", fontSize: 20 }}
                      >
                        {p.metrics[0].val}
                      </span>
                    )}
                  </div>
                  <div
                    className="text-film-white text-xl mb-3 leading-tight"
                    style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(20px,2vw,26px)" }}
                  >
                    {p.title}
                  </div>
                  <p
                    className="text-film-silver text-sm leading-relaxed mb-5"
                    style={{ fontWeight: 300 }}
                  >
                    {p.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 text-film-silver border border-[#1a1a1f] text-[9px] tracking-widest uppercase"
                        style={{ fontFamily: "var(--font-space-mono)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-film-gold text-xs tracking-widest uppercase transition-all hover:gap-3 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-space-mono)", cursor: "none" }}
                >
                  View Project →
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}