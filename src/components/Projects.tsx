"use client";

import React from "react";
import { motion } from "framer-motion";
import { projects } from "@/data";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen w-full bg-transparent relative flex flex-col items-center justify-center p-6 md:p-8 font-primary overflow-hidden"
    >
      <div className="max-w-5xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-300 font-medium tracking-widest text-xs mb-6">
            WORK
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Projects
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-3xl border border-white/10 bg-[#0d0d16]/60 backdrop-blur-xl overflow-hidden hover:border-cyan-500/30 transition-all group ${
                project.featured ? "md:col-span-2" : ""
              }`}
            >
              {/* Project Image */}
              <div className="relative h-48 md:h-56 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-transparent overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-bold text-white/5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d16] to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium text-cyan-300/80 bg-cyan-500/10 border border-cyan-500/20 rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-white/70 hover:text-cyan-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" /> Live
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-white/70 hover:text-cyan-300 transition-colors"
                    >
                      <Github className="w-4 h-4" /> Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
