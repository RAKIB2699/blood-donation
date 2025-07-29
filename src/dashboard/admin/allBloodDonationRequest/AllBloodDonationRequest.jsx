import {useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllBloodDonationRequest = () => {
    const axiosSecure = useAxiosSecure()
    const {data:currentRequests, isLoading}=useQuery({
        queryKey: ['/all-blood-request'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/all-blood-request')
            return res.data
        }
    })
    console.log(currentRequests);
    return (
        <div>
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
            {currentRequests?.length > 0 ? (
              currentRequests?.map((req) => (
                <tr key={req._id}>
                  <td className="border px-4 py-2">{req.recipientName}</td>
                  <td className="border px-4 py-2">
                     {req.upazila}
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
        </div>
    );
};

export default AllBloodDonationRequest;