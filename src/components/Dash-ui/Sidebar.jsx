import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: "ri-dashboard-line", label: "Dashboard", path: "/dashboard" },
    { icon: "ri-briefcase-line", label: "Projects", path: "/projects" },
    { icon: "ri-money-dollar-circle-line", label: "Expenses", path: "/expenses" },
    { icon: "ri-user-star-line", label: "Leads", path: "/leads" },
    { icon: "ri-file-list-3-line", label: "Invoices", path: "/invoices" },
    { icon: "ri-notification-3-line", label: "Reminders", path: "/reminders" },
    { icon: "ri-bar-chart-2-line", label: "Reports", path: "/reports" },
    { icon: "ri-settings-3-line", label: "Settings", path: "/settings" },
  ];

  const handleLogout = () => navigate("/");

  return (
    <div
      className="
        fixed top-0 left-0 h-screen 
        bg-white text-gray-700 shadow-md border-r border-gray-200 
        flex flex-col justify-between z-50

        w-16 md:w-52   /* ⬅ MOBILE: only icons | DESKTOP: full sidebar */
      "
    >
      {/* ---------- Logo Section ---------- */}
      <div className="flex flex-col items-center px-3 pt-3">
        <div className="flex items-center justify-center">
          <img
            src='./WebSeeder Logo.jpeg'
            alt="WebSeeder Logo"
            className="
              rounded-full shadow-md 
              w-10 h-10 md:w-14 md:h-14   /* ⬅ small on mobile */
            "
          />

          {/* Show WebSeeder text only on desktop */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="
              hidden md:inline-block   /* ⬅ hides on mobile */
              ml-2 pt-2 font-semibold text-sm whitespace-nowrap text-gray-800
            "
          >
            WebSeeder
          </motion.span>
        </div>

        <div className="w-full border-t border-gray-200 mt-3 hidden md:block"></div>
      </div>

      {/* ---------- Menu Items ---------- */}
      <nav className="flex-1 flex flex-col text-sm space-y-1 mt-4 px-1 md:px-3 overflow-y-auto">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className={`
                flex items-center 
                py-3 md:py-2 
                rounded-md cursor-pointer transition-all duration-200
                ${isActive ? "bg-indigo-100 text-indigo-700 font-medium" : "hover:bg-gray-100"}
                justify-center md:justify-start   /* ⬅ center on mobile */
              `}
            >
              {/* Icon always visible */}
              <i
                className={`${item.icon} text-xl md:text-lg ${
                  isActive ? "text-indigo-700" : "text-indigo-600"
                }`}
              ></i>

              {/* Label visible ONLY on desktop */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`
                  hidden md:inline-block   /* ⬅ hides on mobile */
                  ml-3 truncate ${
                    isActive ? "text-indigo-700 font-medium" : "text-gray-700"
                  }
                `}
              >
                {item.label}
              </motion.span>
            </div>
          );
        })}
      </nav>

      {/* ---------- Logout Button ---------- */}
      <div className="border-t border-gray-200 p-3 hidden md:block">
        <div
          onClick={handleLogout}
          className="
            flex items-center px-3 py-2 rounded-md cursor-pointer 
            transition-all duration-200 hover:bg-red-500 hover:text-white
          "
        >
          <i className="ri-logout-box-r-line text-lg text-red-500"></i>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-2 text-sm font-medium"
          >
            Logout
          </motion.span>
        </div>
      </div>

      {/* Mobile logout icon only */}
      <div
        onClick={handleLogout}
        className="
          md:hidden flex justify-center py-4 border-t border-gray-200 
          cursor-pointer hover:bg-red-100
        "
      >
        <i className="ri-logout-box-r-line text-xl text-red-500"></i>
      </div>
    </div>
  );
}
