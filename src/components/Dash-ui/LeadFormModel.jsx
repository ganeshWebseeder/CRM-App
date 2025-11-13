import React, { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, PlusCircle } from "lucide-react";

export default function LeadFormModal({ isOpen, onClose, onAddLead }) {
  const [newLead, setNewLead] = useState({
    clientName: "",
    phone: "",
    mail: "",
    status: "New",
    source: "",
    notes: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddLead({ ...newLead, id: Date.now() });
    setNewLead({
      clientName: "",
      phone: "",
      mail: "",
      status: "New",
      source: "",
      notes: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="bg-white rounded-2xl shadow-xl w-[90%] sm:w-[500px] p-6 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-indigo-600 mb-4">
          Add New Lead
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Client Name"
            value={newLead.clientName}
            onChange={(e) => setNewLead({ ...newLead, clientName: e.target.value })}
            className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={newLead.phone}
            onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
            className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newLead.mail}
            onChange={(e) => setNewLead({ ...newLead, mail: e.target.value })}
            className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            placeholder="Source"
            value={newLead.source}
            onChange={(e) => setNewLead({ ...newLead, source: e.target.value })}
            className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            placeholder="Notes"
            value={newLead.notes}
            onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
            className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="mt-3 flex items-center justify-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all w-full"
          >
            <PlusCircle size={18} className="mr-2" /> Add Lead
          </button>
        </form>
      </motion.div>
    </div>
  );
}
