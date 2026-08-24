"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { gsap } from "gsap";

export default function Hero() {
  const locale = useLocale();
  const t = useTranslations("home.hero");

  const containerRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    if (containerRef.current) {
      gsap.set(containerRef.current, { perspective: 1200 });
    }

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.18,
        scale: 1.1,
        duration: 2.5,
        ease: "power2.out",
      });
    }

    if (titleRef.current) {
      const isAlreadySplit = titleRef.current.querySelector(".title-word");

      if (!isAlreadySplit) {
        const words = titleRef.current.innerText.split(" ");
        titleRef.current.innerHTML = words
          .map(
            (word) =>
              `<span class="inline-block overflow-hidden py-1 px-1">
                <span class="title-word inline-block origin-left">${word}</span>
               </span>`,
          )
          .join(" ");
      }

      tl.fromTo(
        statusRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1.2 },
      )
        .fromTo(
          titleRef.current.querySelectorAll(".title-word"),
          { y: "140%", rotateX: -40, opacity: 0 },
          { y: "0%", rotateX: 0, opacity: 1, duration: 1.4, stagger: 0.06 },
          "-=0.9",
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.2 },
          "-=1.1",
        )
        .fromTo(
          ".floating-element",
          { opacity: 0, scale: 0 },
          {
            opacity: 0.7,
            scale: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "back.out(1.5)",
          },
          "-=0.8",
        );
    }

    const elements = document.querySelectorAll(".floating-element");
    const floatTweens: gsap.core.Tween[] = [];

    elements.forEach((el) => {
      function animateBounded() {
        const randomX = gsap.utils.random(-25, 25);
        const randomY = gsap.utils.random(-25, 25);
        const randomRot = gsap.utils.random(-20, 20);
        const randomTime = gsap.utils.random(3.5, 5.5);

        const tween = gsap.to(el, {
          x: randomX,
          y: randomY,
          rotation: randomRot,
          duration: randomTime,
          ease: "sine.inOut",
          onComplete: animateBounded,
        });

        floatTweens.push(tween);
      }
      animateBounded();
    });

    mm.add("(min-width: 600px)", () => {
      gsap.set(".hero-content-wrapper", {
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xPercent = clientX / innerWidth - 0.5;
        const yPercent = clientY / innerHeight - 0.5;

        gsap.to(".hero-content-wrapper", {
          rotateY: xPercent * 16,
          rotateX: -yPercent * 16,
          duration: 0.8,
          ease: "power2.out",
        });

        gsap.to(glowRef.current, {
          x: xPercent * 70,
          y: yPercent * 70,
          duration: 1.2,
          ease: "power2.out",
        });

        elements.forEach((el, index) => {
          const depth = (index + 1) * 12;
          gsap.to(el, {
            xPercent: xPercent * depth,
            yPercent: yPercent * depth,
            duration: 0.6,
            ease: "power1.out",
          });
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    });

    mm.add("(max-width: 599px)", () => {
      const handleOrientation = (e: DeviceOrientationEvent) => {
        const { gamma, beta } = e;
        if (!gamma || !beta) return;

        const xMove = Math.min(Math.max(gamma, -25), 25);
        const yMove = Math.min(Math.max(beta - 45, -25), 25);

        gsap.to(glowRef.current, {
          x: xMove * 1.2,
          y: yMove * 1.2,
          duration: 1,
        });

        elements.forEach((el, index) => {
          gsap.to(el, {
            xPercent: xMove * (0.2 + index * 0.1),
            yPercent: yMove * (0.3 + index * 0.1),
            duration: 0.5,
          });
        });
      };

      window.addEventListener("deviceorientation", handleOrientation);
      return () =>
        window.removeEventListener("deviceorientation", handleOrientation);
    });

    return () => {
      tl.kill();
      floatTweens.forEach((t) => t.kill());
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-16 md:pt-44 min-[613px]:pb-[150px] select-none"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        ref={glowRef}
        className="absolute top-[5%] lg:top-[-5%] left-1/2 -z-10 h-[280px] w-[280px] sm:h-[400px] sm:w-[600px] lg:h-[450px] lg:w-[750px] -translate-x-1/2 rounded-full bg-accent-primary blur-[90px] sm:blur-[140px] opacity-0 scale-90 will-change-transform"
      />

      <div
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="floating-element absolute left-[6%] top-[15%] lg:left-[8%] lg:top-[25%] text-2xl sm:text-3xl lg:text-5xl"
          style={{
            filter:
              "drop-shadow(0 0 15px rgba(239,68,68,0.7)) drop-shadow(0 0 35px rgba(239,68,68,0.3))",
          }}
        >
          🚀
        </div>

        <div
          className="floating-element absolute right-[8%] top-[18%] lg:right-[10%] lg:top-[20%] rounded-xl border border-accent-primary/30 bg-black/40 px-2.5 py-1 text-xs lg:text-xl font-mono text-accent-primary backdrop-blur-md"
          style={{ filter: "drop-shadow(0 0 12px rgba(20,184,166,0.6))" }}
        >
          &lt;/&gt;
        </div>

        <div
          className="floating-element absolute left-[10%] bottom-[28%] lg:left-[12%] lg:bottom-[20%] text-2xl sm:text-3xl"
          style={{
            filter:
              "drop-shadow(0 0 15px rgba(245,158,11,0.7)) drop-shadow(0 0 40px rgba(245,158,11,0.3))",
          }}
        >
          ✨
        </div>

        <div
          className="floating-element absolute right-[7%] bottom-[25%] lg:right-[15%] lg:bottom-[25%] text-2xl sm:text-3xl lg:text-4xl"
          style={{
            filter:
              "drop-shadow(0 0 18px rgba(59,130,246,0.6)) drop-shadow(0 0 45px rgba(59,130,246,0.3))",
          }}
        >
          💻
        </div>

        <div
          className="floating-element absolute left-[20%] top-[8%] lg:left-[25%] lg:top-[12%] text-xl sm:text-2xl lg:text-3xl"
          style={{
            filter:
              "drop-shadow(0 0 15px rgba(168,85,247,0.7)) drop-shadow(0 0 35px rgba(168,85,247,0.3))",
          }}
        >
          💎
        </div>

        <div
          className="floating-element absolute right-[22%] bottom-[30%] lg:right-[30%] lg:bottom-[15%] text-xl sm:text-2xl lg:text-3xl"
          style={{
            filter:
              "drop-shadow(0 0 15px rgba(16,185,129,0.7)) drop-shadow(0 0 35px rgba(16,185,129,0.3))",
          }}
        >
          🎯
        </div>
      </div>

      <div className="hero-content-wrapper relative z-10 mx-auto max-w-4xl text-center will-change-transform">
        <div ref={statusRef} className="opacity-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-background-glass/70 px-3.5 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-medium text-text-secondary">
              {t("status")}
            </span>
          </div>
        </div>

        <h1
          ref={titleRef}
          className={`mt-8 font-extrabold tracking-tight text-text-primary leading-[1.2] sm:leading-[1.15] flex flex-wrap justify-center gap-x-2 sm:gap-x-4 gap-y-0 ${
            locale === "fa"
              ? "!text-[2.2rem] sm:!text-[3rem] md:!text-[3.4rem] lg:!text-[3.4rem]"
              : "!text-[2rem] sm:!text-[2.75rem] md:!text-[3.2rem] lg:!text-[3.2rem]"
          }`}
        >
          {t("title")}
        </h1>

        <p
          ref={subtitleRef}
          className="mx-auto mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-text-secondary opacity-0 px-2"
        >
          {t("subtitle")}
        </p>
      </div>
    </section>
  );
}
