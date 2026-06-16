"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { 
  Mail, 
  MapPin, 
  Terminal, 
  Send, 
  CheckCircle2
} from "lucide-react";
// Replaced the missing lucide brand icons with react-icons
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
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

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Form State Simulation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      // Reset success message after 5 seconds
      setTimeout(() => setIsSent(false), 5000);
    }, 1500);
  };

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

      {/* Main Content Container (pt-40 to clear fixed Nav) */}
      <div className="relative z-10 pt-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* --- HERO SECTION --- */}
        <section className="flex flex-col items-center text-center pb-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl space-y-6"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-sm font-mono mb-4">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              Status: Available for Develpment
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white font-sans">
              Initialize <span className="text-[#D4AF37] font-serif italic relative inline-block">
                Contact
                <span className="absolute left-0 bottom-2 w-full h-[2px] bg-[#D4AF37]/40 blur-[1px]" />
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg sm:text-xl text-neutral-400 leading-relaxed max-w-2xl mx-auto">
              Ready to scale your backend or orchestrate autonomous AI workflows? Establish a secure connection and let's engineer the future.
            </motion.p>
          </motion.div>
        </section>

        {/* --- TWO COLUMN LAYOUT: INFO & FORM --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Contact Data */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="lg:col-span-5 space-y-12"
          >
            {/* Intel Section */}
            <div className="space-y-8">
              <motion.div variants={itemVariants} className="group relative bg-neutral-950/40 border border-neutral-900 rounded-3xl p-8 backdrop-blur-md overflow-hidden cursor-none">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#D4AF37]" />
                  Direct Comms
                </h3>

                <div className="space-y-6">
                  {/* Email */}
                  <a href="mailto:your.email@example.com" className="flex items-start gap-4 group/link cursor-none">
                    <div className="w-12 h-12 rounded-xl bg-[#050505] border border-neutral-800 flex items-center justify-center text-neutral-400 group-hover/link:text-[#D4AF37] group-hover/link:border-[#D4AF37]/40 transition-all duration-300">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">Email</p>
                      <p className="text-lg text-white font-medium group-hover/link:text-[#D4AF37] transition-colors duration-300">
                        sivaarun10@gmail.com
                      </p>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#050505] border border-neutral-800 flex items-center justify-center text-neutral-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">Base of Operations</p>
                      <p className="text-lg text-white font-medium">Chennai, India</p>
                      <p className="text-sm text-neutral-400">IST (UTC +5:30)</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Digital Footprint Section */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest pl-2">Digital Footprint</h3>
                <div className="flex gap-4">
                  {[
                    { icon: <FaGithub className="w-5 h-5" />, link: "https://github.com/ak-z-world" },
                    { icon: <FaLinkedin className="w-5 h-5" />, link: "https://www.linkedin.com/in/arunkumar-ai-developer/" },
                    { icon: <FaTwitter className="w-5 h-5" />, link: "https://x.com/AKthearun" }
                  ].map((social, i) => (
                    <a 
                      key={i}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-2xl bg-neutral-950 border border-neutral-900 flex items-center justify-center text-neutral-400 hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:-translate-y-1 transition-all duration-300 cursor-none shadow-[0_0_0_rgba(212,175,55,0)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-7"
          >
            <div className="relative bg-[#030303] border border-neutral-900 rounded-3xl p-8 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
              {/* Form Ambient Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[80px] pointer-events-none" />
              
              <h2 className="text-2xl font-semibold text-white mb-8">Transmit Data</h2>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-mono text-neutral-400 uppercase tracking-wider pl-1">Name / Callsign</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all duration-300 cursor-none"
                      placeholder="John Doe"
                    />
                  </div>
                  {/* Email Input */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-mono text-neutral-400 uppercase tracking-wider pl-1">Return Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all duration-300 cursor-none"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-mono text-neutral-400 uppercase tracking-wider pl-1">Architecture Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    required
                    className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all duration-300 cursor-none"
                    placeholder="e.g., Enterprise RAG Integration"
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-mono text-neutral-400 uppercase tracking-wider pl-1">Payload / Message</label>
                  <textarea 
                    id="message" 
                    rows={5}
                    required
                    className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all duration-300 cursor-none resize-none"
                    placeholder="Describe your system requirements or engineering problem here..."
                  />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={isSubmitting || isSent}
                  className={`w-full py-4 rounded-xl font-semibold text-sm tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-3 cursor-none border
                    ${isSent 
                      ? "bg-green-500/10 border-green-500/50 text-green-400" 
                      : "bg-[#D4AF37] border-[#D4AF37] text-black hover:bg-[#C19B2E] shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                    }
                    ${isSubmitting ? "opacity-80" : ""}
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                      />
                      Transmitting...
                    </>
                  ) : isSent ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Payload Delivered
                    </>
                  ) : (
                    <>
                      Execute Transmission
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

      </div>
    </main>
  );
}