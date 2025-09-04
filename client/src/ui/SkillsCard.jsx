import React from "react";

import { motion } from "framer-motion";
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";

const iconMap = { ...SiIcons, ...FaIcons };

export const TechIcon = (icon) => {
  const Icon = iconMap[icon?.component];
  return Icon ? (
    <Icon className="w-8 h-8" style={{ color: icon?.color }} />
  ) : (
    <CodeXml className="w-8 h-8" />
  );
};

const SkillsCard = ({ categorySkills, category, index }) => {
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="rounded-xl p-3 sm:p-6">
      <div className="flex items-center gap-3 mb-3">
        <h3 className={`text-xl font-semibold dark:text-white text-zinc-900`}>
          {category}
        </h3>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categorySkills?.map((skill) => (
          <motion.div
            key={skill._id}
            whileHover={{ scale: 1.1 }}
            variants={item}
            className="p-4 relative group rounded-3xl flex items-center gap-3 transition-colors">
            {/* <div className="p-2 rounded-md">{TechIcon(skill.icon)}</div> */}
            <div
              className="p-2 ml-3 rounded-md"
              style={{ backgroundColor: `${skill.icon?.color}20` }}>
              {TechIcon(skill.icon)}
            </div>
            <div>
              <h4 className={`font-medium dark:text-white text-zinc-900`}>
                {skill.name}
              </h4>
              <p className={`text-sm dark:text-zinc-400 text-zinc-600`}>
                {skill.description}
              </p>
            </div>
           

            <div className="absolute bottom-[-1px] group-hover:via-primary-600 left-1/2 -translate-x-1/2 h-px w-[calc(100%-24px)] bg-gradient-to-r from-transparent  via-zinc-900 dark:via-zinc-100 to-transparent"></div>
            <div className="absolute top-[1px] group-hover:via-primary-600 left-1/2 -translate-x-1/2 h-px w-[calc(100%-24px)] bg-gradient-to-r from-transparent  via-zinc-900 dark:via-zinc-100 to-transparent"></div>
            <div className="absolute top-[1px] group-hover:via-primary-600 h-[calc(100%-2px)] w-px bg-gradient-to-t from-transparent  via-zinc-900 dark:via-zinc-100 to-transparent"></div>
            <div className="absolute top-[1px] right-[-1px] group-hover:via-primary-600 h-[calc(100%-2px)] w-px bg-gradient-to-t from-transparent  via-zinc-900 dark:via-zinc-100 to-transparent"></div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SkillsCard;
