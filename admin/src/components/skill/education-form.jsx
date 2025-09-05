"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

import { dateFormater } from "../../utils/dateFormater";

export function EducationForm({ initialData, onSubmit, onCancel, isLoading }) {
  console.log(initialData);
  const [formData, setFormData] = useState({
    _id:initialData?._id || "",
    institution: initialData?.institution || "",
    degree: initialData?.degree || "",
    startDate: dateFormater(initialData?.startDate) || "",
    endDate: dateFormater(initialData?.endDate) || "",
    description: initialData?.description || "",
  });
  
  console.log(formData);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="institution">Institution *</Label>
        <Input
          id="institution"
          value={formData.institution}
          onChange={(e) =>
            setFormData({ ...formData, institution: e.target.value })
          }
          placeholder="University or school name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="degree">Degree *</Label>
        <Input
          id="degree"
          value={formData.degree}
          onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
          placeholder="Bachelor of Science in Computer Science"
          required
        />
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
          <Label htmlFor="endDate">End Date *</Label>
          <Input
            id="endDate"
            type="month"
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Additional details about your education..."
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {initialData ? "Updating..." : "Adding..."}
            </>
          ) : initialData ? (
            "Update"
          ) : (
            "Add"
          )}
        </Button>
      </div>
    </form>
  );
}
