"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useScroll } from "framer-motion";
import { Bot, Code2, Cpu, Zap, ChevronRight, Layers, Terminal } from "lucide-react";
// Import your Nav component (adjust the path if necessary based on your folder structure)
import Nav from "@/components/ui/Nav";

// --- Types & Interfaces ---
interface CardProps {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

interface StatProps {
  value: number;
  suffix: string;
  label: string;
}

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  index: number;
}

// --- Custom Premium Cursor Component ---
const CustomCursor = () => {
  const [mounted, setMounted] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#D4AF37]/60 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#D4AF37] rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_#D4AF37]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
};

// --- Animated Counter Component ---
const AnimatedCounter = ({ value, suffix, label }: StatProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 40, damping: 20 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  const [current, setCurrent] = React.useState(0);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setCurrent(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <div ref={ref} className="text-center p-6 bg-neutral-950/40 border border-neutral-900 rounded-2xl backdrop-blur-md relative overflow-hidden group hover:border-[#D4AF37]/30 transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <motion.h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-mono">
        {current}
        <span className="text-[#D4AF37]">{suffix}</span>
      </motion.h3>
      <p className="text-xs md:text-sm text-neutral-400 mt-2 font-medium tracking-wide uppercase">{label}</p>
    </div>
  );
};

