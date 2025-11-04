import Sidebar from "../Dash-ui/Sidebar";
import Navbar from "../Dash-ui/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
