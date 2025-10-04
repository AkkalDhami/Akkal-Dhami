// Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LuFolderOpen,
  LuGraduationCap,
  LuMail,
  LuChartColumnIncreasing,
  LuUsers,
  LuSettings2,
  LuX,
  LuLogOut,
  LuFile,
} from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";

const navItems = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: MdOutlineDashboard,
  },
  { to: "/projects", label: "Projects", icon: LuFolderOpen },
  { to: "/skills", label: "Skills & Experience", icon: LuGraduationCap },
  { to: "/messages", label: "Messages", icon: LuMail },
  { to: "/resume", label: "Resume", icon: LuFile },
  { to: "/settings", label: "Settings", icon: LuSettings2 },
];

export default function Sidebar({ isOpen, closeSidebar }) {
  return (
    <aside
      className={`
        fixed  top-0 left-0 z-50 min-h-screen
        w-64 border-r bg-background
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        sm:translate-x-0
      `}>
      <div className="h-16 flex items-center justify-between gap-3 px-4 font-semibold">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <LuUsers className="size-4" />
          </div>
          <span>Portfolio</span>
        </div>

        {/* Close button for mobile */}
        <button
          onClick={closeSidebar}
          className="sm:hidden p-1 rounded-md hover:bg-muted"
          aria-label="Close menu">
          <LuX className="size-5" />
        </button>
      </div>

      <nav className="px-2 py-3 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors ${
                isActive ? "bg-muted font-medium" : "hover:bg-muted"
              }`
            }>
            <Icon className="size-4" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto fixed w-full bottom-0 border-t px-4 py-4 text-xs">
        <NavLink
          to={"/logout"}
          onClick={closeSidebar}
          className={`flex items-center gap-3 font-medium rounded px-3 py-2 text-sm text-destructive transition-colors hover:bg-muted `}>
          <LuLogOut className="size-4" />
          <span>Logout</span>
        </NavLink>
      </div>
    </aside>
  );
}
