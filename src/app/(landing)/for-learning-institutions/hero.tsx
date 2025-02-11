import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Hero = () => {
  return (
    <section>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h1 className="text-4xl text-primary font-bold tracking-tight">
            Accelerate Your Students and Trainees Employability and Career
            Growth through Project-based Learning Solution
          </h1>
          <p className="text-lg text-muted-foreground">
            We partner with Universities, Schools, and Training institutions to
            build the next generation of the workforce through project-based
            learning, skills challenges and hackathons
          </p>
          <Button size="lg">Partner with us</Button>
        </div>
        <AspectRatio className="bg-primary rounded-lg h-[400px]">
          <Image
            src="/students-laughing.png"
            alt="Photo by Drew Beamer"
            fill
            className="h-full w-full rounded-md object-cover"
          />
        </AspectRatio>
      </div>
    </section>
  );
};

export default Hero;
