import React from "react";
import SectionTitle from "../../components/landing/section-title";
import TestimonialCard from "../../components/landing/testimonial-card";

export default function Programs() {
  return (
    <section>
      <SectionTitle
        aside
        title="Users are in Love with Skills Challenges Program"
        subtitle="See what our clients say about working with us. Their success speaks for our dedication and expertise."
      />
      <div className="overflow-x-hidden">
        <div className="flex flex-nowrap py-4 gap-x-6">
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
        </div>
      </div>
      <div className="flex items-center gap-2.5 justify-center mx-auto mt-8">
        <div className="bg-muted/80 relative w-2 h-2 rounded-full" />
        <div className="bg-muted/80 relative w-2 h-2 rounded-full" />
        <div className="bg-primary relative w-2 h-2 rounded-full" />
        <div className="bg-muted/80 relative w-2 h-2 rounded-full" />
      </div>
    </section>
  );
}
