"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Project, ProjectLangData } from "@/constants/projects";
import Link from "next/link";

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

    document.body.style.overflow = "hidden";

    return () => {
      observer.disconnect();
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

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

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 backdrop-blur-xl transition-colors duration-500 ${
        isDarkMode ? "bg-black/75" : "bg-zinc-900/25"
      }`}
    >
      {/* لایه کلیک بیرونی */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* باکس اصلی مودال با اصلاح رنگ دارک و اسکرول‌بار فوق مینیمال داخلی */}
      <div
        className={`relative w-full max-w-6xl h-[85vh] rounded-[2.5rem] overflow-y-auto p-6 sm:p-10 md:p-12 transition-all duration-300 animate-in fade-in zoom-in-95 border shadow-[0_50px_100px_rgba(0,0,0,0.5)] ${
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
        {/* دکمه بستن مدرن و شیک */}
        <button
          onClick={onClose}
          className={`absolute top-6 ${locale === "fa" ? "left-6" : "right-6"} z-20 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 active:scale-90 ${
            isDarkMode
              ? "border-white/[0.08] bg-white/[0.03] text-zinc-300 hover:bg-white hover:text-black"
              : "border-zinc-200 bg-zinc-100 text-zinc-700 hover:bg-zinc-900 hover:text-white"
          }`}
        >
          ✕
        </button>

        {/* هدر مودال */}
        <div
          className={`mb-10 border-b pb-6 ${isDarkMode ? "border-white/[0.06]" : "border-zinc-200"}`}
        >
          <span
            className={`text-xs font-black uppercase tracking-wider block mb-2 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}
          >
            {pData.category}
          </span>
          <h2
            className={`text-3xl sm:text-5xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-zinc-900"}`}
          >
            {pData.title}
          </h2>
          <div
            className={`mt-4 flex flex-wrap gap-3 items-center text-xs font-mono ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}
          >
            <span>CLIENT: {pData.client}</span>
            <span
              className={`h-1 w-1 rounded-full ${isDarkMode ? "bg-white/10" : "bg-zinc-300"}`}
            />
            <span>YEAR: {project.year}</span>
          </div>
        </div>

        {/* گالری تصاویر با تراز هندسی و قفل بر اساس نسبت‌های 16:9 و 9:16 واقعی */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 mb-12 items-start">
          {/* تصویر عمودی موبایل - کاملاً هماهنگ با نسبت 9:16 */}
          <div
            className={`md:col-span-4 aspect-[9/16] w-full rounded-2xl overflow-hidden border ${
              isDarkMode
                ? "border-white/[0.06] bg-zinc-900"
                : "border-zinc-200 bg-zinc-100"
            }`}
          >
            <img
              src={imgMobile}
              alt="Mobile View"
              className="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-700"
            />
          </div>

          {/* تصاویر افقی دسکتاپ - کاملاً قفل روی نسبت سنمایی 16:9 (Aspect Video) */}
          <div className="md:col-span-8 flex flex-col gap-5 sm:gap-6 w-full">
            {/* تصویر اصلی دسکتاپ */}
            <div
              className={`aspect-video w-full rounded-2xl overflow-hidden border ${
                isDarkMode
                  ? "border-white/[0.06] bg-zinc-900"
                  : "border-zinc-200 bg-zinc-100"
              }`}
            >
              <img
                src={img1}
                alt="Desktop Main"
                className="w-full h-full object-cover object-top hover:scale-[1.01] transition-transform duration-700"
              />
            </div>

            {/* دو تصویر فرعی دسکتاپ در کنار هم با رعایت نسبت ویدیو */}
            <div className="grid grid-cols-2 gap-5 sm:gap-6 w-full">
              <div
                className={`aspect-video w-full rounded-2xl overflow-hidden border ${
                  isDarkMode
                    ? "border-white/[0.06] bg-zinc-900"
                    : "border-zinc-200 bg-zinc-100"
                }`}
              >
                <img
                  src={img2}
                  alt="Desktop Sub 1"
                  className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
              <div
                className={`aspect-video w-full rounded-2xl overflow-hidden border ${
                  isDarkMode
                    ? "border-white/[0.06] bg-zinc-900"
                    : "border-zinc-200 bg-zinc-100"
                }`}
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

        {/* فوتر مودال */}
        <div
          className={`mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t pt-8 ${isDarkMode ? "border-white/[0.06]" : "border-zinc-200"}`}
        >
          <div className="flex flex-wrap gap-2">
            {pData.technologies.map((tag, idx) => (
              <span
                key={idx}
                className={`font-mono text-xs px-3 py-1.5 rounded-xl border ${
                  isDarkMode
                    ? "bg-white/[0.02] border-white/[0.06] text-zinc-400"
                    : "bg-zinc-100 border-zinc-200 text-zinc-600"
                }`}
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
                className={`text-sm font-medium transition-colors ${
                  isDarkMode
                    ? "text-zinc-400 hover:text-white"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {locale === "fa" ? "کد منبع" : "Source Code"}
              </Link>
            )}
            <Link
              href={pData.liveUrl}
              target="_blank"
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-xs sm:text-sm font-bold transition-all duration-300 active:scale-95 shadow-lg ${
                isDarkMode
                  ? "bg-white text-black hover:bg-zinc-100"
                  : "bg-zinc-900 text-white hover:bg-zinc-800"
              }`}
            >
              {locale === "fa" ? "ورود به سایت زنده" : "Launch Live Site"}
              <span className={locale === "fa" ? "rotate-180" : ""}>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
