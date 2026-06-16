"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { 
  Bot, 
  Cpu, 
  Code2, 
  Server, 
  Zap, 
  Workflow, 
  MessageSquare, 
  Lightbulb,
  CheckCircle2,
  ShieldCheck,
  Search,
  PenTool,
  Rocket,
  Activity,
  ArrowRight
} from "lucide-react";
import Nav from "@/components/ui/Nav";

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

// --- Elite Data Models ---

const services = [
  {
    icon: <Bot className="w-6 h-6" />,
    title: "Autonomous AI Systems",
    description: "Architecting deterministic multi-agent workflows capable of reasoning, planning, and executing complex business logic with zero human intervention.",
    deliverables: ["Agentic Frameworks", "CrewAI & LangGraph", "State Machines", "Sovereign Workflows", "RAG Infrastructure", "Real-time Orchestration"]
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Custom LLM Architecture",
    description: "Embedding large language models deep into enterprise operations. Focusing on low-latency retrieval, contextual density, and semantic accuracy.",
    deliverables: ["Vector Search Pipelines", "Semantic Embeddings", "Context Injection", "Prompt Engineering", "API Bridging", "Model Fine-tuning"]
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "High-Throughput Backends",
    description: "Engineering robust, scalable Python architectures. I build full-stack systems designed to handle intensive data loads and complex relational states.",
    deliverables: ["Django ORM", "FastAPI Runtimes", "Next.js Interfacing", "PostgreSQL", "Data Integrity", "Microservice Patterns"]
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: "Enterprise API Design",
    description: "Developing highly secure, production-grade RESTful APIs. Structuring stateless protocols designed for hyper-optimal sub-100ms response times.",
    deliverables: ["JWT & OAuth2", "RBAC Security", "Redis Caching", "Celery Workers", "Async Processing", "Rate Limiting"]
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "System Profiling & Scaling",
    description: "Identifying algorithmic bottlenecks and drastically reducing compute latency. Transforming sluggish systems into highly responsive, lightweight runtimes.",
    deliverables: ["Query Optimization", "B-Tree Indexing", "Memory Management", "Task Offloading", "Load Distribution", "Runtime Profiling"]
  },
  {
    icon: <Workflow className="w-6 h-6" />,
    title: "Deterministic Automation",
    description: "Eliminating operational drag by scripting flawless automation pipelines that connect isolated business systems into a unified structural flow.",
    deliverables: ["CRM Bridging", "Data ETL Pipelines", "Scheduled Cron Jobs", "WhatsApp Bots", "Email Parsing", "Webhook Listeners"]
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Contextual AI Interfaces",
    description: "Constructing persistent, memory-aware conversational engines that transcend basic chatbots by utilizing active tool-calling and multi-step reasoning.",
    deliverables: ["Vector Memory", "Tool Execution", "Dynamic Routing", "Context Windowing", "Multi-turn Logic", "Fall-back Protocols"]
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Architectural Consulting",
    description: "Advising engineering teams on scaling strategies, performing deep backend audits, and establishing technical roadmaps for AI integration.",
    deliverables: ["Codebase Auditing", "Topology Design", "Security Reviews", "AI Strategy", "Scaling Blueprints", "Tech Debt Resolution"]
  }
];

const features = [
  "Production-first engineering",
  "Deterministic AI execution",
  "Sub-100ms latency targeting",
  "Algorithmic optimization",
  "Enterprise-grade security",
  "Clean, modular architecture",
  "Scalable relational data models",
  "Long-term system maintainability"
];

const processSteps = [
  { icon: <Search className="w-5 h-5" />, title: "Discovery & Blueprinting" },
  { icon: <PenTool className="w-5 h-5" />, title: "Architecture Design" },
  { icon: <Code2 className="w-5 h-5" />, title: "Core Engineering" },
  { icon: <Activity className="w-5 h-5" />, title: "Load Testing & QA" },
  { icon: <Rocket className="w-5 h-5" />, title: "Production Deployment" },
  { icon: <ShieldCheck className="w-5 h-5" />, title: "Monitoring & Scaling" }
];

const technologies = [
  "Python", "FastAPI", "Django", "TypeScript", "Next.js", "React", 
  "PostgreSQL", "Redis", "Celery", "Docker", "Linux Shell", "NGINX", 
  "OpenAI", "Gemini", "LangChain", "CrewAI", "LangGraph", "AWS", "Git"
];

