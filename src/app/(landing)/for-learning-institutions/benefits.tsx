import React from "react";
import { Button } from "@/components/ui/button";

import {
  GraduationCap,
  LightbulbIcon,
  Handshake,
  Users,
  LineChart,
} from "lucide-react";
import { SimpleTitle } from "@/components/landing/section-title";

const benefits = [
  {
    title: "Employability and Career Development Opportunities",
    description:
      "Unlock your talents' potential through learning and practical experience. Our challenges and projects provide opportunities for learners to showcase their skills, gain real-world experience and long-term access.",
    icon: GraduationCap,
  },
  {
    title: "Practical Application of Classroom Knowledge",
    description:
      "By using technology to help learners develop practical skills through real-world projects, we help them master concepts and gain hands-on experience.",
    icon: LightbulbIcon,
  },
  {
    title: "Students & Trainees Engagement",
    description:
      "Engage and encourage your students through practical and interactive learning experiences. Our challenges inspire learning through real-world projects, helping students build valuable skills for their future careers.",
    icon: Handshake,
  },
  {
    title: "Access to the Industry Experts & Mentors",
    description:
      "Skills Challenge opens students to industry experts and mentors who offer guidance, support, and insights on the state of digital careers. This will help students gain a better understanding of their chosen field.",
    icon: Users,
  },
  {
    title: "Skills Assessments",
    description:
      "Assess and evaluate talent skills and track development directly from our platform.",
    icon: LineChart,
  },
];

const Benefits = () => {
  return (
    <section>
      <SimpleTitle title="Key Offerings & Benefits:" />
      <div className="grid grid-cols-3 gap-6 mx-auto">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className={`p-8 rounded-xl bg-primary ${
              index === 3 ? "col-span-2" : ""
            }`}
          >
            <div className="flex flex-col gap-4">
              <Button size={"icon"} className="bg-primary-foreground">
                <benefit.icon className="w-5 h-5 text-primary" />
              </Button>
              <h3 className="text-2xl font-bold text-primary-foreground">
                {benefit.title}
              </h3>
              <p className="text-base text-primary-foreground/80 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
