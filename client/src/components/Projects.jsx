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
import { useGetProjectsQuery } from "../features/projectApi";

const Projects = () => {
  const { data } = useGetProjectsQuery();

  const projects = data?.projects || [];

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
      <div className="px-4 sm:px-6 lg:px-8">
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
          {projects?.map((project, i) => (
            <ProjectCard key={project._id} i={i} project={project} />
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
