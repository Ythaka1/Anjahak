import Hero from "@/components/sections/Hero";
import AboutTeaser from "@/components/sections/AboutTeaser";
import HorizontalProductScroll from "@/components/sections/HorizontalProductScroll";
import ProductsPreview from "@/components/sections/ProductsPreview";
import StatsBand from "@/components/sections/StatsBand";
import QualitySection from "@/components/sections/QualitySection";
import Testimonials from "@/components/sections/Testimonials";
import FeedbackSection from "@/components/sections/FeedbackSection";
import CTABanner from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutTeaser />
      <HorizontalProductScroll />
      <ProductsPreview />
      <StatsBand />
      <QualitySection />
      <Testimonials />
      <FeedbackSection />
      <CTABanner />
    </main>
  );
}
