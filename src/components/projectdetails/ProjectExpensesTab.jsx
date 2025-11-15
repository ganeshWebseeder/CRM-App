import React, { useState } from "react";

export default function ProjectExpensesTab() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [bill, setBill] = useState(null);
  const [editExpense, setEditExpense] = useState(null);
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  // ✅ Add or Edit Expense
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount || !date) {
      alert("Please fill all required fields!");
      return;
    }

    const newExpense = {
      id: editExpense ? editExpense.id : Date.now(),
      title,
      amount: parseFloat(amount),
      date,
      billName: bill ? bill.name : "No Bill Uploaded",
    };

    if (editExpense) {
      setExpenses((prev) =>
        prev.map((exp) => (exp.id === editExpense.id ? newExpense : exp))
      );
      setEditExpense(null);
      alert("Expense updated successfully!");
    } else {
      setExpenses((prev) => [...prev, newExpense]);
      alert("Expense added successfully!");
    }

    // Reset form
    setTitle("");
    setAmount("");
    setDate("");
    setBill(null);
  };

  // 🧾 Edit Expense
  const handleEdit = (expense) => {
    setTitle(expense.title);
    setAmount(expense.amount);
    setDate(expense.date);
    setBill(null);
    setEditExpense(expense);
  };

  // ❌ Delete Expense
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    }
  };

  // 🧮 Filter by Date Range
  const filteredExpenses = expenses.filter((exp) => {
    if (!filterStartDate && !filterEndDate) return true;
    const expDate = new Date(exp.date);
    const start = filterStartDate ? new Date(filterStartDate) : null;
    const end = filterEndDate ? new Date(filterEndDate) : null;

    if (start && expDate < start) return false;
    if (end && expDate > end) return false;
    return true;
  });

  // 💰 Total
  const total = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="space-y-6">
      {/* 🧾 Add/Edit Expense Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm space-y-3"
      >
        <h2 className="text-sm font-semibold text-gray-700 mb-2">
          {editExpense ? "Edit Expense" : "Add New Expense"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Expense Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter expense title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-400"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Amount (₹)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-400"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-400"
            />
          </div>

          {/* Upload Bill */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Upload Bill
            </label>
            <input
              type="file"
              onChange={(e) => setBill(e.target.files[0])}
              className="w-full text-sm"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-md transition"
          >
            {editExpense ? "Update Expense" : "Add Expense"}
          </button>
        </div>
      </form>

      {/* 📅 Filter by Date */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            From Date
          </label>
          <input
            type="date"
            value={filterStartDate}
            onChange={(e) => setFilterStartDate(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            To Date
          </label>
          <input
            type="date"
            value={filterEndDate}
            onChange={(e) => setFilterEndDate(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-indigo-400"
          />
        </div>

        <button
          onClick={() => {
            setFilterStartDate("");
            setFilterEndDate("");
          }}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded-md"
        >
          Clear Filter
        </button>

        <div className="ml-auto">
          <p className="text-sm font-medium text-gray-700">
            Total: <span className="text-indigo-600 font-semibold">₹{total}</span>
          </p>
        </div>
      </div>

      {/* 📄 Expense Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr className="bg-indigo-100 text-gray-700">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Bill</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((exp) => (
                <tr
                  key={exp.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">{exp.title}</td>
                  <td className="p-3 text-indigo-600 font-semibold">
                    ₹{exp.amount.toFixed(2)}
                  </td>
                  <td className="p-3">{exp.date}</td>
                  <td className="p-3 text-gray-500 italic">{exp.billName}</td>
                  <td className="p-3 text-center flex justify-center gap-3">
                    {/* ✏️ Edit */}
                    <i
                      className="ri-edit-2-fill text-indigo-600 text-lg cursor-pointer hover:text-indigo-800 transition"
                      onClick={() => handleEdit(exp)}
                      title="Edit Expense"
                    ></i>

                    {/* ❌ Delete */}
                    <i
                      className="ri-delete-bin-6-line text-red-500 text-lg cursor-pointer hover:text-red-700 transition"
                      onClick={() => handleDelete(exp.id)}
                      title="Delete Expense"
                    ></i>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-gray-500 py-4 text-sm"
                >
                  No expenses found for selected date range.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
