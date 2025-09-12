import { useState } from "react";
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
import { IconPicker } from "@/components/ui/icon-picker";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

export function SkillForm({ initialData, onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState(initialData || {});

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter a skill name.");
      return;
    }

    if (!formData.category) {
      toast.error("Please select a category.");
      return;
    }

    if (!formData.icon) {
      toast.error("Please select an icon.");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Please enter a short description.");
      return;
    }

    console.log(formData);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Skill Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., React, Python, AWS"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="shortDescription">Short Description *</Label>
        <Input
          id="shortDescription"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="short description"
          required
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Frontend">Frontend</SelectItem>
              <SelectItem value="Backend">Backend</SelectItem>
              <SelectItem value="DevOps">DevOps</SelectItem>
              <SelectItem value="Database">Database</SelectItem>
              <SelectItem value="Mobile">Mobile</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Tools & Other">Tools & Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="icon">Icon *</Label>
          <IconPicker
            value={formData?.icon || formData?.icon?.component?.name}
            onChange={(icon) => {
              console.log(icon);
              return setFormData({ ...formData, icon });
            }}
            placeholder="Choose an icon"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Saving...
            </div>
          ) : initialData ? (
            "Update Skill"
          ) : (
            "Save Skill"
          )}
        </Button>
      </div>
    </form>
  );
}
