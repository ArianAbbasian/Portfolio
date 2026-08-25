"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const translations = {
  fa: {
    badge: "خطای ۴۰۴",
    title: "صفحه پیدا نشد",
    message: "صفحه‌ای که دنبال آن بودید وجود ندارد یا جابجا شده است.",
    backHome: "بازگشت به خانه",
    report: "اگر فکر می‌کنید این یک اشتباه است، لطفاً به من اطلاع دهید.",
  },
  en: {
    badge: "404 ERROR",
    title: "Page not found",
    message: "The page you are looking for doesn't exist or has been moved.",
    backHome: "Back to Home",
    report: "If you think this is a mistake, please let me know.",
  },
};

export default function NotFound() {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "fa";
  const t = translations[locale];
  const isRTL = locale === "fa";

  return (
    <main
      dir={isRTL ? "rtl" : "ltr"}
      lang={locale}
      className={`min-h-screen bg-background-main flex items-center justify-center px-6 py-24 relative overflow-hidden ${
        isRTL ? "font-fa" : "font-sans"
      }`}
    >
      <div className="absolute top-1/4 left-1/4 -z-10 h-[250px] w-[400px] rounded-full bg-accent/10 blur-[120px] opacity-70" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-[250px] w-[400px] rounded-full bg-purple-500/10 blur-[120px] opacity-70" />

      <div className="w-full max-w-2xl text-center">
        <span className="inline-block text-[8rem] sm:text-[10rem] font-black leading-none bg-gradient-to-r from-accent via-accent-hover to-purple-500 bg-clip-text text-transparent select-none">
          404
        </span>

        <div className="mt-6 rounded-3xl border border-border/60 bg-white/70 dark:bg-white/[0.03] backdrop-blur-2xl p-8 sm:p-12 shadow-xl">
          <div className="flex flex-col items-center gap-4">
            <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-accent/10 text-accent border border-accent/25">
              {t.badge}
            </span>

            <h1 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
              {t.title}
            </h1>

            <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-md">
              {t.message}
            </p>
          </div>

          <div className="mt-8">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-bold text-white shadow-lg hover:bg-accent-hover transition-colors"
            >
              {t.backHome}
            </Link>
          </div>

          <p className="mt-8 text-xs text-text-muted leading-relaxed">
            {t.report}{" "}
            <a
              href="mailto:arianabbasian013@gmail.com"
              className="text-accent hover:underline"
            >
              arianabbasian013@gmail.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}