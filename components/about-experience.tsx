"use html";
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";

const EXPERIENCES = [
  {
    key: "kanda",
    initial: "K",
    logoPath: "/images/logos/kanda_idea_logo.jpg",
    skills: ["JavaScript", "jQuery", "ASP.NET", "Bootstrap", "OpenLayers"],
  },
  {
    key: "isiran",
    initial: "I",
    logoPath: "/images/logos/ISIRAN.jpg",
    skills: ["React.js", "Next.js", "Tailwind CSS", "Performance Optimization"],
  },
  {
    key: "mosbatesabz",
    initial: "M",
    logoPath: "/images/logos/mosbateSabz.jpg",
    skills: ["JavaScript", "HTML5", "CSS3", "Web Development Core"],
  },
];

export default function AboutExperience() {
  const t = useTranslations("about");
  const [logoErrors, setLogoErrors] = useState<Record<string, boolean>>({});

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 border-b border-border/30 pb-16"
    >
      <div className="md:col-span-4 select-none">
        <span className="font-mono text-xs font-black text-accent tracking-[0.2em] uppercase">
          02 // {t("sections.experience")}
        </span>
      </div>
      <div className="md:col-span-8 flex flex-col gap-8">
        {EXPERIENCES.map(({ key, initial, logoPath, skills }) => {
          const hasLogoError = logoErrors[key];

          return (
            <div 
              key={key} 
              className="relative border border-border bg-white/[0.015] dark:bg-white/[0.005] p-6 rounded-2xl shadow-sm hover:border-accent/20 transition-all duration-300 flex gap-5"
            >
              <div className="shrink-0 select-none">
                {!hasLogoError ? (
                  <img 
                    src={logoPath} 
                    alt={t(`experienceItems.${key}.company`)}
                    onError={() => setLogoErrors(prev => ({ ...prev, [key]: true }))}
                    className="size-12 rounded-xl object-contain border border-border bg-white/5 p-1.5 shadow-sm"
                  />
                ) : (
                  <div className="size-12 rounded-xl border border-accent/20 bg-accent/5 text-accent flex items-center justify-center font-mono font-black text-lg shadow-sm">
                    {initial}
                  </div>
                )}
              </div>

              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-text-primary leading-tight">
                      {t(`experienceItems.${key}.role`)}
                    </h3>
                    <p className="text-xs text-accent font-bold mt-1">
                      {t(`experienceItems.${key}.company`)} — <span className="opacity-75">{t(`experienceItems.${key}.type`)}</span>
                    </p>
                  </div>
                  <span className="text-xs font-mono font-black text-text-muted mt-1 sm:mt-0">
                    {t(`experienceItems.${key}.duration`)}
                  </span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  {t(`experienceItems.${key}.desc`)}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span key={skill} className="font-mono text-[10px] tracking-wider text-text-muted bg-white/[0.02] border border-white/[0.05] px-2 py-0.5 rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}