"use client";

import React from "react";
import { motion } from "framer-motion";
import { experiences, education } from "@/data";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

export default function Experience() {
  const springConfig = { stiffness: 100, damping: 20, mass: 1 };

  return (
    <section
      id="experience"
      className="min-h-screen w-full bg-transparent relative flex flex-col items-center justify-center p-4 min-[680px]:p-8 font-primary overflow-y-auto no-scrollbar md:h-screen md:overflow-hidden perspective-[2000px] touch-pan-y"
    >
      {/* Subtle Grid Background in Parallax Depth */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none transform-gpu"
        style={{ transform: "translateZ(-300px) scale(1.2)" }}
      />
      <div
        className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-cyan-500 opacity-[0.15] blur-[100px] animate-pulse-slow"
        style={{ transform: "translateZ(-400px)" }}
      />

      <div className="max-w-[1200px] w-full flex flex-col gap-12 relative z-10 py-20 min-[680px]:py-0 h-full max-h-dvh md:h-[85vh] overflow-y-auto pr-2 no-scrollbar transform-style-[preserve-3d]">
        <motion.div
          initial={{ opacity: 0, y: -40, rotateX: -10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", ...springConfig, delay: 0.1 }}
          className="flex flex-col items-center text-center gap-4 shrink-0 origin-top"
        >
          <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-300 font-medium tracking-widest text-xs shadow-[0_0_20px_rgba(168,85,247,0.1)]">
            CAREER JOURNEY
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-white via-cyan-100 to-white/70 tracking-tight drop-shadow-lg">
            EXPERIENCE
          </h2>
        </motion.div>

        {/* Unified Timeline Container */}
        <div className="w-full max-w-4xl mx-auto relative pl-4 md:pl-0 flex-1 z-20">
          {/* Main Vertical Central Line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-10 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-cyan-500/30 via-purple-500/50 to-transparent -translate-x-1/2"
          />

          {/* Experience Array Mapping */}
          <div className="flex flex-col gap-12 md:gap-20 relative z-10">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={`exp-${exp.id}`}
                  initial={{ opacity: 0, y: 60, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-150px" }}
                  transition={{
                    type: "spring",
                    ...springConfig,
                    delay: index * 0.15 + 0.2,
                  }}
                  className={`flex flex-col md:flex-row relative items-start md:items-center w-full group ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Timeline Glowing Node - Dynamic Pulse */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                      delay: index * 0.15 + 0.4,
                    }}
                    className="absolute left-10 md:left-1/2 w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#0a0a0f] border-2 border-cyan-400 -translate-x-1/2 group-hover:bg-cyan-400 group-hover:scale-150 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.8)] transition-all duration-500 z-30 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                  />

                  {/* Card Content Container */}
                  <div
                    className={`w-full md:w-1/2 pl-20 md:pl-0 pt-2 md:pt-0 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}
                    style={{ transform: "translateZ(30px)" }} // Push card forward
                  >
                    <div className="relative p-6 md:p-8 rounded-4xl border border-white/5 bg-[#0a0a0f]/60 backdrop-blur-xl hover:border-cyan-500/40 transition-colors shadow-2xl hover:shadow-[0_20px_60px_rgba(34,211,238,0.1)] group-hover:-translate-y-2 duration-500">
                      <Briefcase
                        className={`absolute top-6 ${isEven ? "md:right-8 md:left-auto left-6" : "left-6"} w-6 h-6 text-cyan-500/20 group-hover:text-cyan-400/50 transition-colors duration-500`}
                      />
                      <div className="mt-8 md:mt-0 relative z-10">
                        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-300 mb-2 uppercase drop-shadow-sm">
                          <Calendar className="w-3 h-3" />{" "}
                          {exp.startDate.split("-")[0]} - {exp.duration}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors drop-shadow-md">
                          {exp.role}
                        </h3>
                        <h4 className="text-sm md:text-base text-white/50 mb-4">
                          {exp.company}
                        </h4>
                        <p className="text-sm text-white/70 leading-relaxed mb-6">
                          {exp.description}
                        </p>
                        <div
                          className={`flex flex-wrap gap-2 ${isEven ? "md:justify-end" : ""}`}
                        >
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 text-[10px] font-semibold tracking-wider text-cyan-100/70 bg-cyan-500/10 border border-cyan-500/20 rounded shadow-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Education Array Mapping */}
            {education.map((edu, index) => {
              const isEven = (experiences.length + index) % 2 === 0;
              return (
                <motion.div
                  key={`edu-${edu.id}`}
                  initial={{ opacity: 0, y: 60, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-150px" }}
                  transition={{
                    type: "spring",
                    ...springConfig,
                    delay: index * 0.15 + 0.2,
                  }}
                  className={`flex flex-col md:flex-row relative items-start md:items-center w-full group ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                      delay: index * 0.15 + 0.4,
                    }}
                    className="absolute left-8 md:left-1/2 w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#0a0a0f] border-2 border-purple-400 -translate-x-1/2 group-hover:bg-purple-400 group-hover:scale-150 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] transition-all duration-500 z-30 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                  />

                  <div
                    className={`w-full md:w-1/2 pl-16 md:pl-0 pt-2 md:pt-0 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}
                    style={{ transform: "translateZ(30px)" }}
                  >
                    <div className="relative p-6 md:p-8 rounded-4xl border border-white/5 bg-[#0a0a0f]/60 backdrop-blur-xl hover:border-purple-500/40 transition-colors shadow-2xl hover:shadow-[0_20px_60px_rgba(168,85,247,0.1)] group-hover:-translate-y-2 duration-500">
                      <GraduationCap
                        className={`absolute top-6 ${isEven ? "md:right-8 md:left-auto left-6" : "left-6"} w-6 h-6 text-purple-500/20 group-hover:text-purple-400/50 transition-colors duration-500`}
                      />
                      <div className="mt-8 md:mt-0 relative z-10">
                        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-purple-300 mb-2 uppercase drop-shadow-sm">
                          <Calendar className="w-3 h-3" /> {edu.duration}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors drop-shadow-md">
                          {edu.degree}
                        </h3>
                        <h4 className="text-sm md:text-base text-white/50 mb-4">
                          {edu.institution}
                        </h4>
                        <p className="text-sm text-white/70 leading-relaxed">
                          {edu.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
