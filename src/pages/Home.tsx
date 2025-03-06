import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import CTASection from "../components/landing/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 mx-4 md:mx-16">
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
}
