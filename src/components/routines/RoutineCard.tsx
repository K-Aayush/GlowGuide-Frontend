import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Edit, Trash2 } from "lucide-react";
import { RoutineData } from "../../lib/types";

interface RoutineCardProps {
  routine: RoutineData;
  onDelete: (id: string) => void;
}

export default function RoutineCard({ routine, onDelete }: RoutineCardProps) {
  const getRoutineImage = (type: string) => {
    if (type.toLowerCase().includes("morning")) {
      return "https://images.pexels.com/photos/3807330/pexels-photo-3807330.jpeg";
    } else if (type.toLowerCase().includes("night")) {
      return "https://images.pexels.com/photos/3373738/pexels-photo-3373738.jpeg";
    } else if (type.toLowerCase().includes("weekly")) {
      return "https://images.pexels.com/photos/3373716/pexels-photo-3373716.jpeg";
    } else {
      return "https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg";
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(routine.id);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-video bg-muted">
        <img
          src={getRoutineImage(routine.type)}
          alt={routine.name}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <span className="px-2 py-1 text-xs text-white rounded-full bg-primary/90">
            {routine.type}
          </span>
        </div>
      </div>

      <CardHeader className="py-4">
        <CardTitle className="text-lg">{routine.name}</CardTitle>
      </CardHeader>

      <CardContent className="py-0">
        <p className="text-sm text-foreground/70">
          {routine.steps.length} {routine.steps.length === 1 ? "step" : "steps"}
        </p>
      </CardContent>

      <CardFooter className="flex justify-between py-4">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/user/routines/${routine.id}`}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Link>
        </Button>
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
