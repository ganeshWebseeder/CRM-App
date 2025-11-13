import React, { useEffect } from "react";
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

// 🎯 Animated Counter
function AnimatedCounter({ value, isCurrency = false }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    isCurrency
      ? "₹" + Math.floor(latest).toLocaleString("en-IN")
      : Math.floor(latest).toLocaleString("en-IN")
  );

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [value]);

  return (
    <motion.span className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-tight">
      {rounded}
    </motion.span>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  // Summary cards
  const summary = [
    {
      title: "Total Projects",
      onClick: () => navigate("/projects"),
      value: 128,
      icon: <Briefcase size={22} />,
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Active Projects",
      onClick: () => navigate("/projects?status=active"),
      value: 76,
      icon: <PlayCircle size={22} />,
      color: "from-green-400 to-green-600",
    },
    {
      title: "Leads Count",
      onClick: () => navigate("/leads"),
      value: 54,
      icon: <Users size={22} />,
      color: "from-yellow-400 to-yellow-600",
    },
    {
      title: "Outstanding Amount",
      onClick: () => navigate("/invoices"),
      value: 452300,
      isCurrency: true,
      icon: <IndianRupee size={22} />,
      color: "from-rose-400 to-red-600",
    },
    {
      title: "Reminders Today",
      onClick: () => navigate("/reminders"),
      value: 9,
      icon: <Bell size={22} />,
      color: "from-indigo-400 to-indigo-600",
    },
  ];

  // Quick Actions with routing
  const quickActions = [
    { icon: <UserPlus size={18} />, label: "Add Lead", onClick: () => navigate("/leads") },
    { icon: <FileText size={18} />, label: "Create Invoice", onClick: () => navigate("/invoices") },
    { icon: <AlarmClock size={18} />, label: "Set Reminder", onClick: () => navigate("/reminders") },
    { icon: <PieIcon size={18} />, label: "View Reports", onClick: () => navigate("/reports") },
  ];

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
    <div className="p-4 sm:p-6 md:p-8 min-h-screen bg-gradient-to-br from-white via-blue-50 to-gray-100">
      {/* 🌟 Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center"
      >
       
        <p className="text-gray-500 text-sm mt-2">
          Track progress, revenue, and leads at a glance 🌤️
        </p>
      </motion.div>

      {/* 🧩 Summary Cards */}
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
              scale: 1.05,
              y: -5,
              boxShadow: "0 12px 25px rgba(0,0,0,0.1)",
            }}
            onClick={item.onClick}
            className={`cursor-pointer p-4 sm:p-5 rounded-2xl bg-gradient-to-r ${item.color} text-white shadow-md flex justify-between items-center hover:opacity-95 transition`}
          >
            <div>
              <p className="text-xs sm:text-sm uppercase font-medium opacity-90">
                {item.title}
              </p>
              <AnimatedCounter value={item.value} isCurrency={item.isCurrency} />
            </div>
            <div className="bg-white/30 p-2 sm:p-3 rounded-full">{item.icon}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* 📊 Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-32"
      >
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">
            📊 Revenue Overview (Last 6 Months)
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Bar dataKey="revenue" fill="url(#colorRevenue)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#93C5FD" stopOpacity={0.5} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Leads Chart */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">
            🎯 Leads Distribution
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={leadData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {leadData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* ⚡ Quick Actions - Floating Panel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className=" bottom-6 z-50 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-gray-200"
      >
        <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
          Quick Actions ⚡
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {quickActions.map((action, i) => (
            <motion.button
              key={i}
              onClick={action.onClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl shadow hover:shadow-lg transition text-xs sm:text-sm font-medium"
            >
              {action.icon}
              {action.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
