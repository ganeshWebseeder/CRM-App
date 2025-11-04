export default function Sidebar() {
  return (
    <div className="w-16 bg-white shadow-md flex flex-col items-center py-4 space-y-4">
      <div className="text-red-500 font-bold text-lg">🔥</div>
      <div className="flex flex-col space-y-4 text-gray-500">
        <i className="ri-dashboard-line"></i>
        <i className="ri-user-3-line"></i>
        <i className="ri-settings-3-line"></i>
      </div>
    </div>
  );
}
