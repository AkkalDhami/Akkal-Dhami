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
import OtpLogin from "./components/auth/otpLogin";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";

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
        {
          path: "/dashboard",
          element: (
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/projects",
          element: (
            <ProtectedRoutes>
              <Projects />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/skills",
          element: (
            <ProtectedRoutes>
              <Skills />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/messages",
          element: (
            <ProtectedRoutes>
              <Messages />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/analytics",
          element: (
            <ProtectedRoutes>
              <Analytics />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/settings",
          element: (
            <ProtectedRoutes>
              <Settings />
            </ProtectedRoutes>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
