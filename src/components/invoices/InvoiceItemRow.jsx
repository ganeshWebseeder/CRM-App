import React from "react";

export default function InvoiceItemRow({ item, onUpdate, onDelete, isFinalized }) {
  return (
    <tr className="border-t hover:bg-gray-50 transition">
      <td className="p-2">
        <input
          type="text"
          value={item.description}
          onChange={(e) => onUpdate(item.id, "description", e.target.value)}
          placeholder="Item description"
          disabled={isFinalized}
          className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-1 focus:ring-indigo-400"
        />
      </td>
      <td className="p-2 text-center">
        <input
          type="number"
          min="1"
          value={item.qty}
          onChange={(e) => onUpdate(item.id, "qty", Number(e.target.value))}
          disabled={isFinalized}
          className="w-16 text-center border border-gray-300 rounded-md px-2 py-1 focus:ring-1 focus:ring-indigo-400"
        />
      </td>
      <td className="p-2 text-center">
        <input
          type="number"
          min="0"
          value={item.price}
          onChange={(e) => onUpdate(item.id, "price", Number(e.target.value))}
          disabled={isFinalized}
          className="w-24 text-center border border-gray-300 rounded-md px-2 py-1 focus:ring-1 focus:ring-indigo-400"
        />
      </td>
      <td className="p-2 text-center text-indigo-600 font-medium">
        ₹{(item.qty * item.price).toFixed(2)}
      </td>
      <td className="p-2 text-center">
        {!isFinalized && (
          <i
            className="ri-delete-bin-line text-red-500 hover:text-red-700 cursor-pointer text-lg"
            onClick={() => onDelete(item.id)}
          ></i>
        )}
      </td>
    </tr>
  );
}
