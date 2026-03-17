import HeroSection from "@/components/HeroSection";
import BiodataSection from "@/components/BiodataSection";
import CalendarSection from "@/components/CalendarSection";
import ContentSection from "@/components/ContentSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <BiodataSection />
      <CalendarSection />
      <ContentSection />
    </div>
  );
};

export default Index;
