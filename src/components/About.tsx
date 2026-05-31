"use client";

import React from "react";
import { motion } from "framer-motion";
import { personalInfo, CAREER_START_DATE } from "@/data";
import { Github, Linkedin, Mail, MapPin, Clock } from "lucide-react";

const calculateDuration = (startDate: Date) => {
  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  if (months < 0) { years--; months += 12; }
  if (years > 0) return `${years}+ Year${years > 1 ? "s" : ""}`;
  return `${months} Months`;
};

export default function About() {
  const yearsExp = calculateDuration(CAREER_START_DATE);

  return (
    <section
      id="about"
      className="min-h-screen w-full bg-transparent relative flex flex-col items-center justify-center p-6 md:p-8 font-primary overflow-hidden"
    >
      <div className="max-w-5xl w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-300 font-medium tracking-widest text-xs mb-6">
            ABOUT ME
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Who I{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Am
            </span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Main Bio Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 rounded-3xl border border-white/10 bg-[#0d0d16]/60 backdrop-blur-xl p-8 hover:border-cyan-500/30 transition-colors"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {personalInfo.name}
            </h3>
            <p className="text-white/60 leading-relaxed mb-6">
              I&apos;m a full-stack developer specializing in building modern web applications,
              AI integrations, and automation systems. I turn complex problems into elegant,
              scalable solutions that deliver real business value.
            </p>
            <p className="text-white/50 leading-relaxed">
              From custom SaaS platforms to WhatsApp Business API integrations and AI chatbots —
              I handle the entire stack from concept to deployment on cloud infrastructure.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <a href="https://github.com/amitsaini-9" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-cyan-300 hover:border-cyan-500/50 transition-all text-sm">
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-cyan-300 hover:border-cyan-500/50 transition-all text-sm">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-cyan-300 hover:border-cyan-500/50 transition-all text-sm">
                <Mail className="w-4 h-4" /> Email
              </a>
            </div>
          </motion.div>

          {/* Stats Column */}
          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-3xl border border-white/10 bg-[#0d0d16]/60 backdrop-blur-xl p-6 hover:border-cyan-500/30 transition-colors flex-1 flex flex-col justify-center items-center text-center"
            >
              <Clock className="w-6 h-6 text-cyan-400 mb-3" />
              <div className="text-3xl font-bold text-white">{yearsExp}</div>
              <div className="text-white/50 text-sm mt-1">Experience</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-3xl border border-white/10 bg-[#0d0d16]/60 backdrop-blur-xl p-6 hover:border-purple-500/30 transition-colors flex-1 flex flex-col justify-center items-center text-center"
            >
              <MapPin className="w-6 h-6 text-purple-400 mb-3" />
              <div className="text-xl font-bold text-white">India</div>
              <div className="text-white/50 text-sm mt-1">Based</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-3xl border border-white/10 bg-[#0d0d16]/60 backdrop-blur-xl p-6 hover:border-cyan-500/30 transition-colors flex-1 flex flex-col justify-center items-center text-center"
            >
              <div className="text-3xl font-bold text-cyan-400">10+</div>
              <div className="text-white/50 text-sm mt-1">Projects</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
