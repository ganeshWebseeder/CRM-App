import React, { useState } from "react";
import ReportCard from "../components/reports/ReportCard";
import ReportPreviewTable from "../components/reports/ReportPreviewTable";
import ReportExportModal from "../components/reports/ReportExportModal";

export default function Reports() {
  const [activeReport, setActiveReport] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);

  const reports = [
    {
      key: "project",
      title: "Project Summary",
      icon: "ri-briefcase-line",
      description: "Overview of all projects, clients and status.",
    },
    {
      key: "expense",
      title: "Expense Report",
      icon: "ri-money-dollar-circle-line",
      description: "Track all project-related expenses and dates.",
    },
    {
      key: "invoice",
      title: "Invoice Summary",
      icon: "ri-file-list-3-line",
      description: "List of invoices, clients and amounts.",
    },
    {
      key: "outstanding",
      title: "Outstanding Payments",
      icon: "ri-hand-coin-line",
      description: "Pending or partially paid invoices.",
    },
    {
      key: "maintenance",
      title: "Maintenance Report",
      icon: "ri-tools-line",
      description: "Track maintenance schedules and visits.",
    },
  ];

  return (
    <div className=" p-6 space-y-6">
      {/* Header */}
      <div>
    
        <p className=" ml-2 text-gray-500 text-sm">
          Export system-wide reports including projects, expenses, invoices, and more.
        </p>
      </div>

      {/* Report Cards */}
      {!activeReport && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reports.map((r) => (
            <ReportCard
              key={r.key}
              report={r}
              onClick={() => setActiveReport(r.key)}
            />
          ))}
        </div>
      )}

      {/* Report Preview */}
      {activeReport && (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-indigo-700">
              {reports.find((r) => r.key === activeReport)?.title}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowExportModal(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md text-sm transition"
              >
                Export
              </button>
              <button
                onClick={() => setActiveReport(null)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded-md text-sm transition"
              >
                Back
              </button>
            </div>
          </div>

          <ReportPreviewTable activeReport={activeReport} />
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <ReportExportModal
          activeReport={activeReport}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
}
