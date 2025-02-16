import React from "react";
import { Button } from "@/components/ui/button";
import { getImageProps } from "next/image";

const Platform = () => {
  const common = { alt: "Platform challenges", fill: true };
  const {
    props: { srcSet: dark },
  } = getImageProps({ ...common, src: "/challenges-dark.png" });
  const {
    props: { srcSet: light, ...rest },
  } = getImageProps({ ...common, src: "/challenges-light.png" });
  return (
    <section>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h2 className="text-xl sm:text-4xl font-bold mb-4 max-w-4xl">
            Skills Challenges Program is built on the Umurava Talent Marketplace
            Platform
          </h2>
          <p className="sm:text-lg text-muted-foreground">
            A Project-based Learning Solution aimed at providing young and
            senior talents with an opportunity to showcase their skills to
            real-world projects and challenges from our partner companies and
            organizations.
          </p>
          <p className="sm:text-lg text-muted-foreground">
            Umurava Skills Challenges enables young talents to build a portfolio
            and experience that increases their readiness to access job
            opportunities and projects.
          </p>
          <Button size={"lg"}>Get Started</Button>
        </div>
        <div className="relative rounded-lg overflow-hidden">
          <picture>
            <source media="(prefers-color-scheme: dark)" srcSet={dark} />
            <source media="(prefers-color-scheme: light)" srcSet={light} />
            <img {...rest} />
          </picture>
        </div>
      </div>
    </section>
  );
};

export default Platform;
