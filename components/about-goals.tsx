"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/providers";

const STATIONS = [
  {
    id: "learning",
    titleFa: "یادگیری و تحقیق",
    titleEn: "Learning & Research",
    cx: 200,
    cy: 22,
    textX: 200,
    textY: 42,
  },
  {
    id: "design",
    titleFa: "طراحی و معماری",
    titleEn: "Design & Architecture",
    cx: 372,
    cy: 64,
    textX: 310,
    textY: 64,
  },
  {
    id: "practice",
    titleFa: "تمرین، تست و ساخت",
    titleEn: "Practice, Test & Build",
    cx: 200,
    cy: 106,
    textX: 200,
    textY: 86,
  },
  {
    id: "deploy",
    titleFa: "بهینه‌سازی و تحویل",
    titleEn: "Optimize & Deploy",
    cx: 28,
    cy: 64,
    textX: 90,
    textY: 64,
  },
];

export default function AboutGoals() {
  const t = useTranslations("about");
  const locale = useLocale();
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [activeStation, setActiveStation] = useState(0);

  const isRTL = locale === "fa";

  useEffect(() => {
    setMounted(true);
  }, []);

  // چرخه زمان‌بندی: ۴.۵ ثانیه برای هر ایستگاه (۱.۵ ثانیه حرکت + ۳ ثانیه توقف)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStation((prev) => (prev + 1) % STATIONS.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const iconSrc = isDark
    ? "/images/Icons/goals-white.svg"
    : "/images/Icons/goals.svg";

  // مسیر دقیق خط پیست برای هماهنگی ۱۰۰٪ خط و ماشین
  const trackPathD =
    "M 70,22 H 330 A 42,42 0 0 1 372,64 A 42,42 0 0 1 330,106 H 70 A 42,42 0 0 1 28,64 A 42,42 0 0 1 70,22 Z";

  return (
    <>
      <style jsx global>{`
        @keyframes driveCircuit {
          0% { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }
      `}</style>

      <section className="relative px-6 md:px-12 lg:px-16 py-0 select-none">
        <div className="mx-auto max-w-5xl flex flex-col gap-12 sm:gap-16">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-border/30 pb-16 relative">
            
            {/* ۱. عنوان اصلی بخش اهداف آینده با آیکون SVG و واترمارک محو */}
            <div className="md:col-span-4 select-none relative">
              
              {/* 🌟 آیکون SVG بزرگ و محو (واترمارک) پشت متن عنوان */}
              <div className="absolute -top-4 -start-4 sm:-top-6 sm:-start-6 size-32 sm:size-40 opacity-10 dark:opacity-15 pointer-events-none select-none z-0">
                <img
                  src={iconSrc}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="relative z-10 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  {/* باکس شیشه‌ای آیکون SVG کنار عنوان */}
                  <div className="size-12 rounded-2xl bg-white/80 dark:bg-white/[0.04] border border-border/80 dark:border-white/10 flex items-center justify-center p-2.5 shadow-xs shrink-0 backdrop-blur-xl">
                    <img
                      src={iconSrc}
                      alt="Goals Icon"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-text-primary tracking-tight leading-tight">
                    {t("goals.title")}
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
                  {t("goals.subtitle")}
                </p>
              </div>
            </div>

            {/* ۲. بدنه استیج پیست مسابقه و کارت بیانیه اهداف آینده */}
            <div className="md:col-span-8 flex flex-col gap-6">
              
              {/* 🏎️ پیست مسابقه و نمایش عنوان ایستگاه‌ها روی خود پیست */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full h-48 sm:h-56 rounded-3xl border border-border/60 bg-white/70 dark:bg-white/[0.02] backdrop-blur-2xl p-4 flex flex-col items-center justify-center overflow-hidden shadow-xs"
              >
                {/* هاله‌ی نوری پس‌زمینه پیست */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-purple-500/10 to-accent/10 blur-xl pointer-events-none" />

                {/* SVG اصلی پیست و عناوین ایستگاه‌ها */}
                <svg
                  viewBox="0 0 400 128"
                  className="w-full h-full max-w-lg overflow-visible relative z-10"
                  fill="none"
                >
                  {/* خط‌چین پیست خارجی */}
                  <rect
                    x="10"
                    y="8"
                    width="380"
                    height="112"
                    rx="56"
                    stroke="var(--text-primary)"
                    strokeWidth="1.5"
                    strokeDasharray="6 6"
                    className="opacity-20"
                  />

                  {/* مسیر اصلی نئونی پیست */}
                  <path
                    d={trackPathD}
                    stroke="url(#trackGradient)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="opacity-85"
                  />

                  {/* گرادیان خط پیست */}
                  <defs>
                    <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#a855f7" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>

                  {/* ۴ ایستگاه و عناوین آن‌ها با ترنزیشن‌های نرم فرمر موشن */}
                  {STATIONS.map((st, idx) => {
                    const isActive = activeStation === idx;
                    const title = isRTL ? st.titleFa : st.titleEn;

                    return (
                      <g key={st.id}>
                        {/* هاله نوری محو و ملایم پشت ایستگاه فعال */}
                        {isActive && (
                          <motion.circle
                            cx={st.cx}
                            cy={st.cy}
                            initial={{ r: 4, opacity: 0.6 }}
                            animate={{ r: 14, opacity: 0 }}
                            transition={{
                              duration: 2.2,
                              repeat: Infinity,
                              ease: "easeOut",
                            }}
                            fill="var(--accent)"
                          />
                        )}

                        {/* نقطه ایستگاه با انیمیشن سایز و رنگ فوق‌العاده روان */}
                        <motion.circle
                          cx={st.cx}
                          cy={st.cy}
                          animate={{
                            r: isActive ? 6.5 : 4,
                            fill: isActive ? "var(--accent)" : "var(--text-muted)",
                          }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        />

                        {/* عنوان ایستگاه با ترنزیشن نرم رنگ، شفافیت و سایز */}
                        <motion.text
                          x={st.textX}
                          y={st.textY}
                          textAnchor="middle"
                          dominantBaseline="central"
                          animate={{
                            fill: isActive ? "var(--accent)" : "var(--text-primary)",
                            opacity: isActive ? 1 : 0.35,
                          }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          className="select-none"
                          style={{
                            fontSize: isActive ? "13.5px" : "11px",
                            fontWeight: isActive ? "900" : "600",
                            filter: isActive ? "drop-shadow(0 0 8px var(--accent))" : "none",
                            transition: "font-size 0.6s ease, filter 0.6s ease, font-weight 0.6s ease",
                          }}
                        >
                          {title}
                        </motion.text>
                      </g>
                    );
                  })}

                  {/* 🏎️ ماشین متحرک روی مسیر پیست */}
                  <g>
                    <text
                      fontSize="13"
                      textAnchor="middle"
                      dominantBaseline="central"
                    >
                      🏎️
                      <animateMotion
                        dur="18s"
                        repeatCount="indefinite"
                        rotate="auto"
                        path={trackPathD}
                        keyPoints="0.0; 0.0; 0.25; 0.25; 0.50; 0.50; 0.75; 0.75; 1.0"
                        keyTimes="0; 0.167; 0.25; 0.417; 0.50; 0.667; 0.75; 0.917; 1.0"
                        calcMode="linear"
                      />
                    </text>
                  </g>
                </svg>
              </motion.div>

              {/* 🌟 کارت اصلی بیانیه چشم‌انداز (Manifesto Card) بدون font-mono و بدون باکس‌های رنگی */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="relative border border-white/80 dark:border-white/15 bg-gradient-to-br from-white/80 via-white/50 to-white/70 dark:from-white/[0.04] dark:via-white/[0.015] dark:to-white/[0.03] p-6 sm:p-8 rounded-3xl backdrop-blur-2xl shadow-lg overflow-hidden flex flex-col gap-5"
              >
                {/* هاله‌ی نوری درخشان گوشه کارت */}
                <div className="absolute top-0 end-0 -translate-y-12 translate-x-12 size-40 rounded-full bg-accent/15 blur-2xl pointer-events-none" />

                {/* هدر کارت چشم‌انداز */}
                <div className="flex items-center justify-between z-10 border-b border-border/20 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-accent tracking-wide">
                      {t("goals.visionLabel")}
                    </span>
                  </div>

                  {/* علامت نقل‌قول شیشه‌ای */}
                  <span className="text-2xl sm:text-3xl font-serif text-accent/40 select-none">
                    “
                  </span>
                </div>

                {/* متن اصلی بیانیه با فونت ایران‌یکان / ساتوشی عالی، بزرگ و باکیفیت */}
                <p className="text-sm sm:text-base lg:text-lg text-text-primary leading-relaxed sm:leading-loose font-bold tracking-tight z-10">
                  {t("goals.statement")}
                </p>
              </motion.div>

            </div>

          </div>

        </div>
      </section>
    </>
  );
}