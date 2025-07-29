import React from 'react';
import AdminDashboard from './dashboardComponent/AdminDashboard';
import DonorDashboard from './dashboardComponent/DonorDashboard';
import useRole from '../../hooks/useRole';

const Dashboard = () => {
    const {role,loading} = useRole();

    if(loading) return <p>Loading ...</p>
    return (
        <div>
            this is dashboard
            {
                role == 'admin' && <AdminDashboard></AdminDashboard>
            }
             {
                role == 'donor' && <DonorDashboard></DonorDashboard>
             }
        </div>
    );
};

export default Dashboard;