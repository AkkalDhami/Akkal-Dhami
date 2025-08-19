import React from "react";
import { FiLink } from "react-icons/fi";
import { RiCodeSSlashLine } from "react-icons/ri";
import { motion } from "framer-motion";
import IconButtonLink from "./IconButtonLink";
import ProjectModal from "../components/ProjectModal";
import { FaCode } from "react-icons/fa6";

const ProjectCard = ({ project, i }) => {
  const {
    title,
    shortDescription,
    thumbnail,
    github,
    live,
    techStack,
    features,
    images,
  } = project;

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.07, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <div>
      <div
        className={`w-full relative flex flex-col ${
          i % 2 !== 0 ? "md:flex-row-reverse" : "lg:flex-row"
        } justify-between gap-12 mt-32`}>
        <div className="project-card-wrapper mx-auto">
          <ProjectModal
            images={images}
            triggerElement={<img src={thumbnail} alt={title} />}
            imageAnimation={{
              hover: { scale: 1.05, rotate: 0.5 },
              tap: { scale: 0.95 },
            }}
            modalAnimation={{
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.95 },
            }}
          />
          <div className="flex items-center gap-1 md:gap-4 my-8">
            <IconButtonLink
              icon={FiLink}
              text="Live Preview"
              href={live}
              isWide={true}
            />

            <IconButtonLink
              icon={FaCode}
              text="Source Code"
              href={github}
              isWide={true}
            />
          </div>
        </div>

        {/* Description */}
        <div className="project-desc z-10 mx-auto sm:mr-auto">
          <div className="project-desc-inner max-w-[1200px] flex flex-col space-y-2 mb-6">
            <h2 className="text-3xl font-bold text-primary-600">{title}</h2>
            <p className="text-zinc-900 dark:text-zinc-100 font-semibold text-[24px]">
              {shortDescription}
            </p>

            <motion.div
              className="flex flex-wrap gap-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}>
              {features.map((feature, index) => (
                <motion.strong
                  key={feature}
                  variants={fadeInUp}
                  custom={index}
                  className="text-sm text-zinc-700 dark:text-zinc-300">
                  #{feature}
                </motion.strong>
              ))}
            </motion.div>
          </div>

          {/* Tech stack */}
          <motion.div
            className="stack grid grid-cols-2 md:grid-cols-4 gap-4 my-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}>
            {techStack.map((tech, index) => (
              <motion.span
                key={index}
                variants={fadeInUp}
                custom={index}
                className="flex items-center gap-2 flex-col text-sm text-zinc-700 dark:text-zinc-300">
                {tech.icon}
                <span className="font-semibold">{tech.name}</span>
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
