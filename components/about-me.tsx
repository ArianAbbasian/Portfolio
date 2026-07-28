"use html";
"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";

export default function AboutMe() {
  const t = useTranslations("about");
  const locale = useLocale();

  // افکت رندر مه‌آلود نئونی برای ظهور لوکس کلمات
  const textVariants = {
    hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] }
    })
  };

  // افکت ترسیم لیزری خطوط تراز افقی
  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: (delay: number) => ({
      scaleX: 1,
      opacity: 1,
      transition: { duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <section className="relative px-6 md:px-12 lg:px-16 py-0 select-none">
      <div className="mx-auto max-w-5xl flex flex-col gap-12 sm:gap-16">
        
        {/* ۱. خط تراز نوری بالا با انیمیشن ترسیم لیزری سنکرون از مرکز */}
        <motion.div 
          custom={0}
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full max-w-md h-[1.5px] bg-gradient-to-r from-transparent via-border to-transparent origin-center"
        />

        {/* گرید ۲ ستونه‌ی فوق‌العاده خلوت و مینی‌مال */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-16 items-start"
        >
          
          {/* ستون اول: معرفی عمیق و یک پاراگراف کوتاه دو جمله‌ای با افکت مه‌آلود تدریجی */}
          <div className="md:col-span-7 flex flex-col gap-6">
            <motion.h2 
              custom={0.1}
              variants={textVariants}
              className="text-xl sm:text-2xl font-black text-text-primary"
            >
              {t("bioHeadline")}
            </motion.h2>
            <div className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium">
              <motion.p custom={0.25} variants={textVariants}>
                {t("bioPara1")}
              </motion.p>
            </div>
          </div>

          {/* ستون دوم: مکمل یک جمله‌ای با خط نوری پایینی */}
          <div className="md:col-span-5 flex flex-col gap-10 md:pt-16">
            <div className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium">
              <motion.p custom={0.35} variants={textVariants}>
                {t("bioPara2")}
              </motion.p>
            </div>

            {/* خط تراز نوری پایین لایوت با افکت ترسیم لیزری از مرکز به طرفین */}
            <motion.div 
              custom={0.45}
              variants={lineVariants}
              className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-border to-transparent origin-center"
            />
          </div>

        </motion.div>

      </div>
    </section>
  );
}