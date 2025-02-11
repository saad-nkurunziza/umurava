import React from "react";
import SectionTitle from "../../components/landing/section-title";
import ChallengeCard from "../../components/landing/challenge-card";
import { Button } from "../../components/ui/button";
// h-[1030px]
const ExploreChallenges = () => {
  return (
    <section>
      <SectionTitle
        title="Explore Challenges & Hackathons"
        subtitle="Join Skills Challenges Program to accelerate your career growth and become part of Africa’s largest workforce of digital professionals."
      />

      <div className="flex flex-col sm:flex-row justify-center gap-3 w-full mx-auto">
        <ChallengeCard />
        <ChallengeCard />
        <ChallengeCard />
      </div>
      <div className="flex mt-12 justify-center">
        <Button variant={"outline"}>View More</Button>
      </div>
    </section>
  );
};

export default ExploreChallenges;
