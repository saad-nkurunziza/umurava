import { Play } from "lucide-react";
import { Card } from "../ui/card";

const TestimonialCard = () => {
  return (
    <Card className="flex-none w-[30%] min-w-[300px] p-3 rounded-lg text-center relative">
      <div className="mb-5 bg-primary w-full h-48 flex justify-center items-center">
        <div className="mx-auto bg-background/30 p-3 rounded-full">
          <Play className="w-6 h-6 fill-primary-foreground text-primary-foreground" />
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <div className="w-9 h-9 bg-primary rounded-full overflow-hidden" />
        <div className="flex flex-col text-start">
          <span className="font-medium">Manzi Jack</span>
          <span className="text-sm font-medium text-muted-foreground">
            Product Designer, Kigali
          </span>
        </div>
      </div>
    </Card>
  );
};

export default TestimonialCard;
