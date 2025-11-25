import React, { useState } from "react";
import InvoiceItemRow from "../components/invoices/InvoiceItemRow";
import InvoiceSummary from "../components/invoices/InvoiceSummary";
import InvoiceActions from "../components/invoices/InvoiceActions";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function InvoiceCreation() {
  const [invoice, setInvoice] = useState({
    type: "Proforma",
    items: [{ id: 1, description: "", qty: 1, price: 1 }],
    gstEnabled: false,
    status: "Draft",
    number: "",
    clientEmail: "",
    amount: "",
  });

  const [showBasicForm, setShowBasicForm] = useState(false);

  // Totals
  const subtotal = invoice.items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );
  const gst = invoice.gstEnabled ? subtotal * 0.18 : 0;
  const total = subtotal + gst;

  // Add Item
  const handleAddItem = () => {
    setInvoice({
      ...invoice,
      items: [
        ...invoice.items,
        { id: Date.now(), description: "", qty: 1, price: 1 },
      ],
    });
  };

  // Update item
  const handleUpdateItem = (id, field, value) => {
    setInvoice({
      ...invoice,
      items: invoice.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  // Delete item
  const handleDeleteItem = (id) => {
    setInvoice({
      ...invoice,
      items: invoice.items.filter((item) => item.id !== id),
    });
  };

  // Save draft
  const handleSaveDraft = () => {
    localStorage.setItem("invoiceDraft", JSON.stringify(invoice));
    alert("Invoice draft saved!");
  };

  // Finalize
  const handleFinalize = () => {
    setInvoice((prev) => ({
      ...prev,
      status: "Finalized",
    }));
    alert("Invoice finalized!");
  };

  return (
    <div className="p-6 space-y-8 bg-gradient-to-b from-gray-50 to-white min-h-screen relative">

      {/* TOP RIGHT BUTTON */}
      <div className="absolute top-6 right-6">
        <button
          onClick={() => setShowBasicForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow text-sm"
        >
          + Create Invoice
        </button>
      </div>

      {/* HEADER */}
      <div className="pt-14">
        <p className="text-gray-500 text-sm">
          Manage & generate invoices with version control.
        </p>
      </div>

      {/* POPUP MODAL */}
      {showBasicForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[9999]">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-2xl shadow-xl max-w-2xl w-full relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowBasicForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-semibold text-indigo-600 mb-4">
              Invoice Basic Details
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowBasicForm(false);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Invoice Number */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Invoice Number
                  </label>
                  <input
                    type="text"
                    value={invoice.number}
                    onChange={(e) =>
                      setInvoice({ ...invoice, number: e.target.value })
                    }
                    placeholder="INV-001"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>

                {/* Client Email */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Client Email
                  </label>
                  <input
                    type="email"
                    value={invoice.clientEmail}
                    onChange={(e) =>
                      setInvoice({ ...invoice, clientEmail: e.target.value })
                    }
                    placeholder="client@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={invoice.amount}
                    onChange={(e) =>
                      setInvoice({ ...invoice, amount: e.target.value })
                    }
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Status
                  </label>
                  <select
                    value={invoice.status}
                    onChange={(e) =>
                      setInvoice({ ...invoice, status: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>

              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm"
                >
                  Save Details
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* ITEMS TABLE */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto"
      >
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-sm font-semibold text-gray-800">Invoice Items</h2>

          {invoice.status !== "Finalized" && (
            <button
              onClick={handleAddItem}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1.5 rounded-md"
            >
              + Add Item
            </button>
          )}
        </div>

        <table className="w-full text-gray-700">
          <thead className="bg-indigo-100 text-gray-700 text-xs uppercase">
            <tr>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-center">Qty</th>
              <th className="p-3 text-center">Price (₹)</th>
              <th className="p-3 text-center">Subtotal</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {invoice.items.map((item, index) => (
              <InvoiceItemRow
                key={item.id}
                item={item}
                index={index}
                onUpdate={handleUpdateItem}
                onDelete={handleDeleteItem}
                isFinalized={invoice.status === "Finalized"}
              />
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* TOTALS SECTION */}
      <div className="flex flex-col md:flex-row justify-between mt-6">
        <div className="w-full md:w-1/2"></div>

        <div className="w-full md:w-1/2">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <InvoiceSummary
              subtotal={subtotal}
              gst={gst}
              total={total}
              gstEnabled={invoice.gstEnabled}
              setGstEnabled={(value) =>
                setInvoice({ ...invoice, gstEnabled: value })
              }
            />
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-end mt-4">
        <InvoiceActions
          onSaveDraft={handleSaveDraft}
          onFinalize={handleFinalize}
          isFinalized={invoice.status === "Finalized"}
        />
      </div>

    </div>
  );
}
