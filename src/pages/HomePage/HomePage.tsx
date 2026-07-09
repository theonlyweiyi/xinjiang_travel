import { Toaster } from '@/components/ui/sonner';
import NavbarSection from './sections/NavbarSection';
import HeroSection from './sections/HeroSection';
import OverviewSection from './sections/OverviewSection';
import ItinerarySection from './sections/ItinerarySection';
import TipsSection from './sections/TipsSection';
import PracticalInfoSection from './sections/PracticalInfoSection';
import FooterSection from './sections/FooterSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" />
      <NavbarSection />
      <main className="space-y-0">
        <HeroSection />
        <OverviewSection />
        <ItinerarySection />
        <PracticalInfoSection />
        <TipsSection />
        <FooterSection />
      </main>
    </div>
  );
}
