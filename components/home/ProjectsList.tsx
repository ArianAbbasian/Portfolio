"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS_DATA, ProjectLangData, Project } from "@/constants/projects";
import ProjectModal from "../projects/ProjectModal";
import Lightbox from "../ui/Lightbox";
import { PROJECT_THEMES } from "@/constants/project-themes";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsList() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(
    null,
  );
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
        },
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
      <style jsx>{`
        @keyframes pulse-soft {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @keyframes shimmer-fast {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes ping-soft {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>

      <div
        ref={sectionRef}
        className={[
          "w-full flex",
          isDesktop
            ? "flex-row h-screen items-center flex-nowrap gap-0 py-0"
            : "flex-col gap-14 py-10 px-4 sm:px-8",
        ].join(" ")}
        style={{
          width: isDesktop ? `${totalProjects * 100}vw` : "100%",
          direction: "ltr",
        }}
      >
        {PROJECTS_DATA.map((project, index) => {
          const pData: ProjectLangData = project[
            locale as keyof typeof project
          ] as ProjectLangData;

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
                  : "w-full h-auto py-2",
              ].join(" ")}
            >
              {/* Optimized Glow - reduced opacity and slower animation */}
              <div
                className="absolute left-1/2 top-1/2 -z-10 h-[280px] w-[280px] sm:h-[500px] sm:w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] sm:blur-[160px] opacity-35 sm:opacity-45"
                style={{
                  backgroundColor: theme.glowColor,
                  animation: "pulse-soft 6s ease-in-out infinite",
                  willChange: "opacity",
                }}
              />

              <div
                onClick={() => !isDesktop && setSelectedProject(project)}
                className={[
                  "group relative flex w-full max-w-6xl flex-col justify-between overflow-hidden border p-5 sm:p-10 md:p-12 backdrop-blur-3xl",
                  "bg-white/65 dark:bg-white/[0.015]",
                  "transition-colors duration-300",
                  isDesktop
                    ? "h-[78vh] rounded-[2.5rem]"
                    : "h-auto rounded-3xl cursor-pointer active:scale-[0.98]",
                  theme.cardBorder,
                  theme.cardShadow,
                ].join(" ")}
                style={{
                  boxShadow:
                    "0 20px 50px rgba(0, 0, 0, 0.02), inset 0 1px 1px rgba(255, 255, 255, 0.15)",
                }}
              >
                {/* Optimized Shimmer - faster and uses transform only */}
                <div 
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 dark:via-white/8 to-transparent pointer-events-none z-20"
                  style={{
                    animation: "shimmer-fast 0.6s ease-out forwards",
                  }}
                />

                <div className="flex items-center justify-between z-10 w-full mb-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    {project.isCommercial && !project.isProduction && (
                      <span className="rounded-full border border-amber-500/20 bg-amber-500/8 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[10px] font-bold tracking-wide text-amber-600 dark:text-amber-400">
                        {t("commercialBadge")}
                      </span>
                    )}

                    {project.isProduction && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[10px] font-bold tracking-wide text-emerald-700 dark:text-emerald-300">
                        <span className="relative flex h-1.5 w-1.5">
                          <span 
                            className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                            style={{
                              animation: "ping-soft 2s cubic-bezier(0, 0, 0.2, 1) infinite",
                            }}
                          />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                        </span>
                        {t("productionBadge")}
                      </span>
                    )}

                    {project.monthlyUsers && (
                      <span className="inline-flex items-baseline gap-1.5 text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                        <span className="text-base sm:text-lg lg:text-xl font-black tracking-tight">
                          {project.monthlyUsers}
                        </span>
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                          {t("monthlyUsersLabel")}
                        </span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-[10px] sm:text-sm font-mono text-text-muted font-bold">
                      {project.year}
                    </span>
                    <span className="relative flex h-2 w-2">
                      <span
                        className="absolute inline-flex h-full w-full rounded-full opacity-60"
                        style={{
                          backgroundColor: theme.glowColor,
                          animation: "ping-soft 2s cubic-bezier(0, 0, 0.2, 1) infinite",
                        }}
                      />
                      <span
                        className="relative inline-flex h-2 w-2 rounded-full"
                        style={{ backgroundColor: theme.glowColor }}
                      />
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center my-auto z-10 w-full">
                  <div
                    className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1"
                    style={{ direction: locale === "fa" ? "rtl" : "ltr" }}
                  >
                    <span
                      className={[
                        "text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-1.5 block",
                        theme.accent,
                      ].join(" ")}
                    >
                      {pData.category}
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-5xl font-black text-text-primary tracking-tight leading-tight">
                      {pData.title}
                    </h2>
                    <p className="mt-3 text-xs sm:text-sm md:text-base text-text-secondary leading-relaxed opacity-85 group-hover:opacity-95 transition-opacity duration-300">
                      {pData.shortDescription}
                    </p>
                  </div>

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
                      theme.badgeBorder,
                    ].join(" ")}
                  >
                    <img
                      src={cleanImagePath}
                      alt={pData.title}
                      className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 transition-all duration-500 ease-out"
                      style={{
                        willChange: "transform, opacity",
                        transform: "scale(1)",
                        transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease-out",
                      }}
                      onMouseEnter={(e) => {
                        if (isDesktop) {
                          (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                      }}
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border pt-6 z-10 w-full mt-6">
                  <div className="hidden lg:flex flex-wrap gap-1.5 sm:gap-2">
                    {pData.technologies.map((tag, idx) => (
                      <span
                        key={idx}
                        className={[
                          "font-mono text-[9px] sm:text-xs tracking-wider px-2.5 py-1 rounded-xl border",
                          theme.tech,
                        ].join(" ")}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className={[
                      "inline-flex items-center justify-center rounded-xl bg-foreground text-background px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-bold shadow-lg whitespace-nowrap cursor-pointer",
                      "transition-all duration-200 ease-out",
                      "gap-2 hover:gap-3 active:scale-95",
                      "w-full lg:w-auto",
                      theme.btnHover,
                    ].join(" ")}
                    style={{
                      willChange: "transform, gap",
                    }}
                  >
                    {t("viewProject")}
                    <span
                      className={`text-base transition-transform duration-200`}
                      style={{
                        transform: "translateX(0)",
                        transition: locale === "fa" 
                          ? "transform 0.2s ease-out" 
                          : "transform 0.2s ease-out",
                      }}
                      onMouseEnter={(e) => {
                        const span = e.currentTarget as HTMLSpanElement;
                        span.style.transform = locale === "fa" 
                          ? "translateX(-4px) rotateZ(180deg)" 
                          : "translateX(4px)";
                      }}
                      onMouseLeave={(e) => {
                        const span = e.currentTarget as HTMLSpanElement;
                        span.style.transform = "translateX(0)";
                      }}
                    >
                      →
                    </span>
                  </button>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <Lightbox
        src={activeLightboxImage}
        onClose={() => setActiveLightboxImage(null)}
      />

      <ProjectModal
        project={selectedProject!}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}