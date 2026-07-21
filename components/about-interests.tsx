"use html";
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function AboutInterests() {
  const t = useTranslations("about");

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
          05 // {t("sections.interests")}
        </span>
      </div>
      <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="border border-border bg-white/[0.01] p-5 rounded-2xl">
          <span className="text-xl mb-3 block">🎨</span>
          <h4 className="text-sm font-black text-text-primary mb-1.5">{t("placeholders.interest1")}</h4>
          <p className="text-xs text-text-secondary leading-relaxed">{t("placeholders.interest1Desc")}</p>
        </div>
        <div className="border border-border bg-white/[0.01] p-5 rounded-2xl">
          <span className="text-xl mb-3 block">🌀</span>
          <h4 className="text-sm font-black text-text-primary mb-1.5">{t("placeholders.interest2")}</h4>
          <p className="text-xs text-text-secondary leading-relaxed">{t("placeholders.interest2Desc")}</p>
        </div>
      </div>
    </motion.section>
  );
}