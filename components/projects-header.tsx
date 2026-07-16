"use html";
"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";

export default function ProjectsHeader() {
  const t = useTranslations("home.projects");
  const locale = useLocale();

  return (
    <section className="relative w-full z-20 mt-20 sm:mt-28 md:mt-36 select-none">
      
      {/* ─── ۱. نوار اطلاعاتی بالای هدر ─── */}
      <div className="w-full border-t border-b border-border bg-white/[0.02] dark:bg-black/[0.02] backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-6 md:px-12 lg:px-16 h-12 flex items-center justify-between text-xs sm:text-[13px] font-mono text-text-secondary tracking-wider">
          
          <span className="flex items-center gap-2.5 font-bold text-text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
            </span>
            {locale === "fa" ? "وضعیت: آماده برای پروژه‌های جدید" : "STATUS: ACTIVE & OPEN TO WORK"}
          </span>
          
          <span className="font-bold text-text-secondary uppercase">
            {locale === "fa" ? "آرشیو پروژه‌های برگزیده" : "CURATED PROJECTS ARCHIVE"}
          </span>
          
        </div>
      </div>

      {/* ─── ۲. بلوک اصلی عنوان هدر ─── */}
      <div className="py-16 sm:py-20 bg-gradient-to-b from-white/[0.01] dark:from-white/[0.005] to-transparent">
        <div className="mx-auto max-w-5xl px-6 md:px-12 lg:px-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
          
          {/* عنوان پروژه */}
          <motion.div
            initial={{ opacity: 0, x: locale === "fa" ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl"
          >
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-accent uppercase block mb-3 opacity-85">
              {t("selectedCase")}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-text-primary tracking-tight leading-none">
              {t("title")}
            </h2>
          </motion.div>

          {/* توضیحات پروژه */}
          <motion.div
            initial={{ opacity: 0, x: locale === "fa" ? -40 : 40 }}
            whileInView={{ opacity: 0.7, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="max-w-md border-r-2 border-accent/20 pr-4 ltr:border-r-0 ltr:pr-0 ltr:border-l-2 ltr:pl-4"
          >
            <p className="text-xs sm:text-sm md:text-base text-text-secondary leading-relaxed">
              {t("subtitle")}
            </p>
          </motion.div>

        </div>
      </div>

      {/* ─── ۳. راهنمای اسکرول بزرگ، لوکس و انیمیشنی (Sleek Explore Guide) ─── */}
      <div className="hidden lg:flex w-full border-t border-b border-border/60 py-5 bg-white/[0.005] justify-center">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] sm:text-[10px] font-mono font-black text-text-muted tracking-[0.25em] uppercase animate-pulse">
            {locale === "fa" ? "جهت کاوش پروژه‌ها، اسکرول کنید" : "SCROLL DOWN TO EXPLORE WORKS"}
          </span>
          <motion.div
            animate={locale === "fa" ? { x: [0, -14, 0] } : { x: [0, 14, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
              ease: "easeInOut",
            }}
            className="text-accent text-2xl font-black cursor-default"
          >
            {locale === "fa" ? "←" : "→"}
          </motion.div>
        </div>
      </div>
      
      {/* هاله‌ی نوری ظریف پس‌زمینه */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -z-10 h-[200px] w-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />
    </section>
  );
}