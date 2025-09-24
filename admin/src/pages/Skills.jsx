import { useState, useMemo } from "react";

import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Plus, Code, Briefcase, GraduationCap, Search } from "lucide-react";

import { useGetSkillsQuery } from "../features/skill/skillApi";

import { useGetEducationsQuery } from "../features/education/eduApi";
import EducationTabContent from "../components/skill/education-tab";
import ExperienceTabContent from "../components/skill/experience-tab";
import SkillTabContent from "../components/skill/skill-tab";
import { useGetExperiencesQuery } from "../features/experience/experienceApi";

export default function Skills() {
  const { data } = useGetSkillsQuery();
  const { data: eduData } = useGetEducationsQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("skills");

  const skills = data?.skills || [];

  const { data: experiences } = useGetExperiencesQuery();

  const education = eduData?.education || [];
  const experience = experiences?.experiences || [];

  // Memoized filtered data
  const filteredSkills = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return skills?.filter(
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

  return (
    <>
      <div className="p-4 sm:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
         
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
              <TabsTrigger value="skills" className="gap-2 bg-transparent">
                <Code className="h-4 w-4" />
                Skills ({filteredSkills?.length})
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
              <SkillTabContent filteredSkills={filteredSkills} />
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience" className="space-y-6 mt-12 md:mt-0">
              <ExperienceTabContent filteredExperience={filteredExperience} />
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education" className="space-y-6 mt-12 md:mt-0">
              <EducationTabContent filteredEducation={filteredEducation} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
