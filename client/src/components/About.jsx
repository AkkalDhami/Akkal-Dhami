import React from "react";
import { motion } from "framer-motion";
import { FiAward, FiUsers, FiFolder } from "react-icons/fi";
import { ReactTyped } from "react-typed";
import IconButtonLink from "../ui/IconButtonLink";
import { HiChevronDoubleRight } from "react-icons/hi";
import SocialLink from "../ui/AnimateButton";
import { GoDownload } from "react-icons/go";

const About = () => {
  const stats = [
    { icon: <FiAward size={24} />, value: "5+", label: "Years Experience" },
    { icon: <FiUsers size={24} />, value: "20+", label: "Clients" },
    { icon: <FiFolder size={24} />, value: "50+", label: "Projects" },
  ];

  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
            About Me
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-zinc-600 dark:text-zinc-300">
            Get to know more about me, my background, and what drives me as a
            developer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <div className="text-2xl font-semibold mb-6 grid grid-cols-1 md:flex md:items-center gap-2 text-zinc-900 dark:text-white">
              <h3>I'm Akkal, a</h3>
              <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700">
                <ReactTyped
                  strings={[
                    "MERN Stack Developer",
                    "React.js Enthusiast",
                    "Web Developer",
                    "FullStack Developer",
                    "Tech Enthusiast",
                  ]}
                  typeSpeed={50}
                  backSpeed={30}
                  loop
                />
              </h3>
            </div>

            <div className="space-y-4 mb-4 text-lg text-zinc-600 dark:text-zinc-300">
              <p>
                With over 5 years of experience in web development, I specialize
                in building full-stack applications using the MERN stack
                (MongoDB, Express.js, React.js, Node.js).
              </p>
              <p>
                My journey began as a frontend developer, where I fell in love
                with creating interactive user interfaces. Over time, I expanded
                my skills to include backend development, allowing me to build
                complete, end-to-end solutions.
              </p>
              <p>
                I'm passionate about writing clean, maintainable code and
                staying up-to-date with the latest industry trends and
                technologies. When I'm not coding, you can find me contributing
                to open-source projects or exploring new tech innovations.
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <SocialLink
                icon={<HiChevronDoubleRight />}
                text="Let's Talk"
                href="#contact"
                isBlank={false}
                isLarge={true}
              />
              <SocialLink
                icon={<GoDownload />}
                text="Download CV"
                href="#"
                isBlank={false}
                isLarge={true}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  className="p-6 rounded-xl flex flex-col items-center text-center bg-zinc-50 dark:bg-[#110a25]">
                  <div className="p-3 rounded-full mb-4 bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                    {stat.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-zinc-900 dark:text-white">
                    {stat.value}
                  </h4>
                  <p className="mt-1 text-zinc-600 dark:text-zinc-300">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
