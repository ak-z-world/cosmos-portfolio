"use client";

const ITEMS = [
  "Python Engineer",
  "AI Architect",
  "LLM Specialist",
  "QLoRA Fine-Tuning",
  "FastAPI",
  "Django",
  "RLHF",
  "Next.js",
  "Production AI",
  "Prompt Engineering",
  "HuggingFace",
  "RAG Pipelines",
  "Docker",
  "Redis",
  "Kaggle",
];

export default function Ticker() {
  const repeated = [...ITEMS, ...ITEMS];
  return (
    <div
      className="relative py-4 border-y border-[#1a1a1f] overflow-hidden"
      style={{ background: "rgba(201,168,76,0.02)" }}
    >
      <div className="ticker-inner">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 px-6"
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(201,168,76,0.5)",
              whiteSpace: "nowrap",
            }}
          >
            {item}
            <span style={{ color: "rgba(201,168,76,0.2)", fontSize: 6 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}