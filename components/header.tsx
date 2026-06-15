"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "@/components/providers";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion"; // ۱. اضافه کردن فریمور موشن

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
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <header
        className={[
          "header-pill pointer-events-auto",
          "w-full max-w-[720px] h-14 rounded-full",
          "flex items-center justify-between pl-5 pr-2 gap-4",
          "border border-glass-border",
          "transition-transform duration-300 ease-out",
          scrolled ? "scale-[0.97]" : "scale-100",
        ].join(" ")}
      >
        {/* ── Logo ─────────────────────────────── */}
        <Link
          href={`/${locale}`}
          className="shrink-0 text-[15px] font-bold tracking-tight text-text-primary no-underline"
        >
          {tHeader("name")}
          <span className="text-accent">.</span>
        </Link>
        {/* ── Segmented Control (Liquid Animated) ── */}
        <nav className="seg-pill relative">
          {NAV_ITEMS.map(({ href, labelKey }) => {
            const active = isActive(href);
            // اصلاح اصلی: متن دکمه را مستقیم از t(labelKey) می‌گیریم
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
                {label}

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
        {/* ── Controls ─────────────────────────── */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={switchLocale}
            className="lg-btn h-9 px-4 rounded-full text-xs font-semibold tracking-widest cursor-pointer text-text-secondary hover:text-text-primary"
          >
            {locale === "en" ? "فارسی" : "EN"}
          </button>

          <button
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            aria-label="Toggle theme"
            className="lg-btn size-9 rounded-full flex items-center justify-center cursor-pointer text-text-secondary hover:text-text-primary"
          >
            {mounted &&
              (resolvedTheme === "dark" ? (
                <Sun size={15} strokeWidth={2} />
              ) : (
                <Moon size={15} strokeWidth={2} />
              ))}
          </button>
        </div>
      </header>
    </div>
  );
}
