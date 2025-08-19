import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLayout from "./pages/AdminLayout";
import OtpLogin from "./components/auth/otpLogin";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Projects = React.lazy(() => import("./pages/Projects"));
const Skills = React.lazy(() => import("./pages/Skills"));
const Messages = React.lazy(() => import("./pages/Messages"));
const Analytics = React.lazy(() => import("./pages/Analytics"));
const Settings = React.lazy(() => import("./pages/Settings"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/login",
    element: <OtpLogin />,
  },
  {
    element: <AdminLayout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/projects", element: <Projects /> },
      { path: "/skills", element: <Skills /> },
      { path: "/messages", element: <Messages /> },
      { path: "/analytics", element: <Analytics /> },
      { path: "/settings", element: <Settings /> },
    ],
  },
]);

export default router;
