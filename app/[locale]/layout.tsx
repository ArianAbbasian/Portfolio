import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import localFont from 'next/font/local';
import { Providers } from '@/components/providers';
import { Header } from '@/components/header';
import Footer from "@/components/footer";
import { ThemeInitializer } from '@/components/theme-initializer';
import Script from 'next/script';
import '../globals.css';

const satoshi = localFont({
  src: [
    { path: '../../public/fonts/Satoshi/Satoshi-Regular.woff2', weight: '400' },
    { path: '../../public/fonts/Satoshi/Satoshi-Medium.woff2', weight: '500' },
    { path: '../../public/fonts/Satoshi/Satoshi-Bold.woff2', weight: '700' },
    { path: '../../public/fonts/Satoshi/Satoshi-Black.woff2', weight: '900' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
  preload: false,
});

const iranYekan = localFont({
  src: [
    { path: '../../public/fonts/IranYekan/iranyekanwebregular.woff', weight: '400' },
    { path: '../../public/fonts/IranYekan/iranyekanwebmedium.woff', weight: '500' },
    { path: '../../public/fonts/IranYekan/iranyekanwebbold.woff',   weight: '700' },
    { path: '../../public/fonts/IranYekan/iranyekanwebextrabold.woff', weight: '800' },
  ],
  variable: '--font-iran-yekan',
  display: 'swap',
  preload: false,
});

const locales = ['en', 'fa'];

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {

  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  const fontClass = locale === "fa" ? iranYekan.className : satoshi.className;

  return (
    <html 
      lang={locale} 
      dir={locale === "fa" ? "rtl" : "ltr"} 
      data-scroll-behavior="smooth" 
      suppressHydrationWarning
    >
      <body className={`${satoshi.variable} ${iranYekan.variable} ${fontClass} bg-background-main text-text-primary antialiased selection:bg-accent-primary/30`}>
        
        {/* اجرای اسکریپت تمساز */}
        <ThemeInitializer />

        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            
            {/* ۱. هدر در بالاترین لایه رندر می‌شود تا کاملاً مستقل و فیکس به سقف بچسبد */}
            <Header />

            {/* ۲. کانتینر همه‌منظوره ضد اسکرول افقی مخصوص سیستم‌عامل iOS و اندروید */}
            <div className="overflow-x-hidden w-full relative min-h-screen flex flex-col">
              <main className="flex-grow">
                {children}
              </main>
              {/* فوتر نیز در لایه ضد اسکرول قرار می‌گیرد تا هاله‌های نوری آن صفحه را عریض نکنند */}
              <Footer />
            </div>

          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}