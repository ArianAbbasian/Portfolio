"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export default function AboutEducation() {
  const t = useTranslations("about");
  const locale = useLocale();

  const isRTL = locale === "fa";

  return (
    <section className="relative px-6 md:px-12 lg:px-16 py-0 select-none">
      <div className="mx-auto max-w-5xl flex flex-col gap-12 sm:gap-16">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-border/30 pb-16"
        >
          {/* عنوان بخش تحصیلات */}
          <div className="md:col-span-4 select-none">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-text-primary tracking-tight leading-tight">
              {isRTL ? "تحصیلات آکادمیک" : "Academic Education"}
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary mt-3 leading-relaxed">
              {isRTL
                ? "پایه‌های علمی، علوم کامپیوتر و مهندسی نرم‌افزار"
                : "Computer science foundations and software engineering principles."}
            </p>
          </div>

          {/* بدنه اصلی کارت تحصیلات */}
          <div className="md:col-span-8">
            <div className="relative border border-border/60 bg-white/60 dark:bg-white/[0.015] p-6 sm:p-8 rounded-2xl backdrop-blur-2xl shadow-sm hover:border-accent/30 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start">
              
              {/* آیکون کلاه فارغ‌التحصیلی / دانشگاه */}
              <div className="shrink-0 size-14 rounded-2xl border border-accent/20 bg-accent/10 text-accent flex items-center justify-center shadow-md">
                <GraduationCap size={28} strokeWidth={2} />
              </div>

              <div className="flex-grow w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-base sm:text-xl font-black text-text-primary leading-tight">
                      {t("educationItem.degree")}
                    </h3>
                    <p className="text-xs sm:text-sm text-accent font-bold mt-1">
                      {t("educationItem.school")}
                    </p>
                  </div>

                  <span className="font-mono text-[11px] font-bold text-text-muted bg-white/50 dark:bg-white/[0.04] px-3 py-1 rounded-xl border border-border/40 w-fit">
                    {t("educationItem.duration")}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mt-4 pt-4 border-t border-border/20">
                  {t("educationItem.desc")}
                </p>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}