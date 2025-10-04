import {
  Briefcase,
  Calendar,
  ChevronDown,
  ChevronUp,
  MapPin,
  MoreHorizontal,
  Star,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Edit, Trash2 } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import { useState } from "react";

export const ExperienceCard = ({
  experience,
  onEdit,
  onDelete,
  fromResume = false,
}) => {
  const [expandedSections, setExpandedSections] = useState({});
  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };
  return (
    <Card className="bg-background/50 gap-4 border-zinc-500/30 border rounded-lg hover:shadow-md transition-all relative duration-200">
      <CardContent>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">{experience.position}</h3>

            <h3 className="text-base mb-3.5 flex items-center gap-2 font-medium text-foreground">
              <Briefcase className="h-4 w-4" />
              <span className="font-semibold ">{experience.company}</span>
            </h3>

            <div className="flex font-semibold items-center justify-between space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 mb-0.5" />
                {format(experience.startDate, "MMMM yyyy")} -{" "}
                {format(experience.endDate, "MMMM yyyy") || "Present"}
              </div>
              {experience.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 mb-0.5" />
                  {experience.location}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center flex-col gap-1 mt-2 lg:mt-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleSection(`exp-${experience._id}`)}
              className="mt-2 lg:mt-0">
              {expandedSections[`exp-${experience._id}`] ? (
                <ChevronUp />
              ) : (
                <ChevronDown />
              )}
            </Button>
            {!fromResume && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(experience)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDelete(experience)}
                    className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        {experience.description && (
          <p className="text-sm text-muted-foreground mb-4">
            {experience.description}
          </p>
        )}
        {expandedSections[`exp-${experience._id}`] && (
          <div className="space-y-4 animate-fade-in">
            {experience.achievements.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Key Achievements:
                </h4>
                <ul className="space-y-2">
                  {experience.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <Star className="h-4 w-4 text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {experience.technologies.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Technologies:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-transparent hover:bg-transparent text-foreground border border-zinc-500/70 rounded-md text-sm font-medium ">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
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
