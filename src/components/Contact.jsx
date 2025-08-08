import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import { RiUserLine } from "react-icons/ri";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocialLink from "../ui/SocialLink";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent successfully! 🎉");
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <RiUserLine size={24} />,
      title: "Name",
      details: "Akkal Dhami",
    },
    {
      icon: <FiMail size={24} />,
      title: "Email",
      details: "aakaldhami@gmail.com",
    },
    {
      icon: <FiPhone size={24} />,
      title: "Contact",
      details: "+977-9828122071",
    },
    {
      icon: <FiMapPin size={24} />,
      title: "Location",
      details: "Kathmandu, Nepal",
    },
  ];

  return (
    <section id="contact" className="py-20">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" // Toast uses dark theme always for consistency, can change to "light" if you want.
        transition={Bounce}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Get In Touch
          </h2>
          <div className="w-20 h-1 mx-auto mt-4 bg-orange-600 dark:bg-orange-500"></div>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-zinc-600 dark:text-zinc-300">
            Have a project in mind or want to discuss potential opportunities?
            I'd love to hear from you!
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <h3 className="text-2xl font-semibold mb-8 text-zinc-900 dark:text-white">
              Contact Information
            </h3>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-3 rounded-md bg-zinc-100 text-zinc-800 dark:bg-[#0d0d1a] dark:text-zinc-200">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-zinc-900 dark:text-white">
                      {info.title}
                    </h4>
                    <p className="text-zinc-600 dark:text-zinc-300">
                      {info.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <h3 className="text-2xl font-semibold mb-8 text-zinc-900 dark:text-white">
              Send Me a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Akkal Dhami"
                    className="w-full px-4 py-3 rounded-lg border border-zinc-300 text-zinc-900 focus:border-orange-600 focus:ring-2 focus:ring-orange-500/50 outline-none transition dark:border-zinc-700 dark:text-white dark:focus:border-orange-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="dhamiakkal21@gmail.com"
                    className="w-full px-4 py-3 rounded-lg border border-zinc-300 text-zinc-900 focus:border-orange-600 focus:ring-2 focus:ring-orange-500/50 outline-none transition dark:border-zinc-700 dark:text-white dark:focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Hello, I'd like to discuss a project..."
                  className="w-full px-4 resize-none py-3 rounded-lg border border-zinc-300 text-zinc-900 focus:border-orange-600 focus:ring-2 focus:ring-orange-500/50 outline-none transition dark:border-zinc-700 dark:text-white dark:focus:border-orange-500"></textarea>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 cursor-pointer px-6 rounded-lg font-medium flex items-center justify-center gap-2 bg-orange-600 text-white hover:bg-orange-700 disabled:opacity-70 transition-colors">
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <FiSend size={18} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
