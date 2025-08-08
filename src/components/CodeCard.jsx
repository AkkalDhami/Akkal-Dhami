// src/components/VSCodeProfileCard.jsx
import React from "react";
import { motion } from "motion/react";

const VSCodeProfileCard = ({ darkMode }) => {
  const textColor = darkMode ? "text-zinc-300" : "text-zinc-800";
  const keywordColor = "text-[#B30CEA]";
  const stringColor = "text-[#09D076]";
  const propertyColor = "text-[#ea580c]";
  const variableColor = "text-[#ea7045]";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`animatedBorder border border-slate-800/40  max-w-2xl rounded-2xl mx-auto`}>
      <div
        className={`flex items-center justify-between px-4 py-2 rounded-lg ${
          darkMode ? "text-zinc-300" : "text-zinc-600"
        }`}>
        <div className="flex space-x-2 mr-3">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className={`text-sm font-mono ${textColor}`}>portfolio.js</div>
      </div>

      <div className={`${textColor} p-4 rounded-b-lg font-mono text-[16px]`}>
        {/* Line numbers */}
        <div className="flex">
          <div className={`pr-4 text-right select-none w-10 text-zinc-500`}>
            {[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            ].map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>

          {/* Code Content */}
          <div className="flex-1 overflow-x-auto">
            <div className="">
              <span className={`${keywordColor}  font-bold`}>const</span>{" "}
              <span className={variableColor}>about</span> = [
            </div>

            {/* Object start */}
            <div className="ml-4">{"{"}</div>

            {/* Name */}
            <div className="ml-8">
              <span className={propertyColor}>name</span>
              <span className={textColor}>: </span>
              <span className={stringColor}>'Akkal Dhami'</span>
              <span className={textColor}>,</span>
            </div>

            {/* Role */}
            <div className="ml-8">
              <span className={propertyColor}>role</span>
              <span className={textColor}>: </span>
              <span className={stringColor}>'Frontend Developer'</span>
              <span className={textColor}>,</span>
            </div>

            {/* Email */}
            <div className="ml-8">
              <span className={propertyColor}>email</span>
              <span className={textColor}>: </span>
              <span className={stringColor}>'akkaldhami21@gmail.com'</span>
              <span className={textColor}>,</span>
            </div>

            {/* Availability */}
            <div className="ml-8">
              <span className={propertyColor}>isAvailable</span>
              <span className={textColor}>: </span>
              <span className={keywordColor}>true</span>
              <span className={textColor}>,</span>
            </div>

            {/* Skills */}
            <div className="ml-8">
              <span className={propertyColor}>skills</span>
              <span className={textColor}>: </span>
              <span>{"{"}</span>
            </div>

            {/* Frontend Skills */}
            <div className="ml-12">
              <span className={propertyColor}>frontend</span>
              <span className={textColor}>: [</span>
              <span className={stringColor}>'HTML'</span>
              <span className={textColor}>, </span>
              <span className={stringColor}>'CSS'</span>
              <span className={textColor}>, </span>
              <span className={stringColor}>'JavaScript'</span>
              <span className={textColor}>, </span>
              <span className={stringColor}>'Tailwind CSS'</span>
              <span className={textColor}>],</span>
            </div>

            {/* Backend Skills */}
            <div className="ml-12">
              <span className={propertyColor}>backend</span>
              <span className={textColor}>: [</span>
              <span className={stringColor}>'Node.js'</span>
              <span className={textColor}>, </span>
              <span className={stringColor}>'Express.js'</span>
              <span className={textColor}>],</span>
            </div>

            {/* Database Skills */}
            <div className="ml-12">
              <span className={propertyColor}>database</span>
              <span className={textColor}>: [</span>
              <span className={stringColor}>'MongoDB'</span>
              <span className={textColor}>, </span>
              <span className={stringColor}>'MySQL'</span>
              <span className={textColor}>],</span>
            </div>

            <div className="ml-8">{"}"},</div>

            {/* Projects */}
            <div className="ml-8">
              <span className={propertyColor}>projects</span>
              <span className={textColor}>: </span>
              <span>{"{"}</span>
            </div>

            {/* Project 1 */}
            <div className="ml-12">
              <span className={propertyColor}>NepKart</span>
              <span className={textColor}>: </span>
              <span className={stringColor}>'E-commerce website'</span>
              <span className={textColor}>,</span>
            </div>

            {/* Project 2 */}
            <div className="ml-12">
              <span className={propertyColor}>DishhDashh</span>
              <span className={textColor}>: </span>
              <span className={stringColor}>'Food delivery website'</span>
              <span className={textColor}>,</span>
            </div>

            {/* Project 3 */}
            <div className="ml-12">
              <span className={propertyColor}>NepTask</span>
              <span className={textColor}>: </span>
              <span className={stringColor}>'Task Management System'</span>
            </div>

            <div className="ml-8">{"}"}</div>

            {/* Object end */}
            <div className="ml-4">{"}"}</div>

            <div>];</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VSCodeProfileCard;
