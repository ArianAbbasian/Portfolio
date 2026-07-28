"use html";
"use client";

import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState } from "react";

export default function AboutHero() {
  const t = useTranslations("about");
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const words = t("titleBase").split(" ");

  return (
    <section className="relative px-6 md:px-12 lg:px-16 pt-0 mb-10 sm:mb-12 select-none flex justify-center w-full">
      {/* هاله‌ی پس‌زمینه بزرگ برای پر کردن بهینه خلاء صفحه */}
      <div className="absolute top-[10%] left-1/2 -z-10 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-accent/5 blur-[120px] opacity-60 pointer-events-none" />

      {/* کانتینر اصلی هدر بدون کادر خارجی تکراری */}
      <div
        className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative pointer-events-auto"
      >
        {/* سمت چپ (یا راست در فارسی): عنوان متنی بزرگ و کاملاً مینی‌مال و ایستا */}
        <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
          {/* ● ABOUT ME بالت نوری سفید فعال */}
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-text-primary shadow-[0_0_10px_#ffffff] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono font-black text-text-muted tracking-[0.25em] uppercase">
              {locale === "fa" ? "درباره من" : "ABOUT ME"}
            </span>
          </div>

          {/* عنوان بزرگ کاملاً ایستا و مینی‌مال */}
          <div
            className={[
              "flex flex-col gap-2 max-w-3xl",
              locale === "fa"
                ? "border-r-3 border-accent/25 pr-6"
                : "border-l-3 border-accent/25 pl-6",
            ].join(" ")}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tight leading-[1.3] sm:leading-[1.2]">
              {t("titleBase")}
              <span
                className={[
                  "bg-gradient-to-r from-accent via-accent-hover to-purple-500 bg-clip-text text-transparent",
                  locale === "fa"
                    ? "font-black"
                    : "italic font-serif font-medium",
                ].join(" ")}
              >
                {t("titleHighlight")}
              </span>
              .
            </h1>

            {/* زیرعنوان مینی‌مال */}
            <p className="text-xs sm:text-sm font-medium text-text-secondary mt-2 tracking-wide leading-relaxed">
              {t("description")}
            </p>
          </div>
        </div>

        {/* 
          سمت راست (یا چپ در فارسی): کارت هویت دیجیتال شیشه‌ای لوکس (Bespoke Glass ID Card)
          کارت و آواتار اکنون ۱۰۰٪ ایستا، پایدار و بدون هیچگونه لرزش یا محاسبات سنگین کلاینت‌ساید رندر می‌شوند
        */}
        <div
          className={[
            "lg:col-span-5 flex justify-center order-1 lg:order-2",
            locale === "fa" ? "lg:justify-start" : "lg:justify-end",
          ].join(" ")}
        >
          {mounted && (
            <div className="w-full max-w-[320px] h-[380px] rounded-[2.25rem] border border-border bg-slate-200/60 dark:bg-white/[0.015] backdrop-blur-3xl pt-6 px-6 pb-4 relative flex flex-col justify-between shadow-[0_30px_70px_rgba(0,0,0,0.03)] dark:shadow-[0_40px_90px_rgba(0,0,0,0.5)]">
              
              {/* هدر کارت هویت با فونت شکیل سانس */}
              <div className="flex items-center justify-between text-[10px] font-sans text-text-muted font-bold tracking-[0.2em] select-none border-b border-border/40 pb-3 z-20">
                <span>LOC: TEHRAN, IRN</span>
                <div className="flex items-center gap-1.5">
                  <span>SYS: FRONTEND</span>
                  {/* نقطه سبز چشمک‌زن زنده تعاملی پشت Frontend */}
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  </span>
                </div>
              </div>

              {/* لایه دوم (میانی): سطح صاف میز شیشه‌ای مینی‌مال بدون متن اضافی */}
              <div className="absolute bottom-4 inset-x-4 h-24 bg-white/70 dark:bg-white/[0.03] border border-border backdrop-blur-2xl rounded-2xl z-10 shadow-lg" />

              {/* لایه سوم (بالاترین لایه): ویدیو کاراکتر مجهز به ماسک انحلال تدریجی */}
              <div className="relative w-full h-[220px] flex items-end justify-center">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-[110%] h-[110%] object-contain object-bottom relative z-10"
                  style={{
                    transform: "translateY(27px)",
                  }}
                >
                  <source src="/video/charakter.webm" type="video/webm" />
                  <source src="/video/charakter.mp4" type="video/mp4" />
                </video>
              </div>

            </div>
          )}
        </div>
      </div>
    </section>
  );
}