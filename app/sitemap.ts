import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = siteConfig.url;

    const locales = ['en', 'fa'];
    const pages = [
        { path: '', changeFrequency: 'weekly', priority: 1.0 },
        { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
    ];

    const entries: MetadataRoute.Sitemap = [];

    for (const locale of locales) {
        for (const page of pages) {
            entries.push({
                url: `${baseUrl}/${locale}${page.path}`,
                lastModified: new Date(),
                changeFrequency: page.changeFrequency as 'weekly' | 'monthly',
                priority: page.priority,
                alternates: {
                    languages: {
                        en: `${baseUrl}/en${page.path}`,
                        fa: `${baseUrl}/fa${page.path}`,
                    },
                },
            });
        }
    }

    return entries;
}