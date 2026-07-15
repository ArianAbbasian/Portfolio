"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";

export default function Hero() {
  const t = useTranslations("home.hero");
  const tHome = useTranslations("home");

  const containerRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ndaRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    // ۱. تنظیم پرسپکتیو اولیه برای تمام حالت‌ها جهت آماده‌سازی سه بعدی
    gsap.set(containerRef.current, { perspective: 1200 });

    // ۲. انیمیشن پس‌زمینه مستقل (دیگر خط زمان متن‌ها را مسدود نمی‌کند)
    gsap.to(glowRef.current, {
      opacity: 0.18,
      scale: 1.1,
      duration: 2.5,
      ease: "power2.out",
    });

    // ۳. آماده‌سازی و اسپلیت متن هدر با کنترل جلوگیری از تکرار در StrictMode
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

      // ۴. اجرای انیمیشن‌های متنی بلافاصله از ثانیه صفر
      tl.fromTo(
        statusRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1.2 }
      )
      .fromTo(
        titleRef.current.querySelectorAll(".title-word"),
        { y: "140%", rotateX: -40, opacity: 0 },
        { y: "0%", rotateX: 0, opacity: 1, duration: 1.4, stagger: 0.06 },
        "-=0.9" // شروع سریع همزمان با ظاهر شدن چراغ وضعیت
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2 },
        "-=1.1"
      )
      .fromTo(
        ndaRef.current,
        { opacity: 0, y: 15, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2 },
        "-=0.9"
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
        "-=0.8"
      );
    }

    // ۵. سیستم جابجایی دائم و خودکار آیکون‌ها (Infinite Random Physics)
    const elements = document.querySelectorAll(".floating-element");
    elements.forEach((el) => {
      function animateRandomly() {
        const randomX = gsap.utils.random(-30, 60);
        const randomY = gsap.utils.random(-40, 80);
        const randomRot = gsap.utils.random(-20, 40);
        const randomTime = gsap.utils.random(4, 6);

        gsap.to(el, {
          x: "+=" + randomX,
          y: "+=" + randomY,
          rotation: randomRot,
          duration: randomTime,
          ease: "sine.inOut",
          onComplete: animateRandomly,
        });
      }
      animateRandomly();
    });

    // ۶. منطق دسکتاپ (حرکت با ماوس) و موبایل (ژیروسکوپ)
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
          const depth = (index + 1) * 15;
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
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-16 md:pt-44 md:pb-28 select-none"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* هاله نوری پس‌زمینه */}
      <div
        ref={glowRef}
        className="absolute top-[5%] lg:top-[-5%] left-1/2 -z-10 h-[280px] w-[280px] sm:h-[400px] sm:w-[600px] lg:h-[450px] lg:w-[750px] -translate-x-1/2 rounded-full bg-accent-primary blur-[90px] sm:blur-[140px] opacity-0 scale-90 will-change-transform"
      />

      {/* آیکون‌های فضایی شناور */}
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

      {/* کانتینر اصلی محتوا */}
      <div className="hero-content-wrapper relative z-10 mx-auto max-w-4xl text-center will-change-transform">
        {/* چراغ وضعیت زنده */}
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

        {/* تیتر اصلی */}
        <h1
          ref={titleRef}
          className="mt-8 text-3xl font-extrabold tracking-tight text-text-primary sm:text-5xl lg:text-6xl leading-[1.2] sm:leading-[1.15] flex flex-wrap justify-center gap-x-2 sm:gap-x-4 gap-y-0"
        >
          {t("title")}
        </h1>

        {/* دسکریپشن بیزینسی */}
        <p
          ref={subtitleRef}
          className="mx-auto mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-text-secondary opacity-0 px-2"
        >
          {t("subtitle")}
        </p>

        {/* باکس محرمانگی پروژه */}
        <div
          ref={ndaRef}
          className="mx-auto mt-8 sm:mt-12 max-w-xl opacity-0 px-2"
          style={{ transform: "translateZ(20px)" }}
        >
          <div
            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-xl transition-colors duration-300 hover:border-white/[0.15] hover:bg-white/[0.05]"
            style={{
              boxShadow: `
        0 4px 30px rgba(0, 0, 0, 0.4), 
        inset 0 1px 0px rgba(255, 255, 255, 0.1),
        inset 0 -1px 0px rgba(255, 255, 255, 0.05)
      `,
            }}
          >
            <p className="text-[11px] sm:text-xs leading-relaxed text-text-muted tracking-wide flex items-center justify-center gap-2">
              <span className="filter drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]">
                💡
              </span>
              {tHome("ndaNotice")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}