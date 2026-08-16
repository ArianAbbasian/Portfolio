import AboutHero from "@/components/about-hero";
import AboutMe from "@/components/about-me";
import AboutExperience from "@/components/about-experience";
import AboutSkills from "@/components/about-skills";
import AboutEducation from "@/components/about-education";
import AboutArticles from "@/components/about-articles";
import AboutInterests from "@/components/about-interests";
import AboutGoals from "@/components/about-goals";

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