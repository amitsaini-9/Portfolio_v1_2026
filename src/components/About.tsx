"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  personalInfo,
  skills,
  experiences,
  projects,
  CAREER_START_DATE,
} from "@/data";
import FloatingShapes from "./FloatingShapes";
import {
  Github,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  ExternalLink,
} from "lucide-react";

// Helper to calculate duration
const calculateDuration = (startDate: Date) => {
  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }
  if (years > 0) return `${years} yr${years > 1 ? "s" : ""} ${months} mo`;
  return `${months} Mo+`;
};

const BentoCard = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className={`relative bg-[#0d0d16]/60 backdrop-blur-xl border border-indigo-500/20 rounded-3xl p-6 md:p-8 hover:bg-[#131221]/80 transition-all duration-500 group overflow-hidden shrink-0 ${className}`}
  >
    {/* Glowing Borders & Effects */}
    <div className="absolute inset-0 rounded-3xl border border-white/5 group-hover:border-cyan-500/40 transition-colors duration-500" />
    <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md pointer-events-none" />
    {/* Content */}
    <div className="relative z-10 h-full">{children}</div>
  </motion.div>
);

export default function About() {
  const yearsExp = calculateDuration(CAREER_START_DATE);

  return (
    <section
      id="about"
      className="min-h-screen w-full bg-transparent relative flex flex-col items-center justify-center p-4 min-[680px]:p-8 font-primary overflow-y-auto no-scrollbar md:h-screen md:overflow-hidden touch-pan-y"
    >
      {/* Main Grid Container - Mobile: Scrollable col, Desktop: Fixed 85vh Grid */}
      <div className="max-w-[1400px] w-full flex flex-col md:grid md:grid-cols-12 md:grid-rows-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.8fr)] gap-4 md:gap-6 relative z-10 py-20 min-[680px]:py-0 h-full max-h-[100dvh] overflow-y-auto md:overflow-y-visible md:h-[85vh] no-scrollbar">
        {/* Profile Bio - Top Left (Spans 2 rows) */}
        <BentoCard
          className="md:col-span-4 md:row-span-2 flex flex-col justify-between"
          delay={0.1}
        >
          <div>
            <h4 className="text-white/50 uppercase tracking-widest text-xs mb-6">
              Developer
            </h4>
            <h2 className="text-3xl font-bold text-white mb-6">About Me</h2>

            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 p-[2px] mb-6 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
              <div className="w-full h-full bg-[#0d0d16] rounded-full overflow-hidden flex items-center justify-center">
                {/* Replace with actual high quality avatar/image later */}
                <div className="text-4xl text-cyan-400 font-bold">A</div>
              </div>
            </div>

            <h3 className="text-xl font-medium text-white mb-3">
              {personalInfo.name}
            </h3>
            <p className="text-sm text-gray-400 font-light leading-relaxed mb-6">
              I am a creative software developer focused on building immersive,
              high-performance web applications. {personalInfo.bio}
            </p>
          </div>

          <div className="flex gap-4 text-gray-400 mt-auto">
            <a href="#" className="hover:text-cyan-400 transition-colors">
              <Github size={18} />
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              <LinkIcon size={18} />
            </a>
          </div>
        </BentoCard>

        {/* Core Stack - Top Middle */}
        <BentoCard
          className="md:col-span-4 md:row-span-1 flex flex-col"
          delay={0.2}
        >
          <h4 className="text-white/50 uppercase tracking-widest text-xs mb-4">
            Animated
          </h4>
          <h3 className="text-2xl font-medium text-white mb-6">Core Stack</h3>

          <div className="flex justify-between items-center mt-auto pb-4 px-2">
            <div className="flex flex-col items-center gap-2 group/icon">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/icon:border-cyan-400/50 group-hover/icon:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all">
                <div className="w-8 h-8 bg-cyan-400/20 rounded-full blur-xl absolute" />
                <span className="text-cyan-400 text-2xl font-bold font-mono">
                  Re
                </span>
              </div>
              <span className="text-xs text-gray-400">React</span>
            </div>

            <div className="flex flex-col items-center gap-2 group/icon">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/icon:border-green-400/50 group-hover/icon:shadow-[0_0_15px_rgba(74,222,128,0.3)] transition-all">
                <div className="w-8 h-8 bg-green-400/20 rounded-full blur-xl absolute" />
                <span className="text-green-400 text-2xl font-bold font-mono">
                  JS
                </span>
              </div>
              <span className="text-xs text-gray-400">Node.js</span>
            </div>

            <div className="flex flex-col items-center gap-2 group/icon">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/icon:border-yellow-400/50 group-hover/icon:shadow-[0_0_15px_rgba(250,204,21,0.3)] transition-all">
                <div className="w-8 h-8 bg-yellow-400/20 rounded-full blur-xl absolute" />
                <span className="text-yellow-400 text-2xl font-bold font-mono">
                  Py
                </span>
              </div>
              <span className="text-xs text-gray-400">Python</span>
            </div>
          </div>
        </BentoCard>

        {/* Journey Timeline - Right column (Spans 2 rows) */}
        <BentoCard
          className="md:col-span-4 md:row-span-2 flex flex-col"
          delay={0.3}
        >
          <h4 className="text-white/50 uppercase tracking-widest text-xs mb-4">
            Timeline
          </h4>
          <h3 className="text-2xl font-medium text-white mb-8">Journey</h3>

          <div className="flex-1 relative border-l border-white/10 ml-3 pl-6 space-y-8 py-2">
            {/* Experience Item */}
            <div className="relative">
              <div className="absolute w-3 h-3 bg-cyan-400 rounded-full -left-[30px] top-1.5 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
              <h5 className="text-white text-sm font-medium">
                {experiences[0].role}
              </h5>
              <p className="text-xs text-cyan-400 mt-1">
                {experiences[0].company}
              </p>
              <p className="text-xs text-gray-500 mt-1.5">
                July 2024 - Present
              </p>
            </div>

            {/* Start point */}
            <div className="relative">
              <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-[30px] top-1.5 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
              <h5 className="text-white text-sm font-medium">
                B.Tech Computer Science
              </h5>
              <p className="text-xs text-purple-400 mt-1">University</p>
              <p className="text-xs text-gray-500 mt-1.5">2020 - 2024</p>
            </div>

            <div className="relative">
              <div className="absolute w-3 h-3 bg-white/20 rounded-full -left-[30px] top-1.5" />
              <h5 className="text-white text-sm font-medium">Started Coding</h5>
              <p className="text-xs text-gray-400 mt-1">Hello World</p>
              <p className="text-xs text-gray-500 mt-1.5">2020</p>
            </div>
          </div>
        </BentoCard>

        {/* Skills Tags - Mid Middle */}
        <BentoCard
          className="md:col-span-4 md:row-span-1 flex flex-col justify-center"
          delay={0.4}
        >
          <h4 className="text-white/50 uppercase tracking-widest text-xs mb-4">
            Tools & Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {[...skills[0].items, ...skills[1].items.slice(0, 2)].map(
              (skill, i) => (
                <div
                  key={i}
                  className="px-3 py-1.5 rounded-md border border-white/10 bg-white/5 text-xs text-gray-300 flex items-center gap-2 hover:bg-white/10 hover:border-cyan-500/30 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
                  {skill}
                </div>
              ),
            )}
          </div>
        </BentoCard>

        {/* Selected Work - Bottom Left (Spans 2 cols) */}
        <BentoCard
          className="md:col-span-8 md:row-span-1 flex flex-col justify-center"
          delay={0.5}
        >
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-2xl font-medium text-white">Selected Work</h3>
            <a
              href="#projects"
              className="text-xs text-cyan-400 uppercase tracking-widest hover:text-cyan-300 flex items-center gap-1"
            >
              View All <ExternalLink size={12} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 h-full">
            {projects.slice(0, 4).map((p, i) => (
              <div
                key={i}
                className="group/project relative rounded-xl bg-black/40 border border-white/10 overflow-hidden aspect-video md:aspect-auto flex flex-col justify-end p-3 cursor-pointer"
              >
                {/* Background placeholder */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d16] via-transparent to-transparent z-10 opacity-80" />
                <div className="absolute inset-0 bg-white/5 group-hover/project:scale-105 transition-transform duration-500" />

                <div className="relative z-20 translate-y-2 group-hover/project:translate-y-0 transition-transform">
                  <h4 className="text-white text-xs font-medium truncate">
                    {p.title}
                  </h4>
                  <p className="text-cyan-400 text-[10px] uppercase opacity-0 group-hover/project:opacity-100 transition-opacity mt-1">
                    {p.tags[0]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* Let's Connect - Bottom Right */}
        <BentoCard
          className="md:col-span-4 md:row-span-1 flex flex-col justify-center items-center text-center group/connect cursor-pointer hover:border-purple-500/30"
          delay={0.6}
        >
          <h3 className="text-2xl font-medium text-white mb-2">
            Let&apos;s Connect
          </h3>
          <p className="text-sm text-gray-400 font-light mb-6">
            Open for new opportunities.
          </p>

          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="relative px-6 py-3 w-full max-w-[200px] rounded-full bg-white/5 border border-white/10 overflow-hidden text-sm text-white font-medium flex items-center justify-center gap-2 group-hover/connect:bg-white/10 transition-colors"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover/connect:opacity-100 transition-opacity" />
            <span>Get Resume</span>
          </a>
        </BentoCard>
      </div>
    </section>
  );
}
