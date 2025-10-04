import React from "react";
import { motion } from "motion/react";
import { useGetMyContactsQuery } from "../features/aboutApi";
import { useGetProjectsQuery } from "../features/projectApi";
import { toast } from "react-toastify";
import { GlowingEffect } from "./ui/glowing-effect";

const VSCodeProfileCard = () => {
  const { data, isError, error } = useGetMyContactsQuery();
  const {
    data: project,
    isError: isProjectError,
    error: projectError,
  } = useGetProjectsQuery();

  const projects = project?.projects;
  
  if (isError) toast.error(error);
  if (isProjectError) toast.error(projectError);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="animatedBorder relative border border-zinc-500/30 max-w-2xl rounded-2xl mx-auto">
      <div className="flex items-center border-b border-zinc-500/30 justify-between px-4 py-2 text-zinc-600 dark:text-zinc-300">
        <div className="flex space-x-2 mr-3">
          <div className="w-3 h-3 rounded-full bg-primary-500"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-sm font-mono">portfolio.js</div>
      </div>

      <div className="p-4 rounded-b-lg font-mono text-[16px] text-zinc-800 dark:text-zinc-300">
        {/* Line numbers */}
        <div className="flex">
          <div className="pr-4 text-right select-none w-10 text-zinc-500 dark:text-zinc-600">
            {[...Array(19)].map((_, i) => (
              <div key={i + 1}>{i + 1}</div>
            ))}
          </div>

          {/* Code Content */}
          <div className="flex-1 overflow-x-auto">
            {/* Colors */}
            <span className="text-[#B30CEA] font-bold">const</span>{" "}
            <span className="text-[#ea7045]">about</span> = [
            <div className="ml-4">{"{"}</div>
            <div className="ml-8">
              <span className="text-[#ea580c]">name</span>
              <span>: </span>
              <span className="text-[#09D076]">'{data?.data[0]?.name}'</span>,
            </div>
            <div className="ml-8">
              <span className="text-[#ea580c]">email</span>
              <span>: </span>
              <span className="text-[#09D076]">'{data?.data[0]?.email}'</span>,
            </div>
            <div className="ml-8">
              <span className="text-[#ea580c]">contact</span>
              <span>: </span>
              <span className="text-[#09D076]">'{data?.data[0]?.contact}'</span>
              ,
            </div>
            <div className="ml-8">
              <span className="text-[#ea580c]">isAvailable</span>
              <span>: </span>
              <span className="text-[#B30CEA]">true</span>,
            </div>
            <div className="ml-8">
              <span className="text-[#ea580c]">skills</span>: {"{"}
            </div>
            <div className="ml-12">
              <span className="text-[#ea580c]">frontend</span>: [
              <span className="text-[#09D076]">'HTML'</span>,{" "}
              <span className="text-[#09D076]">'CSS'</span>,{" "}
              <span className="text-[#09D076]">'JavaScript'</span>,{" "}
              <span className="text-[#09D076]">'Tailwind CSS'</span>,
              <span className="text-[#09D076]">'React.js'</span>,
              <span className="text-[#09D076]">'TypeScript'</span>],
            </div>
            <div className="ml-12">
              <span className="text-[#ea580c]">backend</span>: [
              <span className="text-[#09D076]">'Node.js'</span>,{" "}
              <span className="text-[#09D076]">'Express.js'</span>],
            </div>
            <div className="ml-12">
              <span className="text-[#ea580c]">database</span>: [
              <span className="text-[#09D076]">'MongoDB'</span>,{" "}
              <span className="text-[#09D076]">'MySQL'</span>],
            </div>
            <div className="ml-8">{"}"},</div>
            <div className="ml-8">
              <span className="text-[#ea580c]">projects</span>: {"{"}
            </div>
            {projects?.slice(0, 3)?.map((proj) => (
              <div key={proj?._id} className="ml-12">
                <span className="text-[#ea580c]">{proj?.title}</span>:{" "}
                <span className="text-[#09D076]">'{proj?.description}'</span>,
              </div>
            ))}
            <div className="ml-8">{"}"}</div>
            <div className="ml-4">{"}"}</div>
            <div>];</div>
          </div>
        </div>
      </div>
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
    </motion.div>
  );
};

export default VSCodeProfileCard;
