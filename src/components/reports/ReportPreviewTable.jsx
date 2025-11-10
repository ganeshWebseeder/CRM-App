import React from "react";

export default function ReportPreviewTable({ activeReport }) {
  const data = {
    project: [
      { name: "CRM Revamp", client: "WebSeeder", status: "Active" },
      { name: "Marketing Portal", client: "CloudEdge", status: "Completed" },
    ],
    expense: [
      { date: "2025-03-05", category: "Hosting", amount: 3000 },
      { date: "2025-03-10", category: "Design", amount: 1200 },
    ],
    invoice: [
      { invoice: "INV-2025-001", client: "TechNova", amount: 25000, status: "Paid" },
      { invoice: "INV-2025-002", client: "WebSeeder", amount: 18000, status: "Pending" },
    ],
    outstanding: [
      { client: "WebSeeder", invoice: "INV-2025-002", due: 18000 },
      { client: "CloudEdge", invoice: "INV-2025-004", due: 12000 },
    ],
    maintenance: [
      { project: "CRM Revamp", visits: 5, nextVisit: "2025-12-10" },
      { project: "Marketing Portal", visits: 2, nextVisit: "2025-11-20" },
    ],
  };

  const tableData = data[activeReport] || [];
  const keys = tableData.length ? Object.keys(tableData[0]) : [];

  return (
    <div id="report-table" className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-100 text-gray-600 uppercase">
          <tr>
            {keys.map((key) => (
              <th key={key} className="p-3 text-left">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, i) => (
            <tr key={i} className="border-t hover:bg-gray-50">
              {keys.map((key) => (
                <td key={key} className="p-3">
                  {row[key]}
                </td>
              ))}
            </tr>
          ))}
          {tableData.length === 0 && (
            <tr>
              <td colSpan={keys.length} className="text-center text-gray-400 py-4">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
