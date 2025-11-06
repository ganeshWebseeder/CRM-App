import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Pencil,
  PlusCircle,
  CheckCircle,
  Briefcase,
  Trash2,
} from "lucide-react";

export default function LeadManagementPage() {
  const [leads, setLeads] = useState([
    {
      id: 1,
      clientName: "Rohan Patel",
      phone: "9876543210",
      status: "New",
      source: "Website",
      notes: "Interested in website redesign",
    },
    {
      id: 2,
      clientName: "Priya Sharma",
      phone: "9876501234",
      status: "Follow Up",
      source: "Referral",
      notes: "Needs quotation by Friday",
    },
  ]);

  const [newLead, setNewLead] = useState({
    clientName: "",
    phone: "",
    status: "New",
    source: "",
    notes: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Add or update a lead
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setLeads(
        leads.map((lead) =>
          lead.id === editingId ? { ...newLead, id: editingId } : lead
        )
      );
      setEditingId(null);
    } else {
      setLeads([...leads, { ...newLead, id: Date.now() }]);
    }
    setNewLead({
      clientName: "",
      phone: "",
      status: "New",
      source: "",
      notes: "",
    });
  };

  // Edit Lead
  const handleEdit = (lead) => {
    setEditingId(lead.id);
    setNewLead(lead);
  };

  // Convert Lead to Project
  const handleConvertToProject = (id) => {
    const updated = leads.map((lead) =>
      lead.id === id ? { ...lead, status: "Converted to Project" } : lead
    );
    setLeads(updated);
  };

  // Update Status
  const handleStatusChange = (id, status) => {
    setLeads(
      leads.map((lead) => (lead.id === id ? { ...lead, status } : lead))
    );
  };

  // 🗑 Delete Lead
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      setLeads(leads.filter((lead) => lead.id !== id));
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800 text-center sm:text-left">
        Lead Management
      </h1>

      {/* Add / Edit Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-4 sm:p-6 rounded-2xl shadow-md mb-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Client Name"
            value={newLead.clientName}
            onChange={(e) =>
              setNewLead({ ...newLead, clientName: e.target.value })
            }
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={newLead.phone}
            onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
            className="border p-2 rounded-lg w-full"
            required
          />
          <select
            value={newLead.status}
            onChange={(e) =>
              setNewLead({ ...newLead, status: e.target.value })
            }
            className="border p-2 rounded-lg w-full"
          >
            <option>New</option>
            <option>Follow Up</option>
            <option>Closed</option>
          </select>
          <input
            type="text"
            placeholder="Source"
            value={newLead.source}
            onChange={(e) => setNewLead({ ...newLead, source: e.target.value })}
            className="border p-2 rounded-lg w-full"
          />
          <textarea
            placeholder="Notes"
            value={newLead.notes}
            onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
            className="border p-2 rounded-lg sm:col-span-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="mt-4 flex items-center justify-center bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-all w-full sm:w-auto"
        >
          {editingId ? (
            <Pencil size={18} className="mr-2" />
          ) : (
            <PlusCircle size={18} className="mr-2" />
          )}
          {editingId ? "Update Lead" : "Add Lead"}
        </button>
      </motion.form>

      {/* Leads Table */}
      <motion.div
        className="bg-white rounded-2xl shadow-md p-4 overflow-x-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-indigo-100 text-gray-700 text-sm sm:text-base">
              <th className="p-3 text-left">Client Name</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Source</th>
              <th className="p-3 text-left">Notes</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <motion.tr
                key={lead.id}
                className="border-b hover:bg-gray-50 transition-all text-sm sm:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <td className="p-3">{lead.clientName}</td>
                <td className="p-3">{lead.phone}</td>
                <td className="p-3">
                  <select
                    value={lead.status}
                    onChange={(e) =>
                      handleStatusChange(lead.id, e.target.value)
                    }
                    className="border rounded-md px-2 py-1 w-full"
                  >
                    <option>New</option>
                    <option>Follow Up</option>
                    <option>Closed</option>
                    <option>Converted to Project</option>
                  </select>
                </td>
                <td className="p-3">{lead.source}</td>
                <td className="p-3">{lead.notes}</td>
                <td className="p-3 flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(lead)}
                    className="text-indigo-600 hover:text-indigo-800"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleConvertToProject(lead.id)}
                    className="text-green-600 hover:text-green-800"
                    title="Convert to Project"
                  >
                    <Briefcase size={18} />
                  </button>
                  <button
                    onClick={() => handleStatusChange(lead.id, "Closed")}
                    className="text-gray-600 hover:text-gray-800"
                    title="Mark as Closed"
                  >
                    <CheckCircle size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(lead.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete Lead"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
