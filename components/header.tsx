"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "@/components/providers";
import { useEffect, useState } from "react";

const SunIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const tHeader = useTranslations("header");

  useEffect(() => setMounted(true), []);

  const switchLocale = () => {
    const newLocale = locale === "en" ? "fa" : "en";
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/") || "/");
  };

  const isActive = (href: string) => {
    const full = href === "" ? `/${locale}` : `/${locale}${href}`;
    return pathname === full;
  };

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 h-16"
      style={{
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(40px) saturate(180%)",
        WebkitBackdropFilter: "blur(40px) saturate(180%)",
        borderBottom: "1px solid rgba(255,255,255,0.18)",
        boxShadow: "0 1px 24px rgba(0,0,0,0.08)",
      }}
    >
      <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="text-lg font-bold tracking-tight shrink-0"
          style={{ color: "var(--text-primary)" }}
        >
          {tHeader("name")}
          <span style={{ color: "var(--accent)" }}>.</span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          {(["", "/about"] as const).map((href) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={`/${locale}${href}`}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  color: active ? "var(--accent)" : "var(--text-secondary)",
                  background: active ? "var(--glass-bg)" : "transparent",
                  border: active
                    ? "1px solid var(--glass-border)"
                    : "1px solid transparent",
                }}
              >
                {href === "" ? t("work") : t("about")}
              </Link>
            );
          })}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language toggle */}
          <button
            onClick={switchLocale}
            className="h-9 px-4 rounded-xl text-sm font-semibold tracking-widest transition-all duration-200"
            style={{
              color: "var(--text-secondary)",
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
            }}
          >
            {locale === "en" ? "FA" : "EN"}
          </button>

          {/* Theme toggle */}
          <button
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{
              color: "var(--text-secondary)",
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
            }}
            aria-label="toggle theme"
          >
            {mounted && (resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />)}
          </button>
        </div>
      </div>
    </header>
  );
}
