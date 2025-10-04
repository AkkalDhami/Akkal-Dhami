// Resume.jsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  User,
  Calendar,
  ArrowRight,
  Star,
  ChevronDown,
  ChevronUp,
  MailIcon,
  Loader,
} from "lucide-react";
import ExperienceTabContent from "../components/skill/experience-tab";
import { useGetExperiencesQuery } from "../features/experience/experienceApi";
import SkillTabContent from "../components/skill/skill-tab";
import { useGetSkillsQuery } from "../features/skill/skillApi";
import { useGetEducationsQuery } from "../features/education/eduApi";
import EducationTabContent from "../components/skill/education-tab";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { useGetProjectsQuery } from "../features/project/projectApi";
import ProjectCardPlaceholder from "../components/project/project-card-placeholder";
import ProjectCard from "../components/project/project-card";

const Resume = () => {
  const { data: experiences, isLoading: isExperienceLoading } =
    useGetExperiencesQuery();
  const { data: skills, isLoading: isSkillLoading } = useGetSkillsQuery();
  const { data: eduData, isLoading: isEduLoading } = useGetEducationsQuery();
  const { data: projects, isLoading: isProjectLoading } = useGetProjectsQuery();
  const [activeTab, setActiveTab] = useState("experience");

  // Sample resume data
  const resumeData = {
    personal: {
      name: "Alex Johnson",
      title: "Full Stack Developer",
      email: "alex.johnson@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      website: "alexjohnson.dev",
      github: "github.com/alexjohnson",
      linkedin: "linkedin.com/in/alexjohnson",
      summary:
        "Passionate full-stack developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies. Strong advocate for clean code and user-centered design.",
    },
    experience: [
      {
        id: 1,
        company: "TechCorp Inc.",
        position: "Senior Full Stack Developer",
        period: "2022 - Present",
        duration: "2 years",
        location: "San Francisco, CA",
        description:
          "Lead development of enterprise SaaS platform serving 10,000+ users.",
        achievements: [
          "Architected and implemented microservices architecture reducing latency by 40%",
          "Led a team of 5 developers in agile environment",
          "Improved application performance by 60% through code optimization",
          "Mentored junior developers and conducted technical interviews",
        ],
        technologies: [
          "React",
          "Node.js",
          "TypeScript",
          "AWS",
          "MongoDB",
          "Docker",
        ],
      },
      {
        id: 2,
        company: "StartUpXYZ",
        position: "Full Stack Developer",
        period: "2020 - 2022",
        duration: "2 years",
        location: "Remote",
        description:
          "Developed and maintained multiple client projects using modern web technologies.",
        achievements: [
          "Built 15+ responsive web applications from scratch",
          "Implemented CI/CD pipelines reducing deployment time by 70%",
          "Collaborated with designers to create pixel-perfect UIs",
          "Integrated third-party APIs and payment systems",
        ],
        technologies: [
          "React",
          "Express.js",
          "PostgreSQL",
          "Firebase",
          "Stripe API",
        ],
      },
      {
        id: 3,
        company: "WebDev Agency",
        position: "Frontend Developer",
        period: "2019 - 2020",
        duration: "1 year",
        location: "New York, NY",
        description:
          "Created interactive user interfaces for various clients across different industries.",
        achievements: [
          "Developed 20+ custom WordPress themes",
          "Improved website loading speed by 50% on average",
          "Worked directly with clients to understand requirements",
          "Implemented responsive designs for mobile-first approach",
        ],
        technologies: ["JavaScript", "WordPress", "PHP", "CSS3", "jQuery"],
      },
    ],
    education: [
      {
        id: 1,
        institution: "Stanford University",
        degree: "Master of Science in Computer Science",
        period: "2017 - 2019",
        location: "Stanford, CA",
        gpa: "3.8/4.0",
        achievements: ["Graduated with Honors", "Research Assistant in AI Lab"],
      },
      {
        id: 2,
        institution: "University of California",
        degree: "Bachelor of Science in Software Engineering",
        period: "2013 - 2017",
        location: "Berkeley, CA",
        gpa: "3.6/4.0",
        achievements: ["Dean's List", "Computer Science Club President"],
      },
    ],
    skills: {
      technical: [
        { name: "JavaScript/TypeScript", level: 95 },
        { name: "React/Next.js", level: 90 },
        { name: "Node.js/Express", level: 88 },
        { name: "Python/Django", level: 85 },
        { name: "AWS/Cloud Services", level: 82 },
        { name: "MongoDB/PostgreSQL", level: 80 },
      ],
      soft: [
        "Team Leadership",
        "Problem Solving",
        "Agile Methodology",
        "Communication",
        "Project Management",
        "Mentoring",
      ],
      tools: [
        "Git & GitHub",
        "Docker",
        "Jenkins",
        "Figma",
        "Postman",
        "VS Code",
        "Webpack",
        "Jest",
      ],
    },
    projects: [
      {
        id: 1,
        name: "E-commerce Platform",
        description: "Full-stack e-commerce solution with admin dashboard",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        liveUrl: "https://demo-store.example.com",
        githubUrl: "https://github.com/alexjohnson/ecommerce",
        featured: true,
      },
      {
        id: 2,
        name: "Task Management App",
        description:
          "Collaborative project management tool with real-time updates",
        technologies: ["Next.js", "Socket.io", "PostgreSQL"],
        liveUrl: "https://tasks.example.com",
        githubUrl: "https://github.com/alexjohnson/taskapp",
        featured: true,
      },
      {
        id: 3,
        name: "Weather Dashboard",
        description: "Real-time weather application with analytics",
        technologies: ["Vue.js", "Express", "Redis"],
        liveUrl: "https://weather.example.com",
        githubUrl: "https://github.com/alexjohnson/weather",
        featured: false,
      },
    ],
    certifications: [
      {
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2023",
      },
      {
        name: "Google Professional Cloud Developer",
        issuer: "Google Cloud",
        date: "2022",
      },
      {
        name: "Scrum Master Certification",
        issuer: "Scrum Alliance",
        date: "2021",
      },
    ],
  };

  const downloadResume = () => {
    // Simulate resume download
    console.log("Downloading resume...");
  };

  const ContactInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border dark:border-gray-700">
        <MailIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {resumeData.personal.email}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border dark:border-gray-700">
        <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {resumeData.personal.phone}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-lg border dark:border-gray-700">
        <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {resumeData.personal.location}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border dark:border-gray-700">
        <Globe className="h-5 w-5 text-orange-600 dark:text-orange-400" />
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Website</p>
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {resumeData.personal.website}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen b py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Card className="mb-8 relative bg-transparent shadow-xl border">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">
                  {resumeData.personal.name}
                </h1>
                <p className="text-xl text-muted-foreground mb-4">
                  {resumeData.personal.title}
                </p>
                <p className="text-muted-foreground max-w-2xl">
                  {resumeData.personal.summary}
                </p>
              </div>
              <div className="flex gap-4 flex-wrap mt-6 lg:mt-0">
                <Button
                  onClick={downloadResume}
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold dark:bg-gray-100 dark:text-blue-700 dark:hover:bg-gray-200">
                  <Download className="h-4 w-4 mr-2" />
                  Download CV
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-300/10">
                  <User className="h-4 w-4 mr-2" />
                  Contact Me
                </Button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              <a
                href={`https://${resumeData.personal.github}`}
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors dark:bg-gray-300/10 dark:hover:bg-gray-300/20">
                <Github className="h-5 w-5" />
              </a>
              <a
                href={`https://${resumeData.personal.linkedin}`}
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors dark:bg-gray-300/10 dark:hover:bg-gray-300/20">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </CardContent>
          <GlowingEffect
            blur={0}
            borderWidth={3}
            spread={80}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />
        </Card>

        <ContactInfo />

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 border border-zinc-500/50 backdrop-blur-sm bg-transparent dark:backdrop-blur-sm">
            <TabsTrigger
              value="experience"
              className="flex items-center space-x-2 ">
              <Briefcase className="h-4 w-4" />
              <span>Experience</span>
            </TabsTrigger>
            <TabsTrigger
              value="skills"
              className="flex items-center space-x-2 ">
              <Code className="h-4 w-4" />
              <span>Skills</span>
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="flex items-center space-x-2 ">
              <GraduationCap className="h-4 w-4" />
              <span>Education</span>
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span>Projects</span>
            </TabsTrigger>
          </TabsList>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-6">
            {isExperienceLoading ? (
              <div className="text-center py-12">
                <div className="text-foreground text-2xl font-medium flex items-center justify-center">
                  <Loader className="mr-2 h-10 w-10 animate-spin" /> Loading
                  experiences...
                </div>
              </div>
            ) : (
              <ExperienceTabContent
                fromResume={true}
                filteredExperience={experiences?.experiences}
              />
            )}
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            {isSkillLoading ? (
              <div className="text-center py-12">
                <div className="text-foreground text-2xl font-medium flex items-center justify-center">
                  <Loader className="mr-2 h-10 w-10 animate-spin" /> Loading
                  skills...
                </div>
              </div>
            ) : (
              <SkillTabContent
                fromResume={true}
                filteredSkills={skills?.skills}
              />
            )}
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-6">
            {isEduLoading ? (
              <div className="text-center py-12">
                <div className="text-foreground text-2xl font-medium flex items-center justify-center">
                  <Loader className="mr-2 h-10 w-10 animate-spin" /> Loading
                  education...
                </div>
              </div>
            ) : (
              <EducationTabContent
                fromResume={true}
                filteredEducation={eduData?.education}
              />
            )}
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {!isProjectLoading
                ? projects?.projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      fromResume={true}
                    />
                  ))
                : Array.from({ length: 6 }).map((_, idx) => (
                    <ProjectCardPlaceholder key={idx} />
                  ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Resume;
