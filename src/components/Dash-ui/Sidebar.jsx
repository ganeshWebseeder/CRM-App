import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Sidebar() {
  const navigate = useNavigate();

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
    <div className="fixed top-0 left-0 h-screen w-52 bg-white text-gray-700 
                    shadow-md border-r border-gray-200 flex flex-col justify-between z-50">

      {/* Logo */}
      <div className="flex flex-col items-center px-3 pt-0.5">
        <div className="flex items-center justify-center">
          <img
            src="./WebSeeder Logo.jpeg"
            alt="WebSeeder Logo"
            className="w-14 h-14 rounded-full shadow-md"
          />
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            className="ml-2 pt-2 font-semibold text-sm whitespace-nowrap text-gray-800"
          >
            WebSeeder
          </motion.span>
        </div>
        <div className="w-full border-t border-gray-200 mt-3"></div>
      </div>

      {/* Menu Items */}
     {/* Menu Items */}
<nav className="flex-1 flex flex-col text-sm space-y-1 mt-4 px-3 overflow-y-auto">
  {menuItems.map((item, index) => (
    <NavLink
      key={index}
      to={item.path}
      end={item.path === "/projects" ? false : true}   // ⭐ FIX: keep active in nested routes
      className={({ isActive }) =>
        `flex items-center py-2 px-4 rounded-md transition-all duration-200 cursor-pointer ${
          isActive
            ? "bg-indigo-100 text-indigo-700 font-medium"
            : "hover:bg-gray-100 text-gray-700"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <i
            className={`${item.icon} text-lg ${
              isActive ? "text-indigo-700" : "text-indigo-600"
            }`}
          ></i>

          <motion.span
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={`ml-3 truncate ${
              isActive ? "text-indigo-700 font-medium" : "text-gray-700"
            }`}
          >
            {item.label}
          </motion.span>
        </>
      )}
    </NavLink>
  ))}
</nav>


      {/* Logout */}
      <div className="border-t border-gray-200 p-3">
        <div
          onClick={handleLogout}
          className="flex items-center px-3 py-2 rounded-md cursor-pointer transition-all duration-200 hover:bg-red-500 hover:text-white"
        >
          <i className="ri-logout-box-r-line text-lg text-red-500"></i>
          <motion.span
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="ml-2 text-sm font-medium"
          >
            Logout
          </motion.span>
        </div>
      </div>
    </div>
  );
}
