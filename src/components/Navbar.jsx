import React, { useState, useEffect } from "react";
import { FiMenu, FiMoon, FiSun } from "react-icons/fi";

import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";

const Navbar = ({ activeSection, toggleSidebar }) => {
  const [scrolled, setScrolled] = useState(false);

  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-40 transition-all duration-300 ${
        scrolled ? "dark:bg-[#060010] shadow-md bg-white" : "bg-transparent"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1 }}
            className="flex-shrink-0 flex items-center">
            <div
              className={`text-lg sm:text-2xl flex items-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700`}>
              Akkal Dhami
            </div>
          </motion.div>

          <div className="flex items-center gap-6">
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {navLinks.map((link) => (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    whileHover={{ y: -2 }}
                    className={`px-3 py-1.5 font-medium cursor-pointer rounded-full text-[16px] transition-colors duration-300 ${
                      activeSection === link.id
                        ? "text-orange-700 bg-orange-500/10"
                        : "dark:text-zinc-300 dark:hover:text-orange-600 text-zinc-700 hover:text-orange-600"
                    }`}>
                    {link.label}
                  </motion.button>
                ))}
              </div>
            </div>
            <motion.button
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="cursor-pointer"
              aria-label="Toggle dark mode">
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </motion.button>
          </div>

          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleSidebar}
              className={`inline-flex items-center justify-center p-2 rounded-md dark:text-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 hover:bg-zinc-100`}
              aria-label="Open menu">
              <FiMenu size={24} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
