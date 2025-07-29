import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import Swal from 'sweetalert2';
import { AuthContext } from '../../../Provider/AuthProvider';


const MyDonationRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(5); 

  
                 

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/donation-requests?email=${user?.email}`);
      let data = res.data;

      // Apply filtering
      if (statusFilter) {
        data = data.filter((req) => req.status === statusFilter);
      }

      setRequests(data);
    } catch (err) {
      Swal.fire('Error!', 'Failed to load donation requests.', 'error');
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchRequests();
    }
  }, [user?.email, statusFilter]);

  // Pagination Logic
  const indexOfLast = currentPage * requestsPerPage;
  const indexOfFirst = indexOfLast - requestsPerPage;
  const currentRequests = requests.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(requests.length / requestsPerPage);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Donation Requests</h2>

      {/* Filter */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-4 py-2">Recipient</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Blood Group</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Time</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              currentRequests.map((req) => (
                <tr key={req._id}>
                  <td className="border px-4 py-2">{req.recipientName}</td>
                  <td className="border px-4 py-2">
                    {req.district}, {req.upazila}
                  </td>
                  <td className="border px-4 py-2">{req.bloodGroup}</td>
                  <td className="border px-4 py-2">{req.donationDate}</td>
                  <td className="border px-4 py-2">{req.donationTime}</td>
                  <td className="border px-4 py-2 capitalize">{req.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No donation requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center items-center gap-2">
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDonationRequests;
