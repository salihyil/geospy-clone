import AnimatedMain from "@/app/(public)/_components/AnimatedMain";
import ArticlesSection from "@/app/(public)/_components/ArticlesSection";
import ContactSection from "@/app/(public)/_components/ContactSection";
import ContentSection from "@/app/(public)/_components/ContentSection";
import FeaturesSection from "@/app/(public)/_components/FeaturesSection";
import HeroSection from "@/app/(public)/_components/HeroSection";
import { PromotionalBaner } from "@/app/(public)/_components/PromotionalBaner";

export default function Home() {
  return (
    <div className="container relative pb-16 pt-20">
      <AnimatedMain>
        <HeroSection />
        <ContactSection />
        <FeaturesSection />
        <PromotionalBaner />
        <ContentSection />
        <ArticlesSection />
      </AnimatedMain>
    </div>
  );
}
