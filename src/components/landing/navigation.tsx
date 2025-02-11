import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

import Nav from "./nav";
import Link from "next/link";

const Navigation = () => {
  return (
    <div className="flex h-24 items-center justify-between py-4 container mx-auto px-4 md:px-6 lg:px-8 max-w-[1280px]">
      <Link href="/">
        <Image
          className="relative"
          width={125}
          height={24}
          alt="Umurava logo"
          src={"/logo.png"}
        />
      </Link>
      <Nav />

      <div className="hidden relative sm:flex flex-[0_0_auto] ">
        <Button asChild>
          <Link href="/dashboard">Join the Program</Link>
        </Button>
      </div>
    </div>
  );
};

export default Navigation;
