import React from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

const Sidebar = ({ activeSection, toggleSidebar }) => {
  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
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
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={toggleSidebar}
      />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 15 }}
        className="fixed top-0 right-0 h-full w-64 z-50 shadow-xl bg-white dark:bg-zinc-900">
        <div className="flex justify-end p-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleSidebar}
            className="p-2 rounded-full text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
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
                className={`px-4 py-3 rounded-lg text-left font-medium transition-colors duration-300
                  ${
                    activeSection === link.id
                      ? "text-orange-600 bg-indigo-50 dark:bg-zinc-800"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  }
                `}>
                {link.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
