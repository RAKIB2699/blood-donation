import React, { useContext, useEffect, useState } from 'react';

import { FaUser, FaDonate, FaHandHoldingHeart } from 'react-icons/fa';
import axios from 'axios';
import { AuthContext } from '../../../Provider/AuthProvider';
import DashboardOverview from '../../DashboardOverview/DashboardOverview';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);

    const [totalDonors, setTotalDonors] = useState(0);
    const [totalFunds, setTotalFunds] = useState(0);
    const [totalRequests, setTotalRequests] = useState(0);

    useEffect(() => {
        // Fetch total donor count
        axios.get('http://localhost:3000/stats/total-donors')
            .then(res => setTotalDonors(res.data.total))
            .catch(err => console.error(err));

        // Fetch total funding amount
        axios.get('http://localhost:3000/stats/total-funds')
            .then(res => setTotalFunds(res.data.total))
            .catch(err => console.error(err));

        // Fetch total donation requests
        axios.get('http://localhost:3000/stats/total-donation-requests')
            .then(res => setTotalRequests(res.data.total))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-5 space-y-8">
            {/* Welcome Section */}
            <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-semibold">
                    Welcome, <span className="text-red-600">{user?.displayName}</span> 👋
                </h1>
                <p className="text-gray-600">Here is a quick overview of the platform stats.</p>
            </div>

            {/* Statistic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
                    <FaUser className="text-4xl text-red-500" />
                    <div>
                        <p className="text-xl font-bold">{totalDonors}</p>
                        <p className="text-gray-600">Total Donors</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
                    <FaDonate className="text-4xl text-green-500" />
                    <div>
                        <p className="text-xl font-bold">৳ {totalFunds}</p>
                        <p className="text-gray-600">Total Funding</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
                    <FaHandHoldingHeart className="text-4xl text-blue-500" />
                    <div>
                        <p className="text-xl font-bold">{totalRequests}</p>
                        <p className="text-gray-600">Total Donation Requests</p>
                    </div>
                </div>
            </div>
            <DashboardOverview/>
        </div>
        
    );
};

export default AdminDashboard;