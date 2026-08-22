"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "@/components/layout/Providers";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useMounted } from "@/hooks/use-mounted";

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

  const mounted = useMounted();

  const switchLocale = () => {
    const next = locale === "en" ? "fa" : "en";
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/") || "/");
  };

  const isActive = (href: string) =>
    pathname === (href === "" ? `/${locale}` : `/${locale}${href}`);

  return (
    <header className="fixed top-0 left-0 w-full z-50 h-16 sm:h-20 flex items-center justify-between px-6 md:px-12 lg:px-16 pointer-events-none transition-all duration-300 header-range-blur">
      <div className="hidden sm:flex flex-col justify-center pointer-events-auto select-none">
        <Link
          href={`/${locale}`}
          className={[
            "text-base sm:text-lg md:text-xl no-underline leading-none transition-all duration-300 hover:opacity-80",
            locale === "fa"
              ? "font-extrabold tracking-normal text-text-primary"
              : "font-black tracking-tight text-text-primary",
          ].join(" ")}
        >
          {tHeader("name")}
          <span className="text-accent">.</span>
        </Link>
        <span className="text-[10px] sm:text-[11px] text-text-muted mt-1 font-medium tracking-wider uppercase opacity-80">
          {locale === "fa"
            ? "طراح وب‌سایت و توسعه‌دهنده فرانت‌اند"
            : "Frontend Developer"}
        </span>
      </div>

      <div className="pointer-events-auto sm:absolute sm:left-1/2 sm:-translate-x-1/2">
        <nav
          className="seg-pill h-11 sm:h-12 flex items-center px-1.5 rounded-full border border-black/10 dark:border-white/15 bg-white/75 dark:bg-[#0a0a10]/85 shadow-2xl shadow-black/40 backdrop-blur-2xl"
          style={{
            backdropFilter: "blur(8px) saturate(227%)",
            WebkitBackdropFilter: "blur(8px) saturate(227%)",
          }}
        >
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
                    <div className="seg-top-glow" />
                  </motion.div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
        <button
          onClick={switchLocale}
          className="lg-btn h-8 sm:h-9 px-3.5 sm:px-4 rounded-full text-[10px] sm:text-xs font-semibold tracking-widest cursor-pointer text-text-secondary hover:text-text-primary"
        >
          {locale === "en" ? "فارسی" : "EN"}
        </button>

        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
          className="lg-btn size-8 sm:size-9 rounded-full flex items-center justify-center cursor-pointer text-text-secondary hover:text-text-primary"
        >
          {mounted &&
            (resolvedTheme === "dark" ? (
              <Sun size={14} className="sm:size-3.75" strokeWidth={2} />
            ) : (
              <Moon size={14} className="sm:size-3.75" strokeWidth={2} />
            ))}
        </button>
      </div>
    </header>
  );
}
