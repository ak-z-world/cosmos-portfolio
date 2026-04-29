import type { Metadata } from "next";
//@ts-ignore
import "./globals.css";

export const metadata: Metadata = {
  title: "Arun Kumar S — AI Engineer · LLM Architect",
  description:
    "Portfolio of Arun Kumar S — Python Full-Stack Developer, AI Engineer, LLM Specialist from Chennai, India.",
  openGraph: {
    title: "Arun Kumar S — AI Engineer",
    description: "Building intelligent systems that think, learn, and evolve.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}