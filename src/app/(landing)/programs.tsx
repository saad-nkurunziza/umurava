import React from "react";
import SectionTitle from "../../components/landing/section-title";
import ProgramCarousel from "@/components/landing/program-carousel";

export default function Programs() {
  return (
    <section>
      <SectionTitle
        aside
        title="Users are in Love with Skills Challenges Program"
        subtitle="See what our clients say about working with us. Their success speaks for our dedication and expertise."
      />
      <ProgramCarousel />
    </section>
  );
}
