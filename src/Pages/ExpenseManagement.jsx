import React, { useMemo, useState } from "react";
import ExpenseModal from "../components/expenses/ExpenseModal";
import ExpenseTable from "../components/expenses/ExpenseTable";

export default function ExpenseManagement() {
  // 🧠 States
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      type: "Software License",
      project: "CRM Revamp",
      amount: 15000,
      date: "2025-11-06",
      paidTo: "Tech Solutions Pvt Ltd",
      mode: "UPI",
      remarks: "Annual subscription",
    },
    {
      id: 2,
      type: "Travel",
      project: "Inventory System",
      amount: 3000,
      date: "2025-10-12",
      paidTo: "John Transport",
      mode: "Cash",
      remarks: "Client visit for demo",
    },
  ]);

  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState("All");
  const [modeFilter, setModeFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editExpense, setEditExpense] = useState(null);

  // 🔍 Filter Logic
  const filteredExpenses = useMemo(() => {
    return expenses.filter((e) => {
      const matchesSearch =
        e.type.toLowerCase().includes(search.toLowerCase()) ||
        e.paidTo.toLowerCase().includes(search.toLowerCase());
      const matchesProject =
        projectFilter === "All" || e.project === projectFilter;
      const matchesMode = modeFilter === "All" || e.mode === modeFilter;
      const matchesDate =
        (!startDate || new Date(e.date) >= new Date(startDate)) &&
        (!endDate || new Date(e.date) <= new Date(endDate));
      return matchesSearch && matchesProject && matchesMode && matchesDate;
    });
  }, [expenses, search, projectFilter, modeFilter, startDate, endDate]);

  const uniqueProjects = useMemo(
    () => ["All", ...new Set(expenses.map((e) => e.project))],
    [expenses]
  );

  // 💾 Save Expense
  const handleSave = (data) => {
    if (editExpense) {
      setExpenses((prev) =>
        prev.map((e) => (e.id === editExpense.id ? { ...data, id: e.id } : e))
      );
    } else {
      setExpenses((prev) => [...prev, { ...data, id: Date.now() }]);
    }
    setShowModal(false);
    setEditExpense(null);
  };

  // ❌ Delete Expense
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    }
  };

  // 📤 Export CSV
  const handleExport = () => {
    const header = [
      "Type",
      "Project",
      "Amount",
      "Date",
      "Paid To",
      "Mode",
      "Remarks",
    ];
    const rows = filteredExpenses.map((e) =>
      [e.type, e.project, e.amount, e.date, e.paidTo, e.mode, e.remarks].join(",")
    );
    const csv = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    a.click();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Expense Management
        </h1>
        <p className="text-gray-500 text-sm">
          Track, filter, and export all project-related expenses.
        </p>
      </div>

      {/* Filters Section */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm border flex flex-wrap items-end gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by expense type or payee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-indigo-400 w-64"
        />

        {/* Project Filter */}
        <select
          value={projectFilter}
          onChange={(e) => setProjectFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-indigo-400"
        >
          {uniqueProjects.map((p, i) => (
            <option key={i}>{p}</option>
          ))}
        </select>

        {/* Payment Mode Filter */}
        <select
          value={modeFilter}
          onChange={(e) => setModeFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-indigo-400"
        >
          <option>All</option>
          <option>Cash</option>
          <option>UPI</option>
          <option>Bank Transfer</option>
          <option>Card</option>
        </select>

        {/* Date Range */}
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        />

        {/* Add Expense Button */}
        <button
          onClick={() => {
            setEditExpense(null);
            setShowModal(true);
          }}
          className="ml-auto bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-md transition"
        >
          + Add Expense
        </button>
      </div>

      {/* Table */}
      <ExpenseTable
        expenses={filteredExpenses}
        onEdit={(e) => {
          setEditExpense(e);
          setShowModal(true);
        }}
        onDelete={handleDelete}
      />

      {/* Export Button */}
      <div className="flex justify-end">
        <button
          onClick={handleExport}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded-md"
        >
          Export CSV
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <ExpenseModal
          show={showModal}
          onClose={() => {
            setShowModal(false);
            setEditExpense(null);
          }}
          onSave={handleSave}
          expense={editExpense}
        />
      )}
    </div>
  );
}
