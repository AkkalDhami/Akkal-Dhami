import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MdClose } from "react-icons/md";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

const ProjectModal = ({
  images,
  triggerElement,
  modalTitle = "Project Gallery",
  closeButtonText = <MdClose />,
  gridColumns = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
  imageClassName = "w-full h-full object-cover",
  modalMaxWidth = "max-w-6xl",
  imageAnimation = {
    hover: { scale: 1.03 },
    tap: { scale: 0.98 },
  },
  modalAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setFullscreenImage(null);
    setIsOpen(false);
  };

  const openFullscreen = (img) => setFullscreenImage(img);
  const closeFullscreen = () => setFullscreenImage(null);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (fullscreenImage) closeFullscreen();
        else closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fullscreenImage]);

  return (
    <>
      {/* Custom Trigger Element with Animation */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        {React.cloneElement(triggerElement, {
          onClick: openModal,
          className: `${triggerElement.props.className || ""} cursor-pointer`,
        })}
      </motion.div>

      {/* Animated Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={modalAnimation}
            className="fixed min-w-full min-h-screen h-full inset-0 z-50 flex items-center justify-center p-4 bg-black backdrop-blur-[2px]"
            onClick={closeModal}>
            <motion.div
              className={`relative w-full ${modalMaxWidth} max-h-[90vh] no-scrollbar overflow-y-auto`}
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}>
              <motion.div
                className="sticky top-0 bg-black bg-opacity-80 rounded-lg backdrop-blur-md p-4 flex  justify-between items-center z-50"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}>
                <motion.h2
                  className="text-xl font-bold text-zinc-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}>
                  {modalTitle}
                </motion.h2>
                <motion.button
                  onClick={closeModal}
                  className="text-white  cursor-pointer text-xl font-bold transition-colors w-12 h-12 flex items-center justify-center rounded-full "
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  {closeButtonText}
                </motion.button>
              </motion.div>

              <div className={`grid ${gridColumns} gap-4 p-4`}>
                {images.map((img, index) => (
                  <motion.div
                    key={index}
                    className="overflow-hidden cursor-pointer rounded-lg shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={imageAnimation.hover}
                    onClick={() => openFullscreen(img)}
                    whileTap={imageAnimation.tap}>
                    <motion.img
                      src={img}
                      alt={`Project view ${index + 1}`}
                      className={imageClassName}
                      loading="lazy"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4"
            onClick={closeFullscreen}>
            {/* Navigation Arrows (optional) */}
            <button
              className="absolute left-4 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl z-50 bg-zinc-700 backdrop-blur-2xl hover:text-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = images.indexOf(fullscreenImage);
                const prevIndex =
                  (currentIndex - 1 + images.length) % images.length;
                setFullscreenImage(images[prevIndex]);
              }}>
              <FaAnglesLeft />
            </button>

            <motion.img
              src={fullscreenImage}
              alt="Fullscreen view"
              className="max-w-full max-h-full object-contain"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className="absolute right-4 w-12 h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl z-50 bg-zinc-700 backdrop-blur-2xl hover:text-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = images.indexOf(fullscreenImage);
                const nextIndex = (currentIndex + 1) % images.length;
                setFullscreenImage(images[nextIndex]);
              }}>
              <FaAnglesRight />
            </button>

            <button
              className="absolute top-4 right-4 text-white text-2xl bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                closeFullscreen();
              }}>
              &times;
            </button>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-zinc-900 bg-opacity-50 text-white px-3 py-1 rounded-full">
              {images.indexOf(fullscreenImage) + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectModal;
