import React from "react";
import Image from "next/image";
import { SimpleTitle } from "@/components/landing/section-title";

const integrationItems = [
  {
    id: 1,
    text: "As Career Development and Job Readiness Program",
  },
  {
    id: 2,
    text: "As Skills Assessment Method after a Course or a term",
  },
  {
    id: 3,
    text: "As extracurricular activities to complement academic courses",
  },
  {
    id: 4,
    text: "As the portfolio of the Students",
  },
  {
    id: 5,
    text: "As part of Capstone Projects or final-year assignments",
  },
];

const Integration = () => {
  return (
    <section>
      <SimpleTitle
        title="How Skills Challenges Program can Be Integrated into your Learning
        Institution"
      />

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <ul className="space-y-4">
            {integrationItems.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                  {item.id}
                </div>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg"
            alt="Platform integration"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Integration;
