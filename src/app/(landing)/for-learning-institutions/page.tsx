import Hero from "./hero";
import Benefits from "./benefits";
import Partners from "./partners";
import Integration from "./integration";
import CTA from "./cta";

export default function LearningInstitutions() {
  return (
    <main>
      <Hero />
      <div className="even-row">
        {" "}
        <Benefits />
      </div>

      <Partners />
      <div className="even-row">
        <Integration />
      </div>
      <CTA />
    </main>
  );
}
