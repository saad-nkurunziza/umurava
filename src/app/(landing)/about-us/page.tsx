import Hero from "./hero";
import Problem from "./problem";
import Platform from "./platform";

export default function About() {
  return (
    <main>
      {/* Hero Section */}
      <Hero />

      {/* Problem Section */}
      <div className="even-row">
        <Problem />
      </div>

      {/* Platform Section */}
      <Platform />
    </main>
  );
}
