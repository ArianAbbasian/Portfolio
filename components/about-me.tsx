"use client";

import { useTranslations, useLocale } from "next-intl";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMe() {
  const t = useTranslations("about");
  const locale = useLocale();

  const triggerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // اجرای انیمیشن پین و اسکرول افقی روی تمامی ابعاد نمایشگرها (شامل موبایل و تبلت)
  useEffect(() => {
    const isRTL = locale === "fa";

    const getScrollAmount = () => {
      if (!textRef.current) return 0;
      return textRef.current.scrollWidth - window.innerWidth;
    };

    const endX = () => {
      const amount = getScrollAmount();
      return isRTL ? amount : -amount;
    };

    const scrollTween = gsap.fromTo(
      textRef.current,
      { x: 0 },
      {
        x: endX,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: pinRef.current,
          scrub: 0.5,
          start: "top top",
          end: "bottom bottom",
          invalidateOnRefresh: true,
        },
      }
    );

    return () => {
      scrollTween.scrollTrigger?.kill();
    };
  }, [locale]);

  const isRTL = locale === "fa";

  return (
    /* کانتینر اصلی با ارتفاع 300vh جهت تامین فضای اسکرول افقی روی تمام دستگاه‌ها */
    <div
      ref={triggerRef}
      className="relative w-full h-[300vh] bg-background-main overflow-hidden"
      style={{ direction: "ltr" }}
    >
      {/* کانتینر h-screen که به سقف قفل می‌شود */}
      <div
        ref={pinRef}
        className="w-full h-screen flex flex-col justify-between py-10 md:py-16 select-none relative"
      >
        {/* هاله‌ی نوری پس‌زمینه */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[300px] w-[600px] rounded-full bg-accent/5 blur-[120px] opacity-70 pointer-events-none" />

        {/* ۱. هدر بالای اسکرولر */}
        <div className="mx-auto max-w-5xl w-full px-6 md:px-12 lg:px-16 flex items-center justify-between text-[10px] sm:text-[11px] font-sans text-text-muted font-bold tracking-widest uppercase">
          <span>01 // {t("sections.aboutMe")}</span>
          <span>[ STATUS: ACTIVE_DEVELOPER ]</span>
        </div>

        {/* ۲. بدنه متن اسلایدها */}
        <div className="w-full overflow-visible my-auto py-8 sm:py-16 relative">
          <div
            ref={textRef}
            className="whitespace-nowrap text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black tracking-tight text-text-primary uppercase leading-none flex items-center gap-6 sm:gap-10"
            style={{ direction: locale === "fa" ? "rtl" : "ltr" }}
          >
            {/* ─── اسلاید اول (جمله اول) ─── */}
            <div
              className="w-screen h-full shrink-0 flex items-center justify-center px-6 md:px-16 lg:px-24 whitespace-normal text-center sm:text-start"
              style={{ direction: isRTL ? "rtl" : "ltr" }}
            >
              <div className="text-2xl sm:text-4xl md:text-5xl lg:text-[4.2rem] font-black tracking-tight text-text-primary uppercase leading-tight max-w-5xl">
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
              <div className="text-2xl sm:text-4xl md:text-5xl lg:text-[4.2rem] font-black tracking-tight text-text-primary uppercase leading-tight max-w-5xl">
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
              <div className="text-2xl sm:text-4xl md:text-5xl lg:text-[4.2rem] font-black tracking-tight text-text-primary uppercase leading-tight max-w-5xl">
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