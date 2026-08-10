"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  logo: string;
  floatSpeed: number;
}

interface SkillCategory {
  id: string;
  titleFa: string;
  titleEn: string;
  categoryImage: string;
  accentColor: string;
  accentText: string;
  skills: Skill[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    titleFa: "توسعه فرانت‌اند",
    titleEn: "Frontend Development",
    categoryImage: "/images/skills/frontend.png",
    accentColor: "rgba(0, 122, 255, 0.25)",
    accentText: "text-blue-500",
    skills: [
      { name: "JavaScript", logo: "/images/skills/javaScript.png", floatSpeed: 3.2 },
      { name: "TypeScript", logo: "/images/skills/Typescript.png", floatSpeed: 4.1 },
      { name: "React.js", logo: "/images/skills/react.png", floatSpeed: 3.7 },
      { name: "Next.js", logo: "/images/skills/next.png", floatSpeed: 4.5 },
    ],
  },
  {
    id: "backend",
    titleFa: "بک‌اند و داده",
    titleEn: "Backend & Data",
    categoryImage: "/images/skills/backend.png",
    accentColor: "rgba(147, 51, 234, 0.25)",
    accentText: "text-purple-500",
    skills: [
      { name: "ASP.NET", logo: "/images/skills/asp-net-core.png", floatSpeed: 3.5 },
      { name: "REST APIs", logo: "/images/skills/api.png", floatSpeed: 4.3 },
      { name: "SQL Server", logo: "/images/skills/sql-server.png", floatSpeed: 3.8 },
      { name: "MongoDB", logo: "/images/skills/mongodb.png", floatSpeed: 4.6 },
    ],
  },
  {
    id: "ui",
    titleFa: "طراحی UI/UX",
    titleEn: "UI/UX Design",
    categoryImage: "/images/skills/ui.png",
    accentColor: "rgba(16, 185, 129, 0.25)",
    accentText: "text-emerald-500",
    skills: [
      { name: "HTML5", logo: "/images/skills/html.png", floatSpeed: 3.3 },
      { name: "CSS3", logo: "/images/skills/css.png", floatSpeed: 4.2 },
      { name: "Tailwind CSS", logo: "/images/skills/tailwind.png", floatSpeed: 3.6 },
      { name: "Bootstrap", logo: "/images/skills/bootStrap.png", floatSpeed: 4.8 },
      { name: "Material UI", logo: "/images/skills/MUI.png", floatSpeed: 3.9 },
      { name: "Responsive UI", logo: "/images/skills/Responsive UI.png", floatSpeed: 4.4 },
    ],
  },
];

