import { useState } from "react";
import Sidebar from "../Dash-ui/Sidebar";
import Navbar from "../Dash-ui/Navbar";

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      
      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen z-50 
          transform transition-transform duration-300 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
        `}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Overlay for mobile (click to close sidebar) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        ></div>
      )}

      {/* Main Content */}
      <div
        className="
        flex flex-col flex-1 
        transition-all duration-300
        md:ml-52  /* Push content only on desktop */
      "
      >
        <Navbar onMenuClick={handleMenuClick} />
        
        <main className="p-4 overflow-y-auto h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
