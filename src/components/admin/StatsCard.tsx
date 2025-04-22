import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  iconColor: string;
}

export function StatsCard({
  icon: Icon,
  label,
  value,
  iconColor,
}: StatsCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-6">
        <Icon className={`w-8 h-8 ${iconColor}`} />
        <div>
          <p className="text-sm text-foreground/70">{label}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}
