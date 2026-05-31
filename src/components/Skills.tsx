"use client";

import React from "react";
import { motion } from "framer-motion";
import { skills } from "@/data";
import { Code2, Server, Database, Cpu, Wrench } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  Frontend: <Code2 className="w-5 h-5" />,
  Backend: <Server className="w-5 h-5" />,
  "Database & Cloud": <Database className="w-5 h-5" />,
  "AI & Automation": <Cpu className="w-5 h-5" />,
  "Tools & Integrations": <Wrench className="w-5 h-5" />,
};

export default function Skills() {
  return (
    <section
      id="skills"
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-300 font-medium tracking-widest text-xs mb-6">
            TECH STACK
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Skills &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Technologies
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((category, i) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-white/10 bg-[#0d0d16]/60 backdrop-blur-xl p-6 hover:border-purple-500/30 transition-all group"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                  {categoryIcons[category.category] || <Code2 className="w-5 h-5" />}
                </div>
                <h3 className="font-semibold text-white">{category.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-medium text-white/70 bg-white/5 border border-white/10 rounded-lg hover:border-purple-500/40 hover:text-purple-300 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
