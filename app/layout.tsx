import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import localFont from 'next/font/local';
import { Providers } from '@/components/providers';
import { Header } from '@/components/header';
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
});

const iranYekan = localFont({
  src: [
    { path: '../../public/fonts/IranYekan/iranyekanwebregular.woff', weight: '400' },
    { path: '../../public/fonts/IranYekan/iranyekanwebmedium.woff', weight: '500' },
    { path: '../../public/fonts/IranYekan/iranyekanwebbold.woff', weight: '700' },
    { path: '../../public/fonts/IranYekan/iranyekanwebextrabold.woff', weight: '800' },
  ],
  variable: '--font-iran-yekan',
  display: 'swap',
});

const locales = ['en', 'fa'];

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale)) notFound();

  const messages = (await import(`../../messages/${locale}.json`)).default;
  const dir = locale === 'fa' ? 'rtl' : 'ltr';

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${satoshi.variable} ${iranYekan.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            <main className="pt-16">
              {children}
            </main>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}