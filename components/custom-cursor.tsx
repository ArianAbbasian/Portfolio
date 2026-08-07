"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // ۲. تعریف تابع حرکت سریع برای نقطه داخلی (پاسخ‌دهی آنی)
    const xDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });

    // ۳. تعریف تاخیر فیزیکی و کشسانی برای حلقه بیرونی (افکت خروج و بازگشت)
    const xRing = gsap.quickTo(ring, "x", { duration: 0.38, ease: "power2.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.38, ease: "power2.out" });

    // ۴. شنونده حرکت ماوس
    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // ۵. تشخیص عناصر تعاملی (دکمه‌ها، لینک‌ها، کارت‌ها) جهت بزرگ‌نمایی حلقه
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = target.closest(
        'a, button, input, textarea, [role="button"], .lg-btn, .seg-item, .cursor-pointer, [data-cursor="pointer"]'
      );

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // اگر دستگاه لمسی باشد، چیزی رندر نشود
  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden select-none">
      {/* ─── ۱. حلقه بیرونی (با تاخیر حرکتی و افکت شیشه‌ای) ─── */}
      <div
        ref={ringRef}
        style={{
          transform: "translate3d(-50%, -50%, 0)",
          willChange: "transform",
        }}
        className={[
          "fixed top-0 left-0 rounded-full border border-accent/60 dark:border-accent/80 transition-all duration-300 ease-out pointer-events-none",
          isVisible ? "opacity-100" : "opacity-0",
          isHovered
            ? "size-14 bg-accent/10 border-accent scale-125 backdrop-blur-[1px] shadow-[0_0_20px_rgba(0,122,255,0.2)]"
            : "size-10 bg-transparent",
        ].join(" ")}
      />

      {/* ─── ۲. نقطه داخلی (پوینتر اصلی و سریع) ─── */}
      <div
        ref={dotRef}
        style={{
          transform: "translate3d(-50%, -50%, 0)",
          willChange: "transform",
        }}
        className={[
          "fixed top-0 left-0 rounded-full bg-accent transition-all duration-200 ease-out pointer-events-none shadow-[0_0_12px_var(--accent)]",
          isVisible ? "opacity-100" : "opacity-0",
          isHovered ? "size-2.5 bg-text-primary scale-125" : "size-2",
        ].join(" ")}
      />
    </div>
  );
}