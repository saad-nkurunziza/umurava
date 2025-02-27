import About from "./about";
import CTA from "./cta";
import { HeroSection } from "./hero";
import HowToGetStarted from "./how-to-get-started";
import MoreInfo from "./more-info";
import Programs from "./programs";
import { Skills } from "./skills";
import { Stats } from "./stats";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <div className="even-row">
        <About />
      </div>
      <Stats />
      <Skills />
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
