"use html";
"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS_DATA, ProjectLangData, Project } from "@/constants/projects";
import ProjectModal from "./project-modal";
import Lightbox from "./lightbox";

gsap.registerPlugin(ScrollTrigger);

// تم‌های رنگی مجزا به همراه استایل دکمه‌های هاور اختصاصی
const PROJECT_THEMES = [
  {
    accent: "text-purple-600 dark:text-purple-400",
    badgeBg: "bg-purple-500/8 dark:bg-purple-500/12",
    badgeBorder: "border-purple-500/15 dark:border-purple-500/25",
    cardBorder: "border-purple-500/35 dark:border-purple-500/25", 
    glowColor: "rgba(147, 51, 234, 0.15)",
    cardShadow: "hover:shadow-[0_20px_50px_rgba(147,51,234,0.18)] dark:hover:shadow-[0_30px_70px_rgba(147,51,234,0.3)]",
    tech: "bg-purple-500/5 dark:bg-purple-500/8 border-purple-500/10 dark:border-purple-500/20 text-purple-700 dark:text-purple-300",
    btnHover: "hover:bg-purple-600 dark:hover:bg-purple-500 hover:text-white hover:shadow-[0_10px_25px_rgba(147,51,234,0.25)] hover:border-purple-500/40"
  },
  {
    accent: "text-blue-600 dark:text-blue-400",
    badgeBg: "bg-blue-500/8 dark:bg-blue-500/12",
    badgeBorder: "border-blue-500/15 dark:border-blue-500/25",
    cardBorder: "border-blue-500/35 dark:border-blue-500/25",
    glowColor: "rgba(37, 99, 235, 0.15)",
    cardShadow: "hover:shadow-[0_20px_50px_rgba(37,99,235,0.18)] dark:hover:shadow-[0_30px_70px_rgba(37,99,235,0.3)]",
    tech: "bg-blue-500/5 dark:bg-blue-500/8 border-blue-500/10 dark:border-blue-500/20 text-blue-700 dark:text-blue-300",
    btnHover: "hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white hover:shadow-[0_10px_25px_rgba(37,99,235,0.25)] hover:border-blue-500/40"
  },
  {
    accent: "text-emerald-600 dark:text-emerald-400",
    badgeBg: "bg-emerald-500/8 dark:bg-emerald-500/12",
    badgeBorder: "border-emerald-500/15 dark:border-emerald-500/25",
    cardBorder: "border-emerald-500/35 dark:border-emerald-500/25",
    glowColor: "rgba(5, 150, 105, 0.15)",
    cardShadow: "hover:shadow-[0_20px_50px_rgba(5,150,105,0.18)] dark:hover:shadow-[0_30px_70px_rgba(5,150,105,0.3)]",
    tech: "bg-emerald-500/5 dark:bg-emerald-500/8 border-emerald-500/10 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    btnHover: "hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white hover:shadow-[0_10px_25px_rgba(5,150,105,0.25)] hover:border-emerald-500/40"
  },
  {
    accent: "text-red-600 dark:text-red-400",
    badgeBg: "bg-red-500/8 dark:bg-red-500/12",
    badgeBorder: "border-red-500/15 dark:border-red-500/25",
    cardBorder: "border-red-500/35 dark:border-red-500/25",
    glowColor: "rgba(220, 38, 38, 0.15)",
    cardShadow: "hover:shadow-[0_20px_50px_rgba(220,38,38,0.18)] dark:hover:shadow-[0_30px_70px_rgba(220,38,38,0.3)]",
    tech: "bg-red-500/5 dark:bg-red-500/8 border-red-500/10 dark:border-red-500/20 text-red-700 dark:text-red-300",
    btnHover: "hover:bg-red-600 dark:hover:bg-red-500 hover:text-white hover:shadow-[0_10px_25px_rgba(220,38,38,0.25)] hover:border-red-500/40"
  }
];