// --- Interactive Skill Card Component ---
const SkillCard = ({ title, icon, skills }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="relative p-6 bg-[#050505] border border-neutral-900 rounded-2xl group overflow-hidden cursor-none"
    >
      <div className="absolute inset-0 border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/40 rounded-2xl transition-all duration-500 pointer-events-none" />
      <div className="absolute -inset-px bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm rounded-2xl pointer-events-none" />
      
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-neutral-900/80 rounded-xl text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500 shadow-inner relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative z-10">{icon}</span>
        </div>
        <h3 className="text-lg font-semibold text-white group-hover:text-[#D4AF37] transition-colors duration-300">{title}</h3>
      </div>

      <ul className="space-y-2">
        {skills.map((skill, index) => (
          <li key={index} className="flex items-center text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors duration-200">
            <ChevronRight className="w-4 h-4 text-[#D4AF37]/60 mr-1 flex-shrink-0" />
            {skill}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

// --- Timeline Item Component ---
const TimelineItem = ({ year, title, description, index }: TimelineItemProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-start md:items-center mb-16 last:mb-0 w-full cursor-none`}
    >
      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-[#D4AF37] shadow-[0_0_10px_#D4AF37] z-10 hidden md:block" />
      
      <div className="w-full md:w-1/2 pl-8 md:pl-0 md:px-8">
        <div className={`p-6 bg-neutral-950/60 border border-neutral-900 rounded-2xl backdrop-blur-sm relative group hover:border-[#D4AF37]/20 transition-colors duration-300 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
          <span className="inline-block px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono rounded-full mb-3">
            {year}
          </span>
          <h4 className="text-lg font-bold text-white mb-2 tracking-wide">{title}</h4>
          <p className="text-sm text-neutral-400 leading-relaxed">{description}</p>
        </div>
      </div>
      <div className="hidden md:block w-1/2" />
    </motion.div>
  );
};

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const techBadges = [
    "Python", "Django", "FastAPI", "LangChain", "CrewAI", "OpenAI", "Gemini", 
    "PostgreSQL", "Redis", "Celery", "Docker", "Linux", "React", "Next.js", 
    "Tailwind CSS", "TypeScript", "Git", "AWS"
  ];

  return (
    <main ref={containerRef} className="relative bg-[#000000] text-white min-h-screen overflow-hidden selection:bg-[#D4AF37]/30 selection:text-white pb-24 cursor-none">
      
      <CustomCursor />
      <Nav /> {/* Injected Navbar */}

      {/* --- BACKGROUND GRAPHICS --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjRkZGIi8+Cjwvc3ZnPg==')] pointer-events-none" />

      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Floating Ambient Gold Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-[#D4AF37]/20 rounded-full blur-[1px] pointer-events-none hidden md:block"
          style={{
            top: `${15 + i * 13}%`,
            left: `${10 + (i * 17) % 80}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Added pt-40 to clear the absolute Nav bar */}
      <div className="max-w-6xl mx-auto relative z-10 space-y-32 pt-40 px-4 sm:px-6 lg:px-8">
        
        {/* --- SECTION 1: HERO INTRO & BIO --- */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left: Elite Profile Container */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl p-[2px] bg-gradient-to-b from-[#D4AF37]/60 via-neutral-900 to-neutral-950 shadow-[0_0_50px_rgba(212,175,55,0.1)]"
              >
                <div className="w-full h-full rounded-3xl bg-[#030303] overflow-hidden flex items-center justify-center relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                  
                  {/* High-Tech Animated Core */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-48 h-48 rounded-full border border-dashed border-[#D4AF37]" 
                    />
                  </div>

                  <div className="text-center space-y-3 z-20">
                    <Terminal className="w-16 h-16 text-[#D4AF37] mx-auto opacity-90 group-hover:scale-110 transition-transform duration-500" />
                    <p className="font-mono text-xs text-neutral-400 tracking-[0.2em] uppercase">Architecture / Systems</p>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Personal Introduction */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-2"
            >
              <span className="text-[#D4AF37] font-mono text-sm tracking-widest uppercase">System Architect & Developer</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white font-sans">
                Engineering The <span className="text-[#D4AF37] font-serif italic tracking-wide font-medium relative inline-block">
                  Future
                  <span className="absolute left-0 bottom-1 w-full h-[2px] bg-[#D4AF37]/30 blur-[0.5px]" />
                </span>
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-neutral-300 text-base sm:text-lg leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0"
            >
              I don't just write code; I architect systems designed to scale. As an AI Engineer and Python Full Stack Developer with <strong className="text-[#D4AF37] font-medium">1+ year of intense, high-impact engineering</strong>, my focus is bridging the gap between algorithmic complexity and hyper-optimal business operations.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              My engineering philosophy is simple: build clean, deterministic architectures that humans can read and machines can execute with zero latency. From sovereign multi-agent RAG pipelines to high-throughput Django & FastAPI backends, I deliver production-grade infrastructure that fundamentally transforms performance.
            </motion.p>
          </div>
        </section>

        {/* --- SECTION 2: METRICS / STATISTICS --- */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <AnimatedCounter value={1} suffix="+" label="Year Engineering" />
          <AnimatedCounter value={500} suffix="+" label="Commits & Solutions" />
          <AnimatedCounter value={40} suffix="%" label="API Latency Reduction" />
          <AnimatedCounter value={15} suffix="+" label="Production Deploys" />
        </section>

        {/* --- SECTION 3: ENGINEERING PHILOSOPHY CARDS --- */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-wide text-white">Engineering Standards</h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-2">The architectural pillars that define my production deployments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SkillCard 
              title="Autonomous AI" 
              icon={<Bot className="w-5 h-5" />} 
              skills={["Agentic Workflows", "LLM Orchestration", "RAG Architectures", "Deterministic Output"]} 
            />
            <SkillCard 
              title="Scalable Backend" 
              icon={<Code2 className="w-5 h-5" />} 
              skills={["Django & FastAPI", "Microservices", "RESTful Design", "Relational Integrity"]} 
            />
            <SkillCard 
              title="Systems Opt." 
              icon={<Zap className="w-5 h-5" />} 
              skills={["Query Profiling", "Redis Caching", "Async Queues", "Memory Management"]} 
            />
            <SkillCard 
              title="Infrastructure" 
              icon={<Layers className="w-5 h-5" />} 
              skills={["Dockerization", "Linux Servers", "Nginx Proxies", "CI/CD Pipelines"]} 
            />
          </div>
        </section>

        {/* --- SECTION 4: SCROLL-LINKED TRAJECTORY --- */}
        <section className="space-y-12 relative">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-wide text-white">Engineering Trajectory</h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-2">A hyper-accelerated timeline of technical mastery and execution.</p>
          </div>

          <div className="relative max-w-3xl mx-auto mt-16">
            {/* Center Line Matrix */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-neutral-900 transform -translate-x-1/2" />
            <motion.div 
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#D4AF37] via-neutral-600 to-transparent transform -translate-x-1/2 origin-top"
              style={{ scaleY }}
            />

            <div className="space-y-1">
              <TimelineItem 
                year="Phase I" 
                title="Algorithmic Foundations" 
                description="Engineered core Python mechanics, mastering data structures, asynchronous task modeling, and establishing highly modular scripting paradigms." 
                index={0}
              />
              <TimelineItem 
                year="Phase II" 
                title="High-Throughput Backends" 
                description="Architected relational databases and designed production-grade REST APIs using Django and FastAPI, targeting sub-100ms response latencies." 
                index={1}
              />
              <TimelineItem 
                year="Phase III" 
                title="Applied LLM Integrations" 
                description="Injected large language models into existing data ecosystems, handling dense prompt vectors, semantic search chains, and robust error handling." 
                index={2}
              />
              <TimelineItem 
                year="Phase IV" 
                title="Autonomous Multi-Agent Runtimes" 
                description="Deployed deterministic AI state machines. Engineered sovereign agentic workflows capable of executing complex, multi-turn business operations." 
                index={3}
              />
              <TimelineItem 
                year="Present" 
                title="Leading Enterprise Architecture" 
                description="Currently focused on edge-tier API performance and bridging raw algorithmic AI capabilities with reliable, real-world business infrastructure." 
                index={4}
              />
            </div>
          </div>
        </section>

        {/* --- SECTION 5: HORIZONTAL TECH BADGES --- */}
        <section className="space-y-6 pt-8">
          <div className="text-center">
            <p className="text-xs font-mono tracking-widest text-neutral-500 uppercase">Production Tech Stack</p>
          </div>
          
          <div className="w-full flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {techBadges.map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                whileHover={{ 
                  scale: 1.05, 
                  borderColor: "rgba(212,175,55,0.5)",
                  boxShadow: "0 0 12px rgba(212,175,55,0.15)",
                  color: "#D4AF37"
                }}
                className="px-4 py-2 text-xs sm:text-sm font-mono font-medium rounded-full bg-neutral-950 border border-neutral-900 text-neutral-400 transition-all duration-300 cursor-none"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}