"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FullPageScrollProps {
  sections: React.ReactNode[];
}

export default function FullPageScroll({ sections }: FullPageScrollProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const touchStart = useRef(0);

  const handleScroll = (direction: "up" | "down") => {
    if (isScrolling) return;

    if (direction === "down" && currentSection < sections.length - 1) {
      setIsScrolling(true);
      setCurrentSection((prev) => prev + 1);
      setTimeout(() => setIsScrolling(false), 1000);
    } else if (direction === "up" && currentSection > 0) {
      setIsScrolling(true);
      setCurrentSection((prev) => prev - 1);
      setTimeout(() => setIsScrolling(false), 1000);
    }
  };

  // Nav labels state
  const [activeLabel, setActiveLabel] = useState<number | null>(null);

  useEffect(() => {
    // Show label for 3 seconds on section change
    setActiveLabel(currentSection);
    const timer = setTimeout(() => setActiveLabel(null), 3000);
    return () => clearTimeout(timer);
  }, [currentSection]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Increase threshold to avoid accidental micros-scrolls
      if (Math.abs(e.deltaY) > 30) {
        handleScroll(e.deltaY > 0 ? "down" : "up");
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") handleScroll("down");
      if (e.key === "ArrowUp") handleScroll("up");
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // Find the currently active section element to check if we should allow native scroll
      const currentElement =
        document.querySelectorAll("section")[currentSection];

      // Let's deeply check the exact element the user touched
      let targetElement = e.target as HTMLElement | null;
      let isNativelyScrollable = false;

      // Walk up the DOM tree from the touch target to see if we are inside an "overflow-y-auto" container that actually has scrollable content
      while (
        targetElement &&
        targetElement !== currentElement &&
        targetElement !== document.body
      ) {
        const style = window.getComputedStyle(targetElement);
        const overflowY = style.overflowY;

        if (overflowY === "auto" || overflowY === "scroll") {
          // Check if this specific container actually has overflowing content
          if (targetElement.scrollHeight > targetElement.clientHeight) {
            isNativelyScrollable = true;

            // Further precision: check if they are at the absolute top or bottom boundary of this inner scroll container
            const touchEnd = e.changedTouches[0].clientY;
            const diff = touchStart.current - touchEnd;

            const isAtTop = targetElement.scrollTop <= 0;
            const isAtBottom =
              targetElement.scrollTop + targetElement.clientHeight >=
              targetElement.scrollHeight - 1; // -1 for subpixel rounding

            // If scrolling UP (diff < 0) and at Top -> Let FullPageScroll handle it
            // If scrolling DOWN (diff > 0) and at Bottom -> Let FullPageScroll handle it
            if ((diff < 0 && isAtTop) || (diff > 0 && isAtBottom)) {
              isNativelyScrollable = false; // Override: let the page turn
            }

            break;
          }
        }
        targetElement = targetElement.parentElement;
      }

      // If we found a native scrollable container and we aren't at its boundary, abort the FullPageScroll swipe
      if (isNativelyScrollable) {
        return;
      }

      const touchEnd = e.changedTouches[0].clientY;
      const diff = touchStart.current - touchEnd;

      if (Math.abs(diff) > 50) {
        handleScroll(diff > 0 ? "down" : "up");
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentSection, isScrolling]);

  const allNavLabels = [
    "Home",
    "About",
    "Skills",
    "Projects",
    "Experience",
    "Contact",
  ];

  // Only show dots and labels for sections that actually exist
  const actualSections = sections.length;
  const navLabels = allNavLabels.slice(0, actualSections);

  return (
    <div className="h-screen w-full overflow-hidden bg-transparent text-white relative">
      <AnimatePresence mode="wait">
        {sections[currentSection] ? (
          <motion.div
            key={currentSection}
            className="h-full w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {sections[currentSection]}
          </motion.div>
        ) : (
          // Failsafe in case currentSection gets out of bounds somehow
          <motion.div key="empty" className="h-full w-full bg-transparent" />
        )}
      </AnimatePresence>

      {/* Global Sidebar Navigation (Left) */}
      <motion.div
        className="fixed left-3 md:left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-5 md:gap-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {sections.map((_, index) => (
          <div key={index} className="relative group flex items-center">
            {/* Label (Shows on hover OR when activeLabel matches) */}
            <motion.div
              className={`hidden md:block absolute left-8 bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1 rounded-md text-xs tracking-widest uppercase pointer-events-none whitespace-nowrap transition-all duration-300 ${
                activeLabel === index || currentSection === index
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              }`}
              initial={false}
            >
              <span
                className={
                  currentSection === index ? "text-cyan-400" : "text-white/70"
                }
              >
                {navLabels[index] || `Section ${index + 1}`}
              </span>
            </motion.div>

            {/* Dot */}
            <button
              onClick={() => {
                if (!isScrolling) {
                  setCurrentSection(index);
                  setIsScrolling(true);
                  setTimeout(() => setIsScrolling(false), 1000);
                }
              }}
              className="group flex items-center justify-center"
            >
              <div
                className={`w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full border transition-all duration-300 ${
                  currentSection === index
                    ? "bg-cyan-400 border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] scale-125"
                    : "bg-white/20 border-white/40 group-hover:bg-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                }`}
              />
            </button>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
