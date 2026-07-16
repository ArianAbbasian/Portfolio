"use html";
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations, useLocale } from "next-intl";
import { PROJECTS_DATA, Project, ProjectLangData } from "@/constants/projects";
import Link from "next/link";
import Lightbox from "./lightbox";
import { motion } from "framer-motion"; // وارد کردن موشن برای انیمیشن‌های تعاملی مودال

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

// تم‌های رنگی مجزا جهت همگام‌سازی بصری مودال با رنگ امضای هر پروژه
const PROJECT_THEMES = [
  {
    accent: "text-purple-600 dark:text-purple-400",
    badgeBg: "bg-purple-500/8 dark:bg-purple-500/12",
    badgeBorder: "border-purple-500/15 dark:border-purple-500/25",
    cardBorder: "border-purple-500/35 dark:border-purple-500/25", 
    glowColor: "rgba(147, 51, 234, 0.15)",
    cardShadow: "hover:shadow-[0_20px_50px_rgba(147,51,234,0.18)] dark:hover:shadow-[0_30px_70px_rgba(147,51,234,0.3)]",
    tech: "bg-purple-500/5 dark:bg-purple-500/8 border-purple-500/10 dark:border-purple-500/20 text-purple-700 dark:text-purple-300",
    btnHover: "hover:bg-purple-600 dark:hover:bg-purple-500 hover:text-white hover:shadow-[0_10px_25px_rgba(147,51,234,0.25)] hover:border-purple-500/40"
  },
  {
    accent: "text-blue-600 dark:text-blue-400",
    badgeBg: "bg-blue-500/8 dark:bg-blue-500/12",
    badgeBorder: "border-blue-500/15 dark:border-blue-500/25",
    cardBorder: "border-blue-500/35 dark:border-blue-500/25",
    glowColor: "rgba(37, 99, 235, 0.15)",
    cardShadow: "hover:shadow-[0_20px_50px_rgba(37,99,235,0.18)] dark:hover:shadow-[0_30px_70px_rgba(37,99,235,0.3)]",
    tech: "bg-blue-500/5 dark:bg-blue-500/8 border-blue-500/10 dark:border-blue-500/20 text-blue-700 dark:text-blue-300",
    btnHover: "hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white hover:shadow-[0_10px_25px_rgba(37,99,235,0.25)] hover:border-blue-500/40"
  },
  {
    accent: "text-emerald-600 dark:text-emerald-400",
    badgeBg: "bg-emerald-500/8 dark:bg-emerald-500/12",
    badgeBorder: "border-emerald-500/15 dark:border-emerald-500/25",
    cardBorder: "border-emerald-500/35 dark:border-emerald-500/25",
    glowColor: "rgba(5, 150, 105, 0.15)",
    cardShadow: "hover:shadow-[0_20px_50px_rgba(5,150,105,0.18)] dark:hover:shadow-[0_30px_70px_rgba(5,150,105,0.3)]",
    tech: "bg-emerald-500/5 dark:bg-emerald-500/8 border-emerald-500/10 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    btnHover: "hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white hover:shadow-[0_10px_25px_rgba(5,150,105,0.25)] hover:border-emerald-500/40"
  },
  {
    accent: "text-red-600 dark:text-red-400",
    badgeBg: "bg-red-500/8 dark:bg-red-500/12",
    badgeBorder: "border-red-500/15 dark:border-red-500/25",
    cardBorder: "border-red-500/35 dark:border-red-500/25",
    glowColor: "rgba(220, 38, 38, 0.15)",
    cardShadow: "hover:shadow-[0_20px_50px_rgba(220,38,38,0.18)] dark:hover:shadow-[0_30px_70px_rgba(220,38,38,0.3)]",
    tech: "bg-red-500/5 dark:bg-red-500/8 border-red-500/10 dark:border-red-500/20 text-red-700 dark:text-red-300",
    btnHover: "hover:bg-red-600 dark:hover:bg-red-500 hover:text-white hover:shadow-[0_10px_25px_rgba(220,38,38,0.25)] hover:border-red-500/40"
  }
];

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  const t = useTranslations("home.projects");
  const locale = useLocale();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

    // قفل همزمان اسکرول تگ html و body با دستور قدرتمند setProperty و اولویت important برای مهار قطعی اسکرول پس‌زمینه
    document.documentElement.style.setProperty("overflow", "hidden", "important");
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

  // استخراج تم رنگی پروژه فعال بر اساس ایندکس آن
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
        
        {/* هاله‌ی نوری ظریف و اختصاصی تم پروژه در پس‌زمینه مودال جزئیات */}
        <div 
          className="absolute top-[10%] left-1/4 -z-10 h-[250px] w-[500px] rounded-full blur-[130px] opacity-40 pointer-events-none animate-pulse" 
          style={{ 
            backgroundColor: theme.glowColor,
            animationDuration: "10s"
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

        {/* هدر مودال مجهز به تراز رنگی اختصاصی تم فعال و انیمیشن‌های ورودی فوق‌العاده شیک */}
        <div
          className={`mb-10 border-b pb-6 ${isDarkMode ? "border-white/[0.06]" : "border-zinc-200"}`}
        >
          {/* انیمیشن ورود عنوان دسته‌بندی */}
          <motion.span
            initial={{ opacity: 0, x: locale === "fa" ? 15 : -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={["text-xs font-black uppercase tracking-wider block mb-2", theme.accent].join(" ")}
          >
            {pData.category}
          </motion.span>

          {/* انیمیشن ماسک سنیمایی اسلایدآپ نام پروژه (H2) */}
          <div className="overflow-hidden py-1">
            <motion.h2
              initial={{ filter: "blur(12px)", scale: 0.95, y: 15, opacity: 0 }}
              animate={{ filter: "blur(0px)", scale: 1, y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`text-3xl sm:text-5xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-zinc-900"}`}
            >
              {pData.title}
            </motion.h2>
          </div>

          {/* انیمیشن ورود اطلاعات کلاینت و سال و بومی‌سازی کامل برچسب‌های متادیتا */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className={[
              "mt-4 flex flex-wrap gap-3 items-center text-xs font-bold",
              locale === "fa" 
                ? "tracking-normal text-text-secondary" // استفاده از فونت اصلی ایران‌یکان با کنتراست عالی برای زبان فارسی
                : "font-mono tracking-wider text-zinc-400 dark:text-zinc-500" // حفظ فونت مونو با فواصل حروف مناسب برای انگلیسی
            ].join(" ")}
          >
            <span>{t("clientLabel")}{pData.client}</span>
            <span
              className={`h-1 w-1 rounded-full ${isDarkMode ? "bg-white/10" : "bg-zinc-300"}`}
            />
            <span>{t("yearLabel")}{project.year}</span>
          </motion.div>
        </div>

        {/* گالری تصاویر مجهز به مرزهای شیک و همگام با تم پروژه */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 mb-12 items-start">
          {/* تصویر موبایل */}
          <div
            onClick={() => setActiveLightboxImage(imgMobile)}
            className={[
              "md:col-span-4 aspect-[9/16] w-full rounded-2xl overflow-hidden border cursor-zoom-in pointer-events-auto",
              theme.badgeBorder,
              isDarkMode ? "bg-zinc-900" : "bg-zinc-100"
            ].join(" ")}
          >
            <img
              src={imgMobile}
              alt="Mobile View"
              className="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-700"
            />
          </div>

          <div className="md:col-span-8 flex flex-col gap-5 sm:gap-6 w-full">
            {/* تصویر دسکتاپ اصلی */}
            <div
              onClick={() => setActiveLightboxImage(img1)}
              className={[
                "aspect-video w-full rounded-2xl overflow-hidden border cursor-zoom-in pointer-events-auto",
                theme.badgeBorder,
                isDarkMode ? "bg-zinc-900" : "bg-zinc-100"
              ].join(" ")}
            >
              <img
                src={img1}
                alt="Desktop Main"
                className="w-full h-full object-cover object-top hover:scale-[1.01] transition-transform duration-700"
              />
            </div>

            {/* دو تصویر فرعی دسکتاپ */}
            <div className="grid grid-cols-2 gap-5 sm:gap-6 w-full">
              <div
                onClick={() => setActiveLightboxImage(img2)}
                className={[
                  "aspect-video w-full rounded-2xl overflow-hidden border cursor-zoom-in pointer-events-auto",
                  theme.badgeBorder,
                  isDarkMode ? "bg-zinc-900" : "bg-zinc-100"
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
                  isDarkMode ? "bg-zinc-900" : "bg-zinc-100"
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

        {/* چالش و راهکار */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 border-t pt-10 ${isDarkMode ? "border-white/[0.06]" : "border-zinc-200"}`}
        >
          <div className="space-y-4">
            <h3
              className={`text-lg sm:text-xl font-bold flex items-center gap-2 ${isDarkMode ? "text-zinc-100" : "text-zinc-900"}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              {locale === "fa" ? "چالش پروژه" : "The Challenge"}
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
              {locale === "fa" ? "راهکار توسعه" : "Our Solution"}
            </h3>
            <p
              className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              {pData.solution}
            </p>
          </div>
        </div>

        {/* فوتر مودال مجهز به تگ‌های رنگی هماهنگ و دکمه لینک پویای نئونی */}
        <div
          className={`mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t pt-8 ${isDarkMode ? "border-white/[0.06]" : "border-zinc-200"}`}
        >
          <div className="flex flex-wrap gap-2">
            {pData.technologies.map((tag, idx) => (
              <span
                key={idx}
                className={[
                  "font-mono text-xs px-3 py-1.5 rounded-xl border",
                  theme.tech
                ].join(" ")}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                className={["text-sm font-medium transition-colors cursor-pointer text-text-secondary", theme.accent].join(" ")}
              >
                {locale === "fa" ? "کد منبع" : "Source Code"}
              </Link>
            )}
            
            <Link
              href={pData.liveUrl}
              target="_blank"
              className={[
                "inline-flex items-center justify-center rounded-xl bg-foreground text-background px-6 py-3.5 text-xs sm:text-sm font-bold shadow-lg whitespace-nowrap cursor-pointer",
                "transition-all duration-300 ease-out",
                "gap-2 group/btn hover:gap-3.5 active:scale-95", 
                theme.btnHover 
              ].join(" ")}
            >
              {locale === "fa" ? "ورود به سایت زنده" : "Launch Live Site"}
              <span className={`text-base transition-transform duration-300 ${locale === "fa" ? "group-hover/btn:-translate-x-1.5 rotate-180" : "group-hover/btn:translate-x-1.5"}`}>
                →
              </span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* فراخوانی لایت‌باکس مستقل برای تصاویر فرعی گالری مودال */}
      <Lightbox src={activeLightboxImage} onClose={() => setActiveLightboxImage(null)} />
    </motion.div>,
    document.body
  );
}