export default function AboutSkills() {
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const skillsTriggerRef = useRef<HTMLDivElement>(null);
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const gearRef = useRef<SVGSVGElement>(null);

  const isRTL = locale === "fa";

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const scrollTween = gsap.fromTo(
        skillsSectionRef.current,
        {},
        {
          scrollTrigger: {
            trigger: skillsTriggerRef.current,
            pin: skillsSectionRef.current,
            scrub: 0.5,
            start: "top top",
            end: "bottom bottom",
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              if (gearRef.current) {
                gsap.set(gearRef.current, { rotation: progress * 360 });
              }

              const totalSectors = SKILL_CATEGORIES.length;
              const index = Math.min(
                Math.floor(progress * totalSectors),
                totalSectors - 1
              );
              setActiveIndex(index);
            },
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
  }, []);

  const currentCat = SKILL_CATEGORIES[activeIndex];

  return (
    <>
      <style jsx global>{`
        @keyframes organicFloat {
          0% { transform: translate3d(0, 0, 0) rotate(0deg); }
          50% { transform: translate3d(0, -10px, 0) rotate(2deg); }
          100% { transform: translate3d(0, 0, 0) rotate(0deg); }
        }
      `}</style>

      {/* ─── نسخه کاملاً پاسخ‌گوا ─── */}
      <div
        ref={skillsTriggerRef}
        className="relative w-full h-[220vh] sm:h-[250vh] my-10 sm:my-16 select-none"
      >
        <div
          ref={skillsSectionRef}
          className="h-screen w-full flex items-center justify-center overflow-hidden relative"
        >
          {/* هاله نوری متحرک پس‌زمینه */}
          <div
            className="absolute left-1/2 top-1/2 -z-10 h-[320px] w-[320px] sm:h-[450px] sm:w-[450px] lg:h-[500px] lg:w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] sm:blur-[160px] opacity-40 transition-colors duration-700 pointer-events-none"
            style={{ backgroundColor: currentCat.accentColor }}
          />

          <div className="mx-auto max-w-6xl w-full px-4 sm:px-8 flex flex-col lg:grid lg:grid-cols-12 items-center justify-center gap-6 sm:gap-8 lg:gap-8 z-10">
            
            {/* ۱. بخش سکان چرخشی (بزرگ‌تر) و عنوان دسته‌بندی */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center gap-4 sm:gap-6 relative shrink-0">
              
              <div className="relative size-52 sm:size-72 lg:size-96 flex items-center justify-center p-2 sm:p-4">
                {/* SVG سکان بزرگ‌تر */}
                <svg
                  ref={gearRef}
                  viewBox="0 0 200 200"
                  className="w-full h-full transition-colors duration-300 drop-shadow-md overflow-visible"
                  fill="none"
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="68"
                    stroke="var(--text-primary)"
                    strokeWidth="4"
                    strokeDasharray="8 6"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="30"
                    stroke="var(--text-primary)"
                    strokeWidth="4.5"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="10"
                    fill="var(--text-primary)"
                    stroke="none"
                  />

                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                    <g key={angle} transform={`rotate(${angle} 100 100)`}>
                      <line
                        x1="100"
                        y1="30"
                        x2="100"
                        y2="16"
                        stroke="var(--text-primary)"
                        strokeWidth="5.5"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="100"
                        cy="16"
                        r="5.5"
                        fill="var(--text-primary)"
                        stroke="none"
                      />
                    </g>
                  ))}
                </svg>

                {/* 🖼️ تصویر کاور دسته فعال در مرکز سکان (بزرگ‌تر و نمایان‌تر) */}
                <div className="absolute size-20 sm:size-28 lg:size-36 rounded-full border border-white/80 dark:border-white/20 bg-white/95 dark:bg-[#0a0a14]/95 backdrop-blur-md shadow-2xl flex items-center justify-center p-2.5 sm:p-4 lg:p-5 overflow-hidden z-20">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentCat.id}
                      src={currentCat.categoryImage}
                      alt={currentCat.titleEn}
                      initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                      transition={{ duration: 0.35, ease: "backOut" }}
                      className="w-full h-full object-contain filter drop-shadow-md"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </AnimatePresence>
                </div>

                {/* مرکز درخشان سکان */}
                <div
                  className="absolute size-24 sm:size-32 lg:size-40 rounded-full blur-2xl opacity-80 transition-colors duration-700 pointer-events-none z-0"
                  style={{ backgroundColor: currentCat.accentColor }}
                />
              </div>

              {/* عنوان دسته فعال */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCat.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center gap-1 z-10"
                >
                  <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-accent uppercase">
                    CATEGORY 0{activeIndex + 1}
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-text-primary tracking-tight">
                    {isRTL ? currentCat.titleFa : currentCat.titleEn}
                  </h3>
                </motion.div>
              </AnimatePresence>

            </div>

            {/* ۲. کانتینر آکواریوم شیشه‌ای با گرادیان آبی-بنفش */}
            <div className="lg:col-span-7 relative flex items-center justify-center w-full">
              
              <div className="w-full max-w-xl min-h-[320px] sm:min-h-[400px] lg:min-h-[460px] rounded-3xl sm:rounded-[2.5rem] border border-accent/40 dark:border-purple-500/40 bg-gradient-to-br from-accent/20 via-purple-500/20 to-accent/10 dark:from-accent/30 dark:via-purple-500/25 dark:to-[#570882]/90 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,122,255,0.18)] dark:shadow-[0_30px_80px_rgba(147,51,234,0.3)] relative overflow-hidden p-6 sm:p-10 flex items-center justify-center">
                
                {/* لبه نوری شیشه‌ای درخشان بالای آکواریوم */}
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-400 dark:via-purple-400 to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 dark:from-white/5 to-transparent pointer-events-none rounded-3xl sm:rounded-[2.5rem]" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCat.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={
                      currentCat.skills.length === 4
                        ? "grid grid-cols-2 gap-6 sm:gap-8 justify-items-center items-center max-w-md w-full z-10 py-4"
                        : "grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-6 justify-items-center items-center max-w-lg w-full z-10 py-4"
                    }
                  >
                    {currentCat.skills.map((skill, sIdx) => {
                      const hasError = imageErrors[skill.name];

                      return (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: sIdx * 0.05 }}
                          whileHover={{ scale: 1.12, zIndex: 50 }}
                          className="relative group cursor-pointer flex justify-center items-center"
                        >
                          {/* 🔮 حباب شیشه‌ای کریستالی گلسمورفیسم با رفلکس نوری ۳بعدی */}
                          <div
                            className={[
                              "size-28 sm:size-34 lg:size-38 rounded-full border transition-all duration-300 flex flex-col items-center justify-center p-3 sm:p-4 relative overflow-hidden",
                              "bg-white/70 dark:bg-white/[0.08] backdrop-blur-xl",
                              "border-white/90 dark:border-white/20",
                              "shadow-[0_8px_25px_rgba(0,122,255,0.12)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]",
                              "hover:border-accent hover:bg-white/90 dark:hover:bg-white/[0.15] hover:shadow-[0_0_35px_rgba(0,122,255,0.5)]",
                            ].join(" ")}
                            style={{
                              animation: `organicFloat ${skill.floatSpeed}s ease-in-out infinite`,
                              animationDelay: `${sIdx * 0.3}s`,
                              willChange: "transform",
                              boxShadow: "inset 0 2px 4px rgba(255, 255, 255, 0.9), inset 0 -2px 4px rgba(0, 0, 0, 0.05), 0 10px 25px rgba(0, 122, 255, 0.12)",
                            }}
                          >
                            {/* لایه رفلکس نوری ۳بعدی قوس شیشه */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/60 via-transparent to-white/20 opacity-80 pointer-events-none rounded-full" />
                            <div className="absolute -top-0.5 left-2 right-2 h-[38%] bg-gradient-to-b from-white/70 to-transparent rounded-t-full pointer-events-none opacity-80" />

                            {/* لوگوی تکنولوژی */}
                            <div className="size-11 sm:size-14 lg:size-16 flex items-center justify-center mb-1 transition-transform duration-200 group-hover:scale-105 z-10">
                              {!hasError ? (
                                <img
                                  src={skill.logo}
                                  alt={skill.name}
                                  onError={() =>
                                    setImageErrors((prev) => ({
                                      ...prev,
                                      [skill.name]: true,
                                    }))
                                  }
                                  className="w-full h-full object-contain filter drop-shadow-md"
                                />
                              ) : (
                                <div className="font-extrabold text-accent text-sm sm:text-base">
                                  {skill.name.slice(0, 3)}
                                </div>
                              )}
                            </div>

                            {/* نام تکنولوژی */}
                            <span className="text-xs sm:text-sm font-black text-text-primary text-center tracking-tight leading-none group-hover:text-accent transition-colors z-10">
                              {skill.name}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>

              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}