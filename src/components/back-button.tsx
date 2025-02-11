"use client";
import React from "react";
import { Home } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} className="">
      <Home className="w-4 h-4 mr-2" />
      Go to Challenges
    </Button>
  );
};

export default BackButton;
