import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiArrowUp } from "react-icons/fi";
import SocialLink from "../ui/AnimateButton";

const Footer = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="pt-16 pb-8 bg-zinc-50 dark:bg-[#060010]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {showScrollToTop && (
          <motion.button
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="fixed bottom-6 cursor-pointer right-6 z-50 p-3 rounded-full bg-primary-600 text-white shadow-lg"
            aria-label="Scroll to top">
            <FiArrowUp size={24} />
          </motion.button>
        )}

        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
            Akkal Dhami
          </h3>
          <p className="text-center max-w-md mb-6 text-zinc-600 dark:text-zinc-400">
            Full-stack developer specializing in building modern web
            applications with the MERN stack.
          </p>

          <div className="flex flex-wrap my-4 gap-4">
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

          <div className="w-full border-t pt-6 border-zinc-200 dark:border-zinc-800">
            <p className="text-center text-sm text-zinc-600 dark:text-zinc-500">
              © {new Date().getFullYear()} Akkal Dhami. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
