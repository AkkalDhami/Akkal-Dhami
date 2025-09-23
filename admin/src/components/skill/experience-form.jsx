"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

export function ExperienceForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    _id: initialData?._id || "",
    company: initialData?.company || "",
    position: initialData?.position || "",
    startDate: initialData?.startDate || "",
    endDate: initialData?.endDate || "",
    description: initialData?.description || "",
    technologies: initialData?.technologies || [],
  });

  const [newTech, setNewTech] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addTechnology = () => {
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, newTech.trim()],
      });
      setNewTech("");
    }
  };

  const removeTechnology = (tech) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="company">Company *</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            placeholder="Company name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="position">Position *</Label>
          <Input
            id="position"
            value={formData.position}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
            placeholder="Job title"
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date *</Label>
          <Input
            id="startDate"
            type="month"
            value={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="month"
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
            placeholder="Leave empty if current"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Describe your role and achievements..."
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Technologies Used</Label>
        <div className="flex gap-2">
          <Input
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addTechnology())
            }
            placeholder="Add technology"
          />
          <Button
            type="button"
            onClick={addTechnology}
            size="sm"
            className="px-3">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {formData.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="gap-1">
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechnology(tech)}
                  className="ml-1 hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? "Update Experience" : "Add Experience"}
        </Button>
      </div>
    </form>
  );
}
