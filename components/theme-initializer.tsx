"use html";
"use client";

import { useServerInsertedHTML } from "next/navigation";

export function ThemeInitializer() {
  // تزریق تم استاتیک در زمان ساخت صفحات (SSG) بدون ایجاد رندر سمت کلاینت ری‌اکت
  useServerInsertedHTML(() => {
    return (
      <script
        id="theme-initializer"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var stored = localStorage.getItem('theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                var theme = stored || (prefersDark ? 'dark' : 'light');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            })();
          `,
        }}
      />
    );
  });

  return null;
}