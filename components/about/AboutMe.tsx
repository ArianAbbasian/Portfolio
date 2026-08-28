"use client";

import { useTranslations, useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface SlideSegment {
  type: "text" | "highlight";
  content: string;
}

interface IntroSlide {
  segments: SlideSegment[];
}

export default function AboutMe() {
  const t = useTranslations("about");
  const locale = useLocale();

  const triggerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const introSlides = t.raw("introSlides") as IntroSlide[];
  const [isDesktop, setIsDesktop] = useState(false);

  // تشخیص دستگاه
  useEffect(() => {
    const checkDevice = () => setIsDesktop(window.innerWidth >= 768);
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // GSAP فقط برای دسکتاپ
  useEffect(() => {
    if (!isDesktop) return;

    if (!textRef.current) return;

    const isRTL = locale === "fa";

    const getScrollAmount = () => {
      if (!textRef.current) return 0;
      return textRef.current.scrollWidth - window.innerWidth;
    };

    const endX = () => {
      const amount = getScrollAmount();
      return isRTL ? amount : -amount;
    };

    const scrollTween = gsap.fromTo(
      textRef.current,
      { x: 0 },
      {
        x: endX,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: pinRef.current,
          scrub: 0.5,
          start: "top top",
          end: "bottom bottom",
          invalidateOnRefresh: true,
        },
      },
    );

    return () => {
      scrollTween.scrollTrigger?.kill();
    };
  }, [isDesktop, locale]);

  const isRTL = locale === "fa";

  // ══════════════════════════════════
  // نسخه دسکتاپ (بدون تغییر)
  // ══════════════════════════════════
  if (isDesktop) {
    return (
      <div
        ref={triggerRef}
        className="relative w-full h-[300vh] bg-background-main overflow-hidden"
        style={{ direction: "ltr" }}
      >
        <div
          ref={pinRef}
          className="w-full h-screen flex flex-col justify-between py-0 select-none relative"
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[300px] w-[600px] rounded-full bg-accent/5 blur-[120px] opacity-70 pointer-events-none" />

          <div className="mx-auto max-w-5xl w-full px-6 md:px-12 lg:px-16 flex items-center justify-between text-[10px] sm:text-[11px] font-sans text-text-muted font-bold tracking-widest uppercase">
            <span></span>
            <span></span>
          </div>

          <div className="w-full overflow-visible my-auto py-8 sm:py-16 relative">
            <div
              ref={textRef}
              className="whitespace-nowrap text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black tracking-tight text-text-primary uppercase leading-none flex items-center gap-6 sm:gap-10"
              style={{ direction: locale === "fa" ? "rtl" : "ltr" }}
            >
              {introSlides.map((slide, slideIndex) => (
                <div
                  key={slideIndex}
                  className="w-screen h-full shrink-0 flex items-center justify-center px-6 md:px-16 lg:px-24 whitespace-normal text-center sm:text-start"
                  style={{ direction: isRTL ? "rtl" : "ltr" }}
                >
                  <div className="text-2xl sm:text-4xl md:text-5xl lg:text-[4.2rem] font-black tracking-tight text-text-primary uppercase leading-tight max-w-5xl">
                    {slide.segments.map((segment, segmentIndex) =>
                      segment.type === "highlight" ? (
                        <span
                          key={segmentIndex}
                          className="bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent px-1 font-black"
                        >
                          {segment.content}
                        </span>
                      ) : (
                        <span key={segmentIndex}>{segment.content}</span>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto max-w-5xl w-full px-6 md:px-12 lg:px-16 flex flex-col gap-6">
            <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="flex items-center justify-between text-[10px] font-sans text-text-muted font-bold tracking-widest uppercase opacity-60"></div>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════
  // نسخه موبایل (چت استایل)
  // ══════════════════════════════════
  return <MobileAboutMe slides={introSlides} isRTL={isRTL} />;
}

function MobileAboutMe({
  slides,
  isRTL,
}: {
  slides: IntroSlide[];
  isRTL: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-background-main"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.045] blur-[110px]" />

      {/* Header */}
      <div className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-6 pt-6">
        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-text-muted">
          INFO
        </span>
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-muted">
          {isRTL ? "آرین عباسیان" : "ARIAN ABBASIAN"}
        </span>
      </div>

      {/* Vertical axis (decorative) */}
      <div
        className={`pointer-events-none absolute top-[20%] z-20 h-[60%] w-px bg-border/60 ${
          isRTL ? "right-6" : "left-6"
        }`}
      />
      <div
        className={`pointer-events-none absolute top-[20%] z-20 h-14 w-px bg-accent ${
          isRTL ? "right-6" : "left-6"
        }`}
      />

      {/* Slider content */}
      <div className="absolute inset-0 z-10 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? -30 : 30 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`w-full px-12 ${isRTL ? "pr-16 pl-7" : "pl-16 pr-7"}`}
          >
            {/* Chapter label */}
            <div className="mb-8 flex items-center gap-3">
              <span className="text-[10px] font-bold tracking-[0.28em] text-accent">
                0{currentIndex + 1}
              </span>
              <span className="h-px w-8 bg-border" />
              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-text-muted">
                {currentIndex === 0
                  ? "IDENTITY"
                  : currentIndex === 1
                    ? "MINDSET"
                    : "PURPOSE"}
              </span>
            </div>

            {/* Main statement */}
            <div
              className="max-w-[350px] text-[clamp(2rem,9vw,3rem)] font-black leading-[1.38] tracking-[-0.035em] text-text-primary"
              style={{ textWrap: "balance" }}
            >
              {slides[currentIndex].segments.map((segment, segmentIndex) =>
                segment.type === "highlight" ? (
                  <span key={segmentIndex} className="text-accent">
                    {segment.content}
                  </span>
                ) : (
                  <span key={segmentIndex}>{segment.content}</span>
                ),
              )}
            </div>

            {/* Bottom metadata */}
            <div className="mt-12 flex items-center gap-4">
              <span className="text-[9px] font-bold tracking-[0.2em] text-text-muted">
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(slides.length).padStart(2, "0")}
              </span>
              <div className="h-px w-16 bg-border" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-8 left-1/2 z-40 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-8 bg-accent" : "w-2 bg-text-muted/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
