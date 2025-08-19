import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  ExternalLink,
  Github,
  Loader2,
  CodeXml,
} from "lucide-react";
import { useMemo, useState } from "react";
import ProjectForm from "../components/project/project-form";
import { ProjectFilters } from "../components/project/project-filters";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import {
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useGetProjectQuery,
  useGetProjectsQuery,
  useUpdateProjectMutation,
} from "../features/project/projectApi";
import { Link } from "react-router-dom";
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import ProjectCardPlaceholder from "../components/project/project-card-placeholder";

const iconMap = { ...SiIcons, ...FaIcons };

export const TechIcon = (icon) => {
  const Icon = iconMap[icon?.component];
  return Icon ? (
    <Icon className="w-4 h-4" style={{ color: icon?.color }} />
  ) : (
    <CodeXml className="w-4 h-4" />
  );
};

export default function Projects() {
  const { data, isError, isLoading, error } = useGetProjectsQuery();

  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();

  const projects = data?.projects;
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  // Filter + sort
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects?.filter((project) => {
      const matchesSearch =
        !searchTerm ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some((tech) =>
          tech.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesStatus =
        !filters.status || project.status === filters.status;
      const matchesTech =
        !filters.technologies?.length ||
        filters.technologies.some((tech) =>
          project.technologies.map((t) => t.name).includes(tech.name)
        );

      return matchesSearch && matchesStatus && matchesTech;
    });

    filtered?.sort((a, b) => {
      let aVal = sortBy === "createdAt" ? new Date(a[sortBy]) : a[sortBy];
      let bVal = sortBy === "createdAt" ? new Date(b[sortBy]) : b[sortBy];

      return sortOrder === "asc"
        ? aVal > bVal
          ? 1
          : -1
        : aVal < bVal
        ? 1
        : -1;
    });

    return filtered;
  }, [projects, searchTerm, filters, sortBy, sortOrder]);

  // Add or Update Project
  const handleProjectSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("githubUrl", data.githubUrl);
      formData.append("liveUrl", data.liveUrl);
      formData.append("features", data.features);
      formData.append(
        "technologies",
        JSON.stringify(
          data.technologies.map((tech) => ({
            name: tech.name,
            icon: { component: tech.icon.name, color: tech.icon?.color },
          }))
        )
      );

      if (data.thumbnail instanceof File)
        formData.append("thumbnail", data.thumbnail);
      if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach((file) => {
          if (file instanceof File) formData.append("images", file);
        });
      }

      if (editingProject) {
        const result = await updateProject({
          id: editingProject._id,
          formData,
        }).unwrap();
        if (!result.success) {
          return toast.error(result.message || "Failed to update project");
        }
        toast.success(result.message || "Project updated successfully!");
      } else {
        const result = await createProject(formData).unwrap();
        if (!result.success) {
          return toast.error(result.message || "Failed to create project");
        }
        toast.success(result.message || "Project added successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.data?.message || err.message || "Operation failed");
    } finally {
      setEditingProject(null);
      setIsDialogOpen(false);
    }
  };

  // Open edit dialog
  const handleEditProject = (project) => {
    const formattedProject = {
      ...project,
      thumbnail: project.thumbnail?.url ? project.thumbnail : null,
      images: project.images || [],
    };
    setEditingProject(formattedProject);
    setIsDialogOpen(true);
    console.log(formattedProject);
  };

  // Delete project
  const handleDeleteProject = (project) => {
    setConfirmAction({
      title: "Delete Project",
      message: `Are you sure you want to delete "${project.title}"? This action cannot be undone.`,
      onConfirm: async () => {
        try {
          const result = await deleteProject(project._id).unwrap();
          if (!result.success)
            throw new Error(result.message || "Failed to delete");
          toast.success(result.message || "Project deleted successfully!");
        } catch (err) {
          toast.error(err.data?.message || err.message || "Delete failed");
        } finally {
          setShowConfirmDialog(false);
          setConfirmAction(null);
        }
      },
    });
    setShowConfirmDialog(true);
  };

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-6 p-6 justify-center">
        {Array.from({ length: 8 }).map((_, idx) => (
          <ProjectCardPlaceholder key={idx} />
        ))}
      </div>
    );
  }

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4 sm:p-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your portfolio projects and showcase your work.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "Edit Project" : "Add New Project"}
              </DialogTitle>
              <DialogDescription>
                {editingProject
                  ? "Update project details."
                  : "Create a new project to showcase in your portfolio."}
              </DialogDescription>
            </DialogHeader>
            <ProjectForm
              project={editingProject}
              onSubmit={handleProjectSubmit}
              onCancel={() => {
                setEditingProject(null);
                setIsDialogOpen(false);
              }}
              isLoading={isCreating || isUpdating}
            />
          </DialogContent>
        </Dialog>
      </div>

      <ProjectFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFiltersChange={setFilters}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={(field, order) => {
          setSortBy(field);
          setSortOrder(order);
        }}
        projects={projects}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
        {filteredAndSortedProjects.map((project) => (
          <Card
            key={project._id}
            className="group border-0 py-0 shadow-sm hover:shadow-xl transition-all">
            <div className="aspect-video relative overflow-hidden rounded-t-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
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
                    <DropdownMenuItem
                      onClick={() => handleEditProject(project)}>
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteProject(project)}
                      className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
                    <span className="ml-1">{tech.name}</span>
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
          </Card>
        ))}
      </div>

      {/* Delete Confirmation */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{confirmAction?.title}</DialogTitle>
            <DialogDescription>{confirmAction?.message}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setShowConfirmDialog(false);
                setConfirmAction(null);
              }}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => confirmAction?.onConfirm()}
              disabled={isDeleting}>
              {isDeleting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </div>
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
