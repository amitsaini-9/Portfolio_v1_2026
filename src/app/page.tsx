"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Send, Loader2, Check, Heart, Coffee, ExternalLink } from "lucide-react";
import Script from "next/script";
import { personalInfo, skills, projects, experiences, education } from "@/data";
import * as analytics from "@/lib/analytics";

declare global {
  interface Window { Razorpay: any; }
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

// Loading Screen
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const words = ["Design", "Build", "Deploy"];
  const wordImages = ["/assets/loading-design.png", "/assets/loading-build.png", "/assets/loading-deploy.png"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 2400;
    const frame = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * 100));
      if (progress < 1) requestAnimationFrame(frame);
      else setTimeout(onComplete, 400);
    };
    requestAnimationFrame(frame);

    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.span
        className="absolute top-8 left-8 text-xs text-[#888] uppercase tracking-[0.3em]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Portfolio
      </motion.span>

      {/* Center: rotating word images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={words[wordIndex]}
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={wordImages[wordIndex]}
            alt={words[wordIndex]}
            className="w-48 h-48 md:w-64 md:h-64 object-contain"
          />
          <span className="text-3xl md:text-5xl font-display italic text-white/60">
            {words[wordIndex]}
          </span>
        </motion.div>
      </AnimatePresence>

      <motion.span
        className="absolute bottom-8 right-8 text-7xl md:text-9xl font-display text-white tabular-nums"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {String(count).padStart(3, "0")}
      </motion.span>

      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1f1f1f]/50">
        <motion.div
          className="h-full accent-gradient"
          style={{ transformOrigin: "left", boxShadow: "0 0 8px rgba(137,170,204,0.35)" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: count / 100 }}
        />
      </div>
    </motion.div>
  );
}

// Navbar
function Navbar() {
  const links = ["About", "Skills", "Work", "Experience", "Hire", "Support"];
  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className="inline-flex items-center gap-1 rounded-full backdrop-blur-xl border border-white/[0.12] bg-white/[0.04] px-2 py-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_4px_20px_rgba(0,0,0,0.3)]">
        <div className="relative w-9 h-9">
          {/* Rotating gradient ring */}
          <div className="absolute inset-0 rounded-full accent-gradient" style={{ animation: "orbit-spin 4s linear infinite" }} />
          {/* Subtle light leak glow */}
          <div className="absolute -inset-1 rounded-full opacity-25 blur-sm accent-gradient" style={{ animation: "orbit-spin 4s linear infinite" }} />
          {/* Static inner circle with text */}
          <div className="absolute inset-[2px] rounded-full bg-[#0a0a0a] flex items-center justify-center z-10">
            <span className="text-[13px] font-display italic tracking-tighter text-white">AS</span>
          </div>
        </div>
        <div className="w-px h-5 bg-[#1f1f1f] mx-1 hidden md:block" />
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="hidden md:block text-xs px-4 py-2 rounded-full text-[#888] hover:text-white hover:bg-[#1f1f1f]/50 transition-all"
          >
            {link}
          </a>
        ))}
        <div className="w-px h-5 bg-[#1f1f1f] mx-1 hidden md:block" />
        <a
          href="https://wa.me/919521153320"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs px-4 py-2 rounded-full text-[#888] hover:text-[#25D366] transition-all flex items-center gap-2"
        >
          <WhatsAppIcon className="w-4 h-4" /> <span className="hidden md:inline">Say hi</span>
        </a>
      </div>
    </nav>
  );
}

// Preload HLS video globally so it starts loading during the loading screen
const MUX_STREAM = "https://stream.mux.com/Gs3wZfrtz6ZfqZqQ02c02Z7lugV00FGZvRpcqFTel66r3g.m3u8";
const MUX_POSTER = "/assets/hero-poster.jpg";

