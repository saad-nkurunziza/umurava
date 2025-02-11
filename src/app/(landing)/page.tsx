import About from "@/app/(landing)/about";
import CTA from "@/app/(landing)/cta";
import ExploreChallenges from "@/app/(landing)/explore-challenges";
import { HeroSection } from "@/app/(landing)/hero";
import HowToGetStarted from "@/app/(landing)/how-to-get-started";
import MoreInfo from "@/app/(landing)/more-info";
import Programs from "@/app/(landing)/programs";
import { Skills } from "@/app/(landing)/skills";
import { Stats } from "@/app/(landing)/stats";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <div className="even-row">
        <About />
      </div>
      <Stats />
      <Skills />
      <ExploreChallenges />
      <div className="even-row">
        <MoreInfo />
      </div>
      <Programs />
      <div className="even-row">
        <HowToGetStarted />
      </div>
      <CTA />
    </main>
  );
}
