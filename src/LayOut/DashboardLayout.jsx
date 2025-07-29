import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Outlet } from 'react-router';
import Sidebar from '../dashboard/dashboard/dashboardComponent/Sidebar';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar for desktop */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Sidebar drawer for mobile */}
      <div
        className={`lg:hidden fixed inset-0 bg-gray-500 bg-opacity-50 z-50 transition-opacity ${
          isSidebarOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      >
        <div
          className="absolute left-0 top-0 h-full w-64 bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          <Sidebar />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col w-full lg:ml-64">
        {/* Top mobile header with menu */}
        <div className="lg:hidden bg-white shadow p-4 flex items-center">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="ml-4 text-lg font-semibold">Dashboard</h1>
        </div>

        {/* Actual page content */}
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
