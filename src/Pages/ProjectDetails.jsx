import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProjectOverviewTab from "../components/projectdetails/ProjectOverviewTab";
import ProjectDocumentsTab from "../components/projectdetails/ProjectDocumentTab";
import ProjectInvoicesTab from "../components/projectdetails/ProjectInvoicesTab";
import ProjectLedgerTab from "../components/projectdetails/ProjectLeaderTab";
import ProjectMaintenanceTab from "../components/projectdetails/ProjectMaintanance";
import ProjectRemindersTab from "../components/projectdetails/ProjectReminderTab";

export default function ProjectDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "documents", label: "Documents" },
    { key: "invoices", label: "Invoices" },
    { key: "ledger", label: "Ledger" },
    { key: "maintenance", label: "Maintenance" },
    { key: "reminders", label: "Reminders" },
  ];

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold text-gray-800">
        Project Details 
      </h1>

      {/* Tabs Header */}
      <div className="flex space-x-4 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 px-3 text-sm font-medium ${
              activeTab === tab.key
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="bg-white rounded-lg shadow p-4">
        {activeTab === "overview" && <ProjectOverviewTab id={id} />}
        {activeTab === "documents" && <ProjectDocumentsTab id={id} />}
        {activeTab === "invoices" && <ProjectInvoicesTab id={id} />}
        {activeTab === "ledger" && <ProjectLedgerTab id={id} />}
        {activeTab === "maintenance" && <ProjectMaintenanceTab id={id} />}
        {activeTab === "reminders" && <ProjectRemindersTab id={id} />}
      </div>
    </div>
  );
}
