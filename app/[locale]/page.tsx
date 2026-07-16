import Hero from "@/components/hero";
import ProjectsHeader from "@/components/projects-header"; // وارد کردن هدر جدید
import ProjectsList from "@/components/projects-list";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background-main pb-24">
      {/* ۱. بخش هیرو و وضعیت زنده */}
      <Hero />
      
      {/* ۲. بخش هدر زیبای جداکننده پروژه‌ها */}
      <ProjectsHeader />
      
      {/* ۳. بخش کارت‌های لوکس پروژه‌ها (اسکرول افقی تعاملی) */}
      <ProjectsList />
    </main>
  );
}