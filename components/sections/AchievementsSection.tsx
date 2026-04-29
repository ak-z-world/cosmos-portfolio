"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ACHIEVEMENTS = [
  {
    icon: "🏆",
    title: "Kaggle — Google MedGemma Impact Challenge",
    desc: "Evaluated + fine-tuned medical LLM outputs with RLHF-style feedback for clinical accuracy.",
    year: "2024",
  },
  {
    icon: "🌊",
    title: "Kaggle — Vesuvius Challenge",
    desc: "Deep learning & image segmentation to detect ink on carbonised ancient scrolls.",
    year: "2024",
  },
  {
    icon: "🧠",
    title: "4+ Production AI Agents Deployed",
    desc: "ATS checker, resume builder, HRMS bot, HR chatbot — all live in production.",
    year: "2023–2024",
  },
  {
    icon: "⚡",
    title: "40% API Performance Improvement",
    desc: "Redis caching on Django LMS — 40% faster, 3× concurrent user capacity.",
    year: "2023",
  },
  {
    icon: "🎓",
    title: "MBA — Rathinam Institute of Management",
    desc: "Masters bridging tech management with data-driven business strategy.",
    year: "2021–2023",
  },
  {
    icon: "🔬",
    title: "QLoRA HRMS — 35% Accuracy Gain",
    desc: "Custom dataset + QLoRA fine-tuning surpassed baseline by 35% on HR domain tasks.",
    year: "2024",
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
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-40 px-8 max-w-[1400px] mx-auto">
      <FadeIn>
        <div className="flex items-center gap-4 mb-6">
          <span className="section-label" style={{ fontFamily: "var(--font-space-mono)" }}>
            Frame 006
          </span>
          <div className="h-px w-12 bg-film-gold opacity-30" />
          <span className="section-label">Recognition</span>
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
          Achievements &{" "}
          <span className="text-gold-gradient">Milestones</span>
        </motion.div>
      </div>

      {/* Timeline style list */}
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-px hidden md:block"
          style={{ background: "linear-gradient(to bottom, rgba(201,168,76,0.3), transparent)" }}
        />

        <div className="space-y-1 md:pl-12">
          {ACHIEVEMENTS.map((a, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                className="group relative flex flex-col md:flex-row md:items-start gap-6 p-8 border border-transparent hover:border-[#1a1a1f] transition-all duration-500 hover:bg-[rgba(17,17,20,0.6)]"
              >
                {/* Dot on timeline */}
                <div className="absolute -left-[46px] top-10 hidden md:flex items-center justify-center w-4 h-4 border border-film-gold/30 bg-film-black group-hover:bg-film-gold/10 transition-colors">
                  <div className="w-1.5 h-1.5 bg-film-gold rounded-full" />
                </div>

                <div className="text-3xl flex-shrink-0">{a.icon}</div>
                <div className="flex-1">
                  <div
                    className="text-film-white text-xl mb-2 leading-tight"
                    style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(18px,2vw,24px)", letterSpacing: "0.02em" }}
                  >
                    {a.title}
                  </div>
                  <p
                    className="text-film-silver text-sm leading-relaxed"
                    style={{ fontWeight: 300 }}
                  >
                    {a.desc}
                  </p>
                </div>
                <div
                  className="flex-shrink-0 text-film-gold opacity-50 self-start md:self-center"
                  style={{ fontFamily: "var(--font-space-mono)", fontSize: 11, letterSpacing: "0.15em" }}
                >
                  {a.year}
                </div>
              </div>
              {i < ACHIEVEMENTS.length - 1 && <div className="hr-gold mx-8" />}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}