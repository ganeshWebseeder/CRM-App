import React from "react";
import Navbar from "../components/Dash-ui/Navbar";
import Sidebar from "../components/Dash-ui/Sidebar";

export default function Dashboard() {
  // Summary data (later this will come from backend API)
  const summary = [
    {
      title: "Total Projects",
      value: 128,
      icon: "ri-briefcase-line",
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      title: "Active Projects",
      value: 76,
      icon: "ri-play-circle-line",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Leads Count",
      value: 54,
      icon: "ri-user-star-line",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Outstanding Amount",
      value: "₹4,52,300",
      icon: "ri-money-rupee-circle-line",
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Reminders Today",
      value: 9,
      icon: "ri-notification-3-line",
      color: "bg-blue-100 text-blue-600",
    },
  ];

  // Quick actions (from spec)
  const quickActions = [
    { icon: "ri-add-circle-line", label: "Add New Project" },
    { icon: "ri-user-add-line", label: "Add New Lead" },
    { icon: "ri-file-list-3-line", label: "Create Invoice" },
    { icon: "ri-alarm-warning-line", label: "Set Reminder" },
    { icon: "ri-bar-chart-2-line", label: "View Reports" },
  ];

  return (
     <div className="flex flex-1">
      <Sidebar />
      <div className="flex-1 p-4">
        <Navbar />
        <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Project Management Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          Key metrics and quick actions for daily operations
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {summary.map((item, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition flex justify-between items-center"
          >
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase">
                {item.title}
              </p>
              <h2 className="text-lg font-bold text-gray-800 mt-1">
                {item.value}
              </h2>
            </div>
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full ${item.color}`}
            >
              <i className={`${item.icon} text-lg`}></i>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {quickActions.map((action, i) => (
            <button
              key={i}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-slate-700 text-white py-3 rounded-lg shadow hover:opacity-90 transition text-sm font-medium"
            >
              <i className={`${action.icon} text-base`}></i>
              {action.label}
            </button>
          ))}
        </div>
      </div>
      </div>
    </div>
  </div>
  );
}
