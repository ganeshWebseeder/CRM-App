import { useState, useEffect } from "react";

export default function Navbar() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Update live time
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

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="flex justify-between items-center bg-white px-6 py-3 rounded-lg shadow-sm mb-4">
      {/* LEFT SIDE: Dashboard + Timer */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 text-gray-700">
          <i className="ri-dashboard-line text-base text-gray-500"></i>
          <p className="text-sm text-gray-500">
            Dashboard / <span className="text-gray-900 font-medium text-orange-500">Overview</span>
          </p>
        </div>
        <div className="flex items-center text-xs text-gray-600">
          <i className="ri-time-line mr-2 text-base text-gray-500"></i>
          {currentTime}
        </div>
      </div>

      {/* CENTER: Search Bar */}
      <div className="relative w-[36rem]">
        <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base"></i>
        <input
          type="text"
          placeholder="Search orders, customers, menu items..."
          className="border border-gray-200 rounded-md pl-10 pr-4 py-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
      </div>

      {/* RIGHT SIDE: Icons */}
      <div className="flex items-center space-x-5 text-gray-600">
        {/* Toggle Fullscreen */}
        <button title="Toggle Fullscreen" onClick={toggleFullscreen}>
          <i
            className={`${
              isFullscreen ? "ri-fullscreen-exit-line" : "ri-fullscreen-line"
            } text-lg hover:text-gray-800`}
          ></i>
        </button>

        {/* Notification */}
        <button title="Notifications" className="relative">
          <i className="ri-notification-2-line text-lg hover:text-gray-800"></i>
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200"></div>

        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <i className="ri-user-3-line text-gray-700 text-base"></i>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">John Doe</p>
            <p className="text-[10px] text-gray-500">Super Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
