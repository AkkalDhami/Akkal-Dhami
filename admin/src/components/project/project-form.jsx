import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { IconPicker } from "@/components/ui/icon-picker";
import { X, Loader2 } from "lucide-react";

import { projectSchema } from "../../schemas/projectSchema";
import {
  TextField,
  TextAreaField,
  FileField, // you can keep this import if used elsewhere
  BadgeList,
} from "../project/project-form-field";

function ProjectForm({ initialData, onSubmit, onCancel, isLoading, project }) {
  const [selectedTechIcon, setSelectedTechIcon] = useState(null);
  const [featureInput, setFeatureInput] = useState("");
  console.log(project);
  // Previews
  initialData = project;
  const [thumbnailPreview, setThumbnailPreview] = useState(
    initialData?.thumbnail ? { url: initialData.thumbnail, isNew: false } : null
  );
  const [imagePreviews, setImagePreviews] = useState(
    Array.isArray(initialData?.images)
      ? initialData.images.map((url) => ({ url, isNew: false }))
      : []
  );

  // Refs to clear inputs so the path doesn't remain
  const thumbnailInputRef = useRef(null);
  const imagesInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      thumbnail: initialData?.thumbnail || null,
      images: initialData?.images || [],
      liveUrl: initialData?.liveUrl || "",
      githubUrl: initialData?.githubUrl || "",
      technologies: initialData?.technologies || [],
      features: initialData?.features || [],
    },
  });

  const technologies = watch("technologies");
  const features = watch("features");

  const addTechnology = (name, icon) => {
    if (
      name &&
      icon &&
      !technologies.some((t) => t.name.toLowerCase() === name.toLowerCase())
    ) {
      setValue("technologies", [...technologies, { name, icon }]);
      setSelectedTechIcon(null);
    } else if (!icon) {
      toast.error("Please select an icon for the technology.");
    }
  };

  const removeTechnology = (techName) =>
    setValue(
      "technologies",
      technologies.filter((t) => t.name !== techName)
    );

  const addFeature = () => {
    const val = featureInput.trim();
    if (val && !features.includes(val))
      setValue("features", [...features, val]);
    setFeatureInput("");
  };

  const removeFeature = (feat) =>
    setValue(
      "features",
      features.filter((f) => f !== feat)
    );

  // --- Thumbnail handlers ---
  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Revoke old blob if any
    if (thumbnailPreview?.isNew && thumbnailPreview.url?.startsWith("blob:")) {
      URL.revokeObjectURL(thumbnailPreview.url);
    }

    const next = { url: URL.createObjectURL(file), file, isNew: true };
    setThumbnailPreview(next);
    setValue("thumbnail", file);
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = "";
  };

  const removeThumbnail = () => {
    if (thumbnailPreview?.isNew && thumbnailPreview.url?.startsWith("blob:")) {
      URL.revokeObjectURL(thumbnailPreview.url);
    }
    setThumbnailPreview(null);
    setValue("thumbnail", null);
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = "";
  };

  // --- Images handlers ---
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newPreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
      isNew: true,
    }));

    setImagePreviews((prev) => [...prev, ...newPreviews]);

    // keep form state only for NEW files
    const nextFiles = [
      ...(watch("images") || []),
      ...newPreviews.map((p) => p.file),
    ];
    setValue("images", nextFiles);

    if (imagesInputRef.current) imagesInputRef.current.value = "";
  };

  const removeImage = (index) => {
    const removed = imagePreviews[index];

    // Revoke blob URL if we created it
    if (removed?.isNew && removed.url?.startsWith("blob:")) {
      URL.revokeObjectURL(removed.url);
    }

    const nextPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(nextPreviews);

    // Rebuild the files array from previews that are "new"
    const nextFiles = nextPreviews
      .filter((p) => p.isNew && p.file)
      .map((p) => p.file);
    setValue("images", nextFiles);

    // Keep the native input cleared so no path shows
    if (imagesInputRef.current) imagesInputRef.current.value = "";
  };

  // Clean up blobs on unmount
  useEffect(() => {
    return () => {
      if (
        thumbnailPreview?.isNew &&
        thumbnailPreview.url?.startsWith("blob:")
      ) {
        URL.revokeObjectURL(thumbnailPreview.url);
      }
      imagePreviews.forEach((p) => {
        if (p?.isNew && p.url?.startsWith("blob:")) URL.revokeObjectURL(p.url);
      });
    };
    // eslint-disable-next-line
  }, []);

  const submitHandler = (data) => {
    toast.success("Project saved successfully!");
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      <div className="grid gap-4">
        <TextField
          id="title"
          label="Project Title *"
          placeholder="Project Title"
          {...register("title")}
          error={errors.title}
        />

        <TextAreaField
          id="description"
          label="Description *"
          placeholder="Describe your project..."
          {...register("description")}
          error={errors.description}
        />

        {/* Thumbnail upload + preview */}
        <div className="space-y-2">
          <Label htmlFor="thumbnail">Thumbnail *</Label>
          <Input
            id="thumbnail"
            type="file"
            accept="image/*"
            ref={thumbnailInputRef}
            onChange={handleThumbnailChange}
          />
          {errors.thumbnail && (
            <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>
          )}
          {console.log(thumbnailPreview)}
          {thumbnailPreview && (
            <div className="relative group w-40 h-28 mt-3 rounded-lg overflow-hidden border">
              <img
                src={thumbnailPreview.url.url}
                alt="thumbnail"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={removeThumbnail}
                className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                aria-label="Remove thumbnail">
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Images upload + previews */}
        <div className="space-y-2">
          <Label htmlFor="images">Images *</Label>
          <Input
            id="images"
            type="file"
            multiple
            accept="image/*"
            ref={imagesInputRef}
            onChange={handleImageChange}
          />
          {errors.images && (
            <p className="text-red-500 text-sm">{errors.images.message}</p>
          )}

          <div className="grid grid-cols-3 gap-3 mt-3">
            {imagePreviews.map((img, idx) => (
              <div
                key={`${img.public_id}`}
                className="relative group rounded-lg overflow-hidden border">
                <img
                  src={img.url.url}
                  alt={img.url.public_id}
                  className="w-full h-32 object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                  aria-label="Remove image">
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <TextField
          id="liveUrl"
          label="Live URL"
          placeholder="https://your-project.com"
          {...register("liveUrl")}
          error={errors.liveUrl}
        />
        <TextField
          id="githubUrl"
          label="GitHub URL"
          placeholder="https://github.com/your-project"
          {...register("githubUrl")}
          error={errors.githubUrl}
        />

        {/* Technologies */}
        <div className="space-y-2">
          <Label>Technologies *</Label>
          <IconPicker
            value={selectedTechIcon}
            onChange={(icon) => setSelectedTechIcon(icon)}
            onSelectName={(name) =>
              addTechnology(
                name,
                selectedTechIcon?.component,
                selectedTechIcon?.color
              )
            }
            placeholder="Choose Technology"
          />
          {errors.technologies && (
            <p className="text-red-500 text-sm">
              {errors.technologies.message}
            </p>
          )}
          <BadgeList items={technologies} removeItem={removeTechnology} />
        </div>

        {/* Features */}
        <div className="space-y-2">
          <Label htmlFor="features">Features</Label>
          <Input
            id="features"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault();
                addFeature();
              }
            }}
            placeholder="Type a feature and press Enter..."
            className="input"
          />
          {errors.features && (
            <p className="text-red-500 text-sm">{errors.features.message}</p>
          )}
          <BadgeList items={features} removeItem={removeFeature} />
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Saving...
            </div>
          ) : (
            "Save Project"
          )}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

export default ProjectForm;
