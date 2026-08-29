"use client";

import { useTranslations, useLocale } from "next-intl";
import { useMounted } from "@/hooks/use-mounted";

export default function AboutHero() {
  const t = useTranslations("about");
  const locale = useLocale();

  const mounted = useMounted();

  return (
    <section className="relative px-6 md:px-12 lg:px-16 pt-0 mb-10 sm:mb-12 lg:mb-[133px] select-none flex justify-center w-full">
      <div className="absolute top-[10%] left-1/2 -z-10 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-accent/5 blur-[120px] opacity-60 pointer-events-none" />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative pointer-events-auto">
        <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
          <div
            className={[
              "flex flex-col gap-2 max-w-3xl",
              locale === "fa"
                ? "border-r-3 border-accent/25 pr-6"
                : "border-l-3 border-accent/25 pl-6",
            ].join(" ")}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tight leading-[1.3] sm:leading-[1.2]">
              {t("titlePrefix")}
              <span
                className={[
                  "bg-gradient-to-r from-accent via-accent-hover to-purple-500 bg-clip-text text-transparent select-text",
                  locale === "fa"
                    ? "font-black"
                    : "italic font-serif font-medium",
                ].join(" ")}
              >
                {t("titleHighlight")}
              </span>
              {t("titleSuffix")}.
            </h1>

            <p className="text-xs sm:text-sm font-medium text-text-secondary mt-2 tracking-wide leading-relaxed">
              {t("description")}
            </p>
          </div>
        </div>

        <div
          className={[
            "lg:col-span-5 flex justify-center order-1 lg:order-2",
            locale === "fa" ? "lg:justify-start" : "lg:justify-end",
          ].join(" ")}
        >
          {mounted && (
            <div className="w-full max-w-[320px] h-[380px] rounded-[2.25rem] border border-border bg-slate-200/60 dark:bg-white/[0.015] backdrop-blur-3xl pt-6 px-6 pb-4 relative flex flex-col justify-between shadow-[0_30px_70px_rgba(0,0,0,0.03)] dark:shadow-[0_40px_90px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between text-[10px] font-sans text-text-muted font-bold tracking-[0.2em] select-none border-b border-border/40 pb-3 z-20">
                <span>{t("hero.location")}</span>
                <div className="flex items-center gap-1.5">
                  <span>{t("hero.system")}</span>
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  </span>
                </div>
              </div>

              <div className="absolute bottom-4 inset-x-4 h-24 bg-white/70 dark:bg-white/[0.03] border border-border backdrop-blur-2xl rounded-2xl z-10 shadow-lg" />

              <div
                className="relative w-full h-[220px] flex items-end justify-center select-none"
                onContextMenu={(e) => e.preventDefault()}
              >
                <div
                  className="absolute inset-0 z-20 cursor-default"
                  onContextMenu={(e) => e.preventDefault()}
                />

                <img
                  src="/video/charakter.webp"
                  alt=""
                  draggable={false}
                  className="w-[110%] h-[110%] object-contain object-bottom relative z-10 pointer-events-none select-none"
                  style={{
                    transform: "translate3d(0, 27px, 0)",
                    WebkitUserSelect: "none",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
