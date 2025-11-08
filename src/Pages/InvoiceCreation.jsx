import React, { useState } from "react";
import InvoiceItemRow from "../components/invoices/InvoiceItemRow";
import InvoiceSummary from "../components/invoices/InvoiceSummary";
import InvoiceActions from "../components/invoices/InvoiceActions";

export default function InvoiceCreation() {
  const [invoice, setInvoice] = useState({
    type: "Proforma",
    items: [{ id: 1, description: "", qty: 1, price: 0 }],
    gstEnabled: false,
    version: 1,
    status: "Draft",
  });

  // 🧮 Calculations
  const subtotal = invoice.items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );
  const gst = invoice.gstEnabled ? subtotal * 0.18 : 0;
  const total = subtotal + gst;

  // ➕ Add Item
  const handleAddItem = () => {
    setInvoice({
      ...invoice,
      items: [
        ...invoice.items,
        { id: Date.now(), description: "", qty: 1, price: 0 },
      ],
    });
  };

  // ✏️ Update Item
  const handleUpdateItem = (id, field, value) => {
    setInvoice({
      ...invoice,
      items: invoice.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  // ❌ Delete Item
  const handleDeleteItem = (id) => {
    setInvoice({
      ...invoice,
      items: invoice.items.filter((item) => item.id !== id),
    });
  };

  // 💾 Save Draft
  const handleSaveDraft = () => {
    localStorage.setItem("invoiceDraft", JSON.stringify(invoice));
    alert("✅ Invoice draft saved successfully!");
  };

  // ✅ Finalize Invoice
  const handleFinalize = () => {
    setInvoice((prev) => ({
      ...prev,
      status: "Finalized",
      version: prev.version + 1,
    }));
    alert("🎉 Invoice finalized successfully!");
  };

  return (
    <div className="p-6 space-y-8 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* 🧾 Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">
            🧾 Invoice Creation
          </h1>
          <p className="text-gray-500 text-sm">
            Manage and generate new invoices with version control & GST support.
          </p>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 px-4 py-2 rounded-md">
          <p className="text-xs text-gray-600">Current Version</p>
          <p className="text-lg font-semibold text-indigo-700">
            #{invoice.version}
          </p>
        </div>
      </div>

      {/* 💼 Invoice Meta Section */}
      <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Type Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Invoice Type
          </label>
          <select
            value={invoice.type}
            onChange={(e) => setInvoice({ ...invoice, type: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Proforma">Proforma Invoice</option>
            <option value="Tax">Tax Invoice</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Status
          </label>
          <span
            className={`px-3 py-2 text-xs font-medium rounded-md inline-block text-center ${
              invoice.status === "Finalized"
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-yellow-50 text-yellow-700 border border-yellow-200"
            }`}
          >
            {invoice.status}
          </span>
        </div>

        {/* Version Info */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Invoice Date
          </label>
          <p className="text-sm text-gray-700">
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* 📋 Items Table */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-md overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 bg-indigo-50 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-800 tracking-wide">
            Invoice Items
          </h2>
          {!invoice.status.includes("Finalized") && (
            <button
              onClick={handleAddItem}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1.5 rounded-md transition"
            >
              + Add Item
            </button>
          )}
        </div>

        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-center">Qty</th>
              <th className="p-3 text-center">Price (₹)</th>
              <th className="p-3 text-center">Subtotal</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item) => (
              <InvoiceItemRow
                key={item.id}
                item={item}
                onUpdate={handleUpdateItem}
                onDelete={handleDeleteItem}
                isFinalized={invoice.status === "Finalized"}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* 💰 Totals Section */}
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div className="w-full md:w-1/2"></div>
        <div className="w-full md:w-1/2 bg-white rounded-xl shadow-md border border-gray-100 p-6">
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

      {/* 🎯 Action Buttons */}
      <div className="flex justify-end">
        <InvoiceActions
          onSaveDraft={handleSaveDraft}
          onFinalize={handleFinalize}
          isFinalized={invoice.status === "Finalized"}
        />
      </div>
    </div>
  );
}
