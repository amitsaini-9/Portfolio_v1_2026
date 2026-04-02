"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiThreedotjs,
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiOpenjdk,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiSupabase,
  SiFirebase,
  SiAmazonwebservices,
  SiGooglecloud,
  SiN8N,
  SiGit,
  SiGithub,
  SiShopify,
  SiWhatsapp,
} from "react-icons/si";
import {
  BrainCircuit,
  Database,
  Code2,
  Cpu,
  Wrench,
  Sparkles,
} from "lucide-react";

// Categorized exact skills with their corresponding icons and brand colors
const skillCategories = [
  {
    title: "FRONTEND",
    color: "from-cyan-500/20 to-blue-500/20",
    borderColor: "group-hover:border-cyan-400/50",
    glowColor:
      "shadow-[0_0_30px_rgba(34,211,238,0.05)] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]",
    items: [
      { name: "React", icon: SiReact, color: "text-[#61DAFB]" },
      { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
      { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]" },
      { name: "Tailwind", icon: SiTailwindcss, color: "text-[#06B6D4]" },
      { name: "Three.js", icon: SiThreedotjs, color: "text-[#ffffff]" },
      { name: "JavaScript", icon: SiJavascript, color: "text-[#F7DF1E]" },
      { name: "HTML5", icon: SiHtml5, color: "text-[#E34F26]" },
      { name: "CSS3", icon: SiCss3, color: "text-[#1572B6]" },
      { name: "Bootstrap", icon: SiBootstrap, color: "text-[#7952B3]" },
    ],
  },
  {
    title: "BACKEND",
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "group-hover:border-green-400/50",
    glowColor:
      "shadow-[0_0_30px_rgba(74,222,128,0.05)] group-hover:shadow-[0_0_30px_rgba(74,222,128,0.2)]",
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "text-[#339933]" },
      { name: "Express", icon: SiExpress, color: "text-white" },
      { name: "Python", icon: SiPython, color: "text-[#3776AB]" },
      { name: "Java", icon: SiOpenjdk, color: "text-[#ED8B00]" },
      { name: "REST APIs", icon: Code2, color: "text-green-400" },
    ],
  },
  {
    title: "DATABASE & CLOUD",
    color: "from-purple-500/20 to-fuchsia-500/20",
    borderColor: "group-hover:border-fuchsia-400/50",
    glowColor:
      "shadow-[0_0_30px_rgba(232,121,249,0.05)] group-hover:shadow-[0_0_30px_rgba(232,121,249,0.2)]",
    items: [
      { name: "MongoDB", icon: SiMongodb, color: "text-[#47A248]" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#4169E1]" },
      { name: "Prisma", icon: SiPrisma, color: "text-white" },
      { name: "Supabase", icon: SiSupabase, color: "text-[#3ECF8E]" },
      { name: "Firebase", icon: SiFirebase, color: "text-[#FFCA28]" },
      { name: "AWS", icon: SiAmazonwebservices, color: "text-[#FF9900]" },
      { name: "GCP", icon: SiGooglecloud, color: "text-[#4285F4]" },
      { name: "Neon", icon: Database, color: "text-fuchsia-400" },
      { name: "Convex", icon: Database, color: "text-fuchsia-300" },
    ],
  },
  {
    title: "AI & AUTOMATION",
    color: "from-orange-500/20 to-red-500/20",
    borderColor: "group-hover:border-orange-400/50",
    glowColor:
      "shadow-[0_0_30px_rgba(251,146,60,0.05)] group-hover:shadow-[0_0_30px_rgba(251,146,60,0.2)]",
    items: [
      { name: "Machine Learning", icon: BrainCircuit, color: "text-[#FF6F00]" },
      { name: "N8N AI", icon: SiN8N, color: "text-[#FF6D5A]" },
      { name: "Agentic Coding", icon: Cpu, color: "text-orange-400" },
    ],
  },
  {
    title: "TOOLS & APIS",
    color: "from-blue-500/20 to-indigo-500/20",
    borderColor: "group-hover:border-indigo-400/50",
    glowColor:
      "shadow-[0_0_30px_rgba(129,140,248,0.05)] group-hover:shadow-[0_0_30px_rgba(129,140,248,0.2)]",
    items: [
      { name: "Git", icon: SiGit, color: "text-[#F05032]" },
      { name: "GitHub", icon: SiGithub, color: "text-white" },
      { name: "Shopify Ext", icon: SiShopify, color: "text-[#95BF47]" },
      { name: "WhatsApp API", icon: SiWhatsapp, color: "text-[#25D366]" },
      { name: "Clerk", icon: Wrench, color: "text-[#6C47FF]" },
    ],
  },
];

