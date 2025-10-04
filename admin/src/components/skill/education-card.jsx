import { MapPin, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Edit, Trash2, GraduationCap } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

import { Badge } from "../ui/badge";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { dateFormater } from "../../utils/dateFormater";
import { FaRegBuilding } from "react-icons/fa";

export const EducationCard = ({ education, onEdit, onDelete, fromResume }) => {
  return (
    <Card className="bg-background/50 border-zinc-500/30 border rounded-lg hover:shadow-md transition-all relative duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex gap-1 sm:gap-2">
              <GraduationCap className="h-5 sm:h-6 w-5 mb-1 sm:w-6" />
              <h2 className="text-lg sm:text-xl">{education.degree}</h2>
            </CardTitle>
            <CardDescription className="text-base flex items-center justify-between flex-wrap gap-2 mt-2 font-medium text-foreground">
              <div className="text-base flex items-center gap-2 font-medium text-foreground">
                <FaRegBuilding className={"font-bold mb-1"} />
                <h3>{education.institution}</h3>
              </div>
              {education.gpa && (
                <Badge className="bg-transparent hover:bg-transparent text-foreground rounded-md text-xs font-medium border border-muted-foreground">
                  GPA: {education?.gpa || "N/A"} / 4.00
                </Badge>
              )}
            </CardDescription>
            <p className="text-sm font-semibold text-muted-foreground mt-1.5">
              {dateFormater(education.startDate)} -{" "}
              {dateFormater(education.endDate)}
            </p>
            {education.location && (
              <p className="text-sm flex items-center gap-2 font-medium text-muted-foreground mt-2">
                <MapPin className="mb-1 h-4 w-4" /> {education.location}
              </p>
            )}
          </div>
          {!fromResume && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(education)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(education)}
                  className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{education.description}</p>
      </CardContent>
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
    </Card>
  );
};
