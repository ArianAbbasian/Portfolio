"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { useTheme } from "@/components/layout/Providers";
import { useMounted } from "@/hooks/use-mounted";

const EDUCATIONS = [
  {
    key: "shamsipour",
    initial: "S",
    logoPath: "/images/logos/shamsipour.jpg",
    isCurrent: true,
    skills: [
      "Software Engineering",
      "OS (Operating Systems)",
      "Data Structures",
      "Algorithms",
      "Database Systems",
      "Software Architecture",
    ],
  },
  {
    key: "karamoz",
    initial: "K",
    logoPath: "/images/logos/karamoz.png",
    isCurrent: false,
    skills: [
      "Networking",
      "Computer Science Basics",
      "Programming Fundamentals",
      "Web Basics",
      "Computer Hardware",
    ],
  },
];

export default function AboutEducation() {
  const t = useTranslations("about");
  const locale = useLocale();
  const { resolvedTheme } = useTheme();

  const [logoErrors, setLogoErrors] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const mounted = useMounted();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 45%"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const isRTL = locale === "fa";
  const isDark = mounted && resolvedTheme === "dark";
  const iconSrc = isDark
    ? "/icons/education-white.svg"
    : "/icons/education.svg";

  return (
    <section className="relative px-6 md:px-12 lg:px-16 py-0 select-none">
      <div className="mx-auto max-w-5xl flex flex-col gap-12 sm:gap-16">
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-border/30 pb-16 relative"
        >
          <div className="md:col-span-4 select-none relative">
            <div className="absolute -top-6 -start-4 sm:-top-8 sm:-start-6 size-32 sm:size-40 opacity-10 dark:opacity-15 pointer-events-none select-none z-0">
              <img
                src={iconSrc}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>

            <div className="relative z-10 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-2xl bg-white/80 dark:bg-white/[0.04] border border-border/80 dark:border-white/10 flex items-center justify-center p-2.5 shadow-xs shrink-0 backdrop-blur-xl">
                  <img
                    src={iconSrc}
                    alt="Education Icon"
                    className="w-full h-full object-contain"
                  />
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-text-primary tracking-tight leading-tight">
                  {t("education.title")}
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
                {t("education.subtitle")}
              </p>
            </div>
          </div>

          <div className="md:col-span-8 relative">
            <div
              className={[
                "absolute top-6 bottom-6 w-[2px] bg-border/40 z-0",
                isRTL ? "right-6 sm:right-7" : "left-6 sm:left-7",
              ].join(" ")}
            />

            <motion.div
              style={{ scaleY: lineScaleY, transformOrigin: "top" }}
              className={[
                "absolute top-6 bottom-6 w-[2px] bg-accent shadow-[0_0_10px_var(--accent)] z-0",
                isRTL ? "right-6 sm:right-7" : "left-6 sm:left-7",
              ].join(" ")}
            />

            <div className="flex flex-col gap-10">
              {EDUCATIONS.map(
                ({ key, initial, logoPath, isCurrent, skills }, idx) => {
                  const hasLogoError = logoErrors[key];

                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{
                        duration: 0.5,
                        delay: idx * 0.12,
                        ease: "easeOut",
                      }}
                      className="relative flex items-start gap-5 sm:gap-6 group z-10"
                    >
                      <div className="relative z-20 shrink-0">
                        <div
                          className={[
                            "size-12 sm:size-14 rounded-full flex items-center justify-center p-2 bg-white transition-all duration-300 border-0 shadow-md ring-2 ring-accent",
                            isCurrent
                              ? "shadow-lg shadow-accent/25 ring-2 ring-accent scale-105"
                              : "shadow-sm",
                          ].join(" ")}
                        >
                          {!hasLogoError ? (
                            <img
                              src={logoPath}
                              alt={t(`educationItems.${key}.school`)}
                              onError={() =>
                                setLogoErrors((prev) => ({
                                  ...prev,
                                  [key]: true,
                                }))
                              }
                              className="w-full h-full object-contain rounded-full"
                            />
                          ) : (
                            <div className="font-black text-accent text-base sm:text-lg">
                              {initial}
                            </div>
                          )}
                        </div>

                        {isCurrent && (
                          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 z-30">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
                          </span>
                        )}
                      </div>

                      <div
                        className={[
                          "flex-grow border rounded-2xl p-5 sm:p-6 backdrop-blur-sm md:backdrop-blur-2xl transition-all duration-500 shadow-xs",
                          "bg-white/70 dark:bg-white/[0.015]",
                          isCurrent
                            ? "border-accent/30 shadow-[0_10px_30px_rgba(0,122,255,0.05)]"
                            : "border-border/50 hover:border-accent/25 hover:shadow-sm",
                        ].join(" ")}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3">
                          <div>
                            <h3 className="text-base sm:text-lg font-black text-text-primary leading-tight">
                              <span>{t(`educationItems.${key}.degree`)}</span>
                              {isCurrent && (
                                <span className="inline-flex items-center text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 ms-2 align-middle font-sans">
                                  {t("education.present")}
                                </span>
                              )}
                            </h3>

                            <p className="text-xs text-accent font-bold mt-1.5">
                              {t(`educationItems.${key}.school`)} —{" "}
                              <span className="opacity-75 font-medium">
                                {t(`educationItems.${key}.type`)}
                              </span>
                            </p>
                          </div>

                          <span className="text-[11px] sm:text-xs font-semibold text-text-muted bg-white/40 dark:bg-white/[0.03] px-2.5 py-1 rounded-lg border border-border/40 w-fit shrink-0">
                            {t(`educationItems.${key}.duration`)}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4 font-normal">
                          {t(`educationItems.${key}.desc`)}
                        </p>

                        <div className="pt-4 border-t border-border/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex flex-wrap gap-1.5">
                            {skills.map((skill) => (
                              <span
                                key={skill}
                                className="text-[11px] font-semibold text-text-primary bg-white/80 dark:bg-white/[0.04] border border-border/80 dark:border-white/20 px-2.5 py-0.5 rounded-md shadow-2xs transition-colors hover:border-accent/60 hover:text-accent"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-accent/10 border border-accent/25 text-accent font-black text-xs sm:text-sm w-fit shrink-0 backdrop-blur-md shadow-2xs">
                            <span>{t(`educationItems.${key}.gpa`)}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}