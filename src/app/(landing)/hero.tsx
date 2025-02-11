import React from "react";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import PeopleBox from "@/components/landing/people-box";
import HeroAvatarImage from "@/components/landing/hero-image";

export const HeroSection = () => {
  return (
    <section className="sm:min-h-[85vh]">
      <div className="grid gap-16 sm:grid-cols-2 relative">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <h1 className="text-xl sm:text-4xl text-primary font-bold tracking-tight">
              Build Work Experience through Skills Challenges Program
            </h1>
            <p className="sm:text-lg text-muted-foreground">
              Enhance your Employability and Accelerate your Career Growth by
              working on Hands-on projects & hackathons from various businesses
              & organizations.
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              size="lg"
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors"
            >
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 translate-x-[160%] z-50 translate-y-1/2">
          <PeopleBox />
        </div>
        <div className="relative overflow-hidden">
          <div className="relative w-full h-full flex flex-col sm:flex-row gap-4">
            <HeroAvatarImage align="left">
              <Image
                src="/hero-1.png"
                alt="Photo by Drew Beamer"
                fill
                className="h-full w-full rounded-md object-cover"
              />
            </HeroAvatarImage>
            <HeroAvatarImage align="right">
              <Image
                src="/youth.png"
                alt="Photo by Drew Beamer"
                fill
                className="h-full w-full rounded-md object-cover"
              />
            </HeroAvatarImage>
          </div>
        </div>
      </div>
    </section>
  );
};
