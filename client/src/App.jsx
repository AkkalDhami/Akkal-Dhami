// src/App.js
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { motion, AnimatePresence } from "motion/react";
import { Routes, Route } from "react-router-dom";
import AdminOtp from "./pages/AdminOtp.jsx";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + height
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-medium dark:bg-slate-950 dark:text-zinc-100 bg-zinc-50 text-zinc-800`}>
     
      
      <Routes>
        <Route path="/admin/login" element={<AdminOtp />} />

        <Route
          path="/"
          element={
            <>
              <Navbar
                activeSection={activeSection}
                toggleSidebar={toggleSidebar}
              />
              <AnimatePresence>
                {sidebarOpen && (
                  <Sidebar
                    activeSection={activeSection}
                    toggleSidebar={toggleSidebar}
                  />
                )}
              </AnimatePresence>
              <main className={`max-w-7xl mx-auto`}>
                <Hero />
                {/* <About /> */}
                <Skills />
                <Projects />
                <Contact />
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
