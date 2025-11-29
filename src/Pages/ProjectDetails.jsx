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

  // Same projects data as in Projects.jsx
  const projects = [
    { id: 1, name: "CRM Revamp", client: "WebSeeder Technologies", status: "Active" },
    { id: 2, name: "Inventory System", client: "TechNova Pvt. Ltd.", status: "Completed" },
    { id: 3, name: "Marketing Portal", client: "CloudEdge", status: "On Hold" },
    { id: 4, name: "E-commerce Redesign", client: "WebSeeder Technologies", status: "Active" },
  ];

  const project = projects.find((p) => p.id === Number(id));

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

      {/* Project Header - Always Visible */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h1 className="text-xl font-semibold text-gray-800">
          {project?.name || "Project Not Found"}
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          Client: <span className="font-medium">{project?.client}</span>
        </p>
      </div>

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
        {activeTab === "overview" && <ProjectOverviewTab project={project} />}
        {activeTab === "documents" && <ProjectDocumentsTab project={project} />}
        {activeTab === "invoices" && <ProjectInvoicesTab project={project} />}
        {activeTab === "ledger" && <ProjectLedgerTab project={project} />}
        {activeTab === "maintenance" && <ProjectMaintenanceTab project={project} />}
        {activeTab === "reminders" && <ProjectRemindersTab project={project} />}
      </div>
    </div>
  );
}
