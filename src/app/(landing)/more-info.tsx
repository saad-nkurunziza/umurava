import React from "react";
import SectionTitle from "@/components/landing/section-title";
import { Briefcase } from "lucide-react";
import { ThemeImage } from "@/components/theme-image";

const features = [
  {
    title: "Enhance Your Employment Path",
    description:
      "Network with other talented individuals and learn from their experiences",
    icon: Briefcase,
  },
  {
    title: "Earn Recognition and Prizes",
    description:
      "Gain valuable experience and knowledge to advance your career in the digital economy",
    icon: Briefcase,
  },
  {
    title: "Personal Growth",
    description:
      "Challenge yourself, learn new skills, and expand your professional network",
    icon: Briefcase,
  },
  {
    title: "Learn from Industry Experts",
    description:
      "Access valuable insights and guidance from experienced professionals in the digital careers fields",
    icon: Briefcase,
  },
];

export default function MoreInfo() {
  return (
    <section>
      <SectionTitle
        title="What else can I gain from participating in Skills Challenges?"
        subtitle="Join Skills Challenges Program to accelerate your career growth and become part of Africa's largest workforce of digital professionals."
      />
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="sm:col-span-2 grid sm:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col gap-3">
              <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-base font-bold tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="relative w-full h-full rounded-3xl overflow-hidden">
          <ThemeImage
            alt="Dashboard page"
            srcDark="/dashboard-dark.png"
            srcLight="/dashboard-light.png"
            fill
          />
        </div>
      </div>
    </section>
  );
}
