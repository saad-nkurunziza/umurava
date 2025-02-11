import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

export default function ChallengeCard() {
  return (
    <Card className="p-2 overflow-hidden">
      <div className="relative w-full h-[199px] bg-primary rounded-lg mx-auto flex flex-col justify-center">
        <Badge className="absolute right-4 top-4 bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800">
          Open
        </Badge>
        <div className="text-lg text-primary-foreground text-center relative">
          Umurava
        </div>
      </div>
      <div className="flex flex-col gap-4 items-start mt-2 mx-auto p-2">
        <h3 className="font-semibold">Design a Dashboard for SokoFund</h3>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-col gap-1">
            <div className="text-xs font-medium text-foreground/95">
              Skills Needed:
            </div>

            <div className="flex gap-2 w-full">
              <Badge variant={"outline"}>UI/UX Design</Badge>
              <Badge variant={"outline"}>User Research</Badge>
            </div>
          </div>

          <div className="flex text-xs gap-2 text-muted-foreground">
            <span className=" font-medium text-foreground/95">
              Seniority Level:{" "}
            </span>
            <span>Junior</span>
          </div>
          <div className="flex text-xs  gap-2 text-muted-foreground">
            <span className="font-medium text-foreground/95">Timeline: </span>
            <span>30 days</span>
          </div>
        </div>
      </div>
      <div className="border-t pb-2 pt-3">
        <Button size={"sm"}>Vew Challenge</Button>
      </div>
    </Card>
  );
}
