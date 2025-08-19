import React from "react";

const IconButtonLink = ({ icon: Icon, text, href, isWide = false }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={isWide ? "w-full" : ""}>
      <button
        type="button"
        className={`flex group relative ${
          isWide ? "w-full" : ""
        } cursor-pointer border border-zinc-500/30 items-center justify-center sm:gap-2 gap-1 px-2 sm:px-4 text-sm sm:text-lg py-2.5 text-black dark:text-white  hover:opacity-90 rounded-md transition-colors duration-200 font-medium`}>
        <Icon />
        <span>{text}</span>
        <div className="absolute -bottom-px group-hover:via-indigo-600 left-1/2 -translate-x-1/2 h-px w-[calc(100%-24px)] bg-gradient-to-r from-transparent via-primary-600 to-transparent"></div>
      </button>
    </a>
  );
};

export default IconButtonLink;
