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
      { name: "JavaScript", logo: "/images/skills/javaScript.png", pos: "-mt-4 -ml-6 sm:-translate-y-6", floatSpeed: 3.2 },
      { name: "TypeScript", logo: "/images/skills/Typescript.png", pos: "mt-8 mr-4 sm:translate-y-8", floatSpeed: 4.1 },
      { name: "React.js", logo: "/images/skills/react.png", pos: "mt-4 ml-6 sm:-translate-y-2", floatSpeed: 3.7 },
      { name: "Next.js", logo: "/images/skills/next.png", pos: "-mt-6 mr-8 sm:translate-y-6", floatSpeed: 4.5 },
    ],
  },
  {
    id: "backend",
    titleFa: "بک‌اند و پایگاه داده",
    titleEn: "Backend & Data",
    accentColor: "rgba(147, 51, 234, 0.25)",
    accentText: "text-purple-500",
    skills: [
      { name: "ASP.NET", logo: "/images/skills/asp-net-core.png", pos: "-mt-6 -ml-8 sm:-translate-y-8", floatSpeed: 3.5 },
      { name: "REST APIs", logo: "/images/skills/api.png", pos: "mt-10 ml-6 sm:translate-y-4", floatSpeed: 4.3 },
      { name: "SQL Server", logo: "/images/skills/sql-server.png", pos: "mt-2 mr-10 sm:-translate-y-4", floatSpeed: 3.8 },
      { name: "MongoDB", logo: "/images/skills/mongodb.png", pos: "-mt-8 mr-4 sm:translate-y-10", floatSpeed: 4.6 },
    ],
  },
  {
    id: "ui",
    titleFa: "طراحی رابط کاربری و واکنش‌گرا",
    titleEn: "UI & Responsive Design",
    accentColor: "rgba(16, 185, 129, 0.25)",
    accentText: "text-emerald-500",
    skills: [
      { name: "HTML5", logo: "/images/skills/html.png", pos: "-mt-6 -ml-4 sm:-translate-y-8", floatSpeed: 3.3 },
      { name: "CSS3", logo: "/images/skills/css.png", pos: "mt-8 mr-6 sm:translate-y-6", floatSpeed: 4.2 },
      { name: "Tailwind CSS", logo: "/images/skills/tailwind.png", pos: "mt-2 ml-8 sm:-translate-y-2", floatSpeed: 3.6 },
      { name: "Bootstrap", logo: "/images/skills/bootStrap.png", pos: "-mt-8 mr-8 sm:translate-y-8", floatSpeed: 4.8 },
      { name: "Material UI", logo: "/images/skills/MUI.png", pos: "mt-12 -ml-6 sm:-translate-y-6", floatSpeed: 3.9 },
      { name: "Responsive UI", logo: "/images/skills/Responsive UI.png", pos: "mt-4 mr-4 sm:translate-y-12", floatSpeed: 4.4 },
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
          50% { transform: translate3d(0, -12px, 0) rotate(3deg); }
          100% { transform: translate3d(0, 0, 0) rotate(0deg); }
        }
      `}</style>

      {/* ─── نسخه دسکتاپ ─── */}
      <div
        ref={skillsTriggerRef}
        className="relative w-full h-[250vh] hidden lg:block my-16 select-none"
      >
        <div
          ref={skillsSectionRef}
          className="h-screen w-full flex items-center justify-center overflow-hidden relative"
        >
          {/* هاله نوری پس‌زمینه */}
          <div
            className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px] opacity-40 transition-colors duration-700 pointer-events-none"
            style={{ backgroundColor: currentCat.accentColor }}
          />

          <div className="mx-auto max-w-6xl w-full px-8 grid grid-cols-12 items-center gap-8 z-10">
            
            {/* سمت چپ/راست: سکان با رنگ مستقیم تم (مشکی کامل در لایت‌مود) */}
            <div className="col-span-5 flex flex-col items-center justify-center text-center gap-6 relative">
              
              <div className="relative size-72 sm:size-80 flex items-center justify-center p-4">
                {/* SVG سکان/چرخ‌دنده با رنگ صریح var(--text-primary) */}
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

                  {/* مرکز جامد سکان */}
                  <circle
                    cx="100"
                    cy="100"
                    r="10"
                    fill="var(--text-primary)"
                  />

                  {/* دسته‌های سکان کشتی */}
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
                      />
                    </g>
                  ))}
                </svg>

                {/* مرکز درخشان سکان */}
                <div
                  className="absolute size-28 rounded-full blur-2xl opacity-70 transition-colors duration-700 pointer-events-none"
                  style={{ backgroundColor: currentCat.accentColor }}
                />
              </div>

              {/* عنوان دسته فعال */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCat.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center gap-1 z-10"
                >
                  <span className="text-xs font-mono font-bold tracking-widest text-accent uppercase">
                    CATEGORY 0{activeIndex + 1}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">
                    {isRTL ? currentCat.titleFa : currentCat.titleEn}
                  </h3>
                </motion.div>
              </AnimatePresence>

            </div>

            {/* سمت دیگر: حباب‌های معلق غیرخطی */}
            <div className="col-span-7 relative min-h-[440px] flex items-center justify-center">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCat.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 max-w-xl w-full"
                >
                  {currentCat.skills.map((skill, sIdx) => {
                    const hasError = imageErrors[skill.name];

                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: sIdx * 0.05 }}
                        whileHover={{ scale: 1.15, zIndex: 50 }}
                        className={["relative group cursor-pointer", skill.pos].join(" ")}
                      >
                        {/* 🔮 حباب شیشه‌ای */}
                        <div
                          className={[
                            "size-28 sm:size-32 rounded-full border transition-all duration-300 flex flex-col items-center justify-center p-3 relative overflow-hidden shadow-lg",
                            "bg-white/90 dark:bg-white/[0.06] backdrop-blur-md",
                            "border-white dark:border-white/20 hover:border-accent hover:shadow-[0_0_35px_rgba(0,122,255,0.4)]",
                          ].join(" ")}
                          style={{
                            animation: `organicFloat ${skill.floatSpeed}s ease-in-out infinite`,
                            animationDelay: `${sIdx * 0.3}s`,
                            willChange: "transform",
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-70 pointer-events-none rounded-full" />

                          <div className="size-10 sm:size-12 flex items-center justify-center mb-1 transition-transform duration-200 group-hover:scale-110">
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

                          <span className="text-[11px] sm:text-xs font-black text-text-primary text-center tracking-tight leading-none group-hover:text-accent transition-colors">
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

      {/* ─── نسخه موبایل و تبلت ─── */}
      <div className="lg:hidden mx-auto max-w-5xl px-6 sm:px-8 flex flex-col gap-10 my-16 select-none">
        <div className="border-b border-border/30 pb-4">
          <h2 className="text-2xl font-black text-text-primary uppercase tracking-tight">
            {isRTL ? "مهارت‌های فنی" : "Technical Skills"}
          </h2>
        </div>

        <div className="flex flex-col gap-10">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              className="border border-border/70 bg-white/80 dark:bg-white/[0.02] p-6 rounded-2xl flex flex-col gap-6 shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-border/20 pb-3">
                <h3 className="text-xl font-black text-text-primary uppercase">
                  {isRTL ? cat.titleFa : cat.titleEn}
                </h3>
                <span className="text-xs font-mono font-bold text-accent">
                  0{idx + 1}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                {cat.skills.map((skill) => {
                  const hasError = imageErrors[skill.name];
                  return (
                    <div
                      key={skill.name}
                      className="size-24 rounded-full border border-border/60 bg-white/80 dark:bg-white/[0.04] backdrop-blur-md flex flex-col items-center justify-center p-3 shadow-sm"
                    >
                      <div className="size-8 flex items-center justify-center mb-1">
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
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="font-extrabold text-accent text-xs">
                            {skill.name.slice(0, 3)}
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-text-primary text-center">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}