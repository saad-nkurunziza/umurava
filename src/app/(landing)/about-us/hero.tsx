import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-xl sm:text-4xl font-bold mb-8 text-primary">
            Our Story
          </h1>
          <p className="sm:text-lg text-muted-foreground">
            With 3 years of experience matching African digital talents to local
            and global job markets, many remain with a big number of jobs that
            remain unfilled due to the lack of experienced African Talents.
          </p>
          <p className="sm:text-lg text-muted-foreground">
            Driven by our mission to place skilled and professional digital
            talent, we created Skills Challenges as a project-based learning
            solution for talents to gain real-world experience, solve problems,
            and build portfolios so that they become ready for global job
            markets.
          </p>
        </div>
        <div className="relative h-[300px] rounded-lg overflow-hidden">
          <Image
            src="/students-laughing.png"
            alt="Umurava Skills Challenges"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
