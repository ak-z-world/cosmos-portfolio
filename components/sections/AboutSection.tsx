"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const TRAITS = [
  { icon: "⚡", label: "Builder" },
  { icon: "🧠", label: "AI-Obsessed" },
  { icon: "🔬", label: "Problem Solver" },
  { icon: "🌐", label: "Remote-First" },
  { icon: "🏆", label: "Competitor" },
  { icon: "📖", label: "Constant Learner" },
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
  const inView = useInView(ref, { once: true, margin: "-80px" });
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

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-40 px-8 max-w-[1400px] mx-auto">
      {/* Section label */}
      <FadeIn>
        <div className="flex items-center gap-4 mb-20">
          <span
            className="section-label"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            Frame 002
          </span>
          <div className="h-px w-12 bg-film-gold opacity-30" />
          <span className="section-label">About Me</span>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        {/* Left — large type */}
        <div>
          <div className="overflow-hidden mb-2">
            <motion.div
              ref={ref}
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="display-hero text-[clamp(52px,7vw,96px)] leading-[0.88] text-film-white"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              I Build Things
            </motion.div>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.div
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="display-hero text-[clamp(52px,7vw,96px)] leading-[0.88] text-gold-gradient"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              That Think
            </motion.div>
          </div>

          {/* Gold line badge */}
          <FadeIn delay={0.2}>
            <div
              className="inline-flex items-center gap-3 px-5 py-3 border border-film-gold/20 mb-10"
              style={{ background: "rgba(201,168,76,0.04)" }}
            >
              <div className="w-2 h-2 rounded-full bg-film-gold animate-pulse" />
              <span
                className="section-label"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                1+ Year · AI Engineering · Chennai, India
              </span>
            </div>
          </FadeIn>

          {/* Traits */}
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap gap-3">
              {TRAITS.map((t) => (
                <div
                  key={t.label}
                  className="flex items-center gap-2 px-4 py-2 border border-[#1a1a1f] text-film-silver text-xs tracking-widest uppercase transition-all duration-300 hover:border-film-gold/30 hover:text-film-gold"
                  style={{ fontFamily: "var(--font-space-mono)", cursor: "none" }}
                >
                  <span>{t.icon}</span>
                  <span>{t.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Right — copy */}
        <div className="space-y-8">
          <FadeIn delay={0.15}>
            <p
              className="text-film-silver leading-loose"
              style={{ fontWeight: 300, lineHeight: 2 }}
            >
              I'm <span className="text-film-white font-semibold">Arun Kumar S</span> — a Python
              Full-Stack Developer and AI Engineer. My journey started with a single obsession: why
              can machines compute but not truly understand?
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p
              className="text-film-silver leading-loose"
              style={{ fontWeight: 300, lineHeight: 2 }}
            >
              At <span className="text-film-white font-semibold">Aryu Enterprises</span>, I built
              production AI agents using LLMs, fine-tuned domain models with{" "}
              <span className="text-film-gold">QLoRA</span>, engineered chatbots that halved HR
              query time, and shipped two full LMS platforms — all within a year.
            </p>
          </FadeIn>
          <FadeIn delay={0.35}>
            <p
              className="text-film-silver leading-loose"
              style={{ fontWeight: 300, lineHeight: 2 }}
            >
              I compete on <span className="text-film-white font-semibold">Kaggle</span> (Vesuvius
              Challenge, Google MedGemma), obsessively study frontier AI training, and build things
              beyond imagination.
            </p>
          </FadeIn>

          {/* Quote line */}
          <FadeIn delay={0.45}>
            <div className="pt-8 border-t border-[#1a1a1f]">
              <div
                className="text-film-white italic"
                style={{ fontFamily: "var(--font-dm-sans)", fontSize: 18, fontWeight: 200, lineHeight: 1.7 }}
              >
                "I don't just write code —{" "}
                <span className="text-film-gold not-italic font-normal">
                  I teach machines to think.
                </span>
                "
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}