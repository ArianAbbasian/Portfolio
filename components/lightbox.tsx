"use html";
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface LightboxProps {
  src: string | null;
  onClose: () => void;
}

export default function Lightbox({ src, onClose }: LightboxProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // قفل همزمان اسکرول تگ html و body در زمان باز شدن لایت‌باکس
  useEffect(() => {
    if (src) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [src]);

  if (!src || !mounted) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 backdrop-blur-2xl transition-all duration-500 animate-in fade-in cursor-zoom-out"
      onClick={onClose}
      style={{ transform: "translate3d(0, 0, 10000px)" }} 
    >
      {/* 
        دکمه بستن فوق‌العاده هوشمند همگام با تم روشن و تاریک:
        در تم روشن: ضربدر مشکی است و در هاور پس‌زمینه مشکی و ضربدر سفید می‌شود.
        در تم تاریک: ضربدر سفید است و در هاور پس‌زمینه سفید و ضربدر مشکی می‌شود.
      */}
      <button 
        className="absolute top-6 right-6 z-[100000] flex h-10 w-10 items-center justify-center rounded-full border border-border bg-black/5 dark:bg-white/5 text-text-primary hover:bg-text-primary hover:text-background transition-all duration-300 cursor-pointer shadow-lg"
        onClick={onClose}
      >
        ✕
      </button>
         
      <img 
        src={src} 
        alt="Full Screen Preview" 
        className="max-w-full max-h-[80vh] rounded-xl object-contain shadow-2xl cursor-default"
        onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن در زمان کلیک روی خود عکس
      />
    </div>,
    document.body
  );
}