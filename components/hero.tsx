"use html"; // اگر از Next.js 15+ استفاده می‌کنی و ارور کلاینت گرفتی، یادت باشد این کامپوننت به خاطر انیمیشن Client-Side است
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function Hero() {
  const t = useTranslations("home.hero");
  const tHome = useTranslations("home");

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-16 md:pt-40 md:pb-24">
      {/* ─── افکت بک‌گراند نوری (Ambient Glow) ─── */}
      <div className="absolute top-0 left-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-accent-primary/10 blur-[120px]" />

      <div className="mx-auto max-w-4xl text-center">
        {/* ─── چراغ وضعیت زنده (Live Status Indicator) ─── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 rounded-full border border-border-subtle bg-background-glass px-4 py-1.5 backdrop-blur-md"
          style={{
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.03), inset 0 1px 1px rgba(255, 255, 255, 0.05)",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium tracking-wide text-text-secondary">
            {t("status")}
          </span>
        </motion.div>

        {/* ─── تیتر اصلی (Main Typography) ─── */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="mt-8 text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl md:text-6xl leading-[1.15] md:leading-[1.15]"
        >
          {t("title")}
        </motion.h1>

        {/* ─── دسکریپشن مینی‌مال (Subtitle) ─── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-text-secondary"
        >
          {t("subtitle")}
        </motion.p>

        {/* ─── اعلان هوشمندانه محرمانگی پروژه (NDA Notice) ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mx-auto mt-12 max-w-2xl rounded-2xl border border-border-subtle bg-background-glass/40 p-4 backdrop-blur-sm"
        >
          <p className="text-xs leading-relaxed text-text-muted">
            💡 {tHome("ndaNotice")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}