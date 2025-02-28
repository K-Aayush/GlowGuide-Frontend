import { DivideIcon as LucideIcon } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <Card>
      <CardHeader>
        <Icon className="w-10 h-10 mb-2" />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
