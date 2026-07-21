"use html";
"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    id: "cat1",
    skills: ["JavaScript", "TypeScript", "jQuery"],
    accentColor: "rgba(147, 51, 234, 0.15)", // بنفش
    accentText: "text-purple-500",
    accentBorder: "border-purple-500/20 bg-purple-500/5",
  },
  {
    id: "cat2",
    skills: ["Next.js", "React.js", "Context API", "Component-Based Architecture"],
    accentColor: "rgba(37, 99, 235, 0.15)", // آبی
    accentText: "text-blue-500",
    accentBorder: "border-blue-500/20 bg-blue-500/5",
  },
  {
    id: "cat3",
    skills: ["Tailwind CSS", "Bootstrap", "MUI", "Shadcn UI", "Mobile-First & Adaptive Design"],
    accentColor: "rgba(5, 150, 105, 0.15)", // سبز زمردی
    accentText: "text-emerald-500",
    accentBorder: "border-emerald-500/20 bg-emerald-500/5",
  },
  {
    id: "cat4",
    skills: ["ASP.NET", "Model-View-Controller (MVC)", "MongoDB", "OOP Programming"],
    accentColor: "rgba(220, 38, 38, 0.15)", // قرمز
    accentText: "text-red-500",
    accentBorder: "border-red-500/20 bg-red-500/5",
  },
  {
    id: "cat5",
    skills: ["REST APIs", "Axios API"],
    accentColor: "rgba(245, 158, 11, 0.15)", // طلایی
    accentText: "text-amber-500",
    accentBorder: "border-amber-500/20 bg-amber-500/5",
  },
  {
    id: "cat6",
    skills: ["Git/GitHub/GitLab", "Scrum Methodology", "Team Work"],
    accentColor: "rgba(20, 184, 166, 0.15)", // فیروزه‌ای
    accentText: "text-teal-500",
    accentBorder: "border-teal-500/20 bg-teal-500/5",
  },
];

export default function AboutSkills() {
  const t = useTranslations("about");
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);

  const skillsTriggerRef = useRef<HTMLDivElement>(null);
  const skillsSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const scrollTween = gsap.fromTo(
        skillsSectionRef.current,
        {},
        {
          scrollTrigger: {
            trigger: skillsTriggerRef.current,
            pin: true,
            scrub: 0.5,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
              const progress = self.progress;
              const totalSectors = SKILL_CATEGORIES.length;
              const index = Math.min(Math.floor(progress * totalSectors), totalSectors - 1);
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

  return (
    <>
      {/* نسخه دسکتاپ: پین انیمیشنی با اسکرول تراز */}
      <div ref={skillsTriggerRef} className="relative w-full h-[350vh] hidden lg:block my-16">
        <div ref={skillsSectionRef} className="h-screen w-full flex items-center overflow-hidden">
          
          <div 
            className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px] opacity-30 transition-colors duration-1000"
            style={{ backgroundColor: SKILL_CATEGORIES[activeIndex].accentColor }}
          />

          <div className="mx-auto max-w-5xl w-full px-12 flex items-center justify-between gap-12">
            
            <div className="w-[100px] h-[350px] flex items-center justify-center relative select-none">
              <div 
                className="text-[11px] font-mono text-text-muted tracking-[0.25em] uppercase leading-relaxed text-start"
                style={{ 
                  writingMode: "vertical-rl", 
                  transform: "rotate(180deg)" 
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 0.65, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block"
                  >
                    {t(`skills.${SKILL_CATEGORIES[activeIndex].id}.quote`)}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex-grow flex flex-col justify-center gap-14 pl-12 pr-4 border-l border-border/20">
              <div className="flex flex-col gap-5 select-none">
                {SKILL_CATEGORIES.map((cat, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <div 
                      key={cat.id}
                      className="transition-all duration-700 ease-out origin-left"
                      style={{
                        opacity: isActive ? 1 : 0.15,
                        transform: isActive ? "translateX(16px) scale(1.03)" : "translateX(0px) scale(1)",
                        filter: isActive ? "blur(0px)" : "blur(0.5px)",
                      }}
                    >
                      <h3 className="text-4xl sm:text-5xl font-black text-text-primary uppercase tracking-tight">
                        {t(`skills.${cat.id}.title`)}
                      </h3>
                    </div>
                  );
                })}
              </div>

              <div className="h-[100px] flex items-start">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-wrap gap-2.5"
                  >
                    {SKILL_CATEGORIES[activeIndex].skills.map((skill) => (
                      <span 
                        key={skill} 
                        className={[
                          "font-mono text-xs font-bold px-3.5 py-1.5 rounded-xl border shadow-sm transition-all duration-500",
                          SKILL_CATEGORIES[activeIndex].accentText,
                          SKILL_CATEGORIES[activeIndex].accentBorder
                        ].join(" ")}
                      >
                        {skill}
                      </span>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* نسخه موبایل و تبلت با فلو مینی‌مال عمودی */}
      <div className="lg:hidden mx-auto max-w-5xl px-6 sm:px-8 flex flex-col gap-12 my-16">
        <div className="border-b border-border/30 pb-4">
          <span className="font-mono text-xs font-black text-accent tracking-[0.2em] uppercase">
            03 // {t("sections.skills")}
          </span>
        </div>
        <div className="flex flex-col gap-10">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.id} className="border border-border bg-white/[0.015] dark:bg-white/[0.005] p-5 rounded-2xl flex flex-col gap-4">
              <h3 className="text-xl font-black text-text-primary uppercase">{t(`skills.${cat.id}.title`)}</h3>
              <p className="text-xs text-text-muted leading-relaxed italic">{t(`skills.${cat.id}.quote`)}</p>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-border/20">
                {cat.skills.map((skill) => (
                  <span key={skill} className={`font-mono text-xs font-bold px-2.5 py-1 rounded-xl border ${cat.accentText} ${cat.accentBorder}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}