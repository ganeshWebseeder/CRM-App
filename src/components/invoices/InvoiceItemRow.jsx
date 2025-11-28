import { motion } from "framer-motion";

export default function InvoiceItemRow({ item, onUpdate, onDelete, isFinalized, index }) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="border-b hover:bg-gray-50 transition"
    >
      <td className="p-2 w-1/2">
        <input
          type="text"
          value={item.description}
          onChange={(e) => onUpdate(item.id, "description", e.target.value)}
          placeholder="Item description"
          disabled={isFinalized}
          className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-1 focus:ring-indigo-400"
        />
      </td>

      <td className="p-2 text-center w-20">
        <input
          type="number"
          min="1"
          value={item.qty}
          onChange={(e) => onUpdate(item.id, "qty", Number(e.target.value))}
          disabled={isFinalized}
          className="w-16 text-center border border-gray-300 rounded-md px-2 py-1 focus:ring-1 focus:ring-indigo-400"
        />
      </td>

      <td className="p-2 text-center w-28">
        <input
          type="number"
          min="0"
          value={item.price}
          onChange={(e) => onUpdate(item.id, "price", Number(e.target.value))}
          disabled={isFinalized}
          className="w-24 text-center border border-gray-300 rounded-md px-2 py-1 focus:ring-1 focus:ring-indigo-400"
        />
      </td>

      <td className="p-2 text-center w-28 text-indigo-600 font-medium">
        ₹{(item.qty * item.price).toFixed(2)}
      </td>

      <td className="p-2 text-center w-16">
        {!isFinalized && (
          <i
            className="ri-delete-bin-line action-btn text-red-500 cursor-pointer hover:text-red-700 p-2"
            onClick={() => onDelete(item.id)}
          ></i>
        )}
      </td>
    </motion.tr>
  );
}
