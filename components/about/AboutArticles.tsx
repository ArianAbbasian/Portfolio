"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/layout/Providers";
import Lightbox from "../ui/Lightbox";
import { useMounted } from "@/hooks/use-mounted";

export default function AboutArticles() {
  const t = useTranslations("about");
  const locale = useLocale();
  const { resolvedTheme } = useTheme();

  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const mounted = useMounted();


  const isRTL = locale === "fa";
  const isDark = mounted && resolvedTheme === "dark";
  const iconSrc = isDark ? "/icons/article-white.svg" : "/icons/article.svg";

  return (
    <>
      <section className="relative px-6 md:px-12 lg:px-16 py-0 select-none">
        <div className="mx-auto max-w-5xl flex flex-col gap-12 sm:gap-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-border/30 pb-16 relative">
            <div className="md:col-span-4 select-none relative">
              <div className="absolute -top-4 -start-4 sm:-top-6 sm:-start-6 size-32 sm:size-40 opacity-10 dark:opacity-15 pointer-events-none select-none z-0">
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
                      alt="Articles Icon"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-text-primary tracking-tight leading-tight">
                    {t("articles.title")}
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
                  {t("articles.subtitle")}
                </p>
              </div>
            </div>

            <div className="md:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative border border-white/80 dark:border-white/15 bg-gradient-to-br from-white/80 via-white/50 to-white/70 dark:from-white/[0.04] dark:via-white/[0.015] dark:to-white/[0.03] p-6 sm:p-8 rounded-3xl backdrop-blur-2xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                <div className="absolute top-0 end-0 -translate-y-12 translate-x-12 size-40 rounded-full bg-accent/15 blur-2xl pointer-events-none" />

                <div
                  onClick={() =>
                    setLightboxImage("/images/Articles/article.jpg")
                  }
                  className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-border/60 bg-black/5 dark:bg-white/5 cursor-zoom-in group shadow-md"
                >
                  <img
                    src="/images/Articles/article.jpg"
                    alt={t("articles.paperTitle")}
                    className="w-full h-auto max-h-[280px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white font-bold text-xs gap-1.5 backdrop-blur-[2px]">
                    🔍 {isRTL ? "مشاهده گواهی پذیرش" : "View Certificate"}
                  </div>
                </div>

                <div className="lg:col-span-7 flex flex-col gap-3.5 z-10">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/25 backdrop-blur-md">
                      {t("articles.conference")}
                    </span>
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      {t("articles.date")}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-text-primary leading-snug tracking-tight">
                    «{t("articles.paperTitle")}»
                  </h3>

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
                    {t("articles.desc")}
                  </p>

                  <div className="pt-4 border-t border-border/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Digital Twin",
                        "Industrial IoT",
                        "Smart Manufacturing",
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] sm:text-[11px] font-bold text-text-primary bg-white/80 dark:bg-white/[0.04] border border-border/80 dark:border-white/20 px-2.5 py-0.5 rounded-md shadow-2xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href="https://civilica.com/doc/2588476/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative inline-flex items-center justify-center gap-2.5 px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl bg-accent text-white font-black text-xs sm:text-sm shadow-[0_8px_25px_rgba(0,122,255,0.25)] hover:shadow-[0_12px_30px_rgba(0,122,255,0.4)] hover:scale-[1.02] active:scale-95 transition-all duration-300 w-fit shrink-0 cursor-pointer group/btn mt-2 sm:mt-0"
                    >
                      <span className="absolute -top-3.5 -end-2.5 px-3 py-1 rounded-full bg-emerald-500 text-white font-black text-[10px] sm:text-[11px] shadow-[0_4px_12px_rgba(16,185,129,0.4)] border-none">
                        {t("articles.freeBadge")}
                      </span>

                      <span>{t("articles.readPaper")}</span>
                      <svg
                        className="size-4 sm:size-4.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Lightbox src={lightboxImage} onClose={() => setLightboxImage(null)} />
    </>
  );
}
