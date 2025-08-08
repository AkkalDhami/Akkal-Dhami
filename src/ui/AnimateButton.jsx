import { motion } from "motion/react";
import React from "react";

const SocialLink = ({ icon, text, href, isBlank = true }) => {
  return (
    <motion.a
      href={href}
      target={isBlank ? "_blank" : "_self"}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="inline-flex relative group items-center justify-center px-3 py-2 rounded-lg gap-2 text-zinc-600 dark:text-zinc-300 border border-zinc-500/30">
      {icon}
      {text}
      <div className="absolute -top-px group-hover:via-indigo-600 left-1/2 -translate-x-1/2 h-px w-[calc(100%-24px)] bg-gradient-to-r from-transparent  via-primary-700 to-transparent"></div>

      <div className="absolute -bottom-px group-hover:via-indigo-600 left-1/2 -translate-x-1/2 h-px w-[calc(100%-24px)] bg-gradient-to-r from-transparent via-primary-600 to-transparent"></div>
    </motion.a>
  );
};

export default SocialLink;
