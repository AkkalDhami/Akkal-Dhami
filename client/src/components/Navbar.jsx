import React, { useState, useEffect } from "react";
import { FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { cycleMode } from "../features/themeSlice";
import { LuSunMoon } from "react-icons/lu";

const Navbar = ({ activeSection, toggleSidebar }) => {
  const [scrolled, setScrolled] = useState(false);
  const { mode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(mode);
  }, [mode]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-40 transition-all duration-300 ${
        scrolled ? "dark:bg-slate-950 shadow-md bg-white" : "bg-transparent"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1 }}
            className="flex-shrink-0 flex items-center">
            <div className="text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700">
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
                    className={`px-3 py-1 font-medium rounded-lg text-sm transition-colors duration-300 ${
                      activeSection === link.id
                        ? "text-primary bg-zinc-100 dark:bg-slate-800"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}>
                    {link.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Dark mode toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => dispatch(cycleMode())}
              className="cursor-pointer p-2"
              aria-label="Toggle dark mode">
              {mode === "dark" ? <FiSun size={24} /> : <FiMoon size={24} />}
            </motion.button>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleSidebar}
              className="inline-flex items-center justify-center p-2 rounded-md dark:text-zinc-300 dark:hover:bg-[#0d0d1a] text-zinc-700 hover:bg-zinc-100"
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
