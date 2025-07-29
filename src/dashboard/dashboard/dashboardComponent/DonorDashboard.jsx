import React from 'react';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../../Provider/AuthProvider';
import axios from 'axios';


const DonorDashboard = () => {
    const { user } = useContext(AuthContext);
    const [donationRequests, setDonationRequests] = useState([]);


    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:3000/donation-requests?email=${user.email}`)
                .then(res => {
                    const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setDonationRequests(sorted.slice(0, 3)); // only recent 3
                })
                .catch(err => console.error(err));
        }
    }, [axios, user]);

    return (
        <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center sm:text-left">
                Welcome, {user?.displayName}!
            </h2>

            {donationRequests.length > 0 && (
                <>
                    <h3 className="text-lg sm:text-xl font-medium mb-3 text-center sm:text-left">
                        Your Recent Donation Requests
                    </h3>
                    <div className="overflow-x-auto rounded-md shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left">#</th>
                                    <th className="px-4 py-2 text-left">Recipient</th>
                                    <th className="px-4 py-2 text-left">Location</th>
                                    <th className="px-4 py-2 text-left">Blood Group</th>
                                    <th className="px-4 py-2 text-left">Date</th>
                                    <th className="px-4 py-2 text-left">Time</th>
                                    <th className="px-4 py-2 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {donationRequests.map((req, index) => (
                                    <tr key={req._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">{req.recipientName}</td>
                                        <td className="px-4 py-2">
                                            {req.district}, {req.upazila}
                                        </td>
                                        <td className="px-4 py-2">{req.bloodGroup}</td>
                                        <td className="px-4 py-2">{req.donationDate}</td>
                                        <td className="px-4 py-2">{req.donationTime}</td>
                                        <td className="px-4 py-2">
                                            <span
                                                className={`px-2 py-1 text-xs sm:text-sm rounded-full text-white ${req.status === "pending"
                                                        ? "bg-yellow-500"
                                                        : req.status === "inprogress"
                                                            ? "bg-blue-500"
                                                            : req.status === "done"
                                                                ? "bg-green-600"
                                                                : "bg-red-600"
                                                    }`}
                                            >
                                                {req.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>

    );
};

export default DonorDashboard;