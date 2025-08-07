// src/components/About.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiAward, FiUsers, FiFolder } from "react-icons/fi";

const About = ({ darkMode }) => {
  const stats = [
    { icon: <FiAward size={24} />, value: "5+", label: "Years Experience" },
    { icon: <FiUsers size={24} />, value: "20+", label: "Clients" },
    { icon: <FiFolder size={24} />, value: "50+", label: "Projects" },
  ];

  return (
    <section id="about" className={`py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <h2
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-zinc-900"
            }`}>
            About Me
          </h2>
          <div
            className={`w-20 h-1 mx-auto mt-4 ${
              darkMode ? "bg-indigo-500" : "bg-indigo-600"
            }`}></div>
          <p
            className={`mt-6 max-w-2xl mx-auto text-lg ${
              darkMode ? "text-zinc-300" : "text-zinc-600"
            }`}>
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
            <h3
              className={`text-2xl font-semibold mb-6 ${
                darkMode ? "text-white" : "text-zinc-900"
              }`}>
              I'm Alex, a Passionate MERN Stack Developer
            </h3>

            <div
              className={`space-y-4 text-lg ${
                darkMode ? "text-zinc-300" : "text-zinc-600"
              }`}>
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

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className={`mt-8 inline-block px-8 py-3 rounded-lg font-medium ${
                darkMode
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}>
              Let's Talk
            </motion.a>
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
                  className={`p-6 rounded-xl flex flex-col items-center text-center ${
                    darkMode ? "bg-[#110a25]" : "bg-zinc-50"
                  }`}>
                  <div
                    className={`p-3 rounded-full mb-4 ${
                      darkMode
                        ? "bg-indigo-500/20 text-indigo-400"
                        : "bg-indigo-100 text-indigo-600"
                    }`}>
                    {stat.icon}
                  </div>
                  <h4
                    className={`text-2xl font-bold ${
                      darkMode ? "text-white" : "text-zinc-900"
                    }`}>
                    {stat.value}
                  </h4>
                  <p
                    className={`mt-1 ${
                      darkMode ? "text-zinc-300" : "text-zinc-600"
                    }`}>
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
