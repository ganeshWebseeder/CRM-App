import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function ExpenseModal({ show, onClose, onSave, expense }) {
  const emptyForm = {
    type: "",
    project: "",
    amount: "",
    date: "",
    paidTo: "",
    mode: "Cash",
    remarks: "",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (expense) setForm(expense);
    else setForm(emptyForm);
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

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-100 p-7 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <X size={22} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          {expense ? "Edit Expense" : "Add Expense"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">

          {/* Expense Type */}
          <div>
            <label className="text-gray-600 text-sm font-medium">Expense Type *</label>
            <input
              name="type"
              placeholder="Enter expense type"
              value={form.type}
              onChange={handleChange}
              className=" border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Project */}
          <div>
            <label className="text-gray-600 text-sm font-medium">Project *</label>
            <input
              name="project"
              placeholder="Enter project name"
              value={form.project}
              onChange={handleChange}
              className=" border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Amount & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-gray-600 text-sm font-medium">Amount *</label>
              <input
                name="amount"
                type="number"
                placeholder="₹ Amount"
                value={form.amount}
                onChange={handleChange}
                className=" border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-gray-600 text-sm font-medium">Date</label>
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className=" border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Paid To */}
          <div>
            <label className="text-gray-600 text-sm font-medium">Paid To</label>
            <input
              name="paidTo"
              placeholder="Paid To"
              value={form.paidTo}
              onChange={handleChange}
              className=" border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Mode */}
          <div>
            <label className="text-gray-600 text-sm font-medium">Payment Mode</label>
            <select
              name="mode"
              value={form.mode}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg w-full bg-white focus:ring-2 focus:ring-indigo-500"
            >
              <option>Cash</option>
              <option>UPI</option>
              <option>Bank Transfer</option>
              <option>Card</option>
            </select>
          </div>

          {/* Remarks */}
          <div>
            <label className="text-gray-600 text-sm font-medium">Remarks</label>
            <textarea
              name="remarks"
              placeholder="Optional remarks"
              value={form.remarks}
              onChange={handleChange}
              className=" border border-gray-300 p-2 rounded-lg w-full min-h-[70px] focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="mt-2 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            {expense ? "Save Changes" : "Add Expense"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
