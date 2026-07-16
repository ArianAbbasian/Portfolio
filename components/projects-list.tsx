"use html";
"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS_DATA, ProjectLangData, Project } from "@/constants/projects";
import ProjectModal from "./project-modal";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsList() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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
            : "flex-col gap-10 py-8 px-4 sm:px-6"
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

          const glowColors = [
            "rgba(147, 51, 234, 0.12)",
            "rgba(37, 99, 235, 0.12)",
            "rgba(5, 150, 105, 0.12)",
            "rgba(220, 38, 38, 0.12)",
          ];

          const hoverBorders = [
            "hover:border-purple-500/30",
            "hover:border-blue-500/30",
            "hover:border-emerald-500/30",
            "hover:border-red-500/30",
          ];

          const projectGlowColor = glowColors[index % glowColors.length];
          const projectHoverBorder = hoverBorders[index % hoverBorders.length];

          return (
            <section
              key={project.id}
              className={[
                "relative flex items-center justify-center select-none overflow-hidden",
                isDesktop 
                  ? "w-screen h-full flex-shrink-0 px-20" 
                  : "w-full h-auto py-1"
              ].join(" ")}
            >
              {/* هاله رنگی پس‌زمینه */}
              <div
                className="absolute left-1/2 top-1/2 -z-10 h-[280px] w-[280px] sm:h-[500px] sm:w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] sm:blur-[160px] opacity-70 animate-pulse"
                style={{
                  backgroundColor: projectGlowColor,
                  animationDuration: "8s",
                }}
              />

              {/* کارت اصلی پروژه‌ها */}
              <div
                className={[
                  "group relative flex w-full max-w-6xl flex-col justify-between overflow-hidden border border-border bg-surface/80 dark:bg-white/[0.02] p-5 sm:p-10 md:p-12 backdrop-blur-3xl transition-all duration-700",
                  isDesktop ? "h-[78vh] rounded-[2.5rem]" : "h-auto gap-6 rounded-3xl",
                  projectHoverBorder
                ].join(" ")}
                style={{
                  boxShadow: "0 30px 70px rgba(0, 0, 0, 0.08), dark:0 40px 90px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.1)",
                }}
              >
                {/* هدر کارت */}
                <div className="flex items-center justify-between z-10 w-full mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="rounded-full border border-border bg-black/5 dark:bg-black/40 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[9px] sm:text-xs font-bold uppercase tracking-widest text-text-secondary">
                      {t("selectedCase")} / 0{index + 1}
                    </span>
                    {project.isCommercial && (
                      <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[10px] font-semibold tracking-wide text-amber-500 dark:text-amber-400">
                        COMMERCIAL
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-[10px] sm:text-sm font-mono text-text-muted font-bold">
                      {project.year}
                    </span>
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: projectGlowColor }} />
                      <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: projectGlowColor }} />
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
                    <span className="text-[10px] sm:text-xs font-bold tracking-wider text-accent uppercase opacity-75 mb-1 sm:mb-2 block">
                      {pData.category}
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-5xl font-black text-text-primary tracking-tight leading-tight">
                      {pData.title}
                    </h2>
                    <p className="mt-2.5 text-xs sm:text-sm md:text-base text-text-secondary leading-relaxed opacity-85 group-hover:opacity-95 transition-opacity duration-500">
                      {pData.shortDescription}
                    </p>
                  </div>

                  {/* بخش تصویر */}
                  <div className="lg:col-span-7 w-full aspect-video relative rounded-xl sm:rounded-2xl overflow-hidden border border-border bg-black/5 dark:bg-black/40 order-1 lg:order-2">
                    <img
                      src={cleanImagePath}
                      alt={pData.title}
                      className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-1000 ease-out"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* فوتر کارت */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border pt-5 z-10 w-full mt-4">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {pData.technologies.map((tag, idx) => (
                      <span
                        key={idx}
                        // تغییر بک‌گراند و مرز تگ‌ها برای نمایش منظم و باکیفیت در هر دو تم لایت و دارک
                        className="font-mono text-[9px] sm:text-xs tracking-wider text-text-secondary bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] px-2.5 py-1 rounded-xl"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-4 py-3 sm:px-5 sm:py-3 text-xs sm:text-sm font-bold transition-all duration-300 hover:opacity-90 active:scale-95 shadow-lg group/btn whitespace-nowrap"
                  >
                    {t("viewProject")}
                    <span className={`text-base transition-transform duration-300 ${locale === "fa" ? "group-hover/btn:-translate-x-1 rotate-180" : "group-hover/btn:translate-x-1"}`}>
                      →
                    </span>
                  </button>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <ProjectModal 
        project={selectedProject!} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
}