import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Search,
  Filter,
  X,
  CalendarIcon,
  SortAsc,
  SortDesc,
} from "lucide-react";

export function ProjectFilters({
  searchTerm,
  onSearchChange,
  filters,
  onFiltersChange,
  sortBy,
  sortOrder,
  onSortChange,
}) {
  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleTechnologyToggle = (tech) => {
    const currentTechs = filters.technologies || [];
    const newTechs = currentTechs.includes(tech)
      ? currentTechs.filter((t) => t !== tech)
      : [...currentTechs, tech];
    handleFilterChange("technologies", newTechs);
  };

  const activeFiltersCount = Object.values(filters).filter((v) =>
    Array.isArray(v) ? v.length > 0 : v
  ).length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:flex sm:items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="relative flex gap-2">
          <Select
            value={`${sortBy}-${sortOrder}`}
            onValueChange={(value) => {
              const [field, order] = value.split("-");
              onSortChange(field, order);
            }}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt-desc">
                <div className="flex items-center gap-2">
                  <SortDesc className="h-4 w-4" />
                  Newest first
                </div>
              </SelectItem>
              <SelectItem value="createdAt-asc">
                <div className="flex items-center gap-2">
                  <SortAsc className="h-4 w-4" />
                  Oldest first
                </div>
              </SelectItem>
              <SelectItem value="title-asc">
                <div className="flex items-center gap-2">
                  <SortAsc className="h-4 w-4" />
                  Title A-Z
                </div>
              </SelectItem>
              <SelectItem value="title-desc">
                <div className="flex items-center gap-2">
                  <SortDesc className="h-4 w-4" />
                  Title Z-A
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters.status && (
            <Badge variant="secondary" className="gap-1">
              Status: {filters.status}
              <button onClick={() => handleFilterChange("status", undefined)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.technologies?.map((tech) => (
            <Badge key={tech.name} variant="secondary" className="gap-1">
              {tech.name}
              <button onClick={() => handleTechnologyToggle(tech.name)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
