"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, Send, Phone } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer id="contact" className="relative mt-20 border-t border-border/40 px-6 py-14">
      <div className="mx-auto max-w-5xl flex flex-col gap-12">
        <div className="flex flex-col items-center text-center gap-6">
          <h2 className="max-w-3xl text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-text-primary leading-snug">
            {t("readyText")}
          </h2>

          {/* دکمه‌ها با چیدمان بهتر برای موبایل */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {/* ایمیل */}
            <motion.a
              href="mailto:ArianAbbasian013@gmail.com?subject=Project%20Inquiry"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/30 bg-white/60 dark:bg-white/5 px-4 py-2.5 text-xs sm:px-7 sm:py-3 sm:text-sm font-bold text-text-primary backdrop-blur-xl transition-colors hover:border-accent hover:bg-white/90 dark:hover:bg-white/10 hover:text-accent"
            >
              <Mail size={16} strokeWidth={2.2} className="sm:size-[17px]" />
              {t("emailMe")}
            </motion.a>

            {/* تلفن با direction ltr برای نمایش صحیح در فارسی */}
            <motion.a
              href="tel:+989991423690"
              dir="ltr"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/30 bg-white/60 dark:bg-white/5 px-4 py-2.5 text-xs sm:px-7 sm:py-3 sm:text-sm font-bold text-text-primary backdrop-blur-xl transition-colors hover:border-accent hover:bg-white/90 dark:hover:bg-white/10 hover:text-accent"
            >
              <Phone size={16} strokeWidth={2.2} className="sm:size-[17px]" />
              {t("phoneNumber")}
            </motion.a>

            {/* تلگرام */}
            <motion.a
              href="https://t.me/Arian_Abbasian"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-xs sm:px-7 sm:py-3 sm:text-sm font-bold text-white shadow-[0_8px_30px_rgba(0,122,255,0.25)] transition-colors hover:bg-accent-hover hover:shadow-[0_12px_35px_rgba(0,122,255,0.35)]"
            >
              <Send size={16} strokeWidth={2.2} className="sm:size-[17px]" />
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