// Hero Section
function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const roles = ["Full-Stack", "AI Engineer", "Problem Solver"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.oncanplay = () => setVideoReady(true);

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = MUX_STREAM;
    } else {
      import("hls.js").then(({ default: Hls }) => {
        if (Hls.isSupported()) {
          const hls = new Hls({ startLevel: 0, capLevelToPlayerSize: true });
          hls.loadSource(MUX_STREAM);
          hls.attachMedia(video);
        }
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Poster shown instantly while video loads */}
      <div
        className={`absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000 ${videoReady ? "opacity-0" : "opacity-100"}`}
        style={{ backgroundImage: `url('${MUX_POSTER}')` }}
      />
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover z-0 transition-opacity duration-1000 ${videoReady ? "opacity-100" : "opacity-0"}`}
      />
      <div className="absolute inset-0 bg-black/20 z-[1]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent z-[2]" />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <p className="text-xs text-[#888] uppercase tracking-[0.3em] mb-8 animate-fade-rise">
          COLLECTION '26
        </p>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-white mb-6 animate-fade-rise-1">
          {personalInfo.name}
        </h1>
        <p className="text-lg md:text-2xl text-[#888] mb-10 animate-fade-rise-2">
          A{" "}
          <AnimatePresence mode="wait">
            <motion.span
              key={roles[roleIndex]}
              className="font-display italic text-white inline-block"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {roles[roleIndex]}
            </motion.span>
          </AnimatePresence>
          {" "}based in India.
        </p>
        <p className="text-sm text-[#888] max-w-md mx-auto leading-relaxed mb-12 animate-fade-rise-3">
          {personalInfo.bio}
        </p>
        <div className="flex items-center justify-center gap-4 animate-fade-rise-3">
          <a href="#work" className="px-7 py-3.5 bg-white text-black text-sm rounded-full hover:scale-105 transition-transform">
            See Work
          </a>
          <a href="#hire" className="px-7 py-3.5 bg-[#0a0a0a] text-white text-sm rounded-full border-2 border-[#1f1f1f] hover:border-[#4E85BF] transition-colors">
            Hire Me
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs text-[#888] uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-10 bg-[#1f1f1f] relative overflow-hidden">
          <motion.div
            className="w-full h-2 bg-white/60 rounded-full"
            animate={{ y: [0, 32, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}

// About Section
function About() {
  return (
    <section id="about" className="relative py-32 md:py-44 px-6 border-t border-[#1f1f1f] overflow-hidden">
      <SectionVideoBg src="/assets/about-bg.mp4" fallback="/about-bg.png" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left: Video */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-[2rem]"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source
                src="/assets/about-video.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-xs text-[#888] uppercase tracking-[0.3em]">About</span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display italic text-white leading-[1.1] mt-6">
              I craft digital experiences that combine cutting-edge technology with{" "}
              <span className="accent-gradient-text">thoughtful design.</span>
            </h2>

            <p className="text-[#888] leading-relaxed mt-8">
              From custom SaaS platforms and AI chatbots to WhatsApp Business API integrations — I handle the full lifecycle.
              Every line of code serves a purpose. Every feature drives real value.
            </p>

            <p className="text-[#888] leading-relaxed mt-4">
              I believe in clean architecture, fast iteration, and shipping products that actually work in production — not just in demos.
            </p>

            {/* Specs */}
            <div className="mt-12 space-y-4 border-t border-[#1f1f1f] pt-8">
              {[
                { label: "Stack", value: "React, Next.js, Node, Python" },
                { label: "Focus", value: "AI Integration & Full-Stack" },
                { label: "Approach", value: "Concept → Production → Scale" },
                { label: "Based", value: "India — Available worldwide" },
              ].map((spec) => (
                <div key={spec.label} className="flex items-center justify-between border-b border-[#1f1f1f]/50 pb-3">
                  <span className="text-xs text-[#888] uppercase tracking-wider">{spec.label}</span>
                  <span className="text-sm text-white">{spec.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Skills Section — Orbit Animation
function SkillsSection() {
  const allSkills = [
    // Inner ring — core
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    // Middle ring — infra + db
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", invert: true },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
    { name: "Neon", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/neon/neon-original.svg" },
    { name: "Prisma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg", invert: true },
    // Outer ring — AI + tools
    { name: "Claude", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/anthropic.svg", invert: true },
    { name: "Gemini", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googlegemini.svg", invert: true },
    { name: "ChatGPT", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/openai.svg", invert: true },
    { name: "Cursor", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/cursor.svg", invert: true },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Three.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg", invert: true },
    { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invert: true },
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "Google Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
  ];

  const orbits = [
    allSkills.slice(0, 6),    // inner ring — 6 items
    allSkills.slice(6, 14),   // middle ring — 8 items
    allSkills.slice(14, 23),  // outer ring — 9 items
  ];

  const orbitSizes = ["w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[360px] md:h-[360px]", "w-[380px] h-[380px] sm:w-[460px] sm:h-[460px] md:w-[560px] md:h-[560px]", "w-[520px] h-[520px] sm:w-[620px] sm:h-[620px] md:w-[740px] md:h-[740px]"];
  const orbitDurations = ["30s", "45s", "60s"];

  return (
    <section id="skills" className="relative py-32 md:py-44 px-6 border-t border-[#1f1f1f] overflow-hidden">
      <SectionVideoBg src="/assets/skills-bg.mp4" fallback="/assets/skills-bg.png" />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-xs text-[#888] uppercase tracking-[0.3em] block mb-4">Tech Stack</span>
          <h2 className="text-5xl md:text-7xl font-display italic text-white leading-none">
            Skills
          </h2>
        </motion.div>

        {/* Orbit Container */}
        <div className="relative flex items-center justify-center min-h-[500px] sm:min-h-[600px] md:min-h-[750px]">
          {/* Center glow */}
          <div className="absolute w-24 h-24 rounded-full bg-[#4E85BF]/30 blur-[60px]" />
          <div className="absolute w-4 h-4 rounded-full bg-[#89AACC] shadow-[0_0_30px_rgba(137,170,204,0.8)]" />

          {/* Orbit rings */}
          {orbits.map((ring, ringIndex) => {
            const radius = [150, 230, 310][ringIndex];
            const smRadius = [120, 190, 260][ringIndex];
            return (
              <div
                key={ringIndex}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* Orbit path circle */}
                <div
                  className="absolute rounded-full border border-[#89AACC]/15"
                  style={{ width: radius * 2, height: radius * 2, boxShadow: "0 0 15px rgba(137, 170, 204, 0.05), inset 0 0 15px rgba(137, 170, 204, 0.03)" }}
                />
                {/* Rotating container */}
                <div
                  className="absolute"
                  style={{
                    width: radius * 2,
                    height: radius * 2,
                    animation: `orbit-spin ${orbitDurations[ringIndex]} linear infinite${ringIndex % 2 === 1 ? " reverse" : ""}`,
                  }}
                >
                  {ring.map((skill, i) => {
                    const angle = (360 / ring.length) * i;
                    const rad = (angle * Math.PI) / 180;
                    const x = radius + radius * Math.cos(rad) - 20;
                    const y = radius + radius * Math.sin(rad) - 20;
                    return (
                      <div
                        key={skill.name}
                        className="absolute"
                        style={{ left: x, top: y }}
                      >
                        <div
                          className="orbit-icon w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#141414]/90 border border-[#2a2a3a] flex items-center justify-center relative cursor-pointer transition-all duration-300"
                          style={{
                            animation: `orbit-spin ${orbitDurations[ringIndex]} linear infinite${ringIndex % 2 === 1 ? "" : " reverse"}`,
                            boxShadow: "0 0 12px rgba(137, 170, 204, 0.15), 0 0 4px rgba(137, 170, 204, 0.1)",
                          }}
                        >
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className={`w-6 h-6 sm:w-7 sm:h-7 ${(skill as any).invert ? "invert brightness-200" : ""}`}
                          />
                          <span className="orbit-label absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-[#ccc] whitespace-nowrap opacity-0 transition-opacity font-medium">
                            {skill.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Category labels below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mt-12"
        >
          {["Frontend", "Backend", "Database & Cloud", "AI & Automation", "Tools"].map((cat) => (
            <span key={cat} className="text-[11px] text-[#888] border border-[#1f1f1f] rounded-full px-4 py-2 uppercase tracking-wider">
              {cat}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Section video background — loops automatically
function SectionVideoBg({ src, fallback }: { src: string; fallback?: string }) {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
        poster={fallback}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
    </>
  );
}

// Auto-scrolling preview that starts only when visible
function ScrollPreview({ src, alt }: { src: string; alt: string }) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={previewRef}
      className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#141414] relative"
      style={{ height: "clamp(300px, 40vw, 580px)" }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`w-full animate-scroll-preview ${isVisible ? "is-visible" : ""}`}>
          <img src={src} alt={alt} loading="lazy" className="w-full" />
        </div>
      </div>
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#141414] to-transparent z-10" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#141414] to-transparent z-10" />
    </div>
  );
}

// Work Section — Cards scroll UP from below and stack
function Work() {
  return (
    <section
      id="work"
      className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-4 md:px-6 pt-20 sm:pt-24 md:pt-32 pb-8"
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "50px" }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-center mb-16 md:mb-24"
      >
        <h2 className="hero-heading font-black uppercase leading-none tracking-tight" style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}>
          Project
        </h2>
      </motion.div>

      {/* Sticky stacking cards — cards pin and next one scrolls up over previous */}
      <div className="max-w-7xl mx-auto">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className="sticky mb-4"
            style={{ top: `calc(6rem + ${i * 28}px)`, zIndex: 10 + i }}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
                  {/* Top row */}
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <div className="flex items-center gap-4 md:gap-6">
                      <span className="text-[clamp(3rem,10vw,140px)] font-black leading-none text-[#D7E2EA]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                        <span className="text-xs sm:text-sm text-[#D7E2EA] uppercase tracking-wider font-medium">
                          {project.tags[0]}
                        </span>
                        <h3 className="text-lg sm:text-xl md:text-2xl text-[#D7E2EA] uppercase font-medium">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                    <span className="hidden sm:inline-flex rounded-full border-2 border-[#D7E2EA] px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base text-[#D7E2EA] font-medium uppercase tracking-widest hover:bg-[#D7E2EA]/10 transition-colors">
                      Live Project
                    </span>
                  </div>

                  {/* Bottom row — image grid */}
                  <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-3">
                    {/* Left column: screenshot + info */}
                    <div className="hidden md:flex flex-col gap-3">
                      {/* Top: static screenshot */}
                      <div
                        className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#141414]"
                        style={{ height: "clamp(130px, 16vw, 230px)" }}
                      >
                        <img
                          src={project.image}
                          alt={`${project.title} preview`}
                          loading="lazy"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      {/* Bottom: project info */}
                      <div
                        className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#141414] p-6 flex flex-col justify-center"
                        style={{ height: "clamp(160px, 22vw, 340px)" }}
                      >
                        <span className="text-[10px] text-[#89AACC] uppercase tracking-widest font-medium mb-2">
                          {(project as any).type || "Personal Project"}
                        </span>
                        <p className="text-[#888] text-xs leading-relaxed mb-4">
                          {(project as any).details || project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {((project as any).techStack || project.tags).map((tech: string) => (
                            <span key={tech} className="text-[9px] text-[#D7E2EA]/70 border border-[#D7E2EA]/15 rounded-full px-2.5 py-1">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right column: auto-scrolling full-page preview */}
                    <ScrollPreview
                      src={(project as any).fullImage || project.image}
                      alt={`${project.title} full preview`}
                    />
                  </div>
                </div>
              </a>
            </motion.div>
          </div>
        ))}
        {/* Scroll space for last card */}
        <div className="h-[60vh]" />
      </div>
    </section>
  );
}

// Experience Section — Immersive timeline
function ExperienceSection() {
  return (
    <section id="experience" className="relative py-32 md:py-44 px-6 border-t border-[#1f1f1f] overflow-hidden">
      <SectionVideoBg src="/assets/experience-bg.mp4" fallback="/assets/experience-bg.png" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="text-xs text-[#888] uppercase tracking-[0.3em] block mb-4">Career Journey</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display italic text-white leading-none">
            Experience
          </h2>
        </motion.div>

        {/* Company Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full border border-[#1f1f1f] bg-[#0a0a0a]/80 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#89AACC] to-[#4E85BF] flex items-center justify-center">
              <span className="text-sm font-bold text-white">IS</span>
            </div>
            <div className="text-left">
              <p className="text-white font-medium">Intap Studio Pvt Ltd</p>
              <p className="text-xs text-[#888]">Photozoot AI — Image Processing Platform</p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4E85BF]/50 to-transparent origin-left hidden md:block"
          />

          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.2 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-2 border-[#4E85BF] bg-[#0a0a0a]">
                  <div className="absolute inset-1 rounded-full bg-[#4E85BF] animate-pulse" />
                </div>

                <div className="pt-8 md:pt-12">
                  {/* Duration pill */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-none accent-gradient-text">
                      {exp.duration === "Present" ? "Now" : exp.duration}
                    </span>
                  </div>

                  {/* Role */}
                  <h3 className="text-2xl md:text-3xl font-display italic text-white mb-2">
                    {exp.role}
                  </h3>

                  {/* Date */}
                  <span className="text-xs text-[#888] uppercase tracking-wider">
                    {exp.startDate} — {exp.duration}
                  </span>

                  {/* Description */}
                  <p className="text-[#888] text-sm leading-relaxed mt-4">
                    {exp.description}
                  </p>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="text-[10px] text-[#D7E2EA]/70 border border-[#D7E2EA]/15 rounded-full px-3 py-1.5 uppercase tracking-wider">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 pt-12 border-t border-[#1f1f1f]"
        >
          <span className="text-xs text-[#888] uppercase tracking-[0.3em] block mb-8">Education</span>
          {education.map((edu) => (
            <div key={edu.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl md:text-2xl font-display italic text-white">{edu.degree}</h3>
                <p className="text-[#888] mt-1">{edu.institution}</p>
              </div>
              <span className="text-sm text-[#888] border border-[#1f1f1f] rounded-full px-4 py-2 shrink-0">
                {edu.duration}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Hire Me Section
function HireSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        analytics.trackContactFormSubmit(name, email);
      }
      else {
        setStatus("error");
        analytics.trackContactFormError("Server error");
      }
    } catch (error) {
      setStatus("error");
      analytics.trackContactFormError("Network error");
    }
  };

  return (
    <section id="hire" className="relative py-32 md:py-44 px-6 border-t border-[#1f1f1f] overflow-hidden">
      <SectionVideoBg src="/assets/hire-bg.mp4" fallback="/assets/hire-bg.png" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs text-[#888] uppercase tracking-[0.3em] block mb-4">Get in Touch</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display italic text-white leading-none">
            Hire Me
          </h2>
          <p className="text-[#888] mt-6 max-w-md mx-auto">
            Drop your details and I'll get back to you within 24 hours.
          </p>
        </motion.div>

        {/* Glass card container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Email Form — Glass Card */}
          <div className="rounded-3xl p-8 md:p-10 backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-[#4E85BF]/20 flex items-center justify-center">
                <Send className="w-5 h-5 text-[#89AACC]" />
              </div>
              <h3 className="text-lg text-white font-medium">Send a message</h3>
            </div>

            {status === "success" ? (
              <div className="py-8 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="w-7 h-7 text-green-400" />
                </div>
                <p className="text-white text-lg font-display italic">Sent! I'll contact you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#4E85BF]/50 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#4E85BF]/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full px-7 py-4 bg-white text-black text-sm font-medium rounded-full hover:scale-[1.02] transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Send Message</>}
                </button>
                {status === "error" && <p className="text-red-400 text-sm text-center">Failed. Try again.</p>}
              </form>
            )}
          </div>

          {/* WhatsApp — Glass Card */}
          <a
            href="https://wa.me/919521153320"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-3xl p-8 md:p-10 backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex flex-col items-center justify-center text-center hover:border-[#25D366]/30 transition-all duration-500"
          >
            {/* Glowing WhatsApp icon */}
            <div className="relative mb-6">
              <div className="absolute inset-0 w-20 h-20 rounded-full bg-[#25D366]/20 blur-xl group-hover:bg-[#25D366]/40 transition-all duration-500" />
              <div className="relative w-20 h-20 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center group-hover:border-[#25D366]/60 group-hover:scale-110 transition-all duration-500">
                <WhatsAppIcon className="w-10 h-10 text-[#25D366]" />
              </div>
            </div>

            <h3 className="text-xl text-white font-medium mb-2">Chat on WhatsApp</h3>
            <p className="text-[#888] text-sm mb-6">Instant response. Available 24/7.</p>
            <span className="text-[#25D366] font-medium text-lg">+91 95211 53320</span>

            <div className="mt-8 px-6 py-3 rounded-full border border-[#25D366]/30 text-[#25D366] text-sm font-medium group-hover:bg-[#25D366]/10 transition-colors">
              Open WhatsApp →
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// Support Section
function SupportSection() {
  const amounts = [100, 500, 1000, 10000];
  const [selected, setSelected] = useState<number | null>(null);
  const [custom, setCustom] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const getAmount = () => selected || parseInt(custom) || 0;

  const handlePay = async () => {
    const amount = getAmount();
    if (!amount) return;
    setStatus("loading");
    analytics.trackSupportClick(amount);
    try {
      const res = await fetch("/api/support/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      if (!res.ok) throw new Error();
      const { order_id, currency } = await res.json();
      analytics.trackPaymentInitiated(amount);

      const rzp = new window.Razorpay({
        key: "rzp_live_SvrmXaDUtmpmTx",
        amount: amount * 100,
        currency,
        name: "Support Amit",
        description: "Thank you!",
        order_id,
        handler: async (response: any) => {
          await fetch("/api/support/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, amount }),
          });
          analytics.trackPaymentSuccess(amount, order_id);
          setStatus("success");
        },
        modal: { ondismiss: () => setStatus("idle") },
        theme: { color: "#4E85BF" },
      });
      rzp.on("payment.failed", () => setStatus("error"));
      rzp.open();
    } catch { setStatus("error"); }
  };

  return (
    <section id="support" className="relative py-32 md:py-44 px-6 border-t border-[#1f1f1f] overflow-hidden">
      <SectionVideoBg src="/assets/support-bg.mp4" fallback="/assets/support-bg.png" />

      <div className="max-w-lg mx-auto text-center relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="text-xs text-[#888] uppercase tracking-[0.3em] block mb-4">Support</span>
          <h2 className="text-5xl md:text-7xl font-display italic text-white leading-none mb-4">
            Buy me a coffee
          </h2>
          <p className="text-[#888] max-w-sm mx-auto">
            If you enjoy my work, consider supporting me. Every bit helps me keep building.
          </p>
        </motion.div>

        {status === "success" ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="py-12 rounded-3xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08]"
          >
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full bg-pink-500/20 blur-xl" />
              <div className="relative w-16 h-16 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center">
                <Heart className="w-8 h-8 text-pink-400" />
              </div>
            </div>
            <p className="text-white text-2xl font-display italic">Thank you!</p>
            <p className="text-[#888] text-sm mt-2">Your support means everything.</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl p-8 md:p-10 backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]"
          >
            {/* Glowing coffee icon */}
            <div className="relative w-14 h-14 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-[#89AACC]/20 blur-lg" />
              <div className="relative w-14 h-14 rounded-full bg-[#89AACC]/10 border border-[#89AACC]/30 flex items-center justify-center">
                <Coffee className="w-7 h-7 text-[#89AACC]" />
              </div>
            </div>

            {/* Amount pills */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {amounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => { setSelected(amt); setCustom(""); }}
                  className={`py-3.5 rounded-xl text-sm font-medium border transition-all duration-300 ${
                    selected === amt
                      ? "border-[#89AACC] text-white bg-[#89AACC]/15 shadow-[0_0_15px_rgba(137,170,204,0.2)]"
                      : "border-white/[0.08] text-[#888] bg-white/[0.02] hover:border-[#89AACC]/40 hover:text-white"
                  }`}
                >
                  ₹{amt >= 1000 ? `${amt / 1000}k` : amt}
                </button>
              ))}
            </div>

            {/* Custom input */}
            <input
              type="number"
              placeholder="Custom amount (₹)"
              value={custom}
              onChange={(e) => { const val = e.target.value; if (Number(val) <= 100000) { setCustom(val); setSelected(null); } }}
              min="1"
              max="100000"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#89AACC]/50 transition-colors mb-6"
            />

            {/* Pay button */}
            <button
              onClick={handlePay}
              disabled={status === "loading" || !getAmount()}
              className="w-full px-7 py-4 rounded-full font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed bg-gradient-to-r from-[#89AACC] to-[#4E85BF] text-white hover:shadow-[0_0_30px_rgba(137,170,204,0.3)] hover:scale-[1.02]"
            >
              {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Heart className="w-4 h-4" /> Support {getAmount() > 0 ? `₹${getAmount().toLocaleString()}` : ""}</>}
            </button>
            {status === "error" && <p className="text-red-400 text-sm mt-4">Payment failed. Try again.</p>}
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Footer
// Social Dock — Apple-like magnification effect on right side
function SocialDock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const socials = [
    { name: "GitHub", href: "https://github.com/amitsaini-9", action: "link", icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
    )},
    { name: "LinkedIn", href: "https://www.linkedin.com/in/as-amit/", action: "link", icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    )},
    { name: "Instagram", href: "https://www.instagram.com/__amit_saini_/", action: "link", icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z"/></svg>
    )},
    { name: "Twitter", href: "https://x.com/AmitSaini9086", action: "link", icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    )},
    { name: "WhatsApp", href: "https://wa.me/919521153320", action: "link", icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
    )},
    { name: "Call", href: "tel:+919521153320", action: "link", icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
    )},
    { name: "Email", href: "amitsainiwork9@gmail.com", action: "copy", icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
    )},
  ];

  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 1.5;
    if (distance === 1) return 1.25;
    return 1;
  };

  const [copied, setCopied] = useState(false);

  const handleClick = (social: typeof socials[0]) => {
    if ((social as any).action === "copy") {
      navigator.clipboard.writeText(social.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2"
    >
      {socials.map((social, i) => {
        const isCopyAction = (social as any).action === "copy";
        const El = isCopyAction ? "button" : "a";
        const props = isCopyAction
          ? { onClick: () => handleClick(social) }
          : { href: social.href, target: "_blank", rel: "noopener noreferrer" };

        return (
          <motion.div
            key={social.name}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{ scale: getScale(i) }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative"
          >
            {/* @ts-ignore */}
            <El
              {...props}
              className="block w-9 h-9 md:w-10 md:h-10 p-2 md:p-2.5 rounded-xl text-white/50 hover:text-white transition-colors duration-200"
              title={social.name}
            >
              {social.icon}
            </El>
            {isCopyAction && copied && (
              <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 text-[10px] text-green-400 whitespace-nowrap bg-[#0a0a0a] px-2 py-1 rounded">
                Copied!
              </span>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-[#1f1f1f]">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-[#888] text-sm">© 2026 Amit Saini</span>
        <div className="flex items-center gap-6 text-[#888] text-sm">
          <a href="mailto:hello@sainiamit.com" className="hover:text-white transition-colors">hello@sainiamit.com</a>
          <a href="https://wa.me/919521153320" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">
            <WhatsAppIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

// Main Page
export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Navbar />
          <SocialDock />
          <Hero />
          <About />
          <SkillsSection />
          <Work />
          <ExperienceSection />
          <HireSection />
          <SupportSection />
          <Footer />
        </motion.div>
      )}
    </>
  );
}
