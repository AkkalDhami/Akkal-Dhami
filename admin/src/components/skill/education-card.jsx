import { MoreHorizontal } from "lucide-react";
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

import { dateFormater } from "../../utils/dateFormater";
import { FaRegBuilding } from "react-icons/fa";

export const EducationCard = ({ education, onEdit, onDelete }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-1 sm:gap-2">
              <GraduationCap className="h-5 sm:h-6 w-5 sm:w-6" />
              <h2 className="text-lg sm:text-xl">{education.degree}</h2>
            </CardTitle>
            <CardDescription className="text-base flex items-center gap-2 mt-2 font-medium text-foreground">
              <FaRegBuilding className={"font-bold"} />
              <h3>{education.institution}</h3>
            </CardDescription>
            <p className="text-sm text-muted-foreground mt-1.5">
              {dateFormater(education.startDate)} -{" "}
              {dateFormater(education.endDate)}
            </p>
          </div>
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
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{education.description}</p>
      </CardContent>
    </Card>
  );
};
