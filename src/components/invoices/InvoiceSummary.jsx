import React from "react";

export default function InvoiceSummary({ subtotal, gst, total, gstEnabled, setGstEnabled }) {
  return (
    <div className="bg-white border rounded-lg shadow p-4 w-full md:w-1/2 ml-auto">
      <div className="flex items-center justify-between mb-3">
        <label className="flex items-center text-sm text-gray-700">
          <input
            type="checkbox"
            checked={gstEnabled}
            onChange={(e) => setGstEnabled(e.target.checked)}
            className="mr-2"
          />
          Apply 18% GST
        </label>
      </div>
      <div className="space-y-1 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>GST (18%):</span>
          <span>₹{gst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-gray-900 border-t pt-2">
          <span>Total:</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
