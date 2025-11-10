import { useState } from "react";
import Sidebar from "../Dash-ui/Sidebar";
import Navbar from "../Dash-ui/Navbar";

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar — Hidden on Mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:flex`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar onMenuClick={handleMenuClick} />
        <main className="p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
