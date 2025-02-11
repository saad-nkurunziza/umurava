import React from "react";
import SectionTitle from "@/components/landing/section-title";
import { Button } from "../../components/ui/button";
import { Briefcase } from "lucide-react";

export default function About() {
  return (
    <section>
      <SectionTitle
        title="Experience a New Way of Building Work Experience"
        subtitle="Join Skills Challenges Program to accelerate your career growth and become part of Africa's largest workforce of digital professionals."
      />

      <div className="grid grid-cols-2 gap-6 mx-auto">
        <div className="p-8 col-span-2 bg-primary rounded-lg">
          <div className="flex flex-col gap-4">
            <Button size={"icon"} className="bg-background">
              <Briefcase className="w-5 h-5 text-primary" />
            </Button>
            <h3 className="text-2xl font-bold text-primary-foreground">
              Build a Strong Portfolio and Hand-On Experience
            </h3>
            <p className="text-base text-primary-foreground/80 leading-relaxed">
              Tackle real-world projects through challenges and hackathons that
              mirror real world challenges faced by businesses and
              organizations. Showcase your skills and accomplishments to
              potential employers and clients through a portfolio of completed
              projects.
            </p>
          </div>
        </div>
        <div className="p-8 bg-primary rounded-lg">
          <div className="flex flex-col gap-4">
            <Button size={"icon"} className="bg-background">
              <Briefcase className="w-5 h-5 text-primary" />
            </Button>
            <h3 className="text-2xl font-bold text-primary-foreground">
              Enhance Your Employment Path
            </h3>
            <p className="text-base text-primary-foreground/80 leading-relaxed">
              Develop the in-demand skills and build a strong portfolio to
              increase your chances of landing your dream job or contract.
            </p>
          </div>
        </div>
        <div className="p-8 bg-primary rounded-lg">
          <div className="flex flex-col gap-4">
            <Button size={"icon"} className="bg-background">
              <Briefcase className="w-5 h-5 text-primary" />
            </Button>
            <h3 className="text-2xl font-bold text-primary-foreground tracking-tight">
              Earn Recognition and Prizes
            </h3>
            <p className="text-base text-primary-foreground/80 leading-6">
              Earn both Money and Knowledge Prizes by participating in various
              contests and competitions by working on real world projects and
              hackathons from our partner companies & organizations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
