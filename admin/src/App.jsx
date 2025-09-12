import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import AdminLayout from "./pages/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Messages from "./pages/Messages";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import OtpLogin from './components/auth/otpLogin';

function App() {
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
  return <RouterProvider router={router} />;
}

export default App;