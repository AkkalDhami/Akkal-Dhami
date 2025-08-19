
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Edit, Trash2 } from "lucide-react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";



export const EducationCard = ({ education, onEdit, onDelete }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{education.degree}</CardTitle>
            <CardDescription className="text-base font-medium text-foreground">
              {education.institution}
            </CardDescription>
            <p className="text-sm text-muted-foreground mt-1">
              {education.startDate} - {education.endDate}
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
