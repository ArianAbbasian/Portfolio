"use html";
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="relative mt-20 border-t border-border-subtle bg-background-glass/20 px-6 py-12 backdrop-blur-xl">
      {/* ─── هاله‌ی نوری پس‌زمینه (Ambient Background Glow) ─── */}
      <div className="absolute bottom-0 left-1/4 -z-10 h-[200px] w-[400px] rounded-full bg-accent-primary/5 blur-[100px]" />

      <div className="mx-auto max-w-5xl">
        {/* ─── بخش کال تو اکشن (CTA Box) ─── */}
        <div className="text-center md:text-start md:flex md:items-center md:justify-between gap-8 pb-12 border-b border-white/[0.05]">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">
              {t("ctaTitle")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              {t("ctaSubtitle")}
            </p>
          </div>

          {/* دکمه دانلود رزومه (Liquid Glass Button) */}
          <div className="mt-6 md:mt-0 flex justify-center">
            <motion.a
              href="/resume.pdf"
              download="Arian_Abbasian_Resume.pdf"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative inline-flex items-center justify-center rounded-2xl border border-accent-primary/30 bg-background-glass px-6 py-3 text-sm font-bold text-text-primary shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:border-accent-primary hover:shadow-[0_0_25px_rgba(var(--accent-primary-rgb),0.2)]"
              style={{
                backdropFilter: "blur(16px)",
              }}
            >
              <svg
                className="me-2 h-4 w-4 text-accent-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              {t("resumeBtn")}
            </motion.a>
          </div>
        </div>

        {/* ─── بخش شبکه‌های اجتماعی و کپی‌رایت ─── */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-text-muted">
          <p>{t("copyRight")}</p>

          {/* لینک‌های گیت‌هاب و لینکدین */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/arian-abbasian/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 transition-colors duration-300 hover:text-text-primary"
            >
              <span className="font-medium">LinkedIn</span>
              <svg
                className="h-3 w-3 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>

            <a
              href="https://github.com/arianAbbasian"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 transition-colors duration-300 hover:text-text-primary"
            >
              <span className="font-medium">GitHub</span>
              <svg
                className="h-3 w-3 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
