// src/components/Projects.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const Projects = ({ darkMode }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "Full-featured e-commerce solution with product management, cart, and payment integration.",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "fullstack",
      github: "#",
      live: "#",
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "Real-time task management application with drag & drop functionality and team collaboration.",
      tags: ["React", "Firebase", "Tailwind CSS"],
      category: "frontend",
      github: "#",
      live: "#",
    },
    {
      id: 3,
      title: "Social Media Dashboard",
      description:
        "Analytics dashboard for social media metrics with real-time data visualization.",
      tags: ["React", "Express", "MongoDB", "D3.js"],
      category: "fullstack",
      github: "#",
      live: "#",
    },
    {
      id: 4,
      title: "Weather Forecast App",
      description:
        "Weather application with location-based forecasts and interactive maps.",
      tags: ["React", "OpenWeather API", "Leaflet"],
      category: "frontend",
      github: "#",
      live: "#",
    },
    {
      id: 5,
      title: "REST API for Blog Platform",
      description:
        "Secure RESTful API for a blogging platform with user authentication and CRUD operations.",
      tags: ["Node.js", "Express", "MongoDB", "JWT"],
      category: "backend",
      github: "#",
      live: "#",
    },
    {
      id: 6,
      title: "Portfolio Website",
      description:
        "Modern portfolio website with responsive design and dark mode.",
      tags: ["React", "Tailwind CSS", "Framer Motion"],
      category: "frontend",
      github: "#",
      live: "#",
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="projects" className={`py-20 `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <h2
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
            My Projects
          </h2>
          <div
            className={`w-20 h-1 mx-auto mt-4 ${
              darkMode ? "bg-indigo-500" : "bg-indigo-600"
            }`}></div>
          <p
            className={`mt-6 max-w-2xl mx-auto text-lg ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}>
            Check out some of my recent work. Each project represents a unique
            challenge and solution.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              whileHover={{ y: -10 }}
              className={`rounded-xl overflow-hidden shadow-xl ${
                darkMode ? "bg-gray-700" : "bg-gray-50"
              }`}>
              <div className="h-48 overflow-hidden">
                <div className="bg-gray-200 border-2 border-dashed w-full h-full" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3
                    className={`text-xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}>
                    {project.title}
                  </h3>
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub repository"
                      className={`p-2 rounded-full ${
                        darkMode
                          ? "text-gray-300 hover:bg-gray-600"
                          : "text-gray-600 hover:bg-gray-200"
                      }`}>
                      <FiGithub size={20} />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Live project"
                      className={`p-2 rounded-full ${
                        darkMode
                          ? "text-gray-300 hover:bg-gray-600"
                          : "text-gray-600 hover:bg-gray-200"
                      }`}>
                      <FiExternalLink size={20} />
                    </a>
                  </div>
                </div>
                <p
                  className={`mb-4 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        darkMode
                          ? "bg-indigo-500/20 text-indigo-400"
                          : "bg-indigo-100 text-indigo-700"
                      }`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
              darkMode
                ? "bg-transparent border border-indigo-400 text-indigo-400 hover:bg-indigo-900/30"
                : "bg-transparent border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            }`}>
            View More on GitHub
            <FiGithub size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
