import React from "react";
import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiDownload,
  FiLoader,
} from "react-icons/fi";
import { ReactTyped } from "react-typed";
import VSCodeProfileCard from "./CodeCard";
import SocialLink from "../ui/AnimateButton";
import { HiChevronDoubleRight } from "react-icons/hi";
import { useGetMyContactsQuery } from "../features/aboutApi";
import { FlipWords } from "./ui/flip-words";
import { TextScramble } from "./ui/text-scramble";
import { TextLoop } from "./ui/text-loop";
import { RiGithubLine } from "react-icons/ri";
const Hero = () => {
  const { data, isLoading } = useGetMyContactsQuery();

  const words = [
    "MERN Stack Developer",
    "React.js Enthusiast",
    "Backend Developer with Node.JS",
    "FullStack Developer",
    "Builder of Modern Web Experiences",
    "Tech Enthusiast",
  ];

  if (isLoading) {
    return (
      <section
        id="home"
        className="min-h-screen flex justify-center items-center">
        <div className="px-4 sm:px-6 flex items-center gap-4 lg:px-8 py-16 relative z-10">
          <FiLoader className="animate-spin text-6xl" />
          <h1 className="text-4xl flex flex-col md:text-5xl lg:text-6xl font-bold leading-tight">
            <span>Loading...</span>
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="min-h-screen flex items-center">
      <div className="px-4 sm:px-6 mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            <h1 className="text-4xl flex flex-col md:text-5xl lg:text-6xl font-bold leading-tight">
              <span>👋 Hi I'm</span>
              <TextScramble className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-800">
                {data?.data[0]?.name}
              </TextScramble>
              <span className=""></span>
            </h1>

            <motion.h2
              className="text-xl md:text-2xl font-semibold mt-4 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}>
              <FlipWords words={words} />
            </motion.h2>
            <motion.div
              className="mt-6 text-lg max-w-lg font-medium text-zinc-600 dark:text-zinc-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}>
              I create modern, responsive web applications with{" "}
              <TextLoop>
                <strong className="font-semibold text-primary-600">
                  MongoDB
                </strong>
                <strong className="font-semibold text-primary-600">
                  MySQL
                </strong>
              </TextLoop>
              ,{" "}
              <TextLoop transition={{ duration: 1 }}>
                <strong className="font-semibold text-primary-600">
                  Express.js
                </strong>
                <strong className="font-semibold text-primary-600">
                  Node.js
                </strong>
              </TextLoop>
              ,{" "}
              <TextLoop transition={{ duration: 1.5 }}>
                <strong className="font-semibold text-primary-600">
                  React.js
                </strong>
                <strong className="font-semibold text-primary-600">
                  Next.js
                </strong>
              </TextLoop>
              ,{" "}
              <TextLoop transition={{ duration: 1.8 }}>
                <strong className="font-semibold text-primary-600">
                  JavaScript
                </strong>
                <strong className="font-semibold text-primary-600">
                  TypeScript
                </strong>
              </TextLoop>
              . Clean code, smooth experiences, and modern design are at the
              heart of what I do.
            </motion.div>

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
        <div className="flex items-center mt-10 justify-center">
          <a
            href="https://github.com/AkkalDhami"
            target="_blank"
            className="flex items-center justify-center relative group rounded-full gap-2 text-zinc-600 dark:text-zinc-300 border border-zinc-500/30 text-sm px-3 py-2 font-medium">
            <RiGithubLine className="text-xl" />
            View my github profile
            <div className="absolute -top-px group-hover:via-primary-600 left-1/2 -translate-x-1/2 h-px w-[calc(100%-24px)] bg-gradient-to-r from-transparent  via-transparent to-transparent"></div>
            <div className="absolute -bottom-px via-primary-600 left-1/2 -translate-x-1/2 h-px w-[calc(100%-24px)] bg-gradient-to-r from-transparent group-hover:via-zinc-900 group-hover:dark:via-zinc-100 to-transparent"></div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
