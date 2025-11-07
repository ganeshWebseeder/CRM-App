import React, { useState, useEffect } from "react";

export default function ExpenseModal({ show, onClose, onSave, expense }) {
  const [form, setForm] = useState({
    type: "",
    project: "",
    amount: "",
    date: "",
    paidTo: "",
    mode: "Cash",
    remarks: "",
  });

  useEffect(() => {
    if (expense) setForm(expense);
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.type || !form.project || !form.amount) {
      alert("Please fill all required fields");
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold text-gray-800">
            {expense ? "Edit Expense" : "Add Expense"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="type"
              placeholder="Expense Type"
              value={form.type}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-indigo-400"
            />
            <input
              name="project"
              placeholder="Project Name"
              value={form.project}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-indigo-400"
            />
            <input
              name="amount"
              type="number"
              placeholder="Amount ₹"
              value={form.amount}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-indigo-400"
            />
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-indigo-400"
            />
            <input
              name="paidTo"
              placeholder="Paid To"
              value={form.paidTo}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-indigo-400"
            />
            <select
              name="mode"
              value={form.mode}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-indigo-400"
            >
              <option>Cash</option>
              <option>UPI</option>
              <option>Bank Transfer</option>
              <option>Card</option>
            </select>
          </div>
          <textarea
            name="remarks"
            placeholder="Remarks"
            value={form.remarks}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md text-sm w-full focus:ring-1 focus:ring-indigo-400"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-md"
            >
              {expense ? "Save Changes" : "Add Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
