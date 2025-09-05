import React from "react";
import { color, motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaGitAlt,
  FaFigma,
} from "react-icons/fa";
import {
  SiJavascript,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiRedux,
  SiHtml5,
  SiCss3,
  SiMysql,
  SiDrizzle,
  SiGithub,
  SiPostman,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import SkillsCard from "../ui/SkillsCard";
import { useSelector } from "react-redux";
import { useGetSkillsQuery } from "../features/skillApi";
import { useMemo } from "react";

const Skills = () => {
  const { darkMode } = useSelector((state) => state.theme);

  const { data } = useGetSkillsQuery();

  const skillsByCategory = useMemo(() => {
    return data?.skills?.reduce((acc, skill) => {
      acc[skill.category] = [...(acc[skill.category] || []), skill];
      return acc;
    }, {});
  }, [data?.skills]);
  const skillCategories = [
    {
      title: "Frontend Technologies",
      skills: [
        {
          icon: <SiHtml5 fill="#e34f26" size={28} />,
          name: "HTML",
          description: "Structure",
          color: "#e34f26",
        },
        {
          icon: <SiCss3 fill="#1572b6" size={28} />,
          name: "CSS",
          description: "Styling",
          color: "#1572b6",
        },
        {
          icon: <SiJavascript fill="#f7df1e" size={28} />,
          name: "JavaScript",
          description: "Functionality",
          color: "#f7df1e",
        },
        {
          icon: <FaReact fill="#61DAFB" size={28} />,
          name: "React",
          description: "UI Library",
          color: "#61DAFB",
        },
        {
          icon: <SiTailwindcss fill="#38B2AC" size={28} />,
          name: "Tailwind",
          description: "CSS Framework",
          color: "#38B2AC",
        },
        {
          icon: <SiRedux fill="#764abc" size={28} />,
          name: "Redux",
          description: "State Management",
          color: "#764abc",
        },
      ],
    },
    {
      title: "Backend Technologies",
      skills: [
        {
          icon: <FaNodeJs fill="#3C873A" size={28} />,
          name: "Node.js",
          description: "Runtime Environment",
          color: "#3C873A",
        },
        {
          icon: <SiExpress fill={darkMode ? "#fff" : "#000"} size={28} />,
          name: "Express.js",
          description: "Backend Framework",
          color: darkMode ? "#fff" : "#000",
        },
      ],
    },
    {
      title: "Database",
      skills: [
        {
          icon: <SiMongodb fill="#47a248" size={28} />,
          name: "MongoDB",
          description: "NoSQL Database",
          color: "#47a248",
        },
        {
          icon: <SiMysql fill="#4479A1" size={28} />,
          name: "MySQL",
          description: "SQL Database",
          color: "#4479A1",
        },
        {
          icon: <SiDrizzle fill="#c5f74f" size={28} />,
          name: "Drizzle",
          description: "ORM for MySQL",
          color: "#c5f74f",
        },
      ],
    },
    {
      title: "Tools & Other",
      skills: [
        {
          icon: <FaGitAlt fill="#f1502f" size={28} />,
          name: "Git",
          description: "Version Control",
          color: "#f1502f",
        },
        {
          icon: <SiGithub fill={darkMode ? "#fff" : "#000"} size={28} />,
          name: "GitHub",
          description: "Code Repository",
          color: darkMode ? "#fff" : "#000",
        },
        {
          icon: <VscVscode fill="#007ACC" size={28} />,
          name: "VS Code",
          description: "Code Editor",
          color: "#007ACC",
        },
        {
          icon: <FaFigma fill="#cd7ce8" size={28} />,
          name: "Figma",
          description: "UI/UX Design",
          color: "#cd7ce8",
        },
        {
          icon: <SiPostman fill="#FF6C37" size={28} />,
          name: "Postman",
          description: "API Testing",
          color: "#FF6C37",
        },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <h2 className={`text-3xl font-bold`}>My Skills</h2>
          <p
            className={`mt-6 max-w-2xl mx-auto text-lg dark:text-zinc-300 text-zinc-600`}>
            Technologies and tools I work with
          </p>
        </motion.div>

        <div>

          {Object.entries(skillsByCategory || {}).map(
            ([category, categorySkills], index) => (
              <SkillsCard
                key={category}
                categorySkills={categorySkills}
                category={category}
                index={index}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
