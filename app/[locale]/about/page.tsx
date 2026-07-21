import AboutHero from "@/components/about-hero";
import AboutMe from "@/components/about-me";
import AboutExperience from "@/components/about-experience";
import AboutSkills from "@/components/about-skills";
import AboutEducation from "@/components/about-education";
import AboutInterests from "@/components/about-interests";
import AboutGoals from "@/components/about-goals";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background-main pb-32 pt-28 sm:pt-36">
      
      <AboutHero />
      
      <div className="mx-auto max-w-5xl px-6 md:px-12 lg:px-16 flex flex-col gap-24 sm:gap-32">
        <AboutMe />
        <AboutExperience />
      </div>

      <AboutSkills />

      <div className="mx-auto max-w-5xl px-6 md:px-12 lg:px-16 flex flex-col gap-24 sm:gap-32">
        <AboutEducation />
        <AboutInterests />
        <AboutGoals />
      </div>

    </main>
  );
}