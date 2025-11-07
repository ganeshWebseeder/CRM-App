import React from "react";

export default function ExpenseTable({ expenses, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-100 text-gray-600 uppercase">
          <tr>
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
            expenses.map((e) => (
              <tr
                key={e.id}
                className="border-t hover:bg-gray-50 transition duration-150"
              >
                <td className="p-3">{e.type}</td>
                <td className="p-3">{e.project}</td>
                <td className="p-3 text-indigo-600 font-medium">
                  ₹{e.amount.toLocaleString()}
                </td>
                <td className="p-3">{e.date}</td>
                <td className="p-3">{e.paidTo}</td>
                <td className="p-3">{e.mode}</td>
                <td className="p-3">{e.remarks}</td>
                <td className="p-3 text-center flex justify-center gap-4">
                  {/* Edit Button */}
                  <button
                    onClick={() => onEdit(e)}
                    className="text-indigo-600 hover:text-indigo-800"
                    title="Edit"
                  >
                    <i className="ri-edit-2-fill text-lg"></i>
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => onDelete(e.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <i className="ri-delete-bin-6-line text-lg"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="8"
                className="text-center text-gray-500 py-4 text-sm"
              >
                No matching expenses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
