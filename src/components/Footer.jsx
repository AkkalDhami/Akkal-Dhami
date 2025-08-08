import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiArrowUp,
} from "react-icons/fi";

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

  const socialLinks = [
    {
      icon: <FiGithub size={20} />,
      url: "https://github.com",
      label: "GitHub",
    },
    {
      icon: <FiLinkedin size={20} />,
      url: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: <FiTwitter size={20} />,
      url: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: <FiInstagram size={20} />,
      url: "https://instagram.com",
      label: "Instagram",
    },
  ];

  return (
    <footer className="pt-16 pb-8 bg-zinc-50 dark:bg-[#060010]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Scroll to Top Button */}
        {showScrollToTop && (
          <motion.button
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="fixed bottom-6 cursor-pointer right-6 z-50 p-3 rounded-full bg-orange-600 text-white shadow-lg"
            aria-label="Scroll to top">
            <FiArrowUp size={24} />
          </motion.button>
        )}

        {/* Footer Content */}
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
            Akkal Dhami
          </h3>
          <p className="text-center max-w-md mb-6 text-zinc-600 dark:text-zinc-400">
            Full-stack developer specializing in building modern web
            applications with the MERN stack.
          </p>

          {/* Social Links */}
          <div className="flex gap-5 mb-8">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                aria-label={link.label}
                className="p-3 rounded-full shadow-md transition bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
                {link.icon}
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
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
