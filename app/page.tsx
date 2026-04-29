"use client";
import { useEffect } from "react";
import Cursor from "@/components/ui/Cursor";
import FilmOverlays from "@/components/ui/FilmOverlays";
import Nav from "@/components/ui/Nav";
import Ticker from "@/components/ui/Ticker";
import Footer from "@/components/ui/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Portfolio() {
  // Init EmailJS
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js";
    script.onload = () => {
      (window as any).emailjs?.init("SyRCH9oGShrPj4VH-");
    };
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <>
      {/* Cursor */}
      <Cursor />

      {/* Cinematic overlays: grain, vignette, letterbox, scanline */}
      <FilmOverlays />

      {/* Navigation */}
      <Nav />

      <main>
        {/* ① Hero */}
        <HeroSection />

        {/* Ticker tape */}
        <Ticker />

        {/* ② About */}
        <AboutSection />

        {/* Divider */}
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="hr-gold" />
        </div>

        {/* ③ Skills */}
        <SkillsSection />

        {/* Ticker tape reversed */}
        <Ticker />

        {/* ④ Projects */}
        <ProjectsSection />

        {/* Divider */}
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="hr-gold" />
        </div>

        {/* ⑤ Services */}
        <ServicesSection />

        {/* Ticker tape */}
        <Ticker />

        {/* ⑥ Achievements */}
        <AchievementsSection />

        {/* Divider */}
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="hr-gold" />
        </div>

        {/* ⑦ Contact */}
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}