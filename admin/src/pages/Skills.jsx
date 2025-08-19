import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Code, Briefcase, GraduationCap, Search, Loader2 } from "lucide-react";

import { ExperienceForm } from "@/components/skill/experience-form";
import { ExperienceCard } from "@/components/skill/experience-card";
import { SkillCard } from "@/components/skill/skill-card";
import { SkillForm } from "@/components/skill/skill-form";
import { EducationForm } from "@/components/skill/education-form";
import { EducationCard } from "@/components/skill/education-card";

import * as Icons from "react-icons/si";

import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { editSkill } from "../features/skill/skillSlice";
import {
  useCreateSkillMutation,
  useDeleteSkillMutation,
  useGetSkillsQuery,
} from "../features/skill/skillApi";

const ConfirmationDialog = ({
  open,
  onOpenChange,
  title,
  message,
  onConfirm,
  isDeleting,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}>
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting...
              </>
            ) : (
              <>Delete</>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function Skills() {
  const { data, error, isError, isLoading } = useGetSkillsQuery();

  const [
    createSkill,
    { isError: isCreatingError, isLoading: isCreating, error: creatingError },
  ] = useCreateSkillMutation();

  const [deleteSkill, { isError: isDeletingError, isLoading: isDeleting }] =
    useDeleteSkillMutation();

  const [skillDialogOpen, setSkillDialogOpen] = useState(false);
  const [experienceDialogOpen, setExperienceDialogOpen] = useState(false);
  const [educationDialogOpen, setEducationDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [editingExperience, setEditingExperience] = useState(null);
  const [editingEducation, setEditingEducation] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("skills");

  // Initial data
  const skills = data?.skills || [];

  const dispatch = useDispatch();

  const [experience, setExperience] = useState([
    {
      id: "1",
      company: "Tech Solutions Inc.",
      position: "Senior Frontend Developer",
      startDate: "2022-01",
      endDate: "Present",
      description: "Led development of React-based web applications.",
      technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    },
    {
      id: "2",
      company: "Digital Agency Co.",
      position: "Full Stack Developer",
      startDate: "2020-06",
      endDate: "2021-12",
      description: "Developed client websites and web applications.",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
    },
  ]);

  const [education, setEducation] = useState([
    {
      id: "1",
      institution: "University of Technology",
      degree: "Bachelor of Science in Computer Science",
      startDate: "2016-09",
      endDate: "2020-05",
      description: "Focused on software engineering and algorithms.",
    },
  ]);

  // Memoized filtered data
  const filteredSkills = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return skills.filter(
      (skill) =>
        skill.name.toLowerCase().includes(term) ||
        skill.description.toLowerCase().includes(term)
    );
  }, [skills, searchTerm]);

  const filteredExperience = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return experience.filter(
      (exp) =>
        exp.company.toLowerCase().includes(term) ||
        exp.position.toLowerCase().includes(term) ||
        exp.description.toLowerCase().includes(term)
    );
  }, [experience, searchTerm]);

  const filteredEducation = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return education.filter(
      (edu) =>
        edu.institution.toLowerCase().includes(term) ||
        edu.degree.toLowerCase().includes(term) ||
        edu.description.toLowerCase().includes(term)
    );
  }, [education, searchTerm]);

  // Group skills by category
  const skillsByCategory = useMemo(() => {
    return filteredSkills.reduce((acc, skill) => {
      acc[skill.category] = [...(acc[skill.category] || []), skill];
      return acc;
    }, {});
  }, [filteredSkills]);

  // Confirmation dialog handler
  const showConfirmation = useCallback((title, message, onConfirm) => {
    setConfirmAction({ title, message, onConfirm });
    setShowConfirmDialog(true);
  }, []);

  // Skill handlers
  const handleAddSkill = useCallback(
    async (skillData) => {
      console.log(skillData);

      try {
        const result = await createSkill({
          ...skillData,
          icon: {
            component: skillData?.icon?.component?.name,
            color: skillData?.icon?.color,
          },
        }).unwrap();
        console.log("Result:", result);
        if (!result.success) {
          toast.error(result.message || "Failed to create skill");
          return;
        }
        toast.success(result.message || "Skill created successfully!");
      } catch (error) {
        console.error("Error creating skill:", error);
      }
    },
    [createSkill]
  );

  const handleEditSkill = useCallback(
    (id, skillData) => {
      setEditingSkill(id);
      dispatch(editSkill({ id, data: {} }));
      setSkillDialogOpen(true);
      toast.success("Skill updated successfully!");
    },
    [dispatch]
  );

  const handleUpdateSkill = useCallback(
    (id, skillData) => {
      dispatch(editSkill({ id, data: skillData }));
      setSkillDialogOpen(false);
      setEditingSkill(null);
      toast.success("Skill updated successfully!");
    },
    [dispatch]
  );

  const handleDeleteSkillConfirmed = useCallback(
    async (skill) => {
      try {
        const result = await deleteSkill(skill._id).unwrap();
        console.log("Result:", result);
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

  // Experience handlers
  const handleAddExperience = useCallback((expData) => {
    setExperience((prev) => [
      ...prev,
      { ...expData, id: Date.now().toString() },
    ]);
    setExperienceDialogOpen(false);
    toast.success("Experience added successfully!");
  }, []);

  const handleEditEducation = useCallback((edu) => {
    setEditingEducation(edu);
    setEducationDialogOpen(true);
  }, []);

  const handleUpdateExperience = useCallback((expData) => {
    setExperience((prev) =>
      prev.map((e) => (e.id === expData.id ? expData : e))
    );
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
          setExperience((prev) => prev.filter((e) => e.id !== exp.id));
          toast.success("Experience deleted successfully!");
        }
      );
    },
    [showConfirmation]
  );

  // Education handlers
  const handleAddEducation = useCallback((eduData) => {
    setEducation((prev) => [
      ...prev,
      { ...eduData, id: Date.now().toString() },
    ]);
    setEducationDialogOpen(false);
    toast.success("Education added successfully!");
  }, []);

  const handleUpdateEducation = useCallback((eduData) => {
    setEducation((prev) =>
      prev.map((e) => (e.id === eduData.id ? eduData : e))
    );
    setEducationDialogOpen(false);
    setEditingEducation(null);
    toast.success("Education updated successfully!");
  }, []);

  const handleEditExperience = useCallback((exp) => {
    setEditingExperience(exp);
    setExperienceDialogOpen(true);
  }, []);

  const handleDeleteEducation = useCallback(
    (edu) => {
      showConfirmation(
        "Delete Education",
        `Delete "${edu.degree}" from ${edu.institution}?`,
        () => {
          setEducation((prev) => prev.filter((e) => e.id !== edu.id));
          toast.success("Education deleted successfully!");
        }
      );
    },
    [showConfirmation]
  );

  // Dialog handlers
  const handleOpenSkillDialog = () => {
    setEditingSkill(null);
    setSkillDialogOpen(true);
  };

  if (isCreatingError) {
    return toast.error(creatingError?.message || "Failed to create skill");
  }
  return (
    <>
      <div className="p-4 sm:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Skills & Experience
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your professional skills, work experience, and education.
              </p>
            </div>

            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search skills, experience, education..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6">
            <TabsList className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              <TabsTrigger value="skills" className="gap-2">
                <Code className="h-4 w-4" />
                Skills ({filteredSkills.length})
              </TabsTrigger>
              <TabsTrigger value="experience" className="gap-2">
                <Briefcase className="h-4 w-4" />
                Experience ({filteredExperience.length})
              </TabsTrigger>
              <TabsTrigger value="education" className="gap-2">
                <GraduationCap className="h-4 w-4" />
                Education ({filteredEducation.length})
              </TabsTrigger>
            </TabsList>

            {/* Skills Tab */}
            <TabsContent value="skills" className="space-y-6 mt-12 md:mt-0">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-xl font-semibold">Technical Skills</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage your technical skills with visual icons
                  </p>
                </div>
                <Dialog
                  open={skillDialogOpen}
                  onOpenChange={setSkillDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2" onClick={handleOpenSkillDialog}>
                      <Plus className="h-4 w-4" />
                      Add Skill
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {editingSkill ? "Edit Skill" : "Add New Skill"}
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
                      onSubmit={
                        editingSkill ? handleUpdateSkill : handleAddSkill
                      }
                      onCancel={() => setSkillDialogOpen(false)}
                      isLoading={isCreating}
                    />
                  </DialogContent>
                </Dialog>
              </div>

              {isLoading && (
                <div className="flex justify-center items-center">
                  Loading...
                </div>
              )}

              {isError && (
                <div className="flex justify-center items-center">
                  Error: {error.message}
                </div>
              )}

              <div className="space-y-6">
                {Object.entries(skillsByCategory).map(
                  ([category, categorySkills]) => (
                    <Card key={category}>
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
                              key={skill._id}
                              skill={skill}
                              onEdit={() => handleEditSkill(skill.id, skill)}
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
                  <Button
                    className="mt-4 gap-2"
                    onClick={handleOpenSkillDialog}>
                    <Plus className="h-4 w-4" />
                    Add Your First Skill
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience" className="space-y-6 mt-12 md:mt-0">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
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
                      <Plus className="h-4 w-4" />
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
                      experience={editingExperience}
                      onSubmit={
                        editingExperience
                          ? handleUpdateExperience
                          : handleAddExperience
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
                    onEdit={handleEditExperience}
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
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education" className="space-y-6 mt-12 md:mt-0">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
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
                      <Plus className="h-4 w-4" />
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
                      education={editingEducation}
                      onSubmit={
                        editingEducation
                          ? handleUpdateEducation
                          : handleAddEducation
                      }
                      onCancel={() => {
                        setEducationDialogOpen(false);
                        setEditingEducation(null);
                      }}
                    />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {filteredEducation.map((edu) => (
                  <EducationCard
                    key={edu.id}
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
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <ConfirmationDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        title={confirmAction?.title}
        message={confirmAction?.message}
        onConfirm={confirmAction?.onConfirm}
        isDeleting={isDeleting}
      />
    </>
  );
}
