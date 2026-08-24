"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function ProjectsHeader() {
  const t = useTranslations("home.projects");
  const tHome = useTranslations("home");

  return (
    <section className="relative w-full z-20 mt-20 sm:mt-28 md:mt-36 pb-12 sm:pb-16 select-none">
      {/* هاله نوری پس‌زمینه */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[200px] w-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6 md:px-12 lg:px-16">
        {/* عنوان مرکزی با دو خط افقی واضح */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-center justify-center gap-4 sm:gap-6"
        >
          <span className="h-[1.5px] flex-1 bg-gradient-to-r from-transparent via-text-primary/50 to-text-primary/25" />
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-text-primary text-center leading-none">
            {t("title")}
          </h2>
          <span className="h-[1.5px] flex-1 bg-gradient-to-l from-transparent via-text-primary/50 to-text-primary/25" />
        </motion.div>

        {/* NDA Notice */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="mx-auto mt-8 max-w-3xl"
        >
          <div className="rounded-2xl border border-border/60 bg-white/60 dark:bg-white/[0.03] p-5 backdrop-blur-xl text-center shadow-lg">
            <p className="text-[11px] sm:text-xs leading-relaxed text-text-muted tracking-wide flex items-center justify-center gap-2">
              <span className="filter drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]">
                💡
              </span>
              {tHome("ndaNotice")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}