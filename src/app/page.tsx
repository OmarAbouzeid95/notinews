import Section from "@/components/common/Section";
import Hero from "@/components/home/Hero";
import StepsSection from "@/components/home/StepsSection";
import CategoriesSection from "@/components/home/CategoriesSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Section
        title="How It Works"
        subHeading="Stay informed in just three simple steps—no sign-ups, no logins, just great news delivered straight to your inbox"
        className="bg-secondary">
        <StepsSection />
      </Section>
      <Section
        title="What Interests You?"
        subHeading="Choose the categories you care about, and we'll curate the best stories for you.">
        <CategoriesSection />
      </Section>
    </>
  );
}
