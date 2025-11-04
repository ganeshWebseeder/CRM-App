export default function StatsCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col space-y-1">
      <div className="flex justify-between items-center text-gray-400 text-[10px]">
        <span>{title}</span>
        <span>{icon}</span>
      </div>
      <div className="text-lg font-bold text-gray-800">{value}</div>
    </div>
  );
}
