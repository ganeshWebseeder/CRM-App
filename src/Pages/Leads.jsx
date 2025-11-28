import React, { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, CheckCircle, Briefcase, Trash2 } from "lucide-react";
import { useLeads } from "../context/LeadsContext"
export default function LeadManagementPage() {
  const { leads, addLead, updateLead, deleteLead, updateStatus, convertToProject } = useLeads(); // ✅ Using context data
  const [editingLead, setEditingLead] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const leadsPerPage = 5;
  const totalPages = Math.ceil(leads.length / leadsPerPage);
  const startIndex = (currentPage - 1) * leadsPerPage;
  const endIndex = startIndex + leadsPerPage;
  const currentLeads = leads.slice(startIndex, endIndex);

  const handleEdit = (lead) => {
    setEditingLead(lead);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    updateLead(editingLead);
    setEditingLead(null);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="  text-gray-500 text-sm">
          Leads Overview
        </h2>
      </div>

      {/* Leads Table */}
      <motion.div
        className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr className="bg-indigo-100 text-gray-700">
              <th className="p-3 text-left">Client</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Source</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentLeads.map((lead) => (
              <motion.tr
                key={lead.id}
                className="border-b hover:bg-gray-50 transition"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <td className="p-3">{lead.clientName}</td>
                <td className="p-3">{lead.phone}</td>
                <td className="p-3">{lead.mail}</td>
                <td className="p-3">
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                    className="border rounded-md px-2 py-1"
                  >
                    <option>New</option>
                    <option>Follow Up</option>
                    <option>Closed</option>
                    <option>Converted to Project</option>
                  </select>
                </td>
                <td className="p-3">{lead.source}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(lead)}
                    className="text-indigo-600 hover:text-indigo-800"
                    title="Edit"
                  >
                   <i className="ri-edit-line action-btn text-indigo-600 cursor-pointer hover:text-indigo-800 p-2"></i>
                  </button>
                  <button
                    onClick={() => convertToProject(lead.id)}
                    className="text-green-600 hover:text-green-800 p-2"
                    title="Convert"
                  >
                    <Briefcase size={14} />
                  </button>
                  <button
                    onClick={() => updateStatus(lead.id, "Closed")}
                    className="text-gray-600 hover:text-gray-800 p-2"
                    title="Close"
                  >
                    <CheckCircle size={14} />
                  </button>
                  <button
                    onClick={() => deleteLead(lead.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                   <i  className="ri-delete-bin-line action-btn text-red-500 cursor-pointer hover:text-red-700 p-2"></i>
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === i + 1
                  ? "bg-indigo-700 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Next
          </button>
        </div>
      </motion.div>

      {/* Edit Lead Modal */}
      {editingLead && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          {/* Leads Table */}
<motion.div
  className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200 p-6"
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
>
  <table className="min-w-full text-sm text-gray-700">
    <thead className="bg-gray-100 text-gray-600 uppercase">
      <tr>
        <th className="p-3 text-left">Client</th>
        <th className="p-3 text-left">Phone</th>
        <th className="p-3 text-left">Email</th>
        <th className="p-3 text-left">Status</th>
        <th className="p-3 text-left">Source</th>
        <th className="p-3 text-center">Actions</th>
      </tr>
    </thead>

    <tbody>
      {currentLeads.length ? (
        currentLeads.map((lead) => (
          <motion.tr
            key={lead.id}
            className="border-t hover:bg-gray-50 transition duration-150"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <td className="p-3">{lead.clientName}</td>
            <td className="p-3">{lead.phone}</td>
            <td className="p-3">{lead.mail}</td>

            <td className="p-3">
              <select
                value={lead.status}
                onChange={(e) => updateStatus(lead.id, e.target.value)}
                className="border rounded-md px-2 py-1"
              >
                <option>New</option>
                <option>Follow Up</option>
                <option>Closed</option>
                <option>Converted to Project</option>
              </select>
            </td>

            <td className="p-3">{lead.source}</td>

            {/* ACTION BUTTONS */}
            <td className="p-3 text-center flex justify-center gap-4">
              <button
                onClick={() => handleEdit(lead)}
                className="text-indigo-600 hover:text-indigo-800"
                title="Edit"
              >
                <Pencil size={18} />
              </button>

              <button
                onClick={() => convertToProject(lead.id)}
                className="text-green-600 hover:text-green-800"
                title="Convert"
              >
                <Briefcase size={18} />
              </button>

              <button
                onClick={() => updateStatus(lead.id, "Closed")}
                className="text-gray-600 hover:text-gray-800"
                title="Close"
              >
                <CheckCircle size={18} />
              </button>

              <button
                onClick={() => deleteLead(lead.id)}
                className="text-red-600 hover:text-red-800"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </td>
          </motion.tr>
        ))
      ) : (
        <tr>
          <td
            colSpan="6"
            className="text-center text-gray-500 py-4 text-sm"
          >
            No matching leads found.
          </td>
        </tr>
      )}
    </tbody>
  </table>

  {/* Pagination */}
  <div className="flex justify-center items-center gap-2 mt-4">
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className={`px-3 py-1 rounded-md ${
        currentPage === 1
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-indigo-600 text-white hover:bg-indigo-700"
      }`}
    >
      Prev
    </button>

    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        onClick={() => handlePageChange(i + 1)}
        className={`px-3 py-1 rounded-md ${
          currentPage === i + 1
            ? "bg-indigo-700 text-white"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
      >
        {i + 1}
      </button>
    ))}

    <button
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className={`px-3 py-1 rounded-md ${
        currentPage === totalPages
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-indigo-600 text-white hover:bg-indigo-700"
      }`}
    >
      Next
    </button>
  </div>
</motion.div>

        </div>
      )}
    </div>
  );
}
