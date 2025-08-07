// src/components/Skills.jsx
import React from "react";
import { motion } from "framer-motion";
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

const Skills = ({ darkMode }) => {
  const skillCategories = [
    {
      title: "Frontend Technologies",
      icon: <FaReact size={28} />,
      skills: [
        {
          icon: <SiHtml5 fill="#e34f26" size={28} />,
          name: "HTML",
          description: "Structure",
          bgcolor: "#e34f26",
        },
        {
          icon: <SiCss3 fill="#1572b6" size={28} />,
          name: "CSS",
          description: "Styling",
        },
        {
          icon: <SiJavascript fill="#f7df1e" size={28} />,
          name: "JavaScript",
          description: "Functionality",
        },
        {
          icon: <FaReact fill="#61DAFB" size={28} />,
          name: "React",
          description: "UI Library",
        },
        {
          icon: <SiTailwindcss fill="#38B2AC" size={28} />,
          name: "Tailwind",
          description: "CSS Framework",
        },
        {
          icon: <SiRedux fill="#764abc" size={28} />,
          name: "Redux",
          description: "State Management",
        },
      ],
    },
    {
      title: "Backend Technologies",
      icon: <FaNodeJs size={28} />,
      skills: [
        {
          icon: <FaNodeJs fill="#3C873A" size={28} />,
          name: "Node.js",
          description: "Runtime Environment",
        },
        {
          icon: <SiExpress fill={`${darkMode ? "#fff" : "#000"}`} size={28} />,
          name: "Express.js",
          description: "Backend Framework",
        },
      ],
    },
    {
      title: "Database",
      icon: <FaDatabase size={28} />,
      skills: [
        {
          icon: <SiMongodb fill="#47a248" size={28} />,
          name: "MongoDB",
          description: "NoSQL Database",
        },
        {
          icon: <SiMysql fill="#4479A1" size={28} />,
          name: "MySQL",
          description: "SQL Database",
        },
        {
          icon: <SiDrizzle fill="#c5f74f" size={28} />,
          name: "Drizzle",
          description: "ORM for MySQL",
        },
      ],
    },
    {
      title: "Tools & Other",
      icon: <FaGitAlt size={28} />,
      skills: [
        {
          icon: <FaGitAlt fill="#f1502f" size={28} />,
          name: "Git",
          description: "Version Control",
        },
        {
          icon: <SiGithub fill={darkMode ? "#fff" : "#000"} size={28} />,
          name: "GitHub",
          description: "Code Repository",
        },
        {
          icon: <VscVscode fill="#007ACC" size={28} />,
          name: "VS Code",
          description: "Code Editor",
        },

        {
          icon: <FaFigma fill="#cd7ce8" size={28} />,
          name: "Figma",
          description: "UI/UX Design",
        },
        {
          icon: <SiPostman fill="#FF6C37" size={28} />,
          name: "Postman",
          description: "API Testing",
        },
      ],
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="skills" className={`py-20 `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <h2
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-zinc-900"
            }`}>
            My Skills
          </h2>
          <div
            className={`w-20 h-1 mx-auto mt-4 ${
              darkMode ? "bg-indigo-500" : "bg-indigo-600"
            }`}></div>
          <p
            className={`mt-6 max-w-2xl mx-auto text-lg ${
              darkMode ? "text-zinc-300" : "text-zinc-600"
            }`}>
            Technologies and tools I work with
          </p>
        </motion.div>

        <div className="">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`rounded-xl p-6`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-3 rounded-full `}>{category.icon}</div>
                <h3
                  className={`text-xl font-semibold ${
                    darkMode ? "text-white" : "text-zinc-900"
                  }`}>
                  {category.title}
                </h3>
              </div>

              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    variants={item}
                    className={`p-4 rounded-lg flex items-center gap-3 transition-colors`}>
                    <div
                      className={`p-2 rounded-md bg-[${skill.bgcolorcolor}] text-[${skill.textColor}]`}>
                      {skill.icon}
                    </div>
                    <div>
                      <h4
                        className={`font-medium ${
                          darkMode ? "text-white" : "text-zinc-900"
                        }`}>
                        {skill.name}
                      </h4>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-zinc-400" : "text-zinc-600"
                        }`}>
                        {skill.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
