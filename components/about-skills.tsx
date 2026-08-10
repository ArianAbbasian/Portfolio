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
  pos: string;
  floatSpeed: number;
}

interface SkillCategory {
  id: string;
  titleFa: string;
  titleEn: string;
  accentColor: string;
  accentText: string;
  skills: Skill[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    titleFa: "فرانت‌اند و جاوااسکریپت",
    titleEn: "Frontend Development",
    accentColor: "rgba(0, 122, 255, 0.25)",
    accentText: "text-blue-500",
    skills: [
      { name: "JavaScript", logo: "/images/skills/javaScript.png", pos: "-mt-2 -ml-3 lg:-mt-4 lg:-ml-6", floatSpeed: 3.2 },
      { name: "TypeScript", logo: "/images/skills/Typescript.png", pos: "mt-4 mr-2 lg:mt-8 lg:mr-4", floatSpeed: 4.1 },
      { name: "React.js", logo: "/images/skills/react.png", pos: "mt-2 ml-3 lg:mt-4 lg:ml-6", floatSpeed: 3.7 },
      { name: "Next.js", logo: "/images/skills/next.png", pos: "-mt-3 mr-4 lg:-mt-6 lg:mr-8", floatSpeed: 4.5 },
    ],
  },
  {
    id: "backend",
    titleFa: "بک‌اند و پایگاه داده",
    titleEn: "Backend & Data",
    accentColor: "rgba(147, 51, 234, 0.25)",
    accentText: "text-purple-500",
    skills: [
      { name: "ASP.NET", logo: "/images/skills/asp-net-core.png", pos: "-mt-3 -ml-4 lg:-mt-6 lg:-ml-8", floatSpeed: 3.5 },
      { name: "REST APIs", logo: "/images/skills/api.png", pos: "mt-6 ml-3 lg:mt-10 lg:ml-6", floatSpeed: 4.3 },
      { name: "SQL Server", logo: "/images/skills/sql-server.png", pos: "mt-1 mr-5 lg:mt-2 lg:mr-10", floatSpeed: 3.8 },
      { name: "MongoDB", logo: "/images/skills/mongodb.png", pos: "-mt-4 mr-2 lg:-mt-8 lg:mr-4", floatSpeed: 4.6 },
    ],
  },
  {
    id: "ui",
    titleFa: "طراحی رابط کاربری و واکنش‌گرا",
    titleEn: "UI & Responsive Design",
    accentColor: "rgba(16, 185, 129, 0.25)",
    accentText: "text-emerald-500",
    skills: [
      { name: "HTML5", logo: "/images/skills/html.png", pos: "-mt-3 -ml-2 lg:-mt-6 lg:-ml-4", floatSpeed: 3.3 },
      { name: "CSS3", logo: "/images/skills/css.png", pos: "mt-4 mr-3 lg:mt-8 lg:mr-6", floatSpeed: 4.2 },
      { name: "Tailwind CSS", logo: "/images/skills/tailwind.png", pos: "mt-1 ml-4 lg:mt-2 lg:ml-8", floatSpeed: 3.6 },
      { name: "Bootstrap", logo: "/images/skills/bootStrap.png", pos: "-mt-4 mr-4 lg:-mt-8 lg:mr-8", floatSpeed: 4.8 },
      { name: "Material UI", logo: "/images/skills/MUI.png", pos: "mt-6 -ml-3 lg:mt-12 lg:-ml-6", floatSpeed: 3.9 },
      { name: "Responsive UI", logo: "/images/skills/Responsive UI.png", pos: "mt-2 mr-2 lg:mt-4 lg:mr-4", floatSpeed: 4.4 },
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
  }, []);

  const currentCat = SKILL_CATEGORIES[activeIndex];

  return (
    <>
      <style jsx global>{`
        @keyframes organicFloat {
          0% { transform: translate3d(0, 0, 0) rotate(0deg); }
          50% { transform: translate3d(0, -10px, 0) rotate(3deg); }
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
            
            {/* ۱. بخش سکان چرخشی و عنوان دسته‌بندی */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center gap-4 sm:gap-6 relative shrink-0">
              
              <div className="relative size-44 sm:size-64 lg:size-80 flex items-center justify-center p-2 sm:p-4">
                {/* SVG سکان با دایره‌های مشکی کاملاً جامد و بدون هیچ کادر/هاله سفید */}
                <svg
                  ref={gearRef}
                  viewBox="0 0 200 200"
                  className="w-full h-full transition-colors duration-300 drop-shadow-md overflow-visible"
                  fill="none"
                >
                  {/* دایره نقطه‌چین بیرونی */}
                  <circle
                    cx="100"
                    cy="100"
                    r="68"
                    stroke="var(--text-primary)"
                    strokeWidth="4"
                    strokeDasharray="8 6"
                  />
                  {/* دایره میانی */}
                  <circle
                    cx="100"
                    cy="100"
                    r="30"
                    stroke="var(--text-primary)"
                    strokeWidth="4.5"
                  />
                  {/* مرکز جامد سکان - کاملاً جامد بدون هیچ کادر/هاله سفید */}
                  <circle
                    cx="100"
                    cy="100"
                    r="10"
                    fill="var(--text-primary)"
                    stroke="none"
                  />

                  {/* دسته‌های سکان کشتی - دایره‌های کاملاً جامد بدون هیچ کادر/هاله سفید */}
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

                {/* مرکز درخشان سکان */}
                <div
                  className="absolute size-16 sm:size-24 lg:size-28 rounded-full blur-xl sm:blur-2xl opacity-70 transition-colors duration-700 pointer-events-none"
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

            {/* ۲. بخش حباب‌های شیشه‌ای شناور و متحرک تکنولوژی‌ها */}
            <div className="lg:col-span-7 relative min-h-[220px] sm:min-h-[320px] lg:min-h-[440px] flex items-center justify-center w-full">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCat.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 lg:gap-7 max-w-sm sm:max-w-md lg:max-w-xl w-full"
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
                        className={["relative group cursor-pointer", skill.pos].join(" ")}
                      >
                        {/* 🔮 حباب شیشه‌ای متحرک لکوئید */}
                        <div
                          className={[
                            "size-22 sm:size-28 lg:size-32 rounded-full border transition-all duration-300 flex flex-col items-center justify-center p-2 sm:p-3 relative overflow-hidden shadow-md sm:shadow-lg",
                            "bg-white/90 dark:bg-white/[0.06] backdrop-blur-md",
                            "border-white dark:border-white/20 hover:border-accent hover:shadow-[0_0_30px_rgba(0,122,255,0.4)]",
                          ].join(" ")}
                          style={{
                            animation: `organicFloat ${skill.floatSpeed}s ease-in-out infinite`,
                            animationDelay: `${sIdx * 0.3}s`,
                            willChange: "transform",
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-70 pointer-events-none rounded-full" />

                          <div className="size-8 sm:size-10 lg:size-12 flex items-center justify-center mb-0.5 sm:mb-1 transition-transform duration-200 group-hover:scale-105">
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
                              <div className="font-extrabold text-accent text-xs">
                                {skill.name.slice(0, 3)}
                              </div>
                            )}
                          </div>

                          <span className="text-[10px] sm:text-xs font-black text-text-primary text-center tracking-tight leading-none group-hover:text-accent transition-colors">
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
    </>
  );
}