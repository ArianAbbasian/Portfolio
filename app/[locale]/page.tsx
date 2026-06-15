import Hero from "@/components/hero";
import ProjectsList from "@/components/projects-list";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background-main pb-24">
      {/* بخش هیرو و وضعیت NDA */}
      <Hero />
      
      {/* بخش کارت‌های لوکس پروژه‌ها */}
      <ProjectsList />
    </main>
  );
}