import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Providers } from "@/components/layout/Providers";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeInitializer } from "@/components/layout/ThemeInitializer";
import { CustomCursor } from "@/components/layout/CustomCursor";
import LocaleHtml from "@/components/layout/LocaleHtml";
import StructuredData from "@/components/structured-data";

const locales = ["en", "fa"];

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

  return (
    <>
      <LocaleHtml locale={locale} />
      <ThemeInitializer />
      <StructuredData locale={locale} />

      <NextIntlClientProvider locale={locale} messages={messages}>
        <Providers>
          <CustomCursor />
          <Header />
          <div className="overflow-x-hidden w-full relative min-h-screen flex flex-col">
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </NextIntlClientProvider>
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fa" }];
}
