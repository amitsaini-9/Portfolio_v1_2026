"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import * as analytics from "@/lib/analytics";

export function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Page view tracking
  useEffect(() => {
    analytics.pageview(pathname);
  }, [pathname]);

  // Scroll depth tracking
  useEffect(() => {
    const depths = [25, 50, 75, 100];
    const tracked = new Set<number>();

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      depths.forEach((depth) => {
        if (scrollPercent >= depth && !tracked.has(depth)) {
          tracked.add(depth);
          analytics.trackScrollDepth(depth);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Time on page tracking
  useEffect(() => {
    const startTime = Date.now();
    return () => {
      const duration = Math.round((Date.now() - startTime) / 1000);
      if (duration > 5) {
        // Only track if spent more than 5 seconds
        analytics.event("timing_complete", "Engagement", "Time on Page", duration);
      }
    };
  }, []);

  return <>{children}</>;
}
