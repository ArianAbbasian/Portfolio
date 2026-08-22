"use client";

import { useTranslations, useLocale } from "next-intl";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  useEffect(() => {
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
      }
    );

    return () => {
      scrollTween.scrollTrigger?.kill();
    };
  }, [locale]);

  const isRTL = locale === "fa";

  return (
    <div
      ref={triggerRef}
      className="relative w-full h-[300vh] bg-background-main overflow-hidden"
      style={{ direction: "ltr" }}
    >
      <div
        ref={pinRef}
        className="w-full h-screen flex flex-col justify-between py-10 md:py-16 select-none relative"
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
                    )
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