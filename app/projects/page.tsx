"use client";

import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect } from "react";

// --- DATA STRUCTURE ---
const projectsData = [
  {
    id: "01",
    sys: "SYS.LMS",
    title: "Enterprise LMS & CRM Engine",
    coreStat: "<100ms",
    statLabel: "API Response",
    stack: ["Django REST", "React Native", "PostgreSQL", "OWASP", "Redis"],
    description: "Engineered a production-grade LMS and Lead CRM hybrid, featuring a React Native mobile client with native inbound/outbound call tracking, real-time audio recording, and immutable lead logging. Architected a custom multi-tier RBAC system with deep cross-restriction layers, ensuring strict OWASP Top 10 compliance and rate-limiting. Optimized the data layer by eliminating all N+1 query bottlenecks through extensive select_related and prefetch_related refactors alongside composite index tuning, resulting in sustained sub-100ms API response profiles and zero data bleed."
  },
  {
    id: "02",
    sys: "SYS.AI",
    title: "Resume Parsing Engine",
    coreStat: "40%",
    statLabel: "Cost Reduction",
    stack: ["FastAPI", "Gemini", "Groq", "Llama Parser", "Vector DB"],
    description: "Architected a section-aware analysis engine utilizing Llama Parser to systematically convert highly unstructured legacy resumes into standardized templates via advanced LLM field-mapping. Implemented an aggressive internal token-throttling and cost-optimization model that drastically reduced per-request inference spend without sacrificing output fidelity. The system guarantees extreme resilience through a Gemini and Groq dual-model fallback mechanism, utilizing async FastAPI workers to process concurrent batch payloads without encountering queue starvation."
  },
  {
    id: "03",
    sys: "SYS.RAG",
    title: "HRMS Knowledge Agent",
    coreStat: "2s",
    statLabel: "Query Latency",
    stack: ["FastAPI", "RAG Pipeline", "ChromaDB", "Re-ranking"],
    description: "Developed a highly localized, secure Retrieval-Augmented Generation (RAG) pipeline querying sensitive internal HRMS documentation to automate administrative task-generation, query resolution, and strategy analysis. Engineered a complex ingestion pipeline featuring advanced document chunking, semantic embedding indexing, and sophisticated retrieval re-ranking stages for high-precision context injection. This autonomous agent architecture effectively replaced manual HR workflows, plummeting administrative response latency from several hours to mere seconds."
  },
  {
    id: "04",
    sys: "SYS.VOIP",
    title: "Autonomous Voice Agent",
    coreStat: "0",
    statLabel: "Manual Loops",
    stack: ["WebSocket", "Sarvam AI", "Vobiz", "Groq"],
    description: "Architected a fully autonomous tele-calling agent designed to completely eliminate manual CRM cold-call loops, integrating Sarvam AI, Vobiz, and Groq via asynchronous FastAPI WebSocket pipelines. Achieved groundbreaking sub-500ms end-to-end audio streaming latency across the STT → LLM → TTS lifecycle through strict pipeline parallelism and audio chunk pre-buffering. Engineered robust VoIP session state management capable of graceful reconnections and mid-call context preservation, massively reducing operational costs."
  },
  {
    id: "05",
    sys: "SYS.SWRM",
    title: "Multi-Agent Marketing",
    coreStat: "13",
    statLabel: "Active Agents",
    stack: ["Next.js", "CrewAI", "Multi-Agent", "Python"],
    description: "Designed Aura AI, a unified Next.js full-stack multi-agent swarm platform orchestrating 3 core agents governing 10 specialized sub-agents to fully automate digital marketing content generation. Implemented complex swarm-style coordination featuring autonomous tool-use, persistent memory states, and task delegation for the parallel execution of research and copy pipelines. The architecture scales to include analytical RAG agents processing live social media feeds to instantly compute ROI metrics and generate diagnostic strategy reports."
  }
];

