import { getTranslations } from 'next-intl/server';

export default async function AboutPage() {
  const t = await getTranslations('about');
  return (
    <section className="min-h-screen p-8 md:p-16 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
        {t('title')}
      </h1>
      <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-xl">
        {t('description')}
      </p>
    </section>
  );
}