"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Sparkles, Gamepad2, Music, Trophy } from "lucide-react";

const INTERESTS = [
  {
    id: "gaming",
    titleFa: "ویدیو گیم و بازی‌های ویدیویی",
    titleEn: "Video Gaming & Interactive Worlds",
    categoryFa: "گیمینگ",
    categoryEn: "GAMING",
    descFa: "علاقه‌مند به بازی‌های داستانی، رقابتی و تجربه دنیای تعاملی و طراحی مرحله.",
    descEn: "Passionate about story-driven games, mechanics, and interactive world design.",
    type: "image",
    mediaSrc: "/images/Interests/gaming.jpg",
    icon: Gamepad2,
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
  {
    id: "guitar",
    titleFa: "گیتار کلاسیک و موسیقی",
    titleEn: "Classic Guitar & Acoustic Music",
    categoryFa: "موسیقی",
    categoryEn: "MUSIC",
    descFa: "نواختن گیتار کلاسیک برای آرامش ذهن، تمرکز و خلق ملودی‌های دلنشین.",
    descEn: "Playing classic guitar for mind relaxation, focus, and crafting warm acoustic melodies.",
    type: "image",
    mediaSrc: "/images/Interests/guitar.jpg",
    icon: Music,
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  {
    id: "football",
    titleFa: "فوتبال و هیجان ورزش",
    titleEn: "Football & Sports Passion",
    categoryFa: "ورزش / ویدیو",
    categoryEn: "SPORTS / REEL",
    descFa: "دنبال‌کننده پرشور مسابقات فوتبال، تحلیل تاکتیک‌ها و هیجان مسابقات بزرگ.",
    descEn: "Passionate football enthusiast, following tactical plays and high-stakes matches.",
    type: "video",
    mediaSrc: "/video/football.mp4",
    icon: Trophy,
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
];

export default function AboutInterests() {
  const t = useTranslations("about");
  const locale = useLocale();
  const isRTL = locale === "fa";

  return (
    <section className="relative px-6 md:px-12 lg:px-16 py-0 select-none">
      <div className="mx-auto max-w-5xl flex flex-col gap-12 sm:gap-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-border/30 pb-16 relative">
          
          <div className="md:col-span-4 select-none relative">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-2xl bg-white/80 dark:bg-white/[0.04] border border-border/80 dark:border-white/10 flex items-center justify-center p-2.5 shadow-xs shrink-0 backdrop-blur-xl text-accent">
                  <Sparkles size={24} strokeWidth={2} />
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-text-primary tracking-tight leading-tight">
                  {isRTL ? "علاقه‌مندی‌ها" : "Interests"}
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
                {isRTL
                  ? "سرگرمی‌ها، دغدغه‌ها و فعالیت‌های پرشور خارج از دنیای کدنویسی"
                  : "Hobbies, creative passions, and activities outside the world of coding."}
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
                  className="group relative h-[380px] sm:h-[420px] rounded-3xl overflow-hidden border border-border/60 bg-white/70 dark:bg-white/[0.02] backdrop-blur-2xl shadow-xs hover:border-accent/40 hover:shadow-xl transition-all duration-500 flex flex-col justify-between p-4"
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
                        alt={isRTL ? item.titleFa : item.titleEn}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />
                  </div>

                  <div className="relative z-10 flex items-center justify-between">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border backdrop-blur-md ${item.badgeColor}`}>
                      {isRTL ? item.categoryFa : item.categoryEn}
                    </span>

                    <div className="size-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center">
                      <IconComponent size={15} strokeWidth={2.2} />
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col gap-1.5 text-white">
                    <h3 className="text-base font-black tracking-tight leading-snug drop-shadow-sm">
                      {isRTL ? item.titleFa : item.titleEn}
                    </h3>
                    <p className="text-xs text-white/80 leading-relaxed font-medium line-clamp-3">
                      {isRTL ? item.descFa : item.descEn}
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