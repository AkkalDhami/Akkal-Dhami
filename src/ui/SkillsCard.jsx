import React from "react";

import { motion } from "framer-motion";

const SkillsCard = ({ category, index }) => {
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
            whileHover={{ scale: 1.1 }}
            variants={item}
            className="p-4 relative rounded-3xl flex items-center gap-3 transition-colors">
            <div className="p-2 rounded-md">{skill.icon}</div>
            <div>
              <h4 className={`font-medium dark:text-white text-zinc-900`}>
                {skill.name}
              </h4>
              <p className={`text-sm dark:text-zinc-400 text-zinc-600`}>
                {skill.description}
              </p>
            </div>
            <div className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 h-px w-[calc(100%-24px)] bg-gradient-to-r from-transparent via-zinc-900 dark:via-zinc-100 to-transparent"></div>
            <div className="absolute top-[3px] left-1/2 -translate-x-1/2 h-px w-[calc(100%-24px)] bg-gradient-to-r from-transparent via-zinc-900 dark:via-zinc-100 to-transparent"></div>
            <div
              className={`absolute top-[1px] h-[calc(100%-2px)] w-px bg-gradient-to-t from-transparent via-zinc-900 dark:via-zinc-100 to-transparent`}></div>
            <div
              className={`absolute top-[1px] right-[-1px] h-[calc(100%-2px)] w-px bg-gradient-to-t from-transparent via-zinc-900 dark:via-zinc-100 to-transparent`}></div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SkillsCard;
