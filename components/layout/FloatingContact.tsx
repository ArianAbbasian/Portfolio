"use client";

import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatingContact() {
  const t = useTranslations("floatingContact");

  const scrollToContact = () => {
    const footer = document.getElementById("contact");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={scrollToContact}
      className="fixed bottom-6 end-6 z-50 flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(0,122,255,0.3)] transition-colors hover:bg-accent-hover hover:shadow-[0_14px_35px_rgba(0,122,255,0.4)] active:scale-95"
    >
      <MessageCircle size={18} strokeWidth={2.2} />
      <span>{t("label")}</span>
    </motion.button>
  );
}