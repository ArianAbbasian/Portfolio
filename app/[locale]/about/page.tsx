import AboutHero from "@/components/about-hero";
import AboutMe from "@/components/about-me";
import AboutExperience from "@/components/about-experience";
import AboutSkills from "@/components/about-skills";
import AboutEducation from "@/components/about-education";
import AboutInterests from "@/components/about-interests";
import AboutGoals from "@/components/about-goals";

export default function AboutPage() {
  return (
    // تغییر لایوت به block و حذف flex-col تداخل‌آمیز با GSAP
    <main className="min-h-screen bg-background-main pb-32 pt-16 sm:pt-24 block relative">
      
      {/* هدر بزرگ درباره من به سبک Perry Wang */}
      <AboutHero />

      {/* متن بیوگرافی غول‌آسای اسکرول‌محور افقی (قفل شدن کامل صفحه و ۳ اسلاید افقی مستقل) */}
      <AboutMe />

      {/* سوابق شغلی ۳ گانه با فاصله تراز شده مستقل */}
      <div className="py-20">
        <AboutExperience />
      </div>

      {/* بخش مهارتی پین اسکرول تعاملی */}
      <AboutSkills />

      {/* بخش تحصیلات آکادمیک */}
      <div className="py-20">
        <AboutEducation />
      </div>

      {/* بخش علاقه‌مندی‌ها */}
      <div className="py-20">
        <AboutInterests />
      </div>

      {/* بخش اهداف آینده */}
      <div className="py-20">
        <AboutGoals />
      </div>

    </main>
  );
}