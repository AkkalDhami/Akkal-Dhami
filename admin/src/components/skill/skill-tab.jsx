import React, { useCallback, useMemo, useState } from "react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConfirmationDialog } from "../others/AlertDailog";
import {
  useCreateSkillMutation,
  useDeleteSkillMutation,
  useGetSkillsQuery,
  useUpdateSkillMutation,
} from "../../features/skill/skillApi";
import { SkillForm } from "./skill-form";
import { SkillCard } from "./skill-card";

const SkillTabContent = ({ filteredSkills = [], fromResume = false }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [skillDialogOpen, setSkillDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  const { error, isError, isLoading } = useGetSkillsQuery();

  const [createSkill, { isLoading: isCreating }] = useCreateSkillMutation();

  const [deleteSkill, { isLoading: isDeleting }] = useDeleteSkillMutation();

  const [updateSkill, { isLoading: isUpdating }] = useUpdateSkillMutation();

  const showConfirmation = useCallback((title, message, onConfirm) => {
    setConfirmAction({ title, message, onConfirm });
    setShowConfirmDialog(true);
  }, []);

  // Group skills by category
  const skillsByCategory = useMemo(() => {
    return filteredSkills?.reduce((acc, skill) => {
      acc[skill.category] = [...(acc[skill.category] || []), skill];
      return acc;
    }, {});
  }, [filteredSkills]);

  // Skill handlers
  const handleAddSkill = useCallback(
    async (skillData) => {
      try {
        const result = await createSkill({
          ...skillData,
          icon: {
            component: skillData?.icon?.component?.name,
            color: skillData?.icon?.color,
          },
        }).unwrap();

        if (!result.success) {
          toast.error(result?.message || "Failed to create skill");
          return;
        }
        toast.success(result?.message || "Skill created successfully!");
        setSkillDialogOpen(false);
      } catch (error) {
        console.error("Error creating skill:", error);
      }
    },
    [createSkill]
  );

  const handleEditSkill = useCallback((id, skillData) => {
    setEditingSkill(skillData);
    setSkillDialogOpen(true);
  }, []);

  const handleUpdateSkill = useCallback(
    async (skillData) => {
      try {
        const res = await updateSkill({
          id: skillData._id,
          data: {
            ...skillData,
            icon: {
              component: skillData?.icon?.component?.name,
              color: skillData?.icon?.color,
            },
          },
        }).unwrap();
        if (res?.success) {
          toast.success(res?.message || "Skill updated successfully!");
        } else {
          toast.error(res?.message || "Failed to update skill");
        }
        setEditingSkill(null);
        setSkillDialogOpen(false);
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message || "Failed to update skill");
      }
    },
    [updateSkill]
  );

  const handleDeleteSkillConfirmed = useCallback(
    async (skill) => {
      try {
        const result = await deleteSkill(skill._id).unwrap();

        if (!result.success) {
          toast.error(result.message || "Failed to delete skill");
          return;
        }
        toast.success(result.message || "Skill deleted successfully!");
      } catch (error) {
        toast.error(error.data?.message || "Failed to delete skill");
      }
    },
    [deleteSkill]
  );

  const handleDeleteSkill = useCallback(
    (skill) => {
      showConfirmation(
        "Delete Skill",
        `Delete "${skill.name}"? This action cannot be undone.`,
        () => {
          handleDeleteSkillConfirmed(skill);
        }
      );
    },
    [showConfirmation, handleDeleteSkillConfirmed]
  );

  // Dialog handlers
  const handleOpenSkillDialog = () => {
    setEditingSkill(null);
    setSkillDialogOpen(true);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1 mb-4">
          <h2 className="text-xl font-semibold">Technical Skills</h2>
          <p className="text-sm text-muted-foreground">
            Manage your technical skills with visual icons
          </p>
        </div>
        {!fromResume && (
          <Dialog open={skillDialogOpen} onOpenChange={setSkillDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2" onClick={handleOpenSkillDialog}>
                <CirclePlus className="h-4 w-4" />
                Add Skill
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingSkill ? "Update Skill" : "Add New Skill"}
                </DialogTitle>
                <DialogDescription>
                  {editingSkill
                    ? "Update the skill information."
                    : "Add a new skill to your portfolio."}
                </DialogDescription>
              </DialogHeader>
              <SkillForm
                initialData={editingSkill}
                skill={editingSkill}
                onSubmit={editingSkill ? handleUpdateSkill : handleAddSkill}
                onCancel={() => setSkillDialogOpen(false)}
                isLoading={isCreating || isUpdating}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
      {isLoading && (
        <div className="flex justify-center items-center">Loading...</div>
      )}
      {isError && (
        <div className="flex justify-center items-center">
          Error: {error?.message || error?.error}
        </div>
      )}
      <div className="space-y-6">
        {Object.entries(skillsByCategory || {}).map(
          ([category, categorySkills]) => (
            <Card
              key={category}
              className="bg-background/50 border-zinc-500/30">
              <CardHeader>
                <CardTitle className="text-lg">{category}</CardTitle>
                <CardDescription>
                  {categorySkills.length}{" "}
                  {categorySkills.length === 1 ? "skill" : "skills"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {categorySkills.map((skill) => (
                    <SkillCard
                      fromResume={fromResume}
                      key={skill._id}
                      skill={skill}
                      onEdit={() => handleEditSkill(skill._id, skill)}
                      onDelete={handleDeleteSkill}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        )}
      </div>
      {filteredSkills.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            No skills found matching your criteria.
          </div>
          <Button className="mt-4 gap-2" onClick={handleOpenSkillDialog}>
            <Plus className="h-4 w-4" />
            Add Your First Skill
          </Button>
        </div>
      )}

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

export default SkillTabContent;
