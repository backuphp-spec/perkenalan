import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import AudioToggle from '@/components/AudioToggle';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import HobiSection from '@/components/sections/HobiSection';
import TargetSection from '@/components/sections/TargetSection';
import CampaignSection from '@/components/sections/CampaignSection';
import JJSection from '@/components/sections/JJSection';
import PenutupSection from '@/components/sections/PenutupSection';

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <AudioToggle />
      <Navigation />
      <main className="relative w-full overflow-x-hidden">
        <HeroSection />
        <HobiSection />
        <TargetSection />
        <CampaignSection />
        <JJSection />
        <PenutupSection />
      </main>
    </SmoothScroll>
  );
}
