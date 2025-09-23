import React, { useCallback, useState } from "react";
import {
  useAddEducationMutation,
  useDeleteEducationMutation,
  useGetEducationsQuery,
  useUpdateEducationMutation,
} from "../../features/education/eduApi";
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
import { EducationCard } from "./education-card";
import { EducationForm } from "./education-form";

const EducationTabContent = ({ filteredEducation }) => {
  const {
    error: eduError,
    isError: isEduError,
    isLoading: isEduLoading,
  } = useGetEducationsQuery();
  const [confirmAction, setConfirmAction] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [
    addEducation,
    {
      isError: isEduCreatingError,
      isLoading: isEduCreating,
      error: creatingEduError,
    },
  ] = useAddEducationMutation();

  const [deleteEducation, { isLoading: isEduDeleting }] =
    useDeleteEducationMutation();

  const [updateEducation, { isLoading: isEduUpdating }] =
    useUpdateEducationMutation();

  const [editingEducation, setEditingEducation] = useState(null);
  const [educationDialogOpen, setEducationDialogOpen] = useState(false);

  const showConfirmation = useCallback((title, message, onConfirm) => {
    setConfirmAction({ title, message, onConfirm });
    setShowConfirmDialog(true);
  }, []);

  const handleAddEducation = useCallback(
    async (eduData) => {
      try {
        const res = await addEducation(eduData).unwrap();

        if (isEduCreatingError) {
          toast.error(creatingEduError);
        }

        if (res?.success) {
          toast.success(res?.message || "Education added successfully!");
        } else {
          toast.error(res?.message || "Error while adding education");
        }
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err?.message);
      } finally {
        setEducationDialogOpen(false);
      }
    },
    [addEducation, isEduCreatingError, creatingEduError]
  );

  const handleEditEducation = useCallback((edu) => {
    setEditingEducation(edu);
    setEducationDialogOpen(true);
  }, []);

  const handleUpdateEducation = useCallback(
    async (eduData) => {
      try {
        const res = await updateEducation({
          id: eduData._id,
          data: eduData,
        }).unwrap();
        if (res?.success) {
          toast.success(res?.message || "Education updated successfully!");
        } else {
          toast.error(res?.message || "Error while updating education");
        }
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err?.message);
      } finally {
        setEducationDialogOpen(false);
        setEditingEducation(null);
      }
    },
    [updateEducation]
  );

  const handleDeleteEducation = useCallback(
    (edu) => {
      showConfirmation(
        "Delete Education",
        `Delete "${edu.degree}" from ${edu.institution}?`,
        async () => {
          try {
            const res = await deleteEducation(edu._id).unwrap();
            if (res?.success) {
              toast.success(res?.message || "Education added successfully!");
            } else {
              toast.error(res?.message || "Error while adding education");
            }
          } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err?.message);
          }
        }
      );
    },
    [deleteEducation, showConfirmation]
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1 mb-4">
          <h2 className="text-xl font-semibold">Education</h2>
          <p className="text-sm text-muted-foreground">
            Manage your educational background
          </p>
        </div>
        <Dialog
          open={educationDialogOpen}
          onOpenChange={(open) => {
            setEducationDialogOpen(open);
            if (!open) setEditingEducation(null);
          }}>
          <DialogTrigger asChild>
            <Button
              className="gap-2"
              onClick={() => setEducationDialogOpen(true)}>
              <CirclePlus className="h-4 w-4" />
              Add Education
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingEducation ? "Edit Education" : "Add Education"}
              </DialogTitle>
              <DialogDescription>
                {editingEducation
                  ? "Update the education information."
                  : "Add educational background to your portfolio."}
              </DialogDescription>
            </DialogHeader>
            <EducationForm
              initialData={editingEducation}
              isLoading={isEduCreating || isEduUpdating}
              onSubmit={
                editingEducation ? handleUpdateEducation : handleAddEducation
              }
              onCancel={() => {
                setEducationDialogOpen(false);
                setEditingEducation(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      {isEduLoading && (
        <div className="flex justify-center items-center">Loading...</div>
      )}
      {isEduError && (
        <div className="flex justify-center items-center">
          Error: {eduError?.message || eduError?.error}
        </div>
      )}
      <div className="space-y-4">
        {filteredEducation?.map((edu) => (
          <EducationCard
            key={edu._id}
            education={edu}
            onEdit={handleEditEducation}
            onDelete={handleDeleteEducation}
          />
        ))}
      </div>
      {filteredEducation.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            No education found matching your criteria.
          </div>
          <Button
            className="mt-4 gap-2"
            onClick={() => setEducationDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Your First Education
          </Button>
        </div>
      )}
      <ConfirmationDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        title={confirmAction?.title}
        message={confirmAction?.message}
        onConfirm={confirmAction?.onConfirm}
        isDeleting={isEduDeleting}
      />
    </div>
  );
};

export default EducationTabContent;
