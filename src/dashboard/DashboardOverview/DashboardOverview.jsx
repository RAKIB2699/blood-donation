import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    users: 0,
    donationRequests: 0,
    donors: 0,
  });

  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    // Fetch overall stats from backend
    axios.get("http://localhost:3000/dashboard-overview")
      .then((res) => {
        setStats(res.data.stats);
        setMonthlyData(res.data.monthlyRequests);
      })
      .catch((err) => console.error(err));
  }, []);

  const COLORS = ["#FF4B5C", "#FF6B6B", "#FF8787", "#FFAAAA"];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-red-600">Dashboard Overview</h2>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-red-100 rounded-xl shadow p-6 text-center">
          <h3 className="text-lg font-semibold text-red-700">Total Users</h3>
          <p className="text-3xl font-bold">{stats.users}</p>
        </div>
        <div className="bg-red-100 rounded-xl shadow p-6 text-center">
          <h3 className="text-lg font-semibold text-red-700">Total Donors</h3>
          <p className="text-3xl font-bold">{stats.donors}</p>
        </div>
        <div className="bg-red-100 rounded-xl shadow p-6 text-center">
          <h3 className="text-lg font-semibold text-red-700">Donation Requests</h3>
          <p className="text-3xl font-bold">{stats.donationRequests}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Line Chart for Monthly Donation Requests */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4 text-red-600">Monthly Requests</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="requests" stroke="#FF4B5C" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart for Donation Status */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4 text-red-600">Request Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.statusDistribution || [
                  { name: "Pending", value: 0 },
                  { name: "In Progress", value: 0 },
                  { name: "Done", value: 0 },
                  { name: "Canceled", value: 0 },
                ]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#FF4B5C"
                label
              >
                {(stats.statusDistribution || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
