// AdminLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-svh flex relative flex-col sm:grid sm:grid-cols-[250px_1fr] sm:grid-rows-[60px_1fr]">

      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 sm:hidden"
          onClick={closeSidebar}
        />
      )}

      <main className="pt-16 sm:pt-0 sm:col-start-2 sm:row-start-2 min-h-[calc(100svh-4rem)]">
        <React.Suspense fallback={<div className="p-6">Loading…</div>}>
          <Outlet />
        </React.Suspense>
      </main>
    </div>
  );
}
