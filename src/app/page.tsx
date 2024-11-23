import Section from "@/components/common/Section";
import Hero from "@/components/home/Hero";
import StepsSection from "@/components/home/StepsSection";

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
    </>
  );
}
