import React from "react";

const IconButtonLink = ({
  icon: Icon,
  text,
  href,
  bgColor,
  textColor,
  isWide = false,
}) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={isWide ? "w-full" : ""}>
      <button
        type="button"
        className={`flex ${isWide ? "w-full" : ""} cursor-pointer  items-center justify-center gap-2 px-4 py-2.5 ${bgColor} ${textColor} hover:opacity-90 rounded-md transition-colors duration-200 font-medium`}>
        <Icon />
        <span>{text}</span>
      </button>
    </a>
  );
};

export default IconButtonLink;
