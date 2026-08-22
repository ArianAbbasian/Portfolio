import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import ProjectsHeader from "@/components/home/ProjectsHeader";
import ProjectsList from "@/components/home/ProjectsList";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  const isFa = locale === "fa";
  const title = isFa
    ? "آرین عباسیان | طراح وب‌سایت و توسعه‌دهنده فرانت‌اند"
    : "Arian Abbasian | Frontend Developer";
  const description = isFa ? t("hero.subtitle") : t("hero.subtitle");

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fa: "/fa",
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      locale: isFa ? "fa_IR" : "en_US",
      alternateLocale: isFa ? "en_US" : "fa_IR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background-main pb-24">
      <Hero />
      <Services />
      <ProjectsHeader />
      <ProjectsList />
    </main>
  );
}
