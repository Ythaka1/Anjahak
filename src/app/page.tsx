import Hero from "@/components/sections/Hero";
import Ribbon from "@/components/sections/Ribbon";
import Statement from "@/components/sections/Statement";
import Manifest from "@/components/sections/Manifest";
import Stats from "@/components/sections/Stats";
import Provenance from "@/components/sections/Provenance";
import Voices from "@/components/sections/Voices";
import FeedbackSection from "@/components/sections/FeedbackSection";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Ribbon />
      <Statement />
      <Manifest />
      <Stats />
      <Provenance />
      <Voices />
      <FeedbackSection />
      <CTA />
    </main>
  );
}
