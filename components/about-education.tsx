"use html";
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";

export default function AboutEducation() {
  const t = useTranslations("about");
  const [logoError, setLogoError] = useState(false);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 border-b border-border/30 pb-16"
    >
      <div className="md:col-span-4 select-none">
        <span className="font-mono text-xs font-black text-accent tracking-[0.2em] uppercase">
          04 // {t("sections.education")}
        </span>
      </div>
      <div className="md:col-span-8">
        <div className="relative border border-border bg-white/[0.015] dark:bg-white/[0.005] p-6 rounded-2xl shadow-sm hover:border-accent/20 transition-all duration-300 flex gap-5">
          
          <div className="shrink-0 select-none">
            {!logoError ? (
              <img 
                src="/images/logos/shamsipour.jpg" 
                alt={t("educationItem.school")}
                onError={() => setLogoError(true)}
                className="size-12 rounded-xl object-contain border border-border bg-white/5 p-1.5 shadow-sm"
              />
            ) : (
              <div className="size-12 rounded-xl border border-accent/20 bg-accent/5 text-accent flex items-center justify-center font-mono font-black text-lg shadow-sm">
                S
              </div>
            )}
          </div>

          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
              <div>
                <h3 className="text-base sm:text-lg font-black text-text-primary leading-tight">
                  {t("educationItem.degree")}
                </h3>
                <p className="text-xs text-accent font-bold mt-1">
                  {t("educationItem.school")}
                </p>
              </div>
              <span className="text-xs font-mono font-black text-text-muted mt-1 sm:mt-0">
                {t("educationItem.duration")}
              </span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              {t("educationItem.desc")}
            </p>
          </div>

        </div>
      </div>
    </motion.section>
  );
}