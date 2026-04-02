"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Smartphone,
  Terminal,
  Send,
} from "lucide-react";
import { personalInfo } from "@/data";

export default function Contact() {
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Simulate sending an email/message
    setTimeout(() => {
      setIsSent(true);
      setMessage("");
      setTimeout(() => setIsSent(false), 3000);
    }, 1000);
  };

  return (
    <section
      id="contact"
      className="min-h-screen w-full bg-transparent relative flex flex-col items-center justify-center p-4 min-[680px]:p-8 font-primary overflow-y-auto no-scrollbar md:h-screen md:overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay border-none pointer-events-none z-0" />
      <div className="absolute top-[30%] left-[20%] w-[40vw] h-[40vw] min-w-[400px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] min-w-[300px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] w-full flex flex-col md:flex-row gap-8 md:gap-16 relative z-10 py-20 min-[680px]:py-0 h-full max-h-dvh md:h-auto items-center">
        {/* Left Side: Header & Links */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/2 gap-6"
        >
          <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-300 font-medium tracking-widest text-xs w-fit">
            LET'S CONNECT
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-linear-to-r from-white via-cyan-100 to-white/70 tracking-tight leading-tight">
            START A <br className="hidden md:block" /> NEW NODE.
          </h2>

          <p className="text-sm md:text-base text-white/50 font-light leading-relaxed max-w-md">
            Whether you are looking to build a new project, optimize an existing
            architecture, or just want to network — my inbox is always open.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 hover:text-cyan-300 transition-all group"
            >
              <Mail className="w-4 h-4 text-white/50 group-hover:text-cyan-300" />
              <span className="text-sm font-medium text-white/70 group-hover:text-white">
                Email Me
              </span>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 text-white/70 hover:text-cyan-300 transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 text-white/70 hover:text-cyan-300 transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 text-white/70 hover:text-cyan-300 transition-all"
            >
              <Smartphone className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        {/* Right Side: Terminal Window */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full md:w-1/2"
        >
          <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl shadow-2xl flex flex-col font-mono text-sm">
            {/* Terminal Header */}
            <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="mx-auto flex items-center gap-2 text-white/30 text-xs">
                <Terminal className="w-3 h-3" />
                <span>guest@portfolio:~</span>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-5 md:p-6 lg:p-8 flex flex-col gap-4 min-h-[300px]">
              <div className="text-cyan-400">
                <span className="text-green-400">guest@portfolio</span>:
                <span className="text-blue-400">~</span>$ ./send_message.sh
              </div>

              <div className="text-white/70 ml-2">
                Initiating secure connection to{" "}
                {personalInfo.name.split(" ")[0]}...{" "}
                <span className="text-green-400">OK</span>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mt-2 h-full"
              >
                <div className="flex-1 relative group">
                  <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 to-purple-500 rounded-lg blur-sm opacity-0 group-focus-within:opacity-20 transition duration-500"></div>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="relative w-full h-32 md:h-40 bg-black/50 text-white/90 placeholder:text-white/20 p-4 rounded-lg border border-white/10 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 resize-none font-mono text-sm overflow-hidden"
                  />
                  {/* Blinking Cursor imitation when empty */}
                  {!message && (
                    <div className="absolute top-4 left-4 w-2 h-4 bg-cyan-400/50 animate-pulse pointer-events-none" />
                  )}
                </div>

                <div className="flex items-center justify-between">
                  {isSent ? (
                    <span className="text-green-400 flex items-center gap-2 font-medium">
                      ✓ Package delivered successfully.
                    </span>
                  ) : (
                    <span className="text-white/30 text-xs flex items-center gap-2">
                      Press{" "}
                      <kbd className="px-1.5 py-0.5 bg-white/10 rounded-md border border-white/20">
                        Enter
                      </kbd>{" "}
                      to execute
                    </span>
                  )}

                  <button
                    type="submit"
                    disabled={!message.trim() || isSent}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg border transition-all duration-300 ${
                      !message.trim() || isSent
                        ? "bg-white/5 border-white/5 text-white/30 cursor-not-allowed"
                        : "bg-cyan-500/20 border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/30 hover:scale-105"
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>Send</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
