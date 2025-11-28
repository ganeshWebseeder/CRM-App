import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

import {
  Briefcase,
  PlayCircle,
  Users,
  IndianRupee,
  Bell,
  UserPlus,
  FileText,
  AlarmClock,
  PieChart as PieIcon,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Pie,
  Cell,
  PieChart,
} from "recharts";

import { useNavigate } from "react-router-dom";
import { useReminder } from "../context/ReminderContext";
import ReminderModal from "../components/reminders/ReminderModal";

/* ----------------------------------------
   Animated Counter Component
---------------------------------------- */
function AnimatedCounter({ value, isCurrency = false, className = "" }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    isCurrency
      ? "₹" + Math.floor(latest).toLocaleString("en-IN")
      : Math.floor(latest).toLocaleString("en-IN")
  );

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.5, ease: "easeOut" });
    return controls.stop;
  }, [value]);

  return (
    <motion.span className={`tracking-tight ${className}`}>
      {rounded}
    </motion.span>
  );
}

/* ----------------------------------------
   MAIN DASHBOARD COMPONENT
---------------------------------------- */
export default function Dashboard() {
  const navigate = useNavigate();
  const { reminders: contextReminders } = useReminder();

  const [reminders, setReminders] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  /* Initialize reminders with default status */
  useEffect(() => {
    const normalized = contextReminders.map((r) => ({
      ...r,
      status: r.status || "pending",
    }));
    setReminders(normalized);
  }, [contextReminders]);

  /* Toggle Done / Pending */
  const handleUpdateStatus = (id) => {
    setReminders((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: r.status === "done" ? "pending" : "done" }
          : r
      )
    );
  };

  /* Delete reminder */
  const handleDelete = (id) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  /* Summary Cards */
  const summary = [
    {
      title: "Total Projects",
      onClick: () => navigate("/projects"),
      value: 128,
      icon: <Briefcase size={22} />,
      color: "from-blue-200 to-blue-200",
    },
    {
      title: "Active Projects",
      onClick: () => navigate("/projects?status=active"),
      value: 76,
      icon: <PlayCircle size={22} />,
      color: "from-green-200 to-green-200",
    },
    {
      title: "Leads Count",
      onClick: () => navigate("/leads"),
      value: 54,
      icon: <Users size={22} />,
      color: "from-yellow-200 to-yellow-200",
    },
    {
      title: "Outstanding Amount",
      onClick: () => navigate("/invoices"),
      value: 452300,
      isCurrency: true,
      icon: <IndianRupee size={22} />,
      color: "from-rose-200 to-red-200",
    },
    {
      title: "Reminders Today",
      onClick: () => navigate("/reminders"),
      value: reminders.filter(
        (r) => r.date === new Date().toISOString().split("T")[0]
      ).length,
      icon: <Bell size={22} />,
      color: "from-indigo-200 to-indigo-200",
    },
  ];

  /* Quick Actions */
  const quickActions = [
    { icon: <UserPlus size={18} />, label: "Add Lead", onClick: () => navigate("/leads") },
    { icon: <FileText size={18} />, label: "Create Invoice", onClick: () => navigate("/invoices") },
    { icon: <AlarmClock size={18} />, label: "Set Reminder", onClick: () => setShowAdd(true) },
    { icon: <PieIcon size={18} />, label: "View Reports", onClick: () => navigate("/reports") },
  ];

  /* Charts Data */
  const revenueData = [
    { month: "Jan", revenue: 40000 },
    { month: "Feb", revenue: 52000 },
    { month: "Mar", revenue: 61000 },
    { month: "Apr", revenue: 48000 },
    { month: "May", revenue: 72000 },
    { month: "Jun", revenue: 66000 },
  ];

  const leadData = [
    { name: "Cold Leads", value: 30 },
    { name: "Warm Leads", value: 45 },
    { name: "Hot Leads", value: 25 },
  ];

  const COLORS = ["#60A5FA", "#34D399", "#FBBF24"];

  const cardVariant = {
    hidden: { opacity: 0, y: 50 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, type: "spring", stiffness: 100 },
    }),
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-screen pb-40 bg-gradient-to-br from-white via-blue-50 to-gray-100">

      {/* Summary Cards */}
      <motion.div
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mb-10"
      >
        {summary.map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariant}
            whileHover={{
              scale: 1.02,
              y: -2,
              boxShadow: "0 8px 15px rgba(0,0,0,0.05)",
            }}
            onClick={item.onClick}
            className={`cursor-pointer p-4 rounded-xl bg-gradient-to-r ${item.color} 
                        shadow-sm flex justify-between items-center hover:opacity-95 transition`}
          >
            <div>
              <p className="text-base text-gray-600 mb-2">{item.title}</p>
              <AnimatedCounter
                value={item.value}
                isCurrency={item.isCurrency}
                className="text-gray-600 text-base font-semibold"
              />
            </div>

            <div className="bg-black/20 p-2 rounded-full">{item.icon}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-10"
      >
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">
            Revenue Overview
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Bar dataKey="revenue" fill="#60A5FA" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Leads Chart */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">
            Leads Distribution
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={leadData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                dataKey="value"
              >
                {leadData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Reminders Section */}
      <div className="bg-white rounded-2xl p-6 shadow border border-gray-200 mb-20">
  <h2 className="text-lg font-semibold text-gray-700 mb-4">Reminders</h2>

  {reminders.length === 0 ? (
    <p className="text-gray-500 text-sm">No reminders</p>
  ) : (
    <div className="space-y-4">
      {reminders.map((r) => (
        <div
          key={r.id}
          className="p-4 rounded-xl border hover:bg-gray-50 transition flex flex-col gap-3"
        >
          {/* Top Section */}
          <div className="flex justify-between items-start">
            <div>
              {/* Title */}
              <p className="font-semibold text-gray-800">{r.title}</p>

              {/* Project + Time */}
              <p className="text-xs text-gray-600">
                {r.project} • {r.time}
              </p>

              {/* Date + Status */}
              <p
                className={`text-xs font-semibold ${
                  r.status === "done"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {r.date} • {r.status?.toUpperCase()}
              </p>
            </div>

            {/* Priority Badge */}
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                r.priority === "High"
                  ? "bg-red-100 text-red-700"
                  : r.priority === "Medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {r.priority}
            </span>
          </div>

          {/* Category + Repeat */}
          <div className="flex items-center gap-3 text-xs text-gray-600">
            <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full font-medium">
              {r.category}
            </span>

            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
              {r.repeat}
            </span>
          </div>

          {/* Alert Before */}
          <p className="text-xs text-gray-500">
            Alert Before: <span className="font-medium">{r.alertBefore}</span>
          </p>

          {/* Notes */}
          {r.notes && r.notes.trim() !== "" && (
            <p className="text-xs text-gray-600 border-l-4 border-indigo-300 pl-2">
              {r.notes}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 mt-1">
            <button
              onClick={() => handleUpdateStatus(r.id)}
              className={`px-3 py-1 text-xs rounded-md ${
                r.status === "done"
                  ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
            >
              {r.status === "done" ? "Mark Pending" : "Mark Done"}
            </button>

            <button
              onClick={() => handleDelete(r.id)}
              className="px-3 py-1 text-xs rounded-md bg-red-100 text-red-700 hover:bg-red-200"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>


      {/* Add Reminder Modal */}
      <ReminderModal
        show={showAdd}
        onClose={() => setShowAdd(false)}
        defaultDate={new Date().toISOString().split("T")[0]}
      />
    </div>
  );
}
