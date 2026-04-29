"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

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

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      alert("Please fill all required fields ⚠️");
      return;
    }
    setStatus("sending");
    try {
      // @ts-ignore — emailjs loaded via script tag
      await window.emailjs.send("service_plbfoam", "template_1pb4b7o", {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      });
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const CONTACTS = [
    { icon: "📧", label: "Email", val: "sivaarun10@gmail.com", href: "mailto:sivaarun10@gmail.com" },
    { icon: "💻", label: "GitHub", val: "github.com/ak-z-world", href: "https://github.com/ak-z-world" },
    {
      icon: "🔗",
      label: "LinkedIn",
      val: "linkedin.com/in/arun-kumar",
      href: "https://www.linkedin.com/in/arun-kumar-76a825200/",
    },
    { icon: "📍", label: "Location", val: "Chennai, India · Remote Worldwide", href: null },
  ];

  return (
    <section id="contact" className="py-40 px-8 max-w-[1400px] mx-auto">
      {/* EmailJS */}
      <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js" />

      <FadeIn>
        <div className="flex items-center gap-4 mb-6">
          <span className="section-label" style={{ fontFamily: "var(--font-space-mono)" }}>
            Frame 007
          </span>
          <div className="h-px w-12 bg-film-gold opacity-30" />
          <span className="section-label">Get in Touch</span>
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
          Let's Build <span className="text-gold-gradient">Together</span>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Left */}
        <FadeIn delay={0.1}>
          <div>
            <blockquote
              className="text-2xl text-film-white leading-relaxed mb-10 border-l-2 border-film-gold/40 pl-6"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 200, fontStyle: "italic" }}
            >
              "I don't just write code —{" "}
              <span className="text-film-gold not-italic font-normal">
                I teach machines to think.
              </span>
              "
            </blockquote>
            <p
              className="text-film-silver mb-12 leading-loose"
              style={{ fontWeight: 300, lineHeight: 2 }}
            >
              Whether you want to build an AI agent, fine-tune a model, scale an API, or just geek
              out about LLMs — I'm one message away.
            </p>
            <div className="space-y-6">
              {CONTACTS.map((c) => (
                <div key={c.label} className="flex items-start gap-5">
                  <div
                    className="w-10 h-10 border border-[#1a1a1f] flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: "rgba(201,168,76,0.04)" }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <div
                      className="section-label mb-1 opacity-50"
                      style={{ fontFamily: "var(--font-space-mono)" }}
                    >
                      {c.label}
                    </div>
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="text-film-silver hover:text-film-gold transition-colors text-sm"
                        style={{ cursor: "none" }}
                      >
                        {c.val}
                      </a>
                    ) : (
                      <span className="text-film-silver text-sm">{c.val}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Right — form */}
        <FadeIn delay={0.2}>
          <div className="film-card p-10 space-y-6">
            <div className="space-y-5">
              {[
                { name: "name", label: "Your Name *", placeholder: "What should I call you?", type: "text" },
                { name: "email", label: "Email *", placeholder: "your@email.com", type: "email" },
                { name: "subject", label: "Subject", placeholder: "AI Agent · LLM · Full-Stack · Other", type: "text" },
              ].map((f) => (
                <div key={f.name}>
                  <label
                    className="block section-label mb-2 opacity-50"
                    style={{ fontFamily: "var(--font-space-mono)" }}
                  >
                    {f.label}
                  </label>
                  <input
                    name={f.name}
                    type={f.type}
                    value={(form as any)[f.name]}
                    onChange={handleChange}
                    placeholder={f.placeholder}
                    className="w-full px-4 py-3 bg-[#080808] border border-[#1a1a1f] text-film-white text-sm placeholder-[rgba(255,255,255,0.2)] focus:outline-none focus:border-film-gold/40 transition-colors"
                    style={{ cursor: "none", fontFamily: "var(--font-dm-sans)" }}
                  />
                </div>
              ))}
              <div>
                <label
                  className="block section-label mb-2 opacity-50"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  Message *
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 bg-[#080808] border border-[#1a1a1f] text-film-white text-sm placeholder-[rgba(255,255,255,0.2)] focus:outline-none focus:border-film-gold/40 transition-colors resize-none"
                  style={{ cursor: "none", fontFamily: "var(--font-dm-sans)" }}
                />
              </div>
            </div>
            <button
              className="btn-primary w-full"
              onClick={handleSubmit}
              disabled={status === "sending"}
            >
              <span>
                {status === "idle" && "Send Message →"}
                {status === "sending" && "Sending..."}
                {status === "sent" && "Message Sent 🚀"}
                {status === "error" && "Failed — Retry"}
              </span>
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}