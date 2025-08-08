import React from "react";
import { FiLink } from "react-icons/fi";
import { RiCodeSSlashLine } from "react-icons/ri";
import { motion } from "framer-motion";
import IconButtonLink from "./IconButtonLink";

const ProjectCard = ({ project, i }) => {
  const { title, shortDescription, github, live, techStack, features, image } =
    project;

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
        {/* Image and buttons */}
        <div className="project-card-wrapper relative group mx-auto">
          <div className="drop-shadow-[0_0px_39px_#31477c70]">
            <img src={image} alt={title} />
          </div>

          <div className="flex items-center gap-2 md:gap-4 my-8">
            <IconButtonLink
              icon={FiLink}
              text="Live Preview"
              href={live}
              bgColor="bg-[#060010] hover:bg-zinc-900 dark:bg-white dark:hover:bg-zinc-100"
              textColor="text-white dark:text-zinc-800"
              isWide={true}
            />

            <IconButtonLink
              icon={RiCodeSSlashLine}
              text="Source Code"
              href={github}
              bgColor="bg-orange-600 hover:bg-orange-700"
              textColor="text-white"
              isWide={true}
            />
          </div>
        </div>

        {/* Description */}
        <div className="project-desc z-10 mx-auto sm:mr-auto">
          <div className="project-desc-inner max-w-[1200px] flex flex-col space-y-2 mb-6">
            <h2 className="text-3xl font-bold text-orange-600">{title}</h2>
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
                  className="text-sm px-3 py-1 bg-zinc-100 dark:bg-[#0d0d1a] rounded-full">
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
