"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { personalInfo, navItems } from "@/data";

// Dynamic import for Spline to avoid SSR issues
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

// Fast Shooting Star (no tail, just a quick streak)
function ShootingStar({
  delay,
  top,
  left,
}: {
  delay: number;
  top: string;
  left: string;
}) {
  return (
    <motion.div
      className="absolute w-[100px] h-[1px] bg-gradient-to-r from-transparent via-white to-transparent rounded-full"
      style={{ top, left, rotate: "35deg" }}
      initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        x: [0, 200],
        y: [0, 100],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: 0.6,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 8 + 4,
        ease: "easeOut",
      }}
    />
  );
}

// Multiple Shooting Stars
function ShootingStars() {
  const stars = [
    { delay: 1, top: "8%", left: "15%" },
    { delay: 4, top: "12%", left: "55%" },
    { delay: 7, top: "20%", left: "5%" },
    { delay: 10, top: "5%", left: "75%" },
    { delay: 13, top: "25%", left: "35%" },
    { delay: 16, top: "15%", left: "85%" },
  ];

  return (
    <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
      {stars.map((star, i) => (
        <ShootingStar key={i} {...star} />
      ))}
    </div>
  );
}

// Space Starfield Background
function SpaceBackground() {
  // Generate stars with different sizes and brightness
  const stars = Array.from({ length: 150 }, (_, i) => ({
    id: i,
    size: Math.random() > 0.9 ? 2 : Math.random() > 0.7 ? 1.5 : 1,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    opacity: Math.random() * 0.6 + 0.2,
    twinkle: Math.random() > 0.7,
    delay: Math.random() * 3,
  }));

  return (
    <div className="absolute inset-0 z-[1] bg-black">
      {/* Static stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            top: star.top,
            left: star.left,
          }}
          initial={{ opacity: star.opacity }}
          animate={
            star.twinkle
              ? {
                  opacity: [star.opacity, star.opacity * 0.3, star.opacity],
                  scale: [1, 0.8, 1],
                }
              : {}
          }
          transition={
            star.twinkle
              ? {
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: star.delay,
                  ease: "easeInOut",
                }
              : {}
          }
        />
      ))}

      {/* Nebula glow - balanced */}
      <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-purple-800/30 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-indigo-800/25 rounded-full blur-[180px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-violet-900/20 rounded-full blur-[150px]" />
    </div>
  );
}

// Sidebar Navigation
function SidebarNav() {
  const sections = navItems.map((item) => item.label);

  return (
    <motion.nav
      className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      {sections.map((section, index) => (
        <motion.a
          key={section}
          href={`#${section.toLowerCase()}`}
          className="group flex items-center gap-4"
          whileHover={{ x: 5 }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 + index * 0.1 }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-white/20 border border-white/40 group-hover:bg-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.8)] transition-all duration-300" />
          <span className="text-xs text-white/0 group-hover:text-white/70 font-light tracking-widest uppercase transition-all duration-300">
            {section}
          </span>
        </motion.a>
      ))}
    </motion.nav>
  );
}

// Hero Text
function HeroText() {
  return (
    <motion.div
      className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-full px-6 flex flex-col items-center text-center min-[680px]:items-start min-[680px]:text-left min-[680px]:left-12 min-[680px]:max-w-[60%] lg:left-20 lg:max-w-[45%]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      <div className="flex flex-col gap-0 items-center min-[680px]:items-start">
        <div className="overflow-hidden">
          <motion.h1
            className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tighter leading-[0.9]"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
          >
            SOFTWARE
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500 tracking-tighter leading-[0.9]"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
          >
            DEVELOPER
          </motion.h1>
        </div>
      </div>

      <motion.p
        className="mt-6 text-xl md:text-2xl text-white font-medium tracking-wide"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        Hey, I&apos;m <span className="text-cyan-400">{personalInfo.name}</span>
      </motion.p>

      <motion.p
        className="mt-2 text-sm md:text-base text-white/50 font-light tracking-widest uppercase"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.8 }}
      >
        {personalInfo.title}
      </motion.p>

      <motion.p
        className="mt-3 text-sm text-white/40 max-w-sm min-[680px]:max-w-xs leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        {personalInfo.bio}
      </motion.p>
    </motion.div>
  );
}

// Scroll Indicator
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      <span className="text-xs text-white/40 tracking-widest uppercase">
        Scroll
      </span>
      <motion.div className="w-5 h-8 border border-white/30 rounded-full flex justify-center pt-1.5">
        <motion.div
          className="w-1 h-1.5 bg-cyan-400/80 rounded-full"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-[100dvh] w-full bg-transparent relative flex flex-col items-center justify-center overflow-hidden font-primary pt-16 sm:pt-20 md:pt-0"
    >
      {/* Space Background with stars and nebula */}
      <SpaceBackground />

      {/* Shooting Stars - fast, no tail */}
      <ShootingStars />

      {/* Spline 3D Scene - responsive positioning, hidden on mobile (< 680px) */}
      <div className="hidden min-[680px]:block absolute top-0 left-0 h-full z-10 w-[205%] md:w-[195%] lg:w-[185%] 2xl:w-[180%]">
        <Spline
          className="w-full h-full"
          scene="https://prod.spline.design/NV0Oc99COwfNTbxa/scene.splinecode"
        />
      </div>

      {/* Hero Text */}
      <HeroText />

      {/* Scroll Indicator */}
      <ScrollIndicator />

      {/* Subtle vignette */}
      <div className="absolute inset-0 z-30 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
    </section>
  );
}
