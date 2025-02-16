"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProgramCard from "./program-card";

export interface ProgramTypes {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
}

const programs: ProgramTypes[] = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "CEO, TechCorp",
    content:
      "This product has revolutionized our workflow. Highly recommended!",
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=AliceJohnson",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Marketing Director, InnovateCo",
    content: "The customer support is outstanding. They go above and beyond.",
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=BobSmith",
  },
  {
    id: 3,
    name: "Carol Williams",
    role: "Freelance Designer",
    content:
      "As a designer, I appreciate the attention to detail in this product.",
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=CarolWilliams",
  },
  {
    id: 4,
    name: "David Brown",
    role: "CTO, StartupX",
    content:
      "The scalability of this solution is impressive. It grows with our needs.",
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=DavidBrown",
  },
  {
    id: 5,
    name: "Eva Martinez",
    role: "Small Business Owner",
    content:
      "This tool has saved me countless hours. It's a game-changer for small businesses.",
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=EvaMartinez",
  },
  {
    id: 6,
    name: "Frank Lee",
    role: "Project Manager, BigCorp",
    content:
      "The integration capabilities are seamless. It fits perfectly into our tech stack.",
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=FrankLee",
  },
  {
    id: 7,
    name: "Grace Taylor",
    role: "UX Researcher",
    content:
      "From a UX perspective, this product is intuitive and user-friendly.",
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=GraceTaylor",
  },
  {
    id: 8,
    name: "Henry Wilson",
    role: "E-commerce Specialist",
    content:
      "Our online sales have increased significantly since implementing this solution.",
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=HenryWilson",
  },
  {
    id: 9,
    name: "Ivy Chen",
    role: "Data Analyst",
    content:
      "The data insights provided are invaluable for our decision-making process.",
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=IvyChen",
  },
];

export default function ProgramCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel setApi={setApi} className="w-full">
      <div className="">
        <CarouselContent className="space-x-2">
          {programs.map((program) => (
            <CarouselItem
              key={program.id}
              className="md:basis-1/2 lg:basis-1/4"
            >
              <ProgramCard program={program} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-center mt-8 gap-4">
          <CarouselPrevious
            variant="outline"
            size="icon"
            className="relative left-0 right-0 top-0 translate-y-0 h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </CarouselPrevious>

          <div className="flex space-x-2">
            {programs.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className={`w-2 h-2 rounded-full p-0 ${
                  index === current ? "bg-primary" : "bg-gray-300"
                }`}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>

          <CarouselNext
            variant="outline"
            size="icon"
            className="relative left-0 right-0 top-0 translate-y-0 h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </CarouselNext>
        </div>
      </div>
    </Carousel>
  );
}
