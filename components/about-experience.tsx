"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll } from "framer-motion";
import { useState, useRef } from "react";

const EXPERIENCES = [
  {
    key: "kanda",
    initial: "K",
    logoPath: "/images/logos/kanda_idea_logo.jpg",
    isCurrent: true,
    skills: ["JavaScript", "jQuery", "ASP.NET", "Bootstrap", "OpenLayers", "GIS Architecture"],
  },
  {
    key: "isiran",
    initial: "I",
    logoPath: "/images/logos/ISIRAN.jpg",
    isCurrent: false,
    skills: ["React.js", "Next.js", "Tailwind CSS", "Performance Optimization"],
  },
  {
    key: "mosbatesabz",
    initial: "M",
    logoPath: "/images/logos/mosbateSabz.jpg",
    isCurrent: false,
    skills: ["JavaScript", "HTML5", "CSS3", "Web Development Core"],
  },
];

export default function AboutExperience() {
  const t = useTranslations("about");
  const locale = useLocale();
  const [logoErrors, setLogoErrors] = useState<Record<string, boolean>>({});

  const containerRef = useRef<HTMLDivElement>(null);

  // رصد هوشمند پیشرفت اسکرول برای پر کردن خط آبی
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 45%"],
  });

  const isRTL = locale === "fa";

  return (
    <section className="relative px-6 md:px-12 lg:px-16 py-0 select-none">
      <div className="mx-auto max-w-5xl flex flex-col gap-12 sm:gap-16">
        
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-border/30 pb-16 relative"
        >
          {/* عنوان اصلی بخش سوابق شغلی */}
          <div className="md:col-span-4 select-none">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-text-primary tracking-tight leading-tight">
              {isRTL ? "مسیر حرفه‌ای و سوابق شغلی" : "Career & Work Experience"}
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary mt-3 leading-relaxed">
              {isRTL
                ? "تجربه توسعه وب‌اپلیکیشن‌ها و سیستم‌های بزرگ در شرکت‌های معتبر"
                : "Building high-performance web applications across enterprise platforms."}
            </p>
          </div>

          {/* بدنه اصلی تایم‌لاین */}
          <div className="md:col-span-8 relative">
            
            {/* ۱. خط خاکستری کم‌رنگ پس‌زمینه (مسیر اصلی) */}
            <div
              className={[
                "absolute top-6 bottom-6 w-[2px] bg-border/40",
                isRTL ? "right-6 sm:right-7" : "left-6 sm:left-7",
              ].join(" ")}
            />

            {/* ۲. خط آبی پویا که با اسکرول کاربر به سمت پایین پر می‌شود */}
            <motion.div
              style={{
                scaleY: scrollYProgress,
                transformOrigin: "top",
              }}
              className={[
                "absolute top-6 bottom-6 w-[2.5px] bg-accent shadow-[0_0_12px_var(--accent)] z-10",
                isRTL ? "right-6 sm:right-7" : "left-6 sm:left-7",
              ].join(" ")}
            />

            <div className="flex flex-col gap-10">
              {EXPERIENCES.map(({ key, initial, logoPath, isCurrent, skills }, idx) => {
                const hasLogoError = logoErrors[key];

                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                    className="relative flex items-start gap-5 sm:gap-6 group"
                  >
                    {/* نود تایم‌لاین و لوگوی شرکت */}
                    <div className="relative z-20 shrink-0">
                      <div
                        className={[
                          "size-12 sm:size-14 rounded-2xl border transition-all duration-500 flex items-center justify-center p-1.5 backdrop-blur-xl shadow-md",
                          isCurrent
                            ? "border-accent bg-accent/10 shadow-[0_0_20px_rgba(0,122,255,0.25)] ring-2 ring-accent/30"
                            : "border-border bg-white/80 dark:bg-white/[0.02] group-hover:border-accent/40 group-hover:scale-105",
                        ].join(" ")}
                      >
                        {!hasLogoError ? (
                          <img
                            src={logoPath}
                            alt={t(`experienceItems.${key}.company`)}
                            onError={() => setLogoErrors((prev) => ({ ...prev, [key]: true }))}
                            className="w-full h-full object-contain rounded-xl"
                          />
                        ) : (
                          <div className="font-mono font-black text-accent text-lg">
                            {initial}
                          </div>
                        )}
                      </div>

                      {/* نشانگر زنده و چشمک‌زن روی موقعیت فعلی */}
                      {isCurrent && (
                        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 z-30">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-background-main" />
                        </span>
                      )}
                    </div>

                    {/* کارت توضیحات شغلی */}
                    <div
                      className={[
                        "flex-grow border rounded-2xl p-5 sm:p-6 backdrop-blur-2xl transition-all duration-500 shadow-sm",
                        "bg-white/60 dark:bg-white/[0.015]",
                        isCurrent
                          ? "border-accent/35 shadow-[0_10px_30px_rgba(0,122,255,0.06)]"
                          : "border-border/60 hover:border-accent/30 hover:shadow-md",
                      ].join(" ")}
                    >
                      {/* هدر کارت: عنوان شغل و مدت زمان */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base sm:text-lg font-black text-text-primary leading-tight">
                              {t(`experienceItems.${key}.role`)}
                            </h3>
                            {isCurrent && (
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                {isRTL ? "اکنون" : "PRESENT"}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-accent font-bold mt-1">
                            {t(`experienceItems.${key}.company`)} —{" "}
                            <span className="opacity-75">{t(`experienceItems.${key}.type`)}</span>
                          </p>
                        </div>

                        <span className="font-mono text-[11px] font-bold text-text-muted bg-white/50 dark:bg-white/[0.04] px-3 py-1 rounded-xl border border-border/40 w-fit">
                          {t(`experienceItems.${key}.duration`)}
                        </span>
                      </div>

                      {/* متن اصلی توضیحات */}
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4">
                        {t(`experienceItems.${key}.desc`)}
                      </p>

                      {/* مهارت‌های استفاده شده */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/20">
                        {skills.map((skill) => (
                          <span
                            key={skill}
                            className="font-mono text-[10px] font-bold text-text-muted bg-white/40 dark:bg-white/[0.03] border border-border/40 px-2.5 py-1 rounded-lg transition-colors group-hover:border-accent/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}