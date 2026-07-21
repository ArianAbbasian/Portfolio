"use html";
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function AboutGoals() {
  const t = useTranslations("about");

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8"
    >
      <div className="md:col-span-4 select-none">
        <span className="font-mono text-xs font-black text-accent tracking-[0.2em] uppercase">
          06 // {t("sections.futureGoals")}
        </span>
      </div>
      <div className="md:col-span-8">
        <div className="relative border border-border bg-gradient-to-b from-white/[0.015] to-transparent p-6 rounded-2xl hover:border-accent/20 transition-all duration-300">
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium">
            {t("placeholders.goalsText")}
          </p>
        </div>
      </div>
    </motion.section>
  );
}