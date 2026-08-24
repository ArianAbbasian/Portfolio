"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations, useLocale } from "next-intl";
import { PROJECTS_DATA, Project, ProjectLangData } from "@/constants/projects";
import Link from "next/link";
import Lightbox from "@/components/ui/Lightbox";
import { motion } from "framer-motion";
import { useMounted } from "@/hooks/use-mounted";
import { PROJECT_THEMES } from "@/constants/project-themes";

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}


export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  const t = useTranslations("home.projects");
  const locale = useLocale();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(
    null,
  );

  const mounted = useMounted();

  useEffect(() => {
    if (!isOpen) return;

    const checkTheme = () => {
      const htmlClass = document.documentElement.classList;
      const bodyClass = document.body.classList;
      const hasDarkClass =
        htmlClass.contains("dark") || bodyClass.contains("dark");
      setIsDarkMode(hasDarkClass);
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    document.documentElement.style.setProperty(
      "overflow",
      "hidden",
      "important",
    );
    document.body.style.setProperty("overflow", "hidden", "important");

    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("overflow");
      document.body.style.removeProperty("overflow");
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const pData = project[locale as keyof typeof project] as ProjectLangData;

  const getCleanPath = (path: string | undefined) => {
    if (!path) return "";
    return path.startsWith("/public") ? path.replace("/public", "") : path;
  };

  const mainImage = getCleanPath(project.image);
  const imgMobile = project.mobileImage
    ? getCleanPath(project.mobileImage)
    : mainImage;

  const img1 = project.desktopImages?.[0]
    ? getCleanPath(project.desktopImages[0])
    : mainImage;
  const img2 = project.desktopImages?.[1]
    ? getCleanPath(project.desktopImages[1])
    : mainImage;
  const img3 = project.desktopImages?.[2]
    ? getCleanPath(project.desktopImages[2])
    : mainImage;

  const realIndex = PROJECTS_DATA.findIndex((p) => p.id === project.id);
  const theme = PROJECT_THEMES[realIndex % PROJECT_THEMES.length];

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 backdrop-blur-xl transition-colors duration-500 ${
        isDarkMode ? "bg-black/75" : "bg-zinc-900/25"
      }`}
      style={{ transform: "translate3d(0, 0, 10000px)" }}
    >
      <div className="absolute inset-0 cursor-default" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.95, y: 15, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 30, stiffness: 220 }}
        className={`relative w-full max-w-6xl h-[85vh] overflow-x-hidden overflow-y-auto p-6 sm:p-10 md:p-12 border shadow-[0_50px_100px_rgba(0,0,0,0.5)] overscroll-contain rounded-3xl sm:rounded-[2.5rem] ${
          isDarkMode
            ? "bg-gradient-to-b from-zinc-900/90 to-zinc-950/95 border-white/[0.06] text-zinc-100 ring-1 ring-white/[0.05]"
            : "bg-gradient-to-b from-white/95 to-zinc-50/95 border-zinc-200/80 text-zinc-800"
        } 
        [&::-webkit-scrollbar]:w-1.5
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:rounded-full
        ${isDarkMode ? "[&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20" : "[&::-webkit-scrollbar-thumb]:bg-zinc-300 hover:[&::-webkit-scrollbar-thumb]:bg-zinc-400"}
        `}
        style={{ direction: locale === "fa" ? "rtl" : "ltr" }}
      >
        <div
          className="absolute top-[10%] left-1/4 -z-10 h-[250px] w-[500px] rounded-full blur-[130px] opacity-40 pointer-events-none animate-pulse"
          style={{
            backgroundColor: theme.glowColor,
            animationDuration: "10s",
          }}
        />

        <button
          onClick={onClose}
          className={`absolute top-6 ${locale === "fa" ? "left-6" : "right-6"} z-20 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 active:scale-90 cursor-pointer ${
            isDarkMode
              ? "border-white/[0.08] bg-white/[0.03] text-zinc-300 hover:bg-white hover:text-black"
              : "border-zinc-200 bg-zinc-100 text-zinc-700 hover:bg-zinc-900 hover:text-white"
          }`}
        >
          ✕
        </button>

        <div
          className={`mb-10 border-b pb-6 ${isDarkMode ? "border-white/[0.06]" : "border-zinc-200"}`}
        >
          <motion.span
            initial={{ opacity: 0, x: locale === "fa" ? 15 : -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={[
              "text-xs font-black uppercase tracking-wider block mb-2",
              theme.accent,
            ].join(" ")}
          >
            {pData.category}
          </motion.span>

          <div className="overflow-hidden py-1">
            <motion.h2
              initial={{ filter: "blur(12px)", scale: 0.95, y: 15, opacity: 0 }}
              animate={{ filter: "blur(0px)", scale: 1, y: 0, opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`text-3xl sm:text-5xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-zinc-900"}`}
            >
              {pData.title}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className={[
              "mt-4 flex flex-wrap gap-3 items-center text-xs font-bold",
              locale === "fa"
                ? "tracking-normal text-text-secondary"
                : "font-mono tracking-wider text-zinc-400 dark:text-zinc-500",
            ].join(" ")}
          >
            <span>
              {t("clientLabel")}
              {pData.client}
            </span>
            <span
              className={`h-1 w-1 rounded-full ${isDarkMode ? "bg-white/10" : "bg-zinc-300"}`}
            />
            <span>
              {t("yearLabel")}
              {project.year}
            </span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 mb-12 items-start">
          <div
            onClick={() => setActiveLightboxImage(imgMobile)}
            className={[
              "md:col-span-4 aspect-[9/16] w-full rounded-2xl overflow-hidden border cursor-zoom-in pointer-events-auto",
              theme.badgeBorder,
              isDarkMode ? "bg-zinc-900" : "bg-zinc-100",
            ].join(" ")}
          >
            <img
              src={imgMobile}
              alt="Mobile View"
              className="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-700"
            />
          </div>

          <div className="md:col-span-8 flex flex-col gap-5 sm:gap-6 w-full">
            <div
              onClick={() => setActiveLightboxImage(img1)}
              className={[
                "aspect-video w-full rounded-2xl overflow-hidden border cursor-zoom-in pointer-events-auto",
                theme.badgeBorder,
                isDarkMode ? "bg-zinc-900" : "bg-zinc-100",
              ].join(" ")}
            >
              <img
                src={img1}
                alt="Desktop Main"
                className="w-full h-full object-cover object-top hover:scale-[1.01] transition-transform duration-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-5 sm:gap-6 w-full">
              <div
                onClick={() => setActiveLightboxImage(img2)}
                className={[
                  "aspect-video w-full rounded-2xl overflow-hidden border cursor-zoom-in pointer-events-auto",
                  theme.badgeBorder,
                  isDarkMode ? "bg-zinc-900" : "bg-zinc-100",
                ].join(" ")}
              >
                <img
                  src={img2}
                  alt="Desktop Sub 1"
                  className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
              <div
                onClick={() => setActiveLightboxImage(img3)}
                className={[
                  "aspect-video w-full rounded-2xl overflow-hidden border cursor-zoom-in pointer-events-auto",
                  theme.badgeBorder,
                  isDarkMode ? "bg-zinc-900" : "bg-zinc-100",
                ].join(" ")}
              >
                <img
                  src={img3}
                  alt="Desktop Sub 2"
                  className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 border-t pt-10 ${isDarkMode ? "border-white/[0.06]" : "border-zinc-200"}`}
        >
          <div className="space-y-4">
            <h3
              className={`text-lg sm:text-xl font-bold flex items-center gap-2 ${isDarkMode ? "text-zinc-100" : "text-zinc-900"}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              {t("challenge")}
            </h3>
            <p
              className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              {pData.challenge}
            </p>
          </div>

          <div className="space-y-4">
            <h3
              className={`text-lg sm:text-xl font-bold flex items-center gap-2 ${isDarkMode ? "text-zinc-100" : "text-zinc-900"}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {t("solution")}
            </h3>
            <p
              className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              {pData.solution}
            </p>
          </div>
        </div>

        <div
          className={`mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t pt-8 ${isDarkMode ? "border-white/[0.06]" : "border-zinc-200"}`}
        >
          <div className="flex flex-wrap gap-2">
            {pData.technologies.map((tag, idx) => (
              <span
                key={idx}
                className={[
                  "font-mono text-xs px-3 py-1.5 rounded-xl border",
                  theme.tech,
                ].join(" ")}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {pData.githubUrl && (
              <Link
                href={pData.githubUrl}
                target="_blank"
                className={[
                  "text-sm font-medium transition-colors cursor-pointer text-text-secondary",
                  theme.accent,
                ].join(" ")}
              >
                {t("sourceCode")}
              </Link>
            )}

            <Link
              href={pData.liveUrl}
              target="_blank"
              className={[
                "inline-flex items-center justify-center rounded-xl bg-foreground text-background px-6 py-3.5 text-xs sm:text-sm font-bold shadow-lg whitespace-nowrap cursor-pointer",
                "transition-all duration-300 ease-out",
                "gap-2 group/btn hover:gap-3.5 active:scale-95",
                theme.btnHover,
              ].join(" ")}
            >
              {t("launchLive")}
              <span
                className={`text-base transition-transform duration-300 ${locale === "fa" ? "group-hover/btn:-translate-x-1.5 rotate-180" : "group-hover/btn:translate-x-1.5"}`}
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </motion.div>

      <Lightbox
        src={activeLightboxImage}
        onClose={() => setActiveLightboxImage(null)}
      />
    </motion.div>,
    document.body,
  );
}
