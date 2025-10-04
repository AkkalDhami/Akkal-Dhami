import * as MdIcons from "react-icons/md";

import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Edit, Trash2 } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import * as Icons from "react-icons/si";

export const SkillCard = ({ skill, onEdit, onDelete, fromResume = false }) => {
  const IconComponent = Icons[skill.icon?.component];

  return (
    <div className="group relative p-4 bg-background/50 border-zinc-500/30 border rounded-lg hover:shadow-md transition-all  duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${skill.icon?.color}20` }}>
            {IconComponent ? (
              <IconComponent
                className="h-6 w-6"
                style={{ color: skill?.icon?.color }}
              />
            ) : null}
          </div>
          <div>
            <h4 className="font-semibold">{skill.name}</h4>
            <p className="text-sm text-muted-foreground">{skill.description}</p>
          </div>
        </div>
        {!fromResume && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(skill)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(skill)}
                className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
    </div>
  );
};
