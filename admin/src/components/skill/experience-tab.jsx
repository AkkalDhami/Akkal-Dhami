"use client";

import React, { useCallback, useState } from "react";
import { CirclePlus, Plus } from "lucide-react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ConfirmationDialog } from "../others/AlertDailog";
import { ExperienceForm } from "./experience-form";
import { ExperienceCard } from "./experience-card";
import {
  useAddExperienceMutation,
  useDeleteExperienceMutation,
  useGetExperiencesQuery,
  useUpdateExperienceMutation,
} from "../../features/experience/experienceApi";

const ExperienceTabContent = ({
  filteredExperience = [],
  fromResume = false,
}) => {
  const { data: experiences } = useGetExperiencesQuery();

  const [experienceDialogOpen, setExperienceDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const [addExperience, { isLoading: isCreating }] = useAddExperienceMutation();
  const [updateExperience, { isLoading: isUpdating }] =
    useUpdateExperienceMutation();
  const [deleteExperience, { isLoading: isDeleting }] =
    useDeleteExperienceMutation();

  const showConfirmation = useCallback((title, message, onConfirm) => {
    setConfirmAction({ title, message, onConfirm });
    setShowConfirmDialog(true);
  }, []);

  // ✅ Add
  const handleAddExperience = useCallback(
    async (expData) => {
      try {
        await addExperience(expData).unwrap();
        toast.success("Experience added successfully!");
        setExperienceDialogOpen(false);
      } catch (error) {
        toast.error(error?.data?.message || "Failed to add experience.");
      }
    },
    [addExperience]
  );

  // ✅ Update
  const handleUpdateExperience = useCallback(
    async (expData) => {
      console.log(expData);
      try {
        await updateExperience(expData).unwrap();
        toast.success("Experience updated successfully!");
        setExperienceDialogOpen(false);
        setEditingExperience(null);
      } catch (error) {
        toast.error(error?.data?.message || "Failed to update experience.");
      }
    },
    [updateExperience]
  );

  // ✅ Delete
  const handleDeleteExperience = useCallback(
    (exp) => {
      showConfirmation(
        "Delete Experience",
        `Delete "${exp.position}" at ${exp.company}?`,
        async () => {
          try {
            await deleteExperience(exp._id || exp.id).unwrap();
            toast.success("Experience deleted successfully!");
          } catch (error) {
            toast.error(error?.data?.message || "Failed to delete experience.");
          }
        }
      );
    },
    [deleteExperience, showConfirmation]
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1 mb-4">
          <h2 className="text-xl font-semibold">Work Experience</h2>
          <p className="text-sm text-muted-foreground">
            Manage your professional work history
          </p>
        </div>
        {!fromResume && (
          <Dialog
            open={experienceDialogOpen}
            onOpenChange={(open) => {
              setExperienceDialogOpen(open);
              if (!open) setEditingExperience(null);
            }}>
            <DialogTrigger asChild>
              <Button
                className="gap-2"
                onClick={() => setExperienceDialogOpen(true)}>
                <CirclePlus className="h-4 w-4" />
                Add Experience
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingExperience
                    ? "Edit Experience"
                    : "Add Work Experience"}
                </DialogTitle>
                <DialogDescription>
                  {editingExperience
                    ? "Update the work experience information."
                    : "Add a new work experience to your portfolio."}
                </DialogDescription>
              </DialogHeader>
              <ExperienceForm
                initialData={editingExperience}
                onSubmit={
                  editingExperience
                    ? handleUpdateExperience
                    : handleAddExperience
                }
                onCancel={() => {
                  setExperienceDialogOpen(false);
                  setEditingExperience(null);
                }}
                isLoading={isCreating || isUpdating}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Experiences List */}
      <div className="space-y-4">
        {filteredExperience.map((exp) => (
          <ExperienceCard
            fromResume={fromResume}
            key={exp._id || exp.id}
            experience={exp}
            onDelete={handleDeleteExperience}
            onEdit={(exp) => {
              setEditingExperience(exp);
              setExperienceDialogOpen(true);
            }}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredExperience.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            No experience found matching your criteria.
          </div>
          <Button
            className="mt-4 gap-2"
            onClick={() => setExperienceDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Your First Experience
          </Button>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmationDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        title={confirmAction?.title}
        message={confirmAction?.message}
        onConfirm={confirmAction?.onConfirm}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default ExperienceTabContent;
