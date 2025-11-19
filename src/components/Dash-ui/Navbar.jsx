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
  const [showNotifications, setShowNotifications] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { addLead } = useLeads();

  // -------------------------------
  // 📌 Dynamic Navbar Breadcrumb Logic
  // -------------------------------
  const pathname = location.pathname;

  // Base mapping for static routes
  const basePathMap = {
    "/dashboard": { icon: "ri-dashboard-line", label: "Dashboard" },
    "/projects": { icon: "ri-briefcase-line", label: "Projects" },
    "/projects/details": { icon: "ri-briefcase-line", label: "Project Details" },
    "/expenses": { icon: "ri-money-dollar-circle-line", label: "Expenses" },
    "/leads": { icon: "ri-user-star-line", label: "Leads" },
    "/invoices": { icon: "ri-file-list-3-line", label: "Invoices" },
    "/reminders": { icon: "ri-notification-3-line", label: "Reminders" },
    "/reports": { icon: "ri-bar-chart-2-line", label: "Reports" },
    "/settings": { icon: "ri-settings-3-line", label: "Settings" },
  };

  // Detect dynamic project detail routes (example: /projects/4)
  let resolvedPath = pathname;
  let subLabel = "Overview";

  if (pathname.startsWith("/projects/") && pathname !== "/projects") {
    resolvedPath = "/projects/details";

    // Optional: detect sub-route segments like /projects/4/tasks
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 2) {
      subLabel = segments[2].charAt(0).toUpperCase() + segments[2].slice(1);
    }
  }

  const { icon, label } = basePathMap[resolvedPath] || basePathMap["/dashboard"];

  // -------------------------------
  // 🕒 Live Time
  // -------------------------------
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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

  // -------------------------------
  // Fullscreen toggle
  // -------------------------------
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // -------------------------------
  // Close dropdowns if clicked outside
  // -------------------------------
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // -------------------------------
  // Read Reminders
  // -------------------------------
  const allReminders = JSON.parse(localStorage.getItem("reminders") || "[]").map(
    (r) => ({ ...r, date: new Date(r.date) })
  );

  // Dismissed reminders
  const [dismissed, setDismissed] = useState(
    JSON.parse(localStorage.getItem("dismissedReminders") || "[]")
  );

  const dismissReminder = (id) => {
    const updated = [...dismissed, id];
    setDismissed(updated);
    localStorage.setItem("dismissedReminders", JSON.stringify(updated));
  };

  const upcomingReminders = allReminders.filter(
    (r) =>
      r.status !== "Done" &&
      r.date >= new Date() &&
      !dismissed.includes(r.id)
  );

  // -------------------------------
  // Sign Out
  // -------------------------------
  const handleSignOut = () => {
    localStorage.clear();
    navigate("/");
  };

  // -------------------------------
  // Lead Modal Form
  // -------------------------------
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
      <div className="sticky top-0 z-40 flex justify-between items-center px-4 sm:px-6 py-3 bg-white border-b border-gray-200 shadow-sm">
        {/* LEFT SIDE */}
        <div className="flex items-center space-x-4">
          {/* ☰ Mobile menu */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <i className="ri-menu-line text-2xl"></i>
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-gray-700">
            <i className={`${icon} text-lg text-indigo-500`}></i>
            <p className="text-sm hidden sm:block">
              {label} /{" "}
              <span className="font-semibold text-indigo-600">
                {subLabel}
              </span>
            </p>
          </div>

          {/* Time */}
          <div className="hidden lg:flex items-center text-xs text-gray-500">
            <i className="ri-time-line mr-2 text-base text-indigo-500"></i>
            {currentTime}
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="hidden sm:block relative w-[14rem] md:w-[20rem] lg:w-[28rem]">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            placeholder="Search projects, leads, invoices..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center space-x-3 sm:space-x-4" ref={dropdownRef}>
          {/* Fullscreen */}
          <button onClick={toggleFullscreen} className="hover:bg-gray-100 p-2 rounded-md">
            <i
              className={`${
                isFullscreen ? "ri-fullscreen-exit-line" : "ri-fullscreen-line"
              } text-lg text-gray-600`}
            ></i>
          </button>

          {/* Add Lead button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 px-2 py-1 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm"
          >
            <PlusSquare size={14} />
            <span>New Lead</span>
          </button>

          {/* NOTIFICATIONS */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-md hover:bg-gray-100 relative"
            >
              <i className="ri-notification-2-line text-lg text-gray-600"></i>
              {upcomingReminders.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
              )}
            </button>

            {showNotifications && (
              <div className="fixed top-14 right-4 w-72 bg-white border border-gray-200 rounded-md shadow-lg p-3 z-[9999]">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                >
                  <i className="ri-close-line text-lg"></i>
                </button>

                <p className="font-semibold text-gray-700 text-sm mb-3 pr-6">
                  Upcoming Reminders
                </p>

                {upcomingReminders.length === 0 ? (
                  <p className="text-gray-500 text-xs text-center py-2">
                    No upcoming reminders.
                  </p>
                ) : (
                  upcomingReminders.map((rem) => (
                    <div
                      key={rem.id}
                      className="p-2 mb-2 rounded-md border bg-white relative hover:bg-indigo-50 transition"
                    >
                      <button
                        onClick={() => dismissReminder(rem.id)}
                        className="absolute top-1 right-1 text-gray-400 hover:text-red-500"
                      >
                        <i className="ri-close-line text-sm"></i>
                      </button>

                      <div
                        onClick={() => {
                          navigate("/reminders", { state: { date: rem.date } });
                          setShowNotifications(false);
                        }}
                        className="cursor-pointer"
                      >
                        <p className="text-sm font-semibold">{rem.title}</p>
                        <p className="text-xs text-gray-500">{rem.project}</p>
                        <p className="text-xs text-indigo-600 mt-1">
                          {new Date(rem.date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* USER DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 hover:bg-gray-100 rounded-md px-2 py-1"
            >
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <i className="ri-user-3-line text-indigo-600"></i>
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <p className="text-xs font-semibold">John Doe</p>
                <p className="text-[10px] text-gray-500">Admin</p>
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg text-xs z-50">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
                    <i className="ri-user-line"></i>
                    <span>My Profile</span>
                  </li>

                  <hr />

                  <li
                    onClick={handleSignOut}
                    className="px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer flex items-center space-x-2 text-red-600"
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

      {/* ADD LEAD MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg relative"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
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
                className="border p-2 rounded"
                required
              />

              <input
                type="text"
                placeholder="Phone"
                value={newLead.phone}
                onChange={(e) =>
                  setNewLead({ ...newLead, phone: e.target.value })
                }
                className="border p-2 rounded"
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={newLead.mail}
                onChange={(e) =>
                  setNewLead({ ...newLead, mail: e.target.value })
                }
                className="border p-2 rounded"
                required
              />

              <select
                value={newLead.status}
                onChange={(e) =>
                  setNewLead({ ...newLead, status: e.target.value })
                }
                className="border p-2 rounded"
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
                className="border p-2 rounded"
              />

              <textarea
                placeholder="Notes"
                value={newLead.notes}
                onChange={(e) =>
                  setNewLead({ ...newLead, notes: e.target.value })
                }
                className="border p-2 rounded sm:col-span-2"
              />

              <button
                type="submit"
                className="sm:col-span-2 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
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
