import React from "react";

export default function InvoiceActions({ onSaveDraft, onFinalize, isFinalized }) {
  return (
    <div className="flex justify-end gap-3">
      {!isFinalized && (
        <>
          <button
            onClick={onSaveDraft}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded-md"
          >
          Save Draft
          </button>
          <button
            onClick={onFinalize}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-md"
          >
             Finalize Invoice
          </button>
        </>
      )}
      {isFinalized && (
        <span className="text-green-600 text-sm font-semibold">
          Invoice Finalized ✔
        </span>
      )}
    </div>
  );
}