export default function ProjectsShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentProject = projectsData[activeIdx];

  // --- HIGH PERFORMANCE CUSTOM CURSOR ---
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16); // Center the 32px cursor
      cursorY.set(e.clientY - 16);
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'button' || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // --- ANIMATION VARIANTS ---
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    // 'cursor-none' hides the default OS cursor ONLY within this component
    <main className="h-screen w-full bg-[#030303] text-gray-200 overflow-hidden cursor-none selection:bg-[#3b82f6] selection:text-white relative font-sans">
      
      {/* --- CUSTOM CURSOR ELEMENTS --- */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#3b82f6] pointer-events-none z-[9999] mix-blend-screen flex items-center justify-center"
        style={{ x: cursorXSpring, y: cursorYSpring }}
        animate={{ scale: isHovering ? 1.5 : 1, backgroundColor: isHovering ? "rgba(59, 130, 246, 0.1)" : "transparent" }}
      >
        <motion.div 
          className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full"
          animate={{ scale: isHovering ? 0 : 1 }}
        />
      </motion.div>

      {/* --- BACKGROUND GRID & LIGHTING --- */}
      <div className="absolute inset-0 z-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[length:40px_40px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#3b82f6]/10 to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none z-0" />

      {/* --- MAIN LAYOUT GRID --- */}
      <div className="relative z-10 w-full h-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 px-6 lg:px-12 pt-24 pb-12 gap-12">
        
        {/* LEFT COLUMN: NAVIGATION INDEX */}
        <div className="lg:col-span-3 flex flex-col h-full border-r border-white/10 pr-6">
          <div className="mb-12">
            <h1 className="text-xs font-mono tracking-[0.3em] text-gray-500 uppercase mb-2">Portfolio // 2026</h1>
            <h2 className="text-2xl font-bold tracking-tight text-white">SYSTEM ARCHITECTURE</h2>
          </div>

          <nav className="flex flex-col gap-2 flex-grow justify-center">
            {projectsData.map((project, idx) => (
              <button
                key={project.id}
                onClick={() => setActiveIdx(idx)}
                className="group relative flex items-center justify-between py-4 px-4 text-left transition-colors duration-300 overflow-hidden rounded-lg"
              >
                {/* Active Background Highlight */}
                {activeIdx === idx && (
                  <motion.div 
                    layoutId="navHighlight" 
                    className="absolute inset-0 bg-white/[0.03] border border-white/10 rounded-lg z-0"
                  />
                )}
                
                <div className="relative z-10 flex items-center gap-4">
                  <span className={`font-mono text-sm transition-colors duration-300 ${activeIdx === idx ? 'text-[#3b82f6]' : 'text-gray-600 group-hover:text-gray-400'}`}>
                    {project.id}
                  </span>
                  <span className={`font-medium tracking-wide transition-colors duration-300 ${activeIdx === idx ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                    {project.sys}
                  </span>
                </div>

                {activeIdx === idx && (
                  <motion.div 
                    layoutId="activeDot"
                    className="relative z-10 w-1.5 h-1.5 rounded-full bg-[#3b82f6]"
                  />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* RIGHT COLUMN: DATA TERMINAL (BENTO BOX) */}
        <div className="lg:col-span-9 h-full flex flex-col relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={fadeUp}
              className="flex flex-col h-full"
            >
              
              {/* Top Section: Massive Title & Watermark */}
              <div className="relative mb-12 flex-shrink-0">
                <span className="absolute -top-12 -left-4 text-[12rem] font-black text-white/[0.02] leading-none pointer-events-none select-none z-0">
                  {currentProject.id}
                </span>
                
                <div className="relative z-10 pt-8">
                  <h3 className="text-5xl lg:text-7xl font-black tracking-tighter text-white mb-4 leading-tight">
                    {currentProject.title}
                  </h3>
                  <div className="w-16 h-1 bg-[#3b82f6]" />
                </div>
              </div>

              {/* Bottom Section: Bento Grid Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">
                
                {/* Bento Card 1: Description (Spans 2 columns) */}
                <div className="md:col-span-2 bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col justify-center relative overflow-hidden group hover:border-white/10 transition-colors">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3b82f6]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h4 className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-6">System Architecture</h4>
                  <p className="text-lg lg:text-xl text-gray-300 leading-relaxed font-light">
                    {currentProject.description}
                  </p>
                </div>

                {/* Bento Column (Metrics & Stack) */}
                <div className="flex flex-col gap-6">
                  
                  {/* Bento Card 2: Core Metric */}
                  <div className="bg-[#3b82f6]/5 border border-[#3b82f6]/20 rounded-2xl p-8 flex flex-col justify-center items-start relative overflow-hidden group">
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#3b82f6]/10 rounded-full blur-2xl group-hover:bg-[#3b82f6]/20 transition-colors duration-500" />
                    <h4 className="text-xs font-mono tracking-widest text-[#3b82f6] uppercase mb-2">Core Metric</h4>
                    <span className="text-5xl font-black text-white tracking-tighter mb-1">{currentProject.coreStat}</span>
                    <span className="text-sm text-gray-400 font-medium">{currentProject.statLabel}</span>
                  </div>

                  {/* Bento Card 3: Tech Stack */}
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex-grow flex flex-col justify-center">
                    <h4 className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-6">Arsenal</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.stack.map(tech => (
                        <span 
                          key={tech} 
                          className="px-3 py-1.5 bg-[#0a0a0a] border border-white/10 rounded-md text-xs font-mono text-gray-300 hover:border-[#3b82f6]/50 transition-colors cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </main>
  );
}