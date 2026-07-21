"use html";
"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";

export default function AboutPage() {
  const t = useTranslations("about");
  const locale = useLocale();

  // موشن والد برای ایجاد انیمیشن stagger روی سکشن‌ها
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <main className="min-h-screen bg-background-main pb-32 pt-28 sm:pt-36">
      {/* ─── هدر اصلی صفحه درباره من ─── */}
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

      {/* ─── ۵ سکشن اصلی صفحه به صورت گرید فنی و تراز متقارن ─── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-5xl px-6 md:px-12 lg:px-16 flex flex-col gap-24 sm:gap-32"
      >
        {/* ۱. سکشن اول: About Me */}
        <motion.section
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 border-b border-border/30 pb-16"
        >
          <div className="md:col-span-4 select-none">
            <span className="font-mono text-xs font-black text-accent tracking-[0.2em] uppercase">
              01 // {t("sections.aboutMe")}
            </span>
          </div>
          <div className="md:col-span-8">
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-medium">
              {t("placeholders.aboutMeText")}
            </p>
          </div>
        </motion.section>

        {/* ۲. سکشن دوم: Experience */}
        <motion.section
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 border-b border-border/30 pb-16"
        >
          <div className="md:col-span-4 select-none">
            <span className="font-mono text-xs font-black text-accent tracking-[0.2em] uppercase">
              02 // {t("sections.experience")}
            </span>
          </div>
          <div className="md:col-span-8 flex flex-col gap-10">
            {/* کارت تستی سابقه کاری اول */}
            <div className="relative border border-border bg-white/[0.015] dark:bg-white/[0.005] p-6 rounded-2xl shadow-sm hover:border-accent/20 transition-colors duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-lg font-black text-text-primary leading-tight">
                    {t("placeholders.expTitle")}
                  </h3>
                  <p className="text-xs text-accent font-bold mt-1">
                    {t("placeholders.expCompany")}
                  </p>
                </div>
                <span className="text-xs font-mono font-black text-text-muted">
                  {t("placeholders.expDuration")}
                </span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {t("placeholders.expDesc")}
              </p>
            </div>
          </div>
        </motion.section>

        {/* ۳. سکشن سوم: Skills */}
        <motion.section
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 border-b border-border/30 pb-16"
        >
          <div className="md:col-span-4 select-none">
            <span className="font-mono text-xs font-black text-accent tracking-[0.2em] uppercase">
              03 // {t("sections.skills")}
            </span>
          </div>
          <div className="md:col-span-8 flex flex-col gap-8">
            {/* دسته بندی تستی مهارت‌ها ۱ */}
            <div>
              <h4 className="text-xs font-black text-text-muted tracking-widest uppercase mb-4">
                // {t("placeholders.skillsCategory1")}
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "HTML5/CSS3",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-500/5 dark:bg-purple-500/8 border border-purple-500/10 dark:border-purple-500/20 px-3 py-1.5 rounded-xl"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* دسته بندی تستی مهارت‌ها ۲ */}
            <div>
              <h4 className="text-xs font-black text-text-muted tracking-widest uppercase mb-4">
                // {t("placeholders.skillsCategory2")}
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "GSAP",
                  "Framer Motion",
                  "UI/UX Prototyping",
                  "Responsive Design",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-500/5 dark:bg-blue-500/8 border border-blue-500/10 dark:border-blue-500/20 px-3 py-1.5 rounded-xl"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* دسته بندی تستی مهارت‌ها ۳ */}
            <div>
              <h4 className="text-xs font-black text-text-muted tracking-widest uppercase mb-4">
                // {t("placeholders.skillsCategory3")}
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Git / GitHub",
                  "Webpack / Vite",
                  "npm / pnpm",
                  "VS Code",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/5 dark:bg-emerald-500/8 border border-emerald-500/10 dark:border-emerald-500/20 px-3 py-1.5 rounded-xl"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ۴. سکشن چهارم: Interests */}
        <motion.section
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 border-b border-border/30 pb-16"
        >
          <div className="md:col-span-4 select-none">
            <span className="font-mono text-xs font-black text-accent tracking-[0.2em] uppercase">
              04 // {t("sections.interests")}
            </span>
          </div>
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* کارت علاقه مندی ۱ */}
            <div className="border border-border bg-white/[0.01] p-5 rounded-2xl">
              <span className="text-xl mb-3 block">🎨</span>
              <h4 className="text-sm font-black text-text-primary mb-1.5">
                {t("placeholders.interest1")}
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                {t("placeholders.interest1Desc")}
              </p>
            </div>
            {/* کارت علاقه مندی ۲ */}
            <div className="border border-border bg-white/[0.01] p-5 rounded-2xl">
              <span className="text-xl mb-3 block">🌀</span>
              <h4 className="text-sm font-black text-text-primary mb-1.5">
                {t("placeholders.interest2")}
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                {t("placeholders.interest2Desc")}
              </p>
            </div>
          </div>
        </motion.section>

        {/* ۵. سکشن پنجم: Future Goals */}
        <motion.section
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8"
        >
          <div className="md:col-span-4 select-none">
            <span className="font-mono text-xs font-black text-accent tracking-[0.2em] uppercase">
              05 // {t("sections.futureGoals")}
            </span>
          </div>
          <div className="md:col-span-8">
            <div className="relative border border-border bg-gradient-to-b from-white/[0.015] to-transparent p-6 rounded-2xl hover:border-accent/20 transition-colors duration-300">
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium">
                {t("placeholders.goalsText")}
              </p>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </main>
  );
}
