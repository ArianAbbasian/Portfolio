"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Gauge,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  globe: Globe,
  smartphone: Smartphone,
  gauge: Gauge,
  shield: ShieldCheck,
};

export default function Services() {
  const t = useTranslations("home.services");

  const services = [0, 1, 2, 3];

  return (
    <section className="relative w-full px-6 md:px-12 lg:px-16 py-20 sm:py-24">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[250px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[110px] opacity-70" />

      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <span className="text-[11px] font-black uppercase tracking-widest text-accent">
            {t("eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-text-primary leading-tight">
            {t("title")}
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-text-secondary">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((index) => {
            const iconKey = t(`items.${index}.icon`);
            const Icon = iconMap[iconKey] ?? Globe;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                className="group relative flex flex-col gap-4 rounded-3xl border border-border/60 bg-white/70 dark:bg-white/[0.03] p-6 backdrop-blur-2xl transition-all duration-500 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5"
              >
                <div className="size-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent transition-colors group-hover:bg-accent/20">
                  <Icon size={22} strokeWidth={2} />
                </div>

                <h3 className="text-base sm:text-lg font-black text-text-primary leading-snug">
                  {t(`items.${index}.title`)}
                </h3>

                <p className="text-sm leading-relaxed text-text-secondary">
                  {t(`items.${index}.desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
