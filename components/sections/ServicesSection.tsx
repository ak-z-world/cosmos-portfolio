"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SERVICES = [
  {
    icon: "🤖",
    title: "AI Agent Development",
    desc: "Custom LLM agents for HR, recruitment, education. Multi-turn, context-aware, production-ready.",
    items: ["LLM API integration", "Prompt engineering", "Memory systems"],
  },
  {
    icon: "🧬",
    title: "LLM Fine-Tuning",
    desc: "Domain training with QLoRA + RLHF. Dataset curation, pipeline, evaluation.",
    items: ["Dataset curation", "QLoRA / LoRA training", "RLHF feedback loops"],
  },
  {
    icon: "⚡",
    title: "Python Full-Stack",
    desc: "End-to-end apps with Django/FastAPI backends and React/Next.js frontends.",
    items: ["Django / FastAPI APIs", "React / Next.js", "Docker + CI/CD"],
  },
  {
    icon: "🔍",
    title: "AI Code Review",
    desc: "Expert analysis of AI-generated code. Output ranking, structured RLHF feedback.",
    items: ["Correctness analysis", "Output ranking", "Prompt improvement"],
  },
  {
    icon: "🚀",
    title: "API Performance Audit",
    desc: "Diagnose slow APIs, Redis caching, query tuning and indexing strategies.",
    items: ["API profiling", "Redis strategy", "DB optimisation"],
  },
  {
    icon: "📊",
    title: "ML Consulting",
    desc: "Pipeline design, feature engineering, model training. Kaggle-grade thinking.",
    items: ["ML architecture", "Feature engineering", "Model tuning"],
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
  const inView = useInView(ref, { once: true, margin: "-50px" });
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

export default function ServicesSection() {
  return (
    <section id="services" className="py-40 px-8 max-w-[1400px] mx-auto">
      <FadeIn>
        <div className="flex items-center gap-4 mb-6">
          <span className="section-label" style={{ fontFamily: "var(--font-space-mono)" }}>
            Frame 005
          </span>
          <div className="h-px w-12 bg-film-gold opacity-30" />
          <span className="section-label">What I Offer</span>
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
          Services I <span className="text-gold-gradient">Deliver</span>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((s, i) => (
          <FadeIn key={s.title} delay={i * 0.08}>
            <div className="film-card p-8 h-full flex flex-col gap-5 group">
              <div className="text-3xl">{s.icon}</div>
              <div
                className="text-film-white text-lg leading-tight"
                style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(18px,1.8vw,24px)", letterSpacing: "0.02em" }}
              >
                {s.title}
              </div>
              <p
                className="text-film-silver text-sm leading-relaxed flex-1"
                style={{ fontWeight: 300 }}
              >
                {s.desc}
              </p>
              <div className="pt-4 border-t border-[#1a1a1f] space-y-2">
                {s.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-film-silver text-xs"
                    style={{ fontFamily: "var(--font-space-mono)" }}
                  >
                    <span className="text-film-gold opacity-50">◆</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}