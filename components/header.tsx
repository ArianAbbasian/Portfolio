'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/providers';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLocale = () => {
    const newLocale = locale === 'en' ? 'fa' : 'en';
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/') || '/');
  };

  const isActive = (href: string) => {
    const full = href === '' ? `/${locale}` : `/${locale}${href}`;
    return pathname === full;
  };

  const navItems = [
    { href: '', label: t('work') },
    { href: '/about', label: t('about') },
  ];

  return (
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <header
        className={`
          pointer-events-auto w-full max-w-[850px] h-[56px] rounded-full 
          flex items-center justify-between px-3 gap-2 
          bg-[var(--header-bg)] shadow-[var(--header-shadow)]
          backdrop-blur-3xl backdrop-saturate-200 border border-white/10 dark:border-white/5
          transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${scrolled ? 'scale-[0.98] shadow-lg' : 'scale-100'}
        `}
      >
        {/* ۱. بخش اسم (لوگوتایپ) */}
        <div className="flex-1 flex items-center pl-2 rtl:pr-2">
          <Link href={`/${locale}`} className="text-sm font-bold tracking-wide text-[var(--text-primary)] hover:opacity-80 transition-opacity">
            {locale === 'en' ? 'Arian Abbasian' : 'آرین عباسیان'}
          </Link>
        </div>

        {/* ۲. بخش نویگیشن (وسط) */}
        <nav className="flex-shrink-0 flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-full border border-black/5 dark:border-white/5">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className={`
                  px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                  ${
                    active
                      ? 'text-[var(--text-primary)] bg-white/60 dark:bg-white/10 shadow-sm backdrop-blur-md border border-black/5 dark:border-white/10'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5'
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* ۳. بخش دکمه‌های کنترل (راست) - استایل Ultra Glass iOS */}
        <div className="flex-1 flex items-center justify-end gap-2 pr-1 rtl:pl-1">
          <button
            onClick={switchLocale}
            className="
              h-9 px-3 rounded-full text-xs font-bold tracking-widest
              text-[var(--text-secondary)] 
              bg-white/40 dark:bg-white/5 
              backdrop-blur-xl backdrop-saturate-150
              border border-white/50 dark:border-white/10 shadow-sm
              transition-all duration-300 cursor-pointer
              hover:text-[var(--text-primary)] hover:bg-white/60 dark:hover:bg-white/10 hover:scale-105 active:scale-95
            "
          >
            {locale === 'en' ? 'FA' : 'EN'}
          </button>

          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            aria-label="toggle theme"
            className="
              w-9 h-9 flex items-center justify-center rounded-full
              text-[var(--text-secondary)] 
              bg-white/40 dark:bg-white/5 
              backdrop-blur-xl backdrop-saturate-150
              border border-white/50 dark:border-white/10 shadow-sm
              transition-all duration-300 cursor-pointer
              hover:text-[var(--text-primary)] hover:bg-white/60 dark:hover:bg-white/10 hover:scale-105 active:scale-95
            "
          >
            {mounted && (
              resolvedTheme === 'dark' ? (
                <Sun className="w-4 h-4" strokeWidth={2.5} />
              ) : (
                <Moon className="w-4 h-4" strokeWidth={2.5} />
              )
            )}
          </button>
        </div>
      </header>
    </div>
  );
}
