import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Platform = () => {
  return (
    <section>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold mb-4 max-w-4xl">
            Skills Challenges Program is built on the Umurava Talent Marketplace
            Platform
          </h2>
          <p className="text-lg text-muted-foreground">
            A Project-based Learning Solution aimed at providing young and
            senior talents with an opportunity to showcase their skills to
            real-world projects and challenges from our partner companies and
            organizations.
          </p>
          <p className="text-lg text-muted-foreground">
            Umurava Skills Challenges enables young talents to build a portfolio
            and experience that increases their readiness to access job
            opportunities and projects.
          </p>
          <Button size={"lg"}>Get Started</Button>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg"
            alt="Platform screenshot"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Platform;
