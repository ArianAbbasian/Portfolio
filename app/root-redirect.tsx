"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RootRedirect() {
  useEffect(() => {
    window.location.replace("/fa/");
  }, []);

  return (
    <>
      <noscript>
        <meta httpEquiv="refresh" content="0;url=/fa/" />
      </noscript>

      <div
        dir="rtl"
        className="font-fa fixed inset-0 z-[9999] flex items-center justify-center bg-background-main"
      >
        {/* subtle background glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[100px]" />

        <div className="relative flex flex-col items-center gap-8 px-6 text-center">
          {/* Monogram with spinning rings */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative flex h-28 w-28 items-center justify-center"
          >
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent border-r-accent/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <motion.span
              className="absolute inset-3 rounded-full border border-border/50"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            />
            <motion.span
              className="absolute inset-6 rounded-full bg-accent/10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
            />
            <span className="relative text-4xl font-black tracking-tight text-accent">
              AA
            </span>
          </motion.div>

          {/* Text and animated dots */}
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-xl font-bold text-text-primary"
            >
              در حال انتقال به صفحه اصلی
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-1.5"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-2 w-2 rounded-full bg-accent"
                  animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Fallback link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/fa/"
              className="text-sm font-bold text-text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              رفتن به صفحه اصلی
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
