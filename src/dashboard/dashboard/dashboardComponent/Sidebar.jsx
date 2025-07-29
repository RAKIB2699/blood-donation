import { Link } from 'react-router';
import { Home, User, LogOut } from 'lucide-react';
import DashboardNavbar from './DashboardNavbar';

const Sidebar = () => {
  return (
    <aside className="bg-white text-gray-800 border-r border-gray-200 w-64 h-full fixed lg:relative z-40 lg:z-auto transform lg:translate-x-0 transition-transform duration-200 ease-in-out shadow-md lg:shadow-none">
      <div className="p-4 text-xl font-bold border-b border-gray-200">Dashboard</div>
      <DashboardNavbar></DashboardNavbar>
    </aside>
  );
};

export default Sidebar;
