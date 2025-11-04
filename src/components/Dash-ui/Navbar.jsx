import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Live time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const date = now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
      setCurrentTime(`${time} · ${date}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center bg-white px-6 py-3 rounded-lg shadow-sm mb-4">
      {/* LEFT SIDE */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 text-gray-700">
          <i className="ri-dashboard-line text-base text-gray-500"></i>
          <p className="text-sm text-gray-500">
            Dashboard / <span className="text-gray-900 font-medium text-orange-600">Overview</span>
          </p>
        </div>
        <div className="flex items-center text-xs text-gray-600">
          <i className="ri-time-line mr-2 text-base text-gray-500"></i>
          {currentTime}
        </div>
      </div>

      {/* CENTER: Search */}
      <div className="relative w-[36rem]">
        <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base"></i>
        <input
          type="text"
          placeholder="Search orders, customers, menu items..."
          className="border border-gray-200 rounded-md pl-10 pr-4 py-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
      </div>

      {/* RIGHT SIDE: Icons + User */}
      <div className="flex items-center space-x-5 text-gray-600" ref={dropdownRef}>
        {/* Fullscreen */}
        <button title="Toggle Fullscreen" onClick={toggleFullscreen}>
          <i
            className={`${
              isFullscreen ? "ri-fullscreen-exit-line" : "ri-fullscreen-line"
            } text-lg hover:text-gray-800`}
          ></i>
        </button>

        {/* Notifications */}
        <button title="Notifications" className="relative">
          <i className="ri-notification-2-line text-lg hover:text-gray-800"></i>
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200"></div>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 hover:bg-gray-50 rounded-md px-2 py-1"
          >
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <i className="ri-user-3-line text-gray-700 text-base"></i>
            </div>
            <div className="flex items-center">
              <div className="text-left">
                <p className="text-xs font-semibold text-gray-800">John Doe</p>
                <p className="text-[10px] text-gray-500">Super Admin</p>
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
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg text-xs z-50">
              {/* User Info Section */}
              <div className="px-4 py-3 border-b border-gray-200 flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <i className="ri-user-3-line text-gray-700 text-lg"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">John Doe</p>
                  <p className="text-gray-500 text-[11px]">john@example.com</p>
                  <div className="flex items-center text-[10px] text-gray-400">
                    <i className="ri-shield-user-line mr-1 text-gray-500"></i> Super Admin
                  </div>
                </div>
              </div>

              {/* Menu Options */}
              <ul className="py-1">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
                  <i className="ri-user-line"></i> <span>My Profile</span>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
                  <i className="ri-settings-3-line"></i> <span>Account Settings</span>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
                  <i className="ri-question-line"></i> <span>Help & Support</span>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
                  <i className="ri-translate-2"></i> <span>Language</span>
                </li>
                <hr className="my-1 border-gray-200" />
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2 text-red-600">
                  <i className="ri-logout-box-r-line"></i> <span>Sign Out</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
