"use html";
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function AboutMe() {
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
          01 // {t("sections.aboutMe")}
        </span>
      </div>
      <div className="md:col-span-8">
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-semibold">
          {t("bio")}
        </p>
      </div>
    </motion.section>
  );
}