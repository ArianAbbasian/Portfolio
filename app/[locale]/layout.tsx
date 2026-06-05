import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Header } from '@/components/header';
import '../globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

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
      className={`${geistSans.variable} ${geistMono.variable}`}
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