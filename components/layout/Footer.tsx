"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="relative mt-20 border-t border-border/40 px-6 py-14">
      <div className="mx-auto max-w-5xl flex flex-col gap-12">
        <div className="flex flex-col items-center text-center gap-6">
          <h2 className="max-w-3xl text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-text-primary leading-snug">
            {t("readyText")}
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <motion.a
              href="mailto:ArianAbbasian013@gmail.com?subject=Project%20Inquiry"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-accent/30 bg-white/60 dark:bg-white/5 px-7 py-3 text-sm font-bold text-text-primary backdrop-blur-xl transition-colors hover:border-accent hover:bg-white/90 dark:hover:bg-white/10 hover:text-accent   "
            >
              <Mail size={17} strokeWidth={2.2} />
              {t("emailMe")}
            </motion.a>

            <motion.a
              href="https://t.me/Arian_Abbasian"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-7 py-3 text-sm font-bold text-white shadow-[0_8px_30px_rgba(0,122,255,0.25)] transition-colors hover:bg-accent-hover hover:shadow-[0_12px_35px_rgba(0,122,255,0.35)]"
            >
              <Send size={16} strokeWidth={2.2} />
              {t("telegramMe")}
            </motion.a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/30 pt-6 text-xs text-text-muted">
          <p>{t("copyRight")}</p>

          <div className="flex items-center gap-2">
            <a
              href="https://www.linkedin.com/in/arian-abbasian/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-text-primary transition-colors"
            >
              LinkedIn
            </a>

            <span>·</span>

            <a
              href="https://github.com/arianAbbasian"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-text-primary transition-colors"
            >
              GitHub
            </a>

            <span>·</span>

            <a
              href="/resume.pdf"
              download="Arian_Abbasian_Resume.pdf"
              className="font-medium hover:text-text-primary transition-colors"
            >
              {t("resumeBtn")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}