// --- Animation Variants ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <main ref={containerRef} className="relative bg-[#000000] text-white min-h-screen overflow-hidden selection:bg-[#D4AF37]/30 selection:text-white pb-24 cursor-none">
      
      <CustomCursor />
      <Nav /> {/* Injected Navbar */}

      {/* --- BACKGROUND EFFECTS --- */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
      </motion.div>

      {/* Added pt-40 to clear the fixed Nav bar */}
      <div className="relative z-10 pt-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* --- HERO SECTION --- */}
        <section className="flex flex-col items-center text-center pb-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl space-y-6"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-sm font-mono mb-4">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              Production-Grade Infrastructure
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white font-sans">
              Architectural <span className="text-[#D4AF37] font-serif italic relative inline-block">
                Solutions
                <span className="absolute left-0 bottom-2 w-full h-[2px] bg-[#D4AF37]/40 blur-[1px]" />
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg sm:text-xl text-neutral-400 leading-relaxed max-w-2xl mx-auto">
              I engineer scalable AI-powered systems, deterministic automation pipelines, and high-performance backend topologies for modern enterprises.
            </motion.p>
          </motion.div>
        </section>

        {/* --- MAIN SERVICES GRID --- */}
        <section className="py-16">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
          >
            {services.map((service, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative bg-neutral-950/40 border border-neutral-900 hover:border-[#D4AF37]/40 rounded-3xl p-8 backdrop-blur-md overflow-hidden transition-all duration-500 cursor-none"
              >
                {/* Premium Card Glow Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute -inset-px bg-gradient-to-b from-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 pointer-events-none rounded-3xl" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#D4AF37] mb-6 group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500 shadow-inner">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-white mb-3 tracking-wide">{service.title}</h3>
                  <p className="text-neutral-400 leading-relaxed mb-6 h-auto lg:h-16">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3">
                    <p className="text-sm font-mono text-[#D4AF37] uppercase tracking-widest">Technical Deliverables</p>
                    <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                      {service.deliverables.map((item, i) => (
                        <li key={i} className="flex items-center text-sm text-neutral-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60 mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* --- DEVELOPMENT PROCESS TIMELINE --- */}
        <section className="py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">Engineering Pipeline</h2>
            <p className="text-neutral-400">A rigorous, deterministic approach from blueprint to production runtime.</p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="relative flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-0"
          >
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-neutral-900 -translate-y-1/2 z-0" />
            
            {processSteps.map((step, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="relative z-10 flex flex-row lg:flex-col items-center gap-4 lg:gap-6 w-full lg:w-auto cursor-none group"
              >
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-black border-2 border-neutral-800 flex items-center justify-center text-neutral-400 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:border-[#D4AF37] group-hover:text-[#D4AF37] transition-all duration-300 relative bg-[#050505]">
                  {step.icon}
                  {/* Active glow on hover */}
                  <div className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="text-left lg:text-center">
                  <span className="text-[#D4AF37] font-mono text-xs block mb-1">0{idx + 1}</span>
                  <h4 className="text-white font-medium whitespace-nowrap">{step.title}</h4>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* --- WHY WORK WITH ME & TECH WALL --- */}
        <section className="py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Engineering Philosophy */}
          <div>
            <h2 className="text-3xl font-semibold text-white mb-8">Engineering Philosophy</h2>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  className="flex items-center gap-3 p-4 rounded-xl bg-neutral-950/50 border border-neutral-900 hover:border-[#D4AF37]/30 transition-colors duration-300 cursor-none"
                >
                  <ShieldCheck className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                  <span className="text-sm text-neutral-300 font-medium">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Technologies Wall */}
          <div>
            <h2 className="text-3xl font-semibold text-white mb-8">Production Stack</h2>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="flex flex-wrap gap-3"
            >
              {technologies.map((tech, idx) => (
                <motion.span
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, borderColor: "rgba(212,175,55,0.5)", color: "#D4AF37" }}
                  className="px-4 py-2 text-sm font-mono font-medium rounded-full bg-neutral-900/50 border border-neutral-800 text-neutral-400 transition-all duration-300 cursor-none hover:shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="max-w-5xl mx-auto py-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/20 bg-neutral-950 p-12 sm:p-16 text-center"
          >
            {/* CTA Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-black to-black pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                Ready to Architect Something <br className="hidden sm:block" />
                <span className="text-[#D4AF37] italic font-serif">Exceptional?</span>
              </h2>
              <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                Whether you need to scale an existing backend or integrate autonomous AI directly into your data pipelines, let's discuss the technical blueprint.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#D4AF37] text-black font-semibold text-sm tracking-wide uppercase hover:bg-[#C19B2E] transition-colors duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 cursor-none"
                >
                  Initialize Contact <ArrowRight className="w-4 h-4" />
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border border-[#D4AF37]/50 text-[#D4AF37] font-semibold text-sm tracking-wide uppercase hover:bg-[#D4AF37]/10 transition-colors duration-300 flex items-center justify-center gap-2 cursor-none"
                >
                  Review Systems
                </motion.button>
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </main>
  );
}