import Sidebar from "../components/Dash-ui/Sidebar";
import Navbar from "../components/Dash-ui/Navbar";
import StatsCard from "../components/Dash-ui/StatsCard";

 function Dashboard() {
  return (
    <div className="flex flex-1">
      <Sidebar />
      <div className="flex-1 p-4">
        <Navbar />
        <div className="grid grid-cols-4 gap-4 mb-4">
          <StatsCard title="Total Orders" value="2,847" />
          <StatsCard title="Revenue" value="SAR 145,230" />
          <StatsCard title="Customers" value="1,534" />
          <StatsCard title="Avg Order Value" value="SAR 89.5" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm h-64">
            <h3 className="text-sm font-medium mb-2">Revenue</h3>
            <p className="text-[10px] text-gray-500">Income vs Expenses analysis</p>
            {/* Chart here */}
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm h-64">
            <h3 className="text-sm font-medium mb-2">Order Summary</h3>
            <p className="text-[10px] text-gray-500">Completed vs Pending orders</p>
            {/* Chart here */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;