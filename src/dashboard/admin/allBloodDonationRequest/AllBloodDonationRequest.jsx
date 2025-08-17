import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useRole from '../../../hooks/useRole';

const AllBloodDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(5);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();


  const { data: requests = [], refetch, isLoading } = useQuery({
    queryKey: ['/all-blood-request'],
    queryFn: async () => {
      const res = await axiosSecure.get('/all-blood-request');
      return res.data;
    }
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.patch(`http://localhost:3000/donation-requests/${id}`, { status: newStatus });
      if (res.data.modifiedCount > 0) {
        Swal.fire('Success', `Donation marked as ${newStatus}.`, 'success');
        refetch();
      }
    } catch (error) {
      Swal.fire('Error!', 'Failed to update status.', `${error}`);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the request.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`http://localhost:3000/donation-requests/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire('Deleted!', 'Donation request has been removed.', 'success');
            refetch();
          }
        } catch (error) {
          Swal.fire('Error!', 'Deletion failed.', `${error}`);
        }
      }
    });
  };

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when filter changes
  }, [statusFilter]);

  if (isLoading) {
    return <div className="text-center py-10 text-lg font-semibold">Loading...</div>;
  }

  const filteredRequests = statusFilter
    ? requests.filter((req) => req.status === statusFilter)
    : requests;

  const indexOfLast = currentPage * requestsPerPage;
  const indexOfFirst = indexOfLast - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

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
            {currentRequests.length > 0 ? (
              currentRequests.map((req) => (
                <tr key={req._id}>
                  <td className="border px-4 py-2">{req.recipientName}</td>
                  <td className="border px-4 py-2">{req.upazila}</td>
                  <td className="border px-4 py-2">{req.bloodGroup}</td>
                  <td className="border px-4 py-2">{req.donationDate}</td>
                  <td className="border px-4 py-2">{req.donationTime}</td>
                  <td className="border px-4 py-2 capitalize">
                    {req.status}

                    {req.status === 'inprogress' && (
                      <div className="text-sm mt-1 text-gray-600">
                        <p><strong>Donor:</strong> {req.donorName}</p>
                        <p><strong>Email:</strong> {req.donorEmail}</p>
                      </div>
                    )}

                    {(role === 'admin' || role === 'volunteer') && req.status === 'inprogress' && (
                      <div className="flex gap-1 mt-2">
                        <button
                          onClick={() => handleStatusChange(req._id, 'done')}
                          className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                        >
                          Done
                        </button>
                        <button
                          onClick={() => handleStatusChange(req._id, 'canceled')}
                          className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                        >
                          Cancel
                        </button>
                      </div>
                    )}


                    {role === 'admin' && (
                      <div className="flex gap-1 mt-2">
                        <button
                          onClick={() => navigate(`/dashboard/edit-donation-request/${req._id}`)}
                          className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(req._id)}
                          className="px-2 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-700"
                        >
                          Delete
                        </button>
                      </div>
                    )}

                  </td>

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
              className={`px-3 py-1 rounded ${page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200'
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

export default AllBloodDonationRequest;