export default function ProjectsList() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const t = useTranslations("home.projects");
  const locale = useLocale();

  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const totalProjects = PROJECTS_DATA.length;

  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    if (totalProjects === 0 || !isDesktop) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const scrollTween = gsap.fromTo(
        sectionRef.current,
        { x: 0 },
        {
          x: () => -(sectionRef.current!.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${sectionRef.current!.scrollWidth}`,
            invalidateOnRefresh: true,
          },
        }
      );

      return () => {
        scrollTween.scrollTrigger?.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, [totalProjects, isDesktop]);

  return (
    <div 
      ref={triggerRef} 
      className="relative w-full bg-background-main overflow-x-hidden"
      style={{ direction: "ltr" }} 
    >
      <div
        ref={sectionRef}
        className={[
          "w-full flex",
          isDesktop 
            ? "flex-row h-screen items-center flex-nowrap gap-0 py-0" 
            : "flex-col gap-14 py-10 px-4 sm:px-8"
        ].join(" ")}
        style={{
          width: isDesktop ? `${totalProjects * 100}vw` : "100%",
          direction: "ltr",
        }}
      >
        {PROJECTS_DATA.map((project, index) => {
          const pData: ProjectLangData = project[locale as keyof typeof project] as ProjectLangData;

          const cleanImagePath = project.image.startsWith("/public")
            ? project.image.replace("/public", "")
            : project.image;

          const theme = PROJECT_THEMES[index % PROJECT_THEMES.length];

          return (
            <section
              key={project.id}
              className={[
                "relative flex items-center justify-center select-none overflow-hidden",
                isDesktop 
                  ? "w-screen h-full flex-shrink-0 px-20" 
                  : "w-full h-auto py-2"
              ].join(" ")}
            >
              <div
                className="absolute left-1/2 top-1/2 -z-10 h-[280px] w-[280px] sm:h-[500px] sm:w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] sm:blur-[160px] opacity-70 animate-pulse"
                style={{
                  backgroundColor: theme.glowColor,
                  animationDuration: "8s",
                }}
              />

              {/* کارت اصلی پروژه‌ها */}
              <div
                onClick={() => !isDesktop && setSelectedProject(project)}
                className={[
                  "group relative flex w-full max-w-6xl flex-col justify-between overflow-hidden border p-5 sm:p-10 md:p-12 backdrop-blur-3xl transition-all duration-700",
                  "bg-white/65 dark:bg-white/[0.015]", 
                  isDesktop ? "h-[78vh] rounded-[2.5rem]" : "h-auto rounded-3xl cursor-pointer active:scale-[0.98]", 
                  theme.cardBorder, 
                  theme.cardShadow 
                ].join(" ")}
                style={{
                  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.02), inset 0 1px 1px rgba(255, 255, 255, 0.15)",
                }}
              >
                {/* افکت درخشش نوری شیشه‌ای متحرک */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-out bg-gradient-to-r from-transparent via-white/45 dark:via-white/12 to-transparent pointer-events-none z-20" />

                {/* هدر کارت */}
                <div className="flex items-center justify-between z-10 w-full mb-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className={[
                      "rounded-full border px-2.5 py-1 sm:px-3 sm:py-1.5 text-[9px] sm:text-xs font-bold uppercase tracking-widest transition-colors duration-300",
                      theme.badgeBg,
                      theme.badgeBorder,
                      theme.accent
                    ].join(" ")}>
                      {t("selectedCase")} / 0{index + 1}
                    </span>
                    
                    {project.isCommercial && (
                      <span className="rounded-full border border-amber-500/20 bg-amber-500/8 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[10px] font-bold tracking-wide text-amber-600 dark:text-amber-400">
                        COMMERCIAL
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-[10px] sm:text-sm font-mono text-text-muted font-bold">
                      {project.year}
                    </span>
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: theme.glowColor }} />
                      <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: theme.glowColor }} />
                    </span>
                  </div>
                </div>

                {/* بدنه اصلی کارت */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center my-auto z-10 w-full">
                  {/* بخش متون */}
                  <div
                    className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1"
                    style={{ direction: locale === "fa" ? "rtl" : "ltr" }}
                  >
                    <span className={[
                      "text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-1.5 block",
                      theme.accent
                    ].join(" ")}>
                      {pData.category}
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-5xl font-black text-text-primary tracking-tight leading-tight">
                      {pData.title}
                    </h2>
                    <p className="mt-3 text-xs sm:text-sm md:text-base text-text-secondary leading-relaxed opacity-85 group-hover:opacity-95 transition-opacity duration-500">
                      {pData.shortDescription}
                    </p>
                  </div>

                  {/* بخش تصویر */}
                  <div 
                    onClick={(e) => {
                      if (!isDesktop) {
                        e.stopPropagation();
                        setSelectedProject(project);
                      } else {
                        setActiveLightboxImage(cleanImagePath);
                      }
                    }}
                    className={[
                      "lg:col-span-7 w-full aspect-video relative rounded-xl sm:rounded-2xl overflow-hidden border pointer-events-auto",
                      isDesktop ? "cursor-zoom-in" : "cursor-pointer",
                      theme.badgeBorder
                    ].join(" ")}
                  >
                    <img
                      src={cleanImagePath}
                      alt={pData.title}
                      className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-1000 ease-out"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* 
                  ─── فوتر کارت (کاملاً اصلاح شده و پویا) ───
                  تگ‌های تکنولوژی در موبایل مخفی می‌شوند، اما دکمه CTA به صورت تمام‌عرض (w-full) برای راهنمایی دقیق کاربر باقی می‌ماند!
                */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border pt-6 z-10 w-full mt-6">
                  {/* پنهان‌سازی مینی‌مال فقط کپسول‌های تکنولوژی در موبایل */}
                  <div className="hidden lg:flex flex-wrap gap-1.5 sm:gap-2">
                    {pData.technologies.map((tag, idx) => (
                      <span
                        key={idx}
                        className={[
                          "font-mono text-[9px] sm:text-xs tracking-wider px-2.5 py-1 rounded-xl border",
                          theme.tech
                        ].join(" ")}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* دکمه ناوبری که در موبایل به صورت تمام‌عرض (w-full) برای راهنمایی ۱۰۰٪ کلاینت لمسی ظاهر می‌شود */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className={[
                      "inline-flex items-center justify-center rounded-xl bg-foreground text-background px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-bold shadow-lg whitespace-nowrap cursor-pointer",
                      "transition-all duration-300 ease-out",
                      "gap-2 group/btn hover:gap-3.5 active:scale-95", 
                      "w-full lg:w-auto", // تمام عرض در موبایل، خودکار در دسکتاپ
                      theme.btnHover 
                    ].join(" ")}
                  >
                    {t("viewProject")}
                    <span className={`text-base transition-transform duration-300 ${locale === "fa" ? "group-hover/btn:-translate-x-1.5 rotate-180" : "group-hover/btn:translate-x-1.5"}`}>
                      →
                    </span>
                  </button>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <Lightbox src={activeLightboxImage} onClose={() => setActiveLightboxImage(null)} />

      <ProjectModal 
        project={selectedProject!} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
}