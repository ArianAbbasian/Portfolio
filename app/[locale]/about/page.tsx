import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import AboutHero from "@/components/about-hero";
import AboutMe from "@/components/about-me";
import AboutExperience from "@/components/about-experience";
import AboutSkills from "@/components/about-skills";
import AboutEducation from "@/components/about-education";
import AboutArticles from "@/components/about-articles";
import AboutInterests from "@/components/about-interests";
import AboutGoals from "@/components/about-goals";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const isFa = locale === "fa";
  const title = isFa ? "درباره من | آرین عباسیان" : "About | Arian Abbasian";
  const description = isFa ? t("description") : t("description");

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        en: "/en/about",
        fa: "/fa/about",
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/about`,
      locale: isFa ? "fa_IR" : "en_US",
      alternateLocale: isFa ? "en_US" : "fa_IR",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background-main pb-32 pt-16 sm:pt-24 block relative">
      <AboutHero />
      <AboutMe />
      <div className="py-20">
        <AboutExperience />
      </div>
      <AboutSkills />
      <div className="py-20">
        <AboutEducation />
      </div>
      <div className="py-20">
        <AboutArticles />
      </div>
      <div className="py-20">
        <AboutInterests />
      </div>
      <div className="py-20">
        <AboutGoals />
      </div>
    </main>
  );
}
