import React from "react";
import { motion } from "framer-motion";

export default function ExpenseTable({ expenses, onEdit, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}   // ⬅️ SAME as Projects Table
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200 p-6"
    >
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-100 text-gray-600 uppercase">
          <tr className="bg-indigo-100 text-gray-700">
            <th className="p-3 text-left">Expense Type</th>
            <th className="p-3 text-left">Project</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Paid To</th>
            <th className="p-3 text-left">Payment Mode</th>
            <th className="p-3 text-left">Remarks</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {expenses.length ? (
            expenses.map((e, index) => (
              <motion.tr
                key={e.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}  // same stagger as projects
                className="border-b hover:bg-gray-50 transition duration-150"
              >
                <td className="p-3">{e.type}</td>
                <td className="p-3">{e.project}</td>

                <td className="p-3 text-indigo-600 font-medium">
                  ₹{e.amount.toLocaleString()}
                </td>

                <td className="p-3">{e.date}</td>
                <td className="p-3">{e.paidTo}</td>
                <td className="p-3">{e.mode}</td>
                <td className="p-3">{e.remarks || "-"}</td>

                <td className="p-3">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => onEdit(e)}
                      className="text-indigo-600 hover:text-indigo-800"
                      title="Edit"
                    >
                      <i className="ri-edit-line action-btn text-indigo-600 cursor-pointer hover:text-indigo-800 p-2"></i>
                    </button>

                    <button
                      onClick={() => onDelete(e.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <i  className="ri-delete-bin-line action-btn text-red-500 cursor-pointer hover:text-red-700 p-2"></i>
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center text-gray-500 py-4 text-sm">
                No matching expenses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </motion.div>
  );
}
