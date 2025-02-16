import { Play } from "lucide-react";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProgramTypes } from "./program-carousel";

const ProgramCard = ({ program }: { program: ProgramTypes }) => {
  return (
    <Card className="flex-none w-[30%] min-w-[300px] p-3 rounded-lg text-center relative">
      <div className="mb-5 bg-primary w-full h-48 flex justify-center items-center">
        <div className="mx-auto bg-background/30 p-3 rounded-full">
          <Play className="w-6 h-6 fill-primary-foreground text-primary-foreground" />
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Avatar>
          <AvatarImage src={program.image || "/gg.png"} />
          <AvatarFallback>{(program.name ?? "").charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-start">
          <span className="font-medium">{program.name}</span>
          <span className="text-sm font-medium text-muted-foreground">
            {program.role}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ProgramCard;
