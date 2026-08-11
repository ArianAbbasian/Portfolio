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

const bubbleVariants = {
  initial: {
    scale: 0,
    opacity: 0,
    filter: "blur(10px)",
  },
  animate: (sIdx: number) => ({
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 18,
      delay: sIdx * 0.05,
    },
  }),
  exit: (sIdx: number) => ({
    scale: 1.2,
    opacity: 0,
    filter: "blur(10px)",
    transition: {
      duration: 0.2,
      delay: sIdx * 0.02,
      ease: "easeIn",
    },
  }),
};

export default function AboutSkills() {
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const skillsTriggerRef = useRef<HTMLDivElement>(null);
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const gearRef = useRef<SVGSVGElement>(null);

  const isRTL = locale === "fa";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
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
    }, skillsTriggerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleCategoryClick = (index: number) => {
    if (!skillsTriggerRef.current) return;
    const trigger = skillsTriggerRef.current;
    const rect = trigger.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const absoluteTriggerTop = rect.top + scrollTop;
    const totalScroll = trigger.offsetHeight - window.innerHeight;
    const targetProgress = (index + 0.5) / SKILL_CATEGORIES.length;
    const targetY = absoluteTriggerTop + targetProgress * totalScroll;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  const currentCat = SKILL_CATEGORIES[activeIndex];

  return (
    <>
      <style jsx global>{`
        @keyframes organicFloat {
          0% { transform: translate3d(0, 0, 0) rotate(0deg); }
          50% { transform: translate3d(0, -6px, 0) rotate(1.5deg); }
          100% { transform: translate3d(0, 0, 0) rotate(0deg); }
        }
      `}</style>

      <div
        ref={skillsTriggerRef}
        className="relative w-full h-[220vh] sm:h-[250vh] -mt-6 sm:mt-0 my-0 sm:my-12 select-none"
      >
        {/* پدینگ بالای بهینه‌شده برای اتصال بدون فاصله اضافی به بخش قبلی */}
        <div
          ref={skillsSectionRef}
          className="h-[100dvh] w-full flex items-center justify-center overflow-hidden relative pt-12 sm:pt-20 lg:pt-0"
        >
          {/* هاله نوری متحرک پس‌زمینه */}
          <div
            className="absolute left-1/2 top-1/2 -z-10 h-[280px] w-[280px] sm:h-[450px] sm:w-[450px] lg:h-[500px] lg:w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px] sm:blur-[160px] opacity-45 transition-colors duration-700 pointer-events-none"
            style={{ backgroundColor: currentCat.accentColor }}
          />

          <div className="mx-auto max-w-6xl w-full px-4 sm:px-8 flex flex-col md:grid md:grid-cols-12 items-center justify-center gap-2 sm:gap-6 lg:gap-8 z-10">
            
            {/* ۱. بخش سکان چرخشی و عنوان دسته‌بندی */}
            <div className="md:col-span-5 flex flex-col items-center justify-center text-center gap-2 sm:gap-4 relative shrink-0 w-full">
              
              {/* کانتینر سکان چرخشی: بزرگ‌تر شدن به size-52 (208px) در عرض زیر 600px */}
              <div className="relative size-52 sm:size-56 md:size-64 lg:size-80 flex items-center justify-center p-2">
                {/* SVG سکان مکانیکی */}
                <svg
                  ref={gearRef}
                  viewBox="0 0 200 200"
                  className="w-full h-full transition-colors duration-300 drop-shadow-xl overflow-visible"
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

                {/* تصویر کاور مرکز سکان: size-20 (80px) در موبایل */}
                <div className="absolute size-20 sm:size-22 md:size-24 lg:size-28 rounded-full border-2 border-white/90 dark:border-white/20 bg-white/90 dark:bg-[#0a0a14]/90 backdrop-blur-xl shadow-2xl flex items-center justify-center p-2.5 sm:p-4 overflow-hidden z-20">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentCat.id}
                      src={currentCat.categoryImage}
                      alt={currentCat.titleEn}
                      initial={{ opacity: 0, scale: 0.4, rotate: -60 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.4, rotate: 60 }}
                      transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }}
                      className="w-full h-full object-contain filter drop-shadow-lg"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </AnimatePresence>
                </div>

                {/* هاله‌ی درخشان مرکز سکان */}
                <div
                  className="absolute size-20 sm:size-24 md:size-28 lg:size-32 rounded-full blur-2xl opacity-80 transition-colors duration-700 pointer-events-none z-0"
                  style={{ backgroundColor: currentCat.accentColor }}
                />
              </div>

              {/* عنوان اصلی و کنترلر کپسولی تعاملی */}
              <div className="flex flex-col items-center gap-2 z-10 w-full">
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={currentCat.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="text-xl sm:text-2xl lg:text-3xl font-black text-text-primary tracking-tight"
                  >
                    {isRTL ? currentCat.titleFa : currentCat.titleEn}
                  </motion.h3>
                </AnimatePresence>

                {/* نوار کنترل شیشه‌ای لمسی */}
                <div className="seg-pill h-9 sm:h-10 flex items-center px-1.5 rounded-full border border-black/10 dark:border-white/15 bg-white/80 dark:bg-[#0a0a10]/80 shadow-md backdrop-blur-xl max-w-full overflow-x-auto">
                  {SKILL_CATEGORIES.map((cat, idx) => {
                    const active = activeIndex === idx;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(idx)}
                        className={[
                          "relative z-10 px-3 py-1 text-[11px] sm:text-xs font-bold transition-colors duration-200 cursor-pointer whitespace-nowrap rounded-full",
                          active ? "text-text-primary" : "text-text-secondary hover:text-text-primary",
                        ].join(" ")}
                      >
                        {isRTL ? cat.titleFa : cat.titleEn}

                        {active && (
                          <motion.div
                            layoutId="active-skill-tab"
                            className="seg-item-active absolute inset-0 -z-10 rounded-full"
                            transition={{
                              type: "spring",
                              stiffness: 350,
                              damping: 28,
                            }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* ۲. کانتینر آکواریوم شیشه‌ای استیج اصلی مهارت‌ها */}
            <div className="md:col-span-7 relative flex items-center justify-center w-full">
              
              <div className="w-full max-w-xl min-h-[220px] sm:min-h-[300px] md:min-h-[380px] lg:min-h-[460px] rounded-3xl sm:rounded-[2.5rem] border border-white/80 dark:border-white/15 bg-gradient-to-br from-white/70 via-white/40 to-white/60 dark:from-white/[0.08] dark:via-white/[0.03] dark:to-white/[0.05] backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,122,255,0.12)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.5)] relative overflow-hidden p-3 sm:p-6 lg:p-10 flex items-center justify-center">
                
                {/* لبه نوری درخشان */}
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent/60 dark:via-accent/80 to-transparent opacity-90" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCat.id}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className={
                      currentCat.skills.length === 4
                        ? "grid grid-cols-2 gap-3 sm:gap-6 justify-items-center items-center max-w-md w-full z-10 py-1"
                        : "grid grid-cols-3 gap-2 sm:gap-5 justify-items-center items-center max-w-lg w-full z-10 py-1"
                    }
                  >
                    {currentCat.skills.map((skill, sIdx) => {
                      const hasError = imageErrors[skill.name];

                      return (
                        <motion.div
                          key={skill.name}
                          custom={sIdx}
                          variants={bubbleVariants}
                          whileHover={{ scale: 1.08, zIndex: 50 }}
                          whileTap={{ scale: 0.92 }}
                          transition={{ type: "spring", stiffness: 320, damping: 22 }}
                          className="relative group cursor-pointer flex justify-center items-center"
                        >
                          {/* حباب کریستالی */}
                          <div
                            className={[
                              "size-20 sm:size-24 md:size-30 lg:size-38 rounded-full border flex flex-col items-center justify-center p-2.5 sm:p-4 relative overflow-hidden",
                              "bg-white/80 dark:bg-white/[0.09] backdrop-blur-xl",
                              "border-white/95 dark:border-white/20",
                              "hover:border-accent hover:bg-white/95 dark:hover:bg-white/[0.16]",
                              "transition-[border-color,background-color] duration-200",
                            ].join(" ")}
                            style={{
                              animation: `organicFloat ${skill.floatSpeed}s ease-in-out infinite`,
                              animationDelay: `${sIdx * 0.25}s`,
                              willChange: "transform",
                              boxShadow:
                                "inset 0 2px 5px rgba(255, 255, 255, 0.95), inset 0 -2px 5px rgba(0, 0, 0, 0.06), 0 10px 25px rgba(0, 122, 255, 0.15)",
                            }}
                          >
                            {/* انعکاس نور سه بعدی */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/70 via-transparent to-white/30 opacity-90 pointer-events-none rounded-full" />
                            <div className="absolute -top-0.5 left-2 right-2 h-[38%] bg-gradient-to-b from-white/80 to-transparent rounded-t-full pointer-events-none opacity-90" />

                            {/* لوگوی تکنولوژی */}
                            <div className="size-9 sm:size-10 md:size-12 lg:size-16 flex items-center justify-center mb-1 transition-transform duration-200 group-hover:scale-105 z-10">
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
                                <div className="font-extrabold text-accent text-xs sm:text-base">
                                  {skill.name.slice(0, 3)}
                                </div>
                              )}
                            </div>

                            {/* نام تکنولوژی */}
                            <span className="text-[10px] sm:text-xs lg:text-sm font-black text-text-primary text-center tracking-tight leading-none group-hover:text-accent transition-colors z-10">
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