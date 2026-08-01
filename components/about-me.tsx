"use html";
"use client";

import { useTranslations, useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMe() {
  const t = useTranslations("about");
  const locale = useLocale();

  const triggerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [isBroken, setIsBroken] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // رصد ابعاد مانیتور کلاینت
  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // اجرای افکت پین مطلق سرتاسری و حرکت افقی روان
  useEffect(() => {
    if (!isDesktop) return;

    const mm = gsap.matchMedia();
    const isRTL = locale === "fa";

    const getScrollAmount = () => {
      return textRef.current!.scrollWidth - window.innerWidth;
    };

    const endX = () => {
      const amount = getScrollAmount();
      return isRTL ? amount : -amount;
    };

    mm.add("(min-width: 1024px)", () => {
      const scrollTween = gsap.fromTo(
        textRef.current,
        { x: 0 },
        {
          x: endX,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current, // تریگر کانتینر اصلی
            pin: pinRef.current, // پین شدن مستقیم خودِ کامپوننت ریشه برای مهار و قفل ۱۰۰٪ اسکرول پنجره
            scrub: 0.5,
            start: "top top",
            end: "bottom bottom", // آزادسازی کامل و unpin شدن دقیقاً در انتهای کانتینر در CSS
            invalidateOnRefresh: true,
          },
        },
      );

      return () => {
        scrollTween.scrollTrigger?.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, [locale, isDesktop]);

  const isRTL = locale === "fa";

  // متدهای همزمان برای تغییر شیب عمودی و انحراف افقی هر ۴ لایه بر اساس لول شکست
  const getVerticalShift = (level: number) => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      if (breakLevel >= level) return level * 140; // فاصله ۱۴۰ پیکسلی بین هر خط در دسکتاپ
    }
    return 0;
  };

  const getHorizontalShift = (level: number) => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      if (breakLevel >= level) return isRTL ? level * 100 : level * -100; // انحراف افقی مینی‌مال برای تراز شدن پله‌ای زیر هم
    }
    return 0;
  };

  // مانیتورینگ لول شکست خطوط بر اساس پیشرفت اسکرول
  const [breakLevel, setBreakLevel] = useState(0);

  useEffect(() => {
    if (!isDesktop) return;

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        if (progress < 0.25) {
          setBreakLevel(0); // همه در یک خط
        } else if (progress >= 0.25 && progress < 0.5) {
          setBreakLevel(1); // شکست اول
        } else if (progress >= 0.5 && progress < 0.72) {
          setBreakLevel(2); // شکست دوم
        } else {
          setBreakLevel(3); // شکست سوم
        }
      },
    });

    return () => {
      scrollTriggerInstance.kill();
    };
  }, [isDesktop]);

  return (
    // کانتینر اصلی با ارتفاع 300vh جهت تامین فضای اسکرول افقی ملو و استاندارد روی دسکتاپ
    <div
      ref={triggerRef}
      className="relative w-full h-auto lg:h-[300vh] bg-background-main overflow-hidden"
      style={{ direction: "ltr" }}
    >
      {/* کانتینر پنجره h-screen (دارای رفرنس تایید شده‌ی pinRef) که به سقف قفل می‌شود */}
      <div
        ref={pinRef}
        className="w-full h-auto lg:h-screen flex flex-col justify-between py-12 md:py-16 select-none relative"
      >
        {/* هاله‌ی نوری پس‌زمینه */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[300px] w-[600px] rounded-full bg-accent/5 blur-[120px] opacity-70 pointer-events-none" />

        {/* ۱. هدر بالای اسکرولر */}
        <div className="mx-auto max-w-5xl w-full px-6 md:px-12 lg:px-16 flex items-center justify-between text-[11px] font-sans text-text-muted font-bold tracking-widest uppercase">
          <span>01 // {t("sections.aboutMe")}</span>
          <span>[ STATUS: ACTIVE_DEVELOPER ]</span>
        </div>

        {/* ۲. بخش بدنه متن غول‌آسا مجهز به انیمیشن شکستگی خطوط ۳ مرحله‌ای و تغییر ویژگی به overflow-visible جهت نمایش کامل حروف */}
        <div className="w-full overflow-visible my-auto py-16 relative">
          <div
            ref={textRef}
            className={[
              "whitespace-nowrap text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black tracking-tight text-text-primary uppercase leading-none flex items-center gap-6 sm:gap-10",
              isRTL
                ? "pr-6 sm:pr-12 lg:pr-16 pl-[35vw]"
                : "pl-6 sm:pl-12 lg:pl-16 pr-[35vw]",
            ].join(" ")}
            style={{ direction: locale === "fa" ? "rtl" : "ltr" }}
          >
            {/* ─── اسلاید اول (جمله اول) ─── */}
            <div
              className="w-screen h-full shrink-0 flex items-center justify-center px-6 md:px-16 lg:px-24 whitespace-normal text-center sm:text-start"
              style={{ direction: isRTL ? "rtl" : "ltr" }}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.2rem] font-black tracking-tight text-text-primary uppercase leading-tight max-w-5xl">
                {isRTL ? (
                  <>
                    <span>من آرین هستم، دانشجوی مهندسی </span>
                    نرم‌افزار
                    <span>. طراح و توسعه‌دهنده </span>
                    <span className="bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent px-1 font-black">
                      وبسایت
                    </span>
                    <span>.</span>
                  </>
                ) : (
                  <>
                    <span>
                      Hey, I'm Arian, a Software Engineering student and{" "}
                    </span>
                    <span className="bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent px-1 font-black">
                      Web Developer
                    </span>
                    <span>.</span>
                  </>
                )}
              </div>
            </div>

            {/* ─── اسلاید دوم (جمله دوم) ─── */}
            <div
              className="w-screen h-full shrink-0 flex items-center justify-center px-6 md:px-16 lg:px-24 whitespace-normal text-center sm:text-start"
              style={{ direction: isRTL ? "rtl" : "ltr" }}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.2rem] font-black tracking-tight text-text-primary uppercase leading-tight max-w-5xl">
                {isRTL ? (
                  <>
                    <span>من عاشق حل مسئله و ساخت تجربه‌های </span>
                    <span className="bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent px-1 font-black">
                      دیجیتالی
                    </span>
                    <span> هستم که فقط خوب به نظر نرسند،</span>
                  </>
                ) : (
                  <>
                    <span>I love solving problems and building </span>
                    <span className="bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent px-1 font-black">
                      digital experiences
                    </span>
                    <span> that look great,</span>
                  </>
                )}
              </div>
            </div>

            {/* ─── اسلاید سوم (جمله سوم) ─── */}
            <div
              className="w-screen h-full shrink-0 flex items-center justify-center px-6 md:px-16 lg:px-24 whitespace-normal text-center sm:text-start"
              style={{ direction: isRTL ? "rtl" : "ltr" }}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.2rem] font-black tracking-tight text-text-primary uppercase leading-tight max-w-5xl">
                {isRTL ? (
                  <>
                    <span>بلکه واقعاً برای کاربران و کسب‌وکارها </span>
                    <span className="bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent px-1 font-black">
                      ارزش
                    </span>
                    <span> ایجاد کنند.</span>
                  </>
                ) : (
                  <>
                    <span>feel right, and actually bring </span>
                    <span className="bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent px-1 font-black">
                      value
                    </span>
                    <span> to users and businesses.</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ۳. خط تراز نوری و فوتر پایین اسکرولر */}
        <div className="mx-auto max-w-5xl w-full px-6 md:px-12 lg:px-16 flex flex-col gap-6">
          <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="flex items-center justify-between text-[10px] font-sans text-text-muted font-bold tracking-widest uppercase opacity-60"></div>
        </div>
      </div>
    </div>
  );
}
