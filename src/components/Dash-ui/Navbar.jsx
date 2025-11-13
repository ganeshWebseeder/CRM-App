import { useState, useEffect, useRef } from "react";
import { PlusSquare, X } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useLeads } from "../../context/LeadsContext";

export default function Navbar({ onMenuClick }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Context API — get addLead function
  const { addLead } = useLeads();

  // 🧭 Dynamic icon + label based on route
  const pathMap = {
    "/dashboard": { icon: "ri-dashboard-line", label: "Dashboard" },
    "/projects": { icon: "ri-briefcase-line", label: "Projects" },
    "/expenses": { icon: "ri-money-dollar-circle-line", label: "Expenses" },
    "/leads": { icon: "ri-user-star-line", label: "Leads" },
    "/invoices": { icon: "ri-file-list-3-line", label: "Invoices" },
    "/reminders": { icon: "ri-notification-3-line", label: "Reminders" },
    "/reports": { icon: "ri-bar-chart-2-line", label: "Reports" },
    "/settings": { icon: "ri-settings-3-line", label: "Settings" },
  };

  const currentPath = location.pathname;
  const { icon, label } = pathMap[currentPath] || pathMap["/dashboard"];

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
    localStorage.clear();
    navigate("/");
  };

  // 💾 Handle Lead Form Submit (via Context API)
  const [newLead, setNewLead] = useState({
    clientName: "",
    phone: "",
    mail: "",
    status: "New",
    source: "",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addLead(newLead);
    setNewLead({
      clientName: "",
      phone: "",
      mail: "",
      status: "New",
      source: "",
      notes: "",
    });
    setIsModalOpen(false);
    navigate("/leads");
  };

  return (
    <>
      {/* NAVBAR */}
      <div
        className="sticky top-0 z-40 flex justify-between items-center 
                   px-4 sm:px-6 py-3 bg-white border-b border-gray-200 
                   shadow-sm transition-all duration-300"
      >
        {/* LEFT SIDE — Breadcrumb + Time */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 text-gray-700 focus:outline-none"
          >
            <i className="ri-menu-line text-2xl"></i>
          </button>

          {/* 🧭 Dynamic Breadcrumb */}
          <div className="flex items-center space-x-2 text-gray-700">
            <i className={`${icon} text-lg text-indigo-500`}></i>
            <p className="text-sm hidden sm:block">
              {label} /{" "}
              <span className="font-semibold text-indigo-600">Overview</span>
            </p>
          </div>

          <div className="hidden lg:flex items-center text-xs text-gray-500">
            <i className="ri-time-line mr-2 text-base text-indigo-500"></i>
            {currentTime}
          </div>
        </div>

        {/* CENTER — Search */}
        <div className="hidden sm:block relative w-[14rem] md:w-[20rem] lg:w-[28rem]">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base"></i>
          <input
            type="text"
            placeholder="Search projects, leads, invoices..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center space-x-3 sm:space-x-4" ref={dropdownRef}>
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

          {/* ➕ New Lead Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            title="Create New Lead"
            className="hidden sm:inline-flex items-center gap-2 px-2 py-1 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm transition"
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

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 hover:bg-gray-100 rounded-md px-2 py-1 transition"
            >
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <i className="ri-user-3-line text-indigo-600 text-base"></i>
              </div>
              <div className="hidden sm:flex items-center">
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

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white text-gray-700 border border-gray-200 rounded-md shadow-lg text-xs z-50 animate-fadeIn">
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
                      <i className="ri-shield-user-line mr-1 text-indigo-400"></i>
                      Super Admin
                    </div>
                  </div>
                </div>

                <ul className="py-1">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2 transition">
                    <i className="ri-user-line text-gray-600"></i>
                    <span>My Profile</span>
                  </li>
                  <hr className="my-1 border-gray-200" />
                  <li
                    onClick={handleSignOut}
                    className="px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer flex items-center space-x-2 text-red-600 transition"
                  >
                    <i className="ri-logout-box-r-line"></i>
                    <span>Sign Out</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🪟 LEAD MODAL with Blur Background */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/30 flex justify-center items-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg relative border border-gray-200"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold text-indigo-600 mb-4 text-center">
              Add New Lead
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <input
                type="text"
                placeholder="Client Name"
                value={newLead.clientName}
                onChange={(e) =>
                  setNewLead({ ...newLead, clientName: e.target.value })
                }
                className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={newLead.phone}
                onChange={(e) =>
                  setNewLead({ ...newLead, phone: e.target.value })
                }
                className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newLead.mail}
                onChange={(e) =>
                  setNewLead({ ...newLead, mail: e.target.value })
                }
                className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
              <select
                value={newLead.status}
                onChange={(e) =>
                  setNewLead({ ...newLead, status: e.target.value })
                }
                className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option>New</option>
                <option>Follow Up</option>
                <option>Closed</option>
              </select>
              <input
                type="text"
                placeholder="Source"
                value={newLead.source}
                onChange={(e) =>
                  setNewLead({ ...newLead, source: e.target.value })
                }
                className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <textarea
                placeholder="Notes"
                value={newLead.notes}
                onChange={(e) =>
                  setNewLead({ ...newLead, notes: e.target.value })
                }
                className="border p-2 rounded-lg sm:col-span-2 focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="sm:col-span-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Add Lead
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}
