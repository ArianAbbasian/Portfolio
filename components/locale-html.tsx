"use client";

import { useEffect } from "react";

interface LocaleHtmlProps {
  locale: string;
}

export default function LocaleHtml({ locale }: LocaleHtmlProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
  }, [locale]);

  return null;
}