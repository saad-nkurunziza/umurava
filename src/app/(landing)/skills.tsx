import React from "react";
import { SkillCard } from "../../components/landing/skill-card";
import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";
import SectionTitle from "../../components/landing/section-title";
import Image from "next/image";

const topSkills = [
  { text: "UI/UX Design", active: true },
  { text: "Data Science", active: false },
];

const skillsGrid = [
  { text: "Graphic Design" },
  { text: "Data Analysis & Research" },
  { text: "Animation" },
  { text: "Videography & Photography" },
  { text: "Data Science" },
  { text: "AI & Machine Learning" },
  { text: "Web3" },
  { text: "Digital Marketing & Communication" },
];

export const Skills = () => {
  return (
    <section>
      <SectionTitle
        title={
          "Skills Challenges Cover various in-demand skills and Careers for the digital economy"
        }
        subtitle="Explore the projects that various talents are working on."
      />

      <div className="flex flex-col w-full items-center gap-5 mt-32">
        <div className="inline-flex items-center gap-8 relative">
          {topSkills.map((skill, index) => (
            <SkillCard key={index} text={skill.text} active={skill.active} />
          ))}
        </div>

        <div className="flex max-w-[70%] flex-wrap justify-center gap-8 relative">
          {skillsGrid.map((skill, index) => (
            <SkillCard key={index} text={skill.text} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 bg-muted border mt-28 rounded px-8 py-16">
        <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col items-start gap-6 w-full">
            <div className="p-2 rounded bg-background text-muted-foreground shadow">
              <Briefcase className="w-8 h-8" />
            </div>
            <p className="font-light text-muted-foreground max-w-[60%] leading-[30px]">
              The Embedded Finance Platform and Payroll Management Software
              Solutions for your organization and Workforce.
            </p>
          </div>
          <Link
            href="#"
            className="flex items-center gap-2 text-primary-foreground "
          >
            <span className="text-primary">Learn more</span>
            <span className="flex items-center justify-center w-5 h-5 bg-primary text-foreground rounded-full">
              <ArrowRight className="w-4 h-4 text-primary-foreground" />
            </span>
          </Link>
        </div>
        <div className="relative p-2 bg-foreground w-full h-66 md:h-auto">
          <Image
            alt="Payroll dashboard"
            layout="fill"
            objectFit="cover"
            src={"/payroll.png"}
          />
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
};
