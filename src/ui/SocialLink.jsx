import { motion } from "motion/react";
import React from "react";

const SocialLink = ({ icon, text, href }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="inline-flex relative items-center justify-center px-3 py-2 rounded-lg gap-2 text-zinc-600 dark:text-zinc-300 border border-zinc-500/30">
      {icon}
      {text}
      <div className="absolute -bottom-px left-1/2 -translate-x-1/2 h-px w-[calc(100%-24px)] bg-gradient-to-r from-transparent via-orange-600 to-transparent"></div>
    </motion.a>
  );
};

export default SocialLink;
