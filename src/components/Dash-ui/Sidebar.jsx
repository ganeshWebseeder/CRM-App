import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "lucide-react";
import { label } from "framer-motion/client";

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
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

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-white text-gray-700 shadow-md border-r border-gray-200 flex flex-col justify-between transition-all duration-300 ease-in-out overflow-y-auto h-screen
        ${isHovered ? "w-56 fixed left-0 top-0 z-50" : "w-16"}
      `}
    >
      {/* ---------- Logo + Title ---------- */}
      <div className="flex flex-col items-center px-2 pt-4">
        <div className="flex items-center justify-center">
          <div className="text-indigo-500 text-2xl font-bold">📊</div>
          <AnimatePresence>
            {isHovered && (
              <motion.span
                key="logoText"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="ml-2 font-semibold text-sm whitespace-nowrap text-gray-800"
              >
                Welcome !
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div className="w-full border-t border-gray-200 mt-3"></div>
      </div>

      {/* ---------- Menu Items ---------- */}
      <nav className="flex-1 flex flex-col text-sm space-y-1 mt-4 px-1">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center py-2 rounded-md cursor-pointer transition-all duration-150
                ${isHovered ? "justify-start px-4" : "justify-center"}
                ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700 font-medium"
                    : "hover:bg-gray-100"
                }
              `}
            >
              <i
                className={`${item.icon} text-lg ${
                  isActive ? "text-indigo-700" : "text-indigo-600"
                }`}
              ></i>

              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className={`ml-3 truncate ${
                      isActive ? "text-indigo-700 font-medium" : "text-gray-700"
                    }`}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* ---------- Logout Button ---------- */}
      <div className="border-t border-gray-200 p-3">
        <div
          onClick={handleLogout}
          className={`flex items-center px-3 py-2 rounded-md cursor-pointer transition-all duration-200
            ${isHovered ? "justify-start" : "justify-center"}
            hover:bg-red-500 hover:text-white`}
        >
          <i className="ri-logout-box-r-line text-lg text-red-500"></i>
          <AnimatePresence>
            {isHovered && (
              <motion.span
                key="logoutText"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="ml-2 text-sm font-medium"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
