import React from "react";
import { Button } from "@/components/ui/button";

import { GraduationCap, Globe, Briefcase } from "lucide-react";
import { SimpleTitle } from "@/components/landing/section-title";

const problems = [
  {
    title: "Bridging the Experience Gap",
    description:
      "Many talented individuals possess theoretical knowledge but are rejected from jobs because they lack work experience and struggle to apply their academic learning in practical settings.",
    icon: GraduationCap,
  },
  {
    title: "Bridging Education and Employment",
    description:
      "Traditional education often falls short in preparing talents for the demands of the tech and digital economy, leaving many graduates struggling to meet industry challenges.",
    icon: Briefcase,
  },
  {
    title: "Preparing Talents for Global Job Markets",
    description:
      "We are committed to helping African talents excel globally by equipping them with international technical experience and practical skills needed in today's market.",
    icon: Globe,
  },
];

const Problem = () => {
  return (
    <section>
      <SimpleTitle title="Why we are solving this problem" />
      <div className="grid grid-cols-2 gap-6 mx-auto">
        {problems.map((problem, index) => (
          <div
            key={index}
            className={`p-8 ${
              index === 0 ? "col-span-2" : ""
            } bg-primary rounded-lg`}
          >
            <div className="flex flex-col gap-4">
              <Button size={"icon"} className="bg-background">
                <problem.icon className="w-5 h-5 text-primary" />
              </Button>
              <h3 className="text-2xl font-bold text-primary-foreground">
                {problem.title}
              </h3>
              <p className="text-base text-primary-foreground/80 leading-relaxed">
                {problem.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Problem;
