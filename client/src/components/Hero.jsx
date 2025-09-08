import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiTwitter, FiDownload } from "react-icons/fi";
import { ReactTyped } from "react-typed";
import VSCodeProfileCard from "./CodeCard";
import SocialLink from "../ui/AnimateButton";
import { HiChevronDoubleRight } from "react-icons/hi";
import { useGetMyContactsQuery } from "../features/aboutApi";

const Hero = () => {
    const { data, isError, error } = useGetMyContactsQuery();
  return (
    <section
      id="home"
      className="min-h-screen flex items-center">
      <div className="px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            <h1 className="text-4xl flex flex-col md:text-5xl lg:text-6xl font-bold leading-tight">
              <span>👋 Hi I'm</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-800">
                {data?.data[0]?.name}
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
                  "Backend Engineer with Node.JS",
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
              className="mt-6 text-lg max-w-lg font-medium text-zinc-600 dark:text-zinc-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}>
              I build modern, responsive web applications using{" "}
              <strong className="font-semibold text-primary-600">
                MongoDB
              </strong>
              ,{" "}
              <strong className="font-semibold text-primary-600">
                Express
              </strong>
              ,{" "}
              <strong className="font-semibold text-primary-600">React</strong>,
              and{" "}
              <strong className="font-semibold text-primary-600">
                Node.js
              </strong>
              . Passionate about creating seamless user experiences with clean,
              efficient code.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-2 sm:gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}>
              <SocialLink
                icon={<HiChevronDoubleRight />}
                text="Let's Talk"
                href="#contact"
                isBlank={false}
                isLarge={true}
              />
              <SocialLink
                icon={<FiDownload />}
                text="Download CV"
                href="#"
                isBlank={false}
                isLarge={true}
              />
            </motion.div>

            <div className="flex flex-wrap mt-10 gap-4">
              <SocialLink
                icon={<FiGithub />}
                text="GitHub"
                href="https://github.com/AkkalDhami"
              />
              <SocialLink
                icon={<FiLinkedin />}
                text="LinkedIn"
                href="https://www.linkedin.com/in/akkal-dhami-854273378/"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative hidden md:flex justify-center">
            <VSCodeProfileCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
