import { useState, useEffect, useRef } from "react";
import { PlusSquare } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ Added for navigation

export default function Navbar() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // ✅ Hook to redirect user

  // 🕒 Live Time Update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const date = now.toLocaleDateString([], {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      setCurrentTime(`${time} · ${date}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // 🖥️ Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // 🧠 Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🚪 Handle Sign Out
  const handleSignOut = () => {
    localStorage.clear(); // ✅ Clears stored data (optional)
    navigate("/"); // ✅ Redirect to Login page
  };

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-white border border-gray-200 shadow-sm rounded-lg mb-6">
      {/* LEFT SIDE — Breadcrumb & Time */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 text-gray-700">
          <i className="ri-dashboard-line text-lg text-indigo-500"></i>
          <p className="text-sm">
            Dashboard /{" "}
            <span className="font-semibold text-indigo-600">
              Project Overview
            </span>
          </p>
        </div>

        {/* Live Time */}
        <div className="hidden md:flex items-center text-xs text-gray-500">
          <i className="ri-time-line mr-2 text-base text-indigo-500"></i>
          {currentTime}
        </div>
      </div>

      {/* CENTER — Search */}
      <div className="relative w-[20rem] md:w-[28rem]">
        <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base"></i>
        <input
          type="text"
          placeholder="Search projects, leads, invoices..."
          className="w-full pl-10 pr-4 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
        />
      </div>

      {/* RIGHT SIDE — Icons & User */}
      <div className="flex items-center space-x-4" ref={dropdownRef}>
        {/* Fullscreen */}
        <button
          title="Toggle Fullscreen"
          onClick={toggleFullscreen}
          className="hover:bg-gray-100 p-2 rounded-md transition"
        >
          <i
            className={`${
              isFullscreen
                ? "ri-fullscreen-exit-line"
                : "ri-fullscreen-line"
            } text-lg text-gray-600`}
          ></i>
        </button>

        {/* New Lead */}
        <button
          title="Create"
          className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm transition"
        >
          <PlusSquare size={14} />
          <span>New Lead</span>
        </button>

        {/* Notifications */}
        <button
          title="Reminders / Notifications"
          className="relative hover:bg-gray-100 p-2 rounded-md transition"
        >
          <i className="ri-notification-2-line text-lg text-gray-600"></i>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-300"></div>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 hover:bg-gray-100 rounded-md px-2 py-1 transition"
          >
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <i className="ri-user-3-line text-indigo-600 text-base"></i>
            </div>
            <div className="flex items-center">
              <div className="text-left">
                <p className="text-xs font-semibold text-gray-800">
                  Ganesh Borole
                </p>
                <p className="text-[10px] text-gray-500">Admin</p>
              </div>
              <i
                className={`ri-arrow-down-s-line ml-1 text-gray-500 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              ></i>
            </div>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white text-gray-700 border border-gray-200 rounded-md shadow-lg text-xs z-50 animate-fadeIn">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-200 flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <i className="ri-user-3-line text-indigo-600 text-lg"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    Ganesh Borole
                  </p>
                  <p className="text-gray-500 text-[11px]">
                    admin@crmapp.com
                  </p>
                  <div className="flex items-center text-[10px] text-gray-400">
                    <i className="ri-shield-user-line mr-1 text-indigo-400"></i>{" "}
                    Super Admin
                  </div>
                </div>
              </div>

              {/* Menu Options */}
              <ul className="py-1">
                {[
                  { icon: "ri-user-line", label: "My Profile" },
                  { icon: "ri-settings-3-line", label: "Account Settings" },
                  { icon: "ri-question-line", label: "Help & Support" },
                  { icon: "ri-translate-2", label: "Language" },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2 transition"
                  >
                    <i className={`${item.icon} text-gray-600`}></i>{" "}
                    <span>{item.label}</span>
                  </li>
                ))}
                <hr className="my-1 border-gray-200" />
                {/* 🚪 Logout Button */}
                <li
                  onClick={handleSignOut}
                  className="px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer flex items-center space-x-2 text-red-600 transition"
                >
                  <i className="ri-logout-box-r-line"></i>{" "}
                  <span>Sign Out</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
