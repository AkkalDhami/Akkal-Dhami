// src/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiTwitter, FiDownload } from "react-icons/fi";

import VSCodeProfileCard from "./CodeCard";
import { ReactTyped, Typed } from "react-typed";
import { FaArrowRight } from "react-icons/fa";
const Hero = ({ darkMode }) => {
  return (
    <section
      id="home"
      className={`min-h-screen flex items-center relative overflow-hidden `}>
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            <h1 className="text-4xl flex flex-col md:text-5xl lg:text-6xl font-bold leading-tight">
              <span>👋 Hi I'm</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-800">
                Akkal Dhami
              </span>
            </h1>
            <motion.h2
              className="text-xl md:text-2xl font-semibold mt-4 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}>
              <ReactTyped
                strings={[
                  "MERN Stack Developer",
                  "React.js Enthusiast",
                  "Backend Engineer with Node & Express",
                  "FullStack Developer",
                  "Builder of Modern Web Experiences",
                  "Tech Enthusiast",
                ]}
                typeSpeed={50}
                backSpeed={30}
                loop
              />
            </motion.h2>

            <motion.p
              className={`mt-6 text-lg max-w-lg font-medium ${
                darkMode ? "text-zinc-300" : "text-zinc-600"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}>
              I build modern, responsive web applications using{" "}
              <strong className="font-semibold text-orange-600">MongoDB</strong>
              ,{" "}
              <strong className="font-semibold text-orange-600">Express</strong>
              , <strong className="font-semibold text-orange-600">React</strong>
              , and{" "}
              <strong className="font-semibold text-orange-600">Node.js</strong>
              . Passionate about creating seamless user experiences with clean,
              efficient code.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className={`px-6 py-3 rounded-lg flex items-center gap-2 font-medium bg-orange-600 text-white hover:bg-orange-700`}>
                <span>Let's Connect</span> <FaArrowRight />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${
                  darkMode
                    ? "bg-transparent border border-zinc-100 text-zinc-50 hover:bg-zinc-50 hover:text-zinc-900"
                    : "bg-transparent border border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-zinc-50"
                }`}>
                <FiDownload size={18} />
                Download CV
              </motion.a>
            </motion.div>

            <motion.div
              className="flex gap-4 mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub">
                <motion.div
                  whileHover={{ y: -5, scale: 1.1 }}
                  className={`p-3 rounded-full ${
                    darkMode
                      ? "bg-zinc-800 hover:bg-zinc-700"
                      : "bg-white hover:bg-zinc-100"
                  } shadow-md`}>
                  <FiGithub size={24} />
                </motion.div>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn">
                <motion.div
                  whileHover={{ y: -5, scale: 1.1 }}
                  className={`p-3 rounded-full ${
                    darkMode
                      ? "bg-zinc-800 hover:bg-zinc-700"
                      : "bg-white hover:bg-zinc-100"
                  } shadow-md`}>
                  <FiLinkedin size={24} />
                </motion.div>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter">
                <motion.div
                  whileHover={{ y: -5, scale: 1.1 }}
                  className={`p-3 rounded-full ${
                    darkMode
                      ? "bg-zinc-800 hover:bg-zinc-700"
                      : "bg-white hover:bg-zinc-100"
                  } shadow-md`}>
                  <FiTwitter size={24} />
                </motion.div>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center">
            <VSCodeProfileCard darkMode={darkMode} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
