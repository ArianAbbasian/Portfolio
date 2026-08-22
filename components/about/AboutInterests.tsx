"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/layout/Providers";

const MusicIcon = ({ className = "size-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

const TrophyIcon = ({ className = "size-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
  </svg>
);

const INTERESTS = [
  {
    id: "gaming",
    type: "image",
    mediaSrc: "/images/Interests/gaming.jpg",
    iconType: "svg",
    iconSrc: "/images/Icons/gaming.svg",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
  {
    id: "guitar",
    type: "image",
    mediaSrc: "/images/Interests/guitar.jpg",
    iconType: "component",
    icon: MusicIcon,
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  {
    id: "football",
    type: "video",
    mediaSrc: "/video/football.mp4",
    iconType: "component",
    icon: TrophyIcon,
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
];

export default function AboutInterests() {
  const t = useTranslations("about");
  const locale = useLocale();
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isRTL = locale === "fa";
  const isDark = mounted && resolvedTheme === "dark";
  const iconSrc = isDark
    ? "/images/Icons/glitter-white.svg"
    : "/images/Icons/glitter.svg";

  return (
    <section className="relative px-6 md:px-12 lg:px-16 py-0 select-none">
      <div className="mx-auto max-w-5xl flex flex-col gap-12 sm:gap-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-border/30 pb-16 relative">
          
          <div className="md:col-span-4 select-none relative">
            
            <div className="absolute -top-6 -start-4 sm:-top-8 sm:-start-6 size-32 sm:size-40 opacity-10 dark:opacity-15 pointer-events-none select-none z-0">
              <img
                src={iconSrc}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>

            <div className="relative z-10 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-2xl bg-white/80 dark:bg-white/[0.04] border border-border/80 dark:border-white/10 flex items-center justify-center p-2.5 shadow-xs shrink-0 backdrop-blur-xl">
                  <img
                    src={iconSrc}
                    alt="Interests Icon"
                    className="w-full h-full object-contain"
                  />
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-text-primary tracking-tight leading-tight">
                  {t("interests.title")}
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
                {t("interests.subtitle")}
              </p>
            </div>
          </div>

          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INTERESTS.map((item, idx) => {
              const IconComponent = item.icon;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.12, ease: "easeOut" }}
                  className="group relative min-h-[400px] sm:min-h-[440px] rounded-3xl overflow-hidden border border-border/60 bg-white/70 dark:bg-white/[0.02] backdrop-blur-2xl shadow-xs hover:border-accent/40 hover:shadow-xl transition-all duration-500 flex flex-col justify-between p-4 sm:p-5"
                >
                  <div className="absolute inset-0 z-0 overflow-hidden bg-black/20">
                    {item.type === "video" ? (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        controlsList="nodownload"
                        disablePictureInPicture
                        disableRemotePlayback
                        src={item.mediaSrc}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <img
                        src={item.mediaSrc}
                        alt={t(`interests.items.${item.id}.title`)}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
                  </div>

                  <div className="relative z-10 flex items-center justify-between">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border backdrop-blur-md ${item.badgeColor}`}>
                      {t(`interests.items.${item.id}.category`)}
                    </span>

                    <div className="size-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center p-1.5">
                      {item.iconType === "svg" ? (
                        <img
                          src={item.iconSrc}
                          alt="Gaming Icon"
                          className="w-full h-full object-contain [filter:brightness(0)_invert(1)]"
                        />
                      ) : (
                        IconComponent && <IconComponent className="size-4" />
                      )}
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col gap-1.5 text-white mt-auto pt-8">
                    <h3 className="text-base font-black tracking-tight leading-snug drop-shadow-sm">
                      {t(`interests.items.${item.id}.title`)}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-medium">
                      {t(`interests.items.${item.id}.desc`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}