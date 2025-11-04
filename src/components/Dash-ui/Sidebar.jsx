import { useState } from "react";

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);

  const menuItems = [
    { icon: "ri-dashboard-line", label: "Dashboard" },
    { icon: "ri-user-3-line", label: "User Management" },
    { icon: "ri-building-line", label: "Branch Management" },
    { icon: "ri-restaurant-line", label: "Menu Management" },
    { icon: "ri-shopping-basket-2-line", label: "Orders" },
    { icon: "ri-group-line", label: "Customers" },
    { icon: "ri-motorbike-line", label: "Delivery Staff" },
    { icon: "ri-bar-chart-2-line", label: "Reports" },
    { icon: "ri-notification-3-line", label: "Push Notification" },
    { icon: "ri-home-3-line", label: "Homepage Management" },
  ];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-white shadow-md flex flex-col justify-between transition-all duration-300 ease-in-out overflow-y-auto h-screen
        ${isHovered ? "w-56 fixed left-0 top-0 z-50" : "w-16"}
      `}
    >
      {/* 🔥 Logo + Welcome Section */}
      <div className="flex flex-col items-center px-2 pb-2">
        <div className="flex items-center justify-center mt-2">
          <div className="text-red-500 text-2xl font-bold">🔥</div>
          {isHovered && (
            <span className="ml-2 text-gray-800 font-semibold text-sm whitespace-nowrap">
              Welcome!
            </span>
          )}
        </div>
        {/* Divider Line */}
        <div className="w-full border-t border-gray-200 mt-3"></div>
      </div>

      {/* 📋 Menu Section */}
      <nav className="flex-1 flex flex-col text-gray-600 text-sm space-y-0.5 px-1 mt-1">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center px-4 py-1.5 rounded-md cursor-pointer hover:bg-gray-100 transition-all duration-150 ${
              isHovered ? "justify-start space-x-3" : "justify-center"
            }`}
          >
            <i className={`${item.icon} text-base`}></i>
            {isHovered && <span className="truncate">{item.label}</span>}
          </div>
        ))}
      </nav>

      {/* 🚪 Fixed Logout Button */}
      <div className="border-t border-gray-200 p-3">
        <div
          className={`flex items-center space-x-3 px-3 py-2 cursor-pointer rounded-md transition-all duration-200
            ${isHovered ? "justify-start" : "justify-center"}
            hover:bg-red-500 hover:text-white`}
        >
          <i className="ri-logout-box-r-line text-lg text-red-600"></i>
          {isHovered && (
            <span className="text-sm font-medium text-red-600 hover:text-white">
              Logout
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
