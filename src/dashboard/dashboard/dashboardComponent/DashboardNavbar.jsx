import { NavLink } from 'react-router';
import {
  Home,
  Users,
  HeartHandshake,
  FileText,
  PlusCircle,
  List,
} from 'lucide-react';

const DashboardNavbar = () => {
  const baseClass = 'p-2 rounded flex items-center gap-2 transition';
  const activeClass = 'bg-gray-100 font-medium text-blue-600';

  return (
    <nav className="flex flex-col gap-2 p-4">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `${baseClass} ${isActive ? activeClass : 'hover:bg-gray-100'}`
        }
      >
        <Home size={18} /> Home
      </NavLink>

      <NavLink
        to="/dashboard/all-users"
        className={({ isActive }) =>
          `${baseClass} ${isActive ? activeClass : 'hover:bg-gray-100'}`
        }
      >
        <Users size={18} /> All Users
      </NavLink>

      <NavLink
        to="/dashboard/all-donation-requests"
        className={({ isActive }) =>
          `${baseClass} ${isActive ? activeClass : 'hover:bg-gray-100'}`
        }
      >
        <HeartHandshake size={18} /> All Blood Donation Requests
      </NavLink>

      <NavLink
        to="/dashboard/content-management"
        className={({ isActive }) =>
          `${baseClass} ${isActive ? activeClass : 'hover:bg-gray-100'}`
        }
      >
        <FileText size={18} /> Content Management
      </NavLink>

      <NavLink
        to="/dashboard/create-donation-request"
        className={({ isActive }) =>
          `${baseClass} ${isActive ? activeClass : 'hover:bg-gray-100'}`
        }
      >
        <PlusCircle size={18} /> Create Donation Request
      </NavLink>

      <NavLink
        to="/dashboard/my-donation-requests"
        className={({ isActive }) =>
          `${baseClass} ${isActive ? activeClass : 'hover:bg-gray-100'}`
        }
      >
        <List size={18} /> My Donation Requests
      </NavLink>
    </nav>
  );
};

export default DashboardNavbar;
