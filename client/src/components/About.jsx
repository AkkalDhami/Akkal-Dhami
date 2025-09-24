// About.jsx
import React from "react";
import {
  Download,
  MessageCircle,
  Code2,
  Database,
  Server,
  Palette,
  Zap,
  Award,
  Calendar,
  ArrowRight,
  User,
  FileText,
  Sparkles,
} from "lucide-react";

const About = () => {
  const skills = {
    frontend: [
      "HTML",
      "CSS",
      "JavaScript",
      "Tailwind CSS",
      "React.js",
      "TypeScript",
    ],
    backend: ["Node.js", "Express.js"],
    database: ["MongoDB", "MySQL"],
  };

  const experiences = [
    {
      years: "5+",
      label: "Years Experience",
      icon: <Calendar className="h-6 w-6" />,
    },
    {
      years: "50+",
      label: "Projects Completed",
      icon: <Code2 className="h-6 w-6" />,
    },
    {
      years: "10+",
      label: "Happy Clients",
      icon: <Award className="h-6 w-6" />,
    },
  ];

  const downloadCV = () => {
    // Simulate CV download
    console.log("Downloading CV...");
  };

  const SkillCategory = ({ title, skills, icon, colorClass }) => (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] border border-gray-100 dark:border-gray-700 p-6`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className={`p-3 rounded-xl ${colorClass}`}>{icon}</div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-600">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/10 dark:to-indigo-900/10 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400 mb-4">
            About Me
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get to know more about me, my background, and what drives me as a
            developer.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Introduction */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    A
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    I'm Akkal, a Tech Enthusiast
                  </h2>
                  <p className="text-blue-600 dark:text-blue-400 font-medium flex items-center">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Full Stack Developer
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p className="text-lg leading-relaxed">
                  With over{" "}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    5 years of experience
                  </span>{" "}
                  in web development, I specialize in building full-stack
                  applications using the{" "}
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    MENN stack
                  </span>{" "}
                  (MongoDB, Express.js, React.js, Node.js).
                </p>

                <p className="leading-relaxed">
                  My journey began as a frontend developer, where I fell in love
                  with creating interactive user interfaces. Over time, I
                  expanded my skills to include backend development, allowing me
                  to build complete, end-to-end solutions.
                </p>

                <p className="leading-relaxed">
                  I'm passionate about writing clean, maintainable code and
                  staying up-to-date with the latest industry trends and
                  technologies. When I'm not coding, you can find me
                  contributing to open-source projects or exploring new tech
                  innovations.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/30 rounded-xl border border-gray-100 dark:border-gray-600">
                    <div className="flex justify-center mb-2 text-blue-600 dark:text-blue-400">
                      {exp.icon}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {exp.years}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {exp.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={downloadCV}
                  className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download CV
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button className="group relative border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Let's Talk
                  <div className="absolute inset-0 rounded-xl bg-blue-600/5 group-hover:bg-transparent transition-colors duration-300"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Skills */}
          <div className="space-y-6">
            <SkillCategory
              title="Frontend Technologies"
              skills={skills.frontend}
              icon={<Palette className="h-5 w-5 text-white" />}
              colorClass="bg-gradient-to-r from-purple-500 to-pink-500"
            />

            <SkillCategory
              title="Backend Technologies"
              skills={skills.backend}
              icon={<Server className="h-5 w-5 text-white" />}
              colorClass="bg-gradient-to-r from-blue-500 to-cyan-500"
            />

            <SkillCategory
              title="Database & Tools"
              skills={skills.database}
              icon={<Database className="h-5 w-5 text-white" />}
              colorClass="bg-gradient-to-r from-green-500 to-emerald-500"
            />
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center flex items-center justify-center">
            <FileText className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
            My Development Journey
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Frontend Focus
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Started with HTML, CSS, JavaScript and fell in love with
                creating beautiful user interfaces
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-100 dark:border-green-800/30">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Server className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Backend Expansion
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Expanded to Node.js and Express.js to build complete full-stack
                applications
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl border border-purple-100 dark:border-purple-800/30">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Full Stack Mastery
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Mastered the MENN stack and now building scalable,
                production-ready applications
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Ready to bring your ideas to life?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Let's collaborate and create something amazing together!
            </p>
            <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto">
              <MessageCircle className="h-4 w-4 mr-2" />
              Start a Conversation
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="fixed bottom-8 right-8">
          <button className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
            <MessageCircle className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
