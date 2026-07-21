"use html";
"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";

export default function AboutHero() {
  const t = useTranslations("about");
  const locale = useLocale();

  return (
    <section className="relative px-6 md:px-12 lg:px-16 mb-20 text-center sm:text-start select-none">
      <div className="mx-auto max-w-5xl border-b border-border/50 pb-10">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-mono font-black text-accent tracking-widest uppercase block mb-3"
        >
          {locale === "fa" ? "// اطلاعات شخصی" : "// INFO & BACKGROUND"}
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, filter: "blur(10px)", y: 15 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl font-black text-text-primary tracking-tight leading-none"
        >
          {t("title")}
        </motion.h1>
      </div>
    </section>
  );
}