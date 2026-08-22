import { siteConfig } from "@/lib/site-config";

interface StructuredDataProps {
  locale: string;
}

export default function StructuredData({ locale }: StructuredDataProps) {
  const isFa = locale === "fa";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    alternateName: siteConfig.nameFa,
    url: siteConfig.url,
    jobTitle: isFa ? "توسعه‌دهنده فرانت‌اند" : "Frontend Developer",
    description: isFa ? siteConfig.descriptionFa : siteConfig.description,
    knowsLanguage: ["en", "fa"],
    sameAs: [siteConfig.socials.linkedin, siteConfig.socials.github],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "business",
      email: "arianabbasian013@gmail.com",
      url: siteConfig.url,
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: isFa
      ? "وب‌سایت شخصی آرین عباسیان"
      : "Arian Abbasian Personal Website",
    url: siteConfig.url,
    inLanguage: locale,
    author: {
      "@id": `${siteConfig.url}/#person`,
    },
  };

  const personWithId = {
    ...personSchema,
    "@id": `${siteConfig.url}/#person`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personWithId) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}