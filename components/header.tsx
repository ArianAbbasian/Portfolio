"use html";
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "@/components/providers";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { href: "", labelKey: "work" },
  { href: "/about", labelKey: "about" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const tHeader = useTranslations("header");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = () => {
    const next = locale === "en" ? "fa" : "en";
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/") || "/");
  };

  const isActive = (href: string) =>
    pathname === (href === "" ? `/${locale}` : `/${locale}${href}`);

  return (
    <div
      className={[
        "fixed top-0 left-0 w-full z-50 h-16 sm:h-20 flex items-center justify-between px-6 md:px-12 lg:px-16 transition-all duration-300 pointer-events-none",
        scrolled
          ? "backdrop-blur-md bg-background/40"
          : "",
      ].join(" ")}
      style={{ transform: "translate3d(0, 0, 999px)" }} 
    >
      
      {/* ── ۱. نام برند شخصی (اصلاح کلاس تکراری flex برای مخفی شدن قطعی ۱۰۰٪ در موبایل) ── */}
      <div className="hidden sm:flex flex-col justify-center pointer-events-auto">
        <Link
          href={`/${locale}`}
          className={[
            "text-[15px] sm:text-[22px] md:text-[25px] no-underline leading-none transition-all duration-300 hover:opacity-80",
            locale === "fa"
              ? "font-extrabold tracking-normal text-text-primary" 
              : "font-black tracking-tight text-text-primary"      
          ].join(" ")}
        >
          {tHeader("name")}
          <span className="text-accent">.</span>
        </Link>
        <span className="hidden sm:block text-[10px] sm:text-[12px] text-text-muted mt-2 font-bold tracking-widest uppercase opacity-85">
          {locale === "fa" ? "توسعه‌دهنده فرانت‌اند" : "Frontend Engineer"}
        </span>
      </div>

      {/* ── ۲. منوی ناوبری ── */}
      <div className="pointer-events-auto sm:absolute sm:left-1/2 sm:-translate-x-1/2">
        <nav className="seg-pill h-11 sm:h-12 flex items-center px-1">
          {NAV_ITEMS.map(({ href, labelKey }) => {
            const active = isActive(href);
            const label = t(labelKey);

            return (
              <Link
                key={href}
                href={`/${locale}${href}`}
                className={[
                  "seg-item relative z-10 block",
                  active
                    ? "text-text-primary font-bold"
                    : "text-text-secondary font-medium",
                ].join(" ")}
              >
                <span className="relative z-10 px-1">{label}</span>

                {/* لایه انیمیشنی شیشه‌ای داینامیک */}
                {active && (
                  <motion.div
                    layoutId="active-liquid-glass"
                    className="seg-item-active absolute inset-0 -z-10"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 26,
                    }}
                  >
                    {/* خط نوری بالای دکمه */}
                    <div className="seg-top-glow" />
                  </motion.div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ── ۳. کنترل‌ها ── */}
      <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={switchLocale}
          className="lg-btn h-8 sm:h-9 px-3 sm:px-4 rounded-full text-[10px] sm:text-xs font-semibold tracking-widest cursor-pointer text-text-secondary hover:text-text-primary"
        >
          {locale === "en" ? "فارسی" : "EN"}
        </button>

        <button
          onClick={() =>
            setTheme(resolvedTheme === "dark" ? "light" : "dark")
          }
          aria-label="Toggle theme"
          className="lg-btn size-8 sm:size-9 rounded-full flex items-center justify-center cursor-pointer text-text-secondary hover:text-text-primary"
        >
          {mounted &&
            (resolvedTheme === "dark" ? (
              <Sun size={14} className="sm:size-[15px]" strokeWidth={2} />
            ) : (
              <Moon size={14} className="sm:size-[15px]" strokeWidth={2} />
            ))}
        </button>
      </div>

    </div>
  );
}