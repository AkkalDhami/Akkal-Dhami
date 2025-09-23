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
const ExperienceTabContent = ({ filteredExperience = [] }) => {
  const [experienceDialogOpen, setExperienceDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const showConfirmation = useCallback((title, message, onConfirm) => {
    setConfirmAction({ title, message, onConfirm });
    setShowConfirmDialog(true);
  }, []);

  const handleAddExperience = useCallback((expData) => {
    setExperienceDialogOpen(false);
    toast.success("Experience added successfully!");
  }, []);

  const handleUpdateExperience = useCallback((expData) => {
    setExperienceDialogOpen(false);
    setEditingExperience(null);
    toast.success("Experience updated successfully!");
  }, []);

  const handleDeleteExperience = useCallback(
    (exp) => {
      showConfirmation(
        "Delete Experience",
        `Delete "${exp.position}" at ${exp.company}?`,
        () => {
          toast.success("Experience deleted successfully!");
        }
      );
    },
    [showConfirmation]
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1 mb-4">
          <h2 className="text-xl font-semibold">Work Experience</h2>
          <p className="text-sm text-muted-foreground">
            Manage your professional work history
          </p>
        </div>
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
                {editingExperience ? "Edit Experience" : "Add Work Experience"}
              </DialogTitle>
              <DialogDescription>
                {editingExperience
                  ? "Update the work experience information."
                  : "Add a new work experience to your portfolio."}
              </DialogDescription>
            </DialogHeader>
            <ExperienceForm
              experience={editingExperience}
              onSubmit={
                editingExperience ? handleUpdateExperience : handleAddExperience
              }
              onCancel={() => {
                setExperienceDialogOpen(false);
                setEditingExperience(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-4">
        {filteredExperience.map((exp) => (
          <ExperienceCard
            key={exp.id}
            experience={exp}
            onDelete={handleDeleteExperience}
          />
        ))}
      </div>
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
      <ConfirmationDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        title={confirmAction?.title}
        message={confirmAction?.message}
        onConfirm={confirmAction?.onConfirm}
        isDeleting={false}
      />
    </div>
  );
};

export default ExperienceTabContent;
