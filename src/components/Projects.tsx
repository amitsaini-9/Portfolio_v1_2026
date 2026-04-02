"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { projects } from "@/data";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Studio-grade spring easing matching the spatial guidelines
  const springConfig = { stiffness: 100, damping: 20, mass: 1 };

  return (
    <section
      id="projects"
      className="min-h-screen w-full bg-transparent relative flex flex-col items-center justify-center p-4 min-[680px]:p-8 font-primary overflow-y-auto no-scrollbar md:h-screen md:overflow-hidden perspective-[2000px] touch-pan-y"
    >
      {/* Background Ambience pushed into distant Z space */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none z-0 transform-gpu"
        style={{ transform: "translateZ(-800px) scale(1.5)" }}
      >
        <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] min-w-[300px] bg-blue-900/15 rounded-full blur-[100px] animate-pulse-slow" />
        <div
          className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] min-w-[300px] bg-cyan-900/15 rounded-full blur-[120px] animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay border-none" />
      </div>

      <div className="max-w-[1400px] w-full flex flex-col gap-8 md:gap-12 relative z-10 py-20 min-[680px]:py-0 h-full max-h-dvh md:h-auto transform-style-[preserve-3d]">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -40, rotateX: -10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", ...springConfig, delay: 0.1 }}
          className="flex flex-col items-center text-center gap-4 origin-top"
        >
          <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-300 font-medium tracking-widest text-xs shadow-[0_0_20px_rgba(59,130,246,0.1)]">
            FEATURED WORK
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-white via-cyan-100 to-white/70 tracking-tight drop-shadow-lg">
            PROJECTS
          </h2>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 pb-20 md:pb-0 perspective-[1000px] z-20">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                type: "spring",
                stiffness: springConfig.stiffness,
                damping: springConfig.damping,
                mass: springConfig.mass,
                delay: index * 0.15 + 0.2,
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Tilt
                tiltMaxAngleX={12}
                tiltMaxAngleY={12}
                perspective={1200}
                scale={1.03}
                transitionSpeed={2500}
                gyroscope={true}
                className="h-full transform-style-[preserve-3d]"
              >
                <div
                  className="relative h-full flex flex-col rounded-4xl p-6 border border-white/5 bg-[#0a0a0f]/60 backdrop-blur-xl overflow-hidden group/card shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:shadow-[0_30px_80px_rgba(34,211,238,0.15)] transition-shadow duration-700"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{ transform: "translateZ(30px)" }} // Push card visually toward user
                >
                  {/* Internal Glow Effects */}
                  <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen" />

                  {/* Dynamic Shimmer Specular Map */}
                  <div className="absolute -inset-full bg-linear-to-r from-transparent via-white/10 to-transparent -skew-x-30 translate-x-[-150%] group-hover/card:animate-shimmer pointer-events-none z-30" />

                  {/* Project Image Placeholder */}
                  <div
                    className="w-full relative aspect-16/10 rounded-xl overflow-hidden mb-6 bg-black/80 border border-white/10 group-hover/card:border-cyan-500/40 transition-colors duration-500"
                    style={{ transform: "translateZ(20px)" }} // Image pops out relative to card base
                  >
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent z-10" />
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full opacity-50 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-700 ease-out"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        target.parentElement!.innerHTML = `<div class="w-full h-full flex flex-col items-center justify-center text-white/20 bg-linear-to-br from-cyan-900/10 to-blue-900/10 font-mono text-sm tracking-widest">[ ${project.title.toUpperCase()} MAP ]</div>`;
                      }}
                    />

                    {/* Quick Access Links Overlay */}
                    <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                          }}
                          className="absolute bottom-4 right-4 z-20 flex gap-2"
                        >
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2.5 rounded-full bg-[#0a0a0f]/80 backdrop-blur-md border border-white/20 text-white/70 hover:bg-white hover:text-black hover:border-white transition-all hover:scale-110 shadow-lg"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2.5 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-500/50 text-cyan-300 hover:bg-cyan-400 hover:text-black hover:border-cyan-400 transition-all hover:scale-110 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Content (Popping out slightly) */}
                  <div
                    className="flex-1 flex flex-col relative z-20"
                    style={{ transform: "translateZ(10px)" }}
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover/card:text-cyan-300 transition-colors drop-shadow-md">
                      {project.title}
                    </h3>
                    <p className="text-sm md:text-base text-white/50 leading-relaxed max-w-sm mb-6 flex-1">
                      {project.description}
                    </p>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1 text-[10px] md:text-xs font-semibold tracking-wider text-cyan-200/80 bg-cyan-950/40 border border-cyan-800/60 rounded-md shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
