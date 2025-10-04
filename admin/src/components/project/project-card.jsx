import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { TechIcon } from "../../pages/Projects";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  ExternalLink,
  Github,
} from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const ProjectCard = ({
  project = {},
  handleEditProject = () => {},
  handleDeleteProject = () => {},
  fromResume = false,
}) => {
  return (
    <>
      <Card className="group relative border bg-transparent py-0 shadow-sm hover:shadow-xl transition-all">
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <img
            src={project.thumbnail?.url || project.images[0]?.url}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
              {project.title}
            </h3>
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
                  <DropdownMenuItem onClick={() => handleEditProject(project)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDeleteProject(project)}
                    className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <Badge
                key={tech._id}
                variant="outline"
                className="text-xs px-2 py-1 bg-secondary/5 border-secondary/20 hover:bg-secondary/10 transition-colors">
                {TechIcon(tech.icon)}
                <span
                  className={`ml-1 text-[16px]`}
                  style={{ color: tech?.icon?.color }}>
                  {tech.name}
                </span>
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center gap-2">
              {project.liveUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="h-8 px-3 text-xs">
                  <Link
                    to={project.liveUrl}
                    target="_blank"
                    className="flex items-center gap-1">
                    <ExternalLink className="h-3 w-3 mr-1" /> Live Preview
                  </Link>
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="h-8 px-3 text-xs">
                  <Link
                    to={project.githubUrl}
                    target="_blank"
                    className="flex items-center gap-1">
                    <Github className="h-3 w-3 mr-1" /> Code
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
        <GlowingEffect
          blur={0}
          borderWidth={2}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
      </Card>
    </>
  );
};

export default ProjectCard;
