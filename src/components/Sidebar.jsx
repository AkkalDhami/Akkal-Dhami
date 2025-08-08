import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiX } from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi";
import { VscTools } from "react-icons/vsc";
import { RiCodeSSlashFill } from "react-icons/ri";
import { LuPhone, LuUser } from "react-icons/lu";
import SocialLink from "../ui/AnimateButton";

const Sidebar = ({ activeSection, toggleSidebar }) => {
  const navLinks = [
    {
      id: "home",
      icon: <HiOutlineHome />,
      label: "Home",
    },
    {
      id: "about",
      icon: <LuUser />,
      label: "About",
    },
    {
      id: "skills",
      icon: <VscTools />,
      label: "Skills",
    },
    {
      id: "projects",
      icon: <RiCodeSSlashFill />,
      label: "Projects",
    },
    {
      id: "contact",
      icon: <LuPhone />,
      label: "Contact",
    },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    toggleSidebar();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30 backdrop-blur-[1px] z-40"
        onClick={toggleSidebar}
      />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 15 }}
        className="fixed top-0 right-0 h-full w-64 z-50 shadow-xl bg-white dark:bg-[#060010]">
        <div className="flex justify-end p-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleSidebar}
            className="p-2 rounded-full cursor-pointer text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
            aria-label="Close sidebar">
            <FiX size={24} />
          </motion.button>
        </div>

        <div className="px-4 py-6">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(link.id)}
                className={`px-4 py-3 flex items-center gap-3 rounded-lg text-left font-medium transition-colors duration-300 cursor-pointer
                  ${
                    activeSection === link.id
                      ? "text-primary-600 bg-zinc-50 dark:bg-[#0d0d1a]"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-[#0d0d1a]"
                  }
                `}>
                {link.icon} {link.label}
              </motion.button>
            ))}
            <SocialLink
              icon={<FiGithub />}
              text="GitHub"
              href="https://github.com/AkkalDhami"
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
