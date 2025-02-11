import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-12 backdrop-blur-lg">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-start text-start">
          <Skeleton className="h-8 w-[120px]" />
          <Skeleton className="h-5 w-[250px] mt-3" />
        </div>
        <div className="flex flex-col gap-6 mt-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}
