import { motion } from "motion/react";
import { FiGithub } from "react-icons/fi";
import {
  SiDrizzle,
  SiExpress,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiTailwindcss,
} from "react-icons/si";
import { FaCss3Alt, FaNodeJs } from "react-icons/fa";
import ProjectCard from "../ui/ProjectCard";
import SocialLink from "../ui/AnimateButton";

const Projects = () => {
  const projects = [
    {
      id: 111,
      title: "NepTask",
      shortDescription: "Task Management System",
      longDescription:
        "NepTask is a task management system that helps users stay organized by allowing them to add, edit, and delete tasks.",
      images: [
        "neptask1.webp",
        "neptask2.webp",
        "neptask3.webp",
        "neptask4.webp",
        "neptask5.webp",
        "neptask6.webp",
        "neptask7.webp",
        "neptask8.webp",
        "neptask9.webp",
        "neptask10.webp",
        "neptask11.webp",
        "neptask12.webp",
      ],
      thumbnail: "neptask.webp",
      isPrivate: false,
      techStack: [
        {
          name: "HTML5",
          icon: <SiHtml5 fill="#e34f26" size={24} />,
        },
        {
          name: "CSS",
          icon: <FaCss3Alt fill="#1572b6" size={24} />,
        },
        {
          name: "Tailwind CSS",
          icon: <SiTailwindcss fill="#38B2AC" size={24} />,
        },
        {
          name: "JavaScript",
          icon: <SiJavascript fill="#f7df1e" size={24} />,
        },
        {
          name: "Node.js",
          icon: <FaNodeJs fill="#3C873A" size={24} />,
        },
        {
          name: "Express.js",
          icon: <SiExpress fill="#3C873A" size={24} />,
        },
        {
          name: "MySQL",
          icon: <SiMysql fill="#4479A1" size={24} />,
        },
        {
          name: "Drizzle ORM",
          icon: <SiDrizzle fill="#c5f74f" size={24} />,
        },
      ],
      github: "https://github.com/AkkalDhami/TMS-DRIZZLE",
      live: "https://neptask2.vercel.app",
      features: [
        "Authentication",
        "Login With Google",
        "Login With Github",
        "Forgot Password",
        "Reset Password",
        "Smart Scheduling",
        "Advanced Analytics",
        "Progress Tracking",
        "Recurring Tasks",
        "Task Prioritization",
        "Subtask Management",
        "Calendar View",
        "Tasks Filtering",
        "Interactive Dashboard",
        "Reminders",
      ],
    },
    {
      id: 112,
      title: "NepTask",
      shortDescription: "Task Management System",
      longDescription:
        "NepTask is a task management system that helps users stay organized by allowing them to add, edit, and delete tasks.",
      images: [
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format",
        "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&auto=format",
        "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format",
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&auto=format",
        "https://images.unsplash.com/photo-1545665277-5937489579f2?w=800&auto=format",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format",
        "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&auto=format",
      ],
      thumbnail: "neptask.webp",
      isPrivate: false,
      techStack: [
        {
          name: "HTML5",
          icon: <SiHtml5 fill="#e34f26" size={24} />,
        },
        {
          name: "CSS",
          icon: <FaCss3Alt fill="#1572b6" size={24} />,
        },
        {
          name: "Tailwind CSS",
          icon: <SiTailwindcss fill="#38B2AC" size={24} />,
        },
        {
          name: "JavaScript",
          icon: <SiJavascript fill="#f7df1e" size={24} />,
        },
        {
          name: "Node.js",
          icon: <FaNodeJs fill="#3C873A" size={24} />,
        },
        {
          name: "Express.js",
          icon: <SiExpress fill="#3C873A" size={24} />,
        },
        {
          name: "MySQL",
          icon: <SiMysql fill="#4479A1" size={24} />,
        },
        {
          name: "Drizzle ORM",
          icon: <SiDrizzle fill="#c5f74f" size={24} />,
        },
      ],
      github: "https://github.com/AkkalDhami/TMS-DRIZZLE",
      live: "https://neptask2.vercel.app",
      features: [
        "Authentication",
        "Login With Google",
        "Login With Github",
        "Forgot Password",
        "Reset Password",
        "Filter Tasks",
        "Smart Scheduling",
        "Advanced Analytics",
        "Progress Tracking",
        "Recurring Tasks",
        "Task Prioritization",
        "Subtask Management",
        "Calendar View",
        "Tasks Filtering",
        "Interactive Dashboard",
        "QuickNote Addition",
        "Reminders",
      ],
    },
    {
      id: 113,
      title: "NepTask",
      shortDescription: "Task Management System",
      longDescription:
        "NepTask is a task management system that helps users stay organized by allowing them to add, edit, and delete tasks.",
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format",
        "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&auto=format",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format",
        "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&auto=format",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format",
        "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&auto=format",
        "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format",
      ],
      thumbnail: "neptask.webp",
      isPrivate: false,
      techStack: [
        {
          name: "HTML5",
          icon: <SiHtml5 fill="#e34f26" size={24} />,
        },
        {
          name: "CSS",
          icon: <FaCss3Alt fill="#1572b6" size={24} />,
        },
        {
          name: "Tailwind CSS",
          icon: <SiTailwindcss fill="#38B2AC" size={24} />,
        },
        {
          name: "JavaScript",
          icon: <SiJavascript fill="#f7df1e" size={24} />,
        },
        {
          name: "Node.js",
          icon: <FaNodeJs fill="#3C873A" size={24} />,
        },
        {
          name: "Express.js",
          icon: <SiExpress fill="#3C873A" size={24} />,
        },
        {
          name: "MySQL",
          icon: <SiMysql fill="#4479A1" size={24} />,
        },
        {
          name: "Drizzle ORM",
          icon: <SiDrizzle fill="#c5f74f" size={24} />,
        },
      ],
      github: "https://github.com/AkkalDhami/TMS-DRIZZLE",
      live: "https://neptask2.vercel.app",
      features: [
        "Authentication",
        "Login With Google",
        "Login With Github",
        "Forgot Password",
        "Reset Password",
        "Filter Tasks",
        "Smart Scheduling",
        "Advanced Analytics",
        "Progress Tracking",
        "Recurring Tasks",
        "Task Prioritization",
        "Subtask Management",
        "Calendar View",
        "Tasks Filtering",
        "Interactive Dashboard",
        "QuickNote Addition",
        "Reminders",
      ],
    },
   
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
            My Projects
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-zinc-600 dark:text-zinc-300">
            Check out some of my recent work. Each project represents a unique
            challenge and solution.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-3.5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} i={i} project={project} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16">
          <SocialLink
            icon={<FiGithub />}
            text="View More on GitHub"
            href="https://github.com/AkkalDhami"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