// Interactive Flashlight Card Wrapper
const FlashlightCard = ({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const boundingRef = useRef<HTMLDivElement>(null);

  // Custom spring configurations for premium spatial motion (21st.dev style)
  const springConfig = { stiffness: 100, damping: 20, mass: 1 };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        type: "spring",
        stiffness: springConfig.stiffness,
        damping: springConfig.damping,
        mass: springConfig.mass,
        delay: delay,
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative group overflow-hidden ${className}`}
      onMouseMove={(ev) => {
        if (!boundingRef.current) return;
        const rect = boundingRef.current.getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const y = ev.clientY - rect.top;
        boundingRef.current.style.setProperty("--mouse-x", `${x}px`);
        boundingRef.current.style.setProperty("--mouse-y", `${y}px`);
      }}
      ref={boundingRef}
    >
      {/* Interactive Spotlight using CSS masks */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 mix-blend-color-dodge"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255,255,255,0.15), transparent 40%)`,
        }}
      />

      {/* Dynamic Border Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255,255,255,0.4), transparent 40%)`,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          padding: "1px", // border width
        }}
      />

      <div className="absolute inset-px rounded-[calc(inherit-1px)] bg-[#0a0a0f]/80 backdrop-blur-xl z-0" />

      {/* Content wrapper */}
      <div className="relative z-20 h-full w-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-linked parallax inside the specific section bounds for non-native window scroll compatibility
  const { scrollYProgress } = useScroll({
    container: containerRef, // Targeting local scroll
    offset: ["start start", "end end"],
  });

  // Subtle depths mapped via springs
  const yParallaxFast = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 100]),
    { stiffness: 400, damping: 90 },
  );
  const yParallaxSlow = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 50]),
    { stiffness: 400, damping: 90 },
  );

  return (
    <section
      id="skills"
      ref={containerRef}
      className="min-h-screen w-full bg-transparent relative flex flex-col items-center justify-center p-4 min-[680px]:p-8 font-primary overflow-y-auto no-scrollbar md:h-screen md:overflow-hidden perspective-[2000px] touch-pan-y"
    >
      {/* Deep Space Background Effects - Pushed infinitely backward via Z index and transform */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none z-0 transform-gpu"
        style={{ transform: "translateZ(-500px) scale(1.5)" }}
      >
        <div className="absolute top-[10%] left-[20%] w-[30vw] h-[30vw] min-w-[300px] bg-cyan-900/15 rounded-full blur-[100px] animate-pulse-slow" />
        <div
          className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] min-w-[300px] bg-purple-900/15 rounded-full blur-[120px] animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-[40%] left-[60%] w-[20vw] h-[20vw] min-w-[200px] bg-emerald-900/10 rounded-full blur-[80px]" />

        {/* Advanced Noise Texture overlay mapping depth */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay border-none" />
      </div>

      <div className="max-w-[1400px] w-full flex flex-col md:grid md:grid-cols-12 md:grid-rows-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.8fr)] gap-4 md:gap-6 relative z-10 py-20 min-[680px]:py-0 h-full max-h-dvh overflow-y-auto md:overflow-y-visible md:h-[85vh] transform-style-[preserve-3d]">
        {/* Left: Tagline Card (Spans 4 cols, 3 rows) - Parallax Shifted Forward */}
        <motion.div
          style={{ y: yParallaxSlow }}
          className="md:col-span-4 md:row-span-3 h-full z-30"
        >
          <FlashlightCard className="h-full rounded-4xl p-6 md:p-8 flex flex-col justify-center border border-white/10 shadow-[0_0_50px_rgba(34,211,238,0.05)]">
            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-transparent to-purple-500/5" />

            <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left gap-4 md:gap-6">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/50 bg-cyan-500/10 text-cyan-300 font-medium tracking-widest text-[10px] md:text-xs">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                VERSATILE DEVELOPER
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-linear-to-r from-white via-cyan-100 to-white/70 tracking-tight leading-tight">
                CODE.
                <br className="hidden md:block" /> CREATE.
                <br className="hidden md:block" /> CONQUER.
              </h2>

              <p className="text-sm md:text-base text-white/50 font-light leading-relaxed">
                Navigating the full spectrum of modern tech. I may not know
                every corner of every tool, but I know exactly what to reach for
                and how to build with it.
              </p>
            </div>
          </FlashlightCard>
        </motion.div>

        {/* FRONTEND Category (Spans 4 cols, 2 rows) - Parallax Shifted Backward slightly */}
        <motion.div
          style={{ y: yParallaxFast, transform: "translateZ(-50px)" }}
          className="md:col-span-4 md:row-span-2 z-20"
        >
          <FlashlightCard
            delay={0.1}
            className={`h-full rounded-4xl p-5 md:p-6 border border-white/10 transition-all duration-500 ${skillCategories[0].glowColor} ${skillCategories[0].borderColor}`}
          >
            <div
              className={`absolute inset-0 bg-linear-to-br ${skillCategories[0].color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
            />
            <h3 className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-cyan-300/40 mb-4 group-hover:text-cyan-300 transition-colors uppercase">
              {skillCategories[0].title}
            </h3>
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-5 place-items-center my-auto">
              {skillCategories[0].items.map((skill, sIdx) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={sIdx}
                    className="flex flex-col items-center gap-2 group/icon"
                  >
                    <div className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/icon:bg-white/10 group-hover/icon:scale-110 group-hover/icon:-translate-y-2 group-hover/icon:shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-all duration-400 ease-out relative">
                      <Icon
                        className={`w-5 h-5 md:w-7 md:h-7 ${skill.color} drop-shadow-lg`}
                      />
                    </div>
                    <span className="text-[9px] md:text-[10px] text-white/30 font-medium group-hover/icon:text-white/80 text-center tracking-wide">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </FlashlightCard>
        </motion.div>

        {/* BACKEND Category (Spans 4 cols, 2 rows) - Parallax Shifted Forward */}
        <motion.div
          style={{ y: yParallaxSlow, transform: "translateZ(30px)" }}
          className="md:col-span-4 md:row-span-2 z-40"
        >
          <FlashlightCard
            delay={0.2}
            className={`h-full rounded-4xl p-5 md:p-6 border border-white/10 transition-all duration-500 ${skillCategories[1].glowColor} ${skillCategories[1].borderColor}`}
          >
            <div
              className={`absolute inset-0 bg-linear-to-br ${skillCategories[1].color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
            />
            <h3 className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-green-300/40 mb-4 group-hover:text-green-300 transition-colors uppercase">
              {skillCategories[1].title}
            </h3>
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-5 place-items-center my-auto">
              {skillCategories[1].items.map((skill, sIdx) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={sIdx}
                    className="flex flex-col items-center gap-2 group/icon"
                  >
                    <div className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/icon:bg-white/10 group-hover/icon:scale-110 group-hover/icon:-translate-y-2 group-hover/icon:shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-all duration-400 ease-out relative">
                      <Icon
                        className={`w-5 h-5 md:w-7 md:h-7 ${skill.color} drop-shadow-lg`}
                      />
                    </div>
                    <span className="text-[9px] md:text-[10px] text-white/30 font-medium group-hover/icon:text-white/80 text-center tracking-wide">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </FlashlightCard>
        </motion.div>

        {/* DATABASE & CLOUD Category */}
        <motion.div
          style={{ y: yParallaxFast }}
          className="md:col-span-4 md:row-span-1 z-20"
        >
          <FlashlightCard
            delay={0.3}
            className={`h-full rounded-3xl p-5 md:p-6 border border-white/10 transition-all duration-500 ${skillCategories[2].glowColor} ${skillCategories[2].borderColor} flex flex-col justify-between`}
          >
            <div
              className={`absolute inset-0 bg-linear-to-br ${skillCategories[2].color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
            />
            <h3 className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-fuchsia-300/40 mb-3 group-hover:text-fuchsia-300 transition-colors uppercase">
              {skillCategories[2].title}
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              {skillCategories[2].items.map((skill, sIdx) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    key={sIdx}
                    className="flex items-center gap-1.5 md:gap-2 group/icon bg-white/5 px-2 py-1.5 md:px-3 md:py-2 rounded-xl border border-white/10 hover:bg-white/10 hover:border-fuchsia-500/50 transition-colors shadow-sm"
                  >
                    <Icon className={`w-3 h-3 md:w-4 md:h-4 ${skill.color}`} />
                    <span className="text-[9px] md:text-[10px] text-white/50 group-hover/icon:text-white/90 whitespace-nowrap font-medium">
                      {skill.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </FlashlightCard>
        </motion.div>

        {/* AI & AUTOMATION */}
        <motion.div
          style={{ y: yParallaxSlow, transform: "translateZ(10px)" }}
          className="md:col-span-2 md:row-span-1 z-30"
        >
          <FlashlightCard
            delay={0.4}
            className={`h-full rounded-3xl p-5 md:p-6 border border-white/10 transition-all duration-500 ${skillCategories[3].glowColor} ${skillCategories[3].borderColor} flex flex-col justify-center`}
          >
            <div
              className={`absolute inset-0 bg-linear-to-br ${skillCategories[3].color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
            />
            <h3 className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-orange-300/40 mb-3 group-hover:text-orange-300 transition-colors uppercase">
              AI & AUTO
            </h3>
            <div className="flex space-x-[-12px] ml-2">
              {skillCategories[3].items.map((skill, sIdx) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    whileHover={{ scale: 1.2, zIndex: 50, y: -5 }}
                    key={sIdx}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#131221] border border-white/20 flex items-center justify-center group/icon transition-all duration-300 relative shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                    title={skill.name}
                  >
                    <Icon className={`w-4 h-4 md:w-5 md:h-5 ${skill.color}`} />
                  </motion.div>
                );
              })}
            </div>
          </FlashlightCard>
        </motion.div>

        {/* TOOLS & APIS */}
        <motion.div
          style={{ y: yParallaxFast, transform: "translateZ(-20px)" }}
          className="md:col-span-2 md:row-span-1 z-20"
        >
          <FlashlightCard
            delay={0.5}
            className={`h-full rounded-3xl p-5 md:p-6 border border-white/10 transition-all duration-500 ${skillCategories[4].glowColor} ${skillCategories[4].borderColor} flex flex-col justify-center`}
          >
            <div
              className={`absolute inset-0 bg-linear-to-br ${skillCategories[4].color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
            />
            <h3 className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-indigo-300/40 mb-3 group-hover:text-indigo-300 transition-colors uppercase">
              {skillCategories[4].title}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skillCategories[4].items.map((skill, sIdx) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    whileHover={{ scale: 1.1, y: -2 }}
                    key={sIdx}
                    className="text-white/30 hover:text-white transition-colors p-1"
                    title={skill.name}
                  >
                    <Icon className={`w-5 h-5 md:w-6 md:h-6 ${skill.color}`} />
                  </motion.div>
                );
              })}
            </div>
          </FlashlightCard>
        </motion.div>
      </div>
    </section>
  );
}
