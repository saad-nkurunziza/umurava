import { Card } from "./ui/card";
import { ReactNode } from "react";

interface StatsCardProps {
  label: string;
  value: number | string;
  icon: ReactNode;
}

export function StatCard({ label, value, icon }: StatsCardProps) {
  return (
    <Card key={label} className="py-6 px-8">
      <div className="flex justify-between">
        <div className="space-y-2">
          <p className="text-lg font-semibold tracking-tight">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
        <div className={``}>{icon}</div>
      </div>
    </Card>
  );
}
