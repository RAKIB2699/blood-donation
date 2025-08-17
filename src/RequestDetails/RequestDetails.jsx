import React, { use, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Loading from '../Loading';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';

const RequestDetails = () => {
    const { id } = useParams();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);

    const { user } = use(AuthContext); // Access `user` object from context
    const name = user?.displayName;
    const email = user?.email;

    const handleDonate = () => {
        Swal.fire({
            title: 'Donation Info',
            html: `Donor Name: <strong>${name}</strong><br/>Donor Email: <strong>${email}</strong>`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Confirm Donation',
            cancelButtonText: 'Cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.patch(`http://localhost:3000/donation-requests/${id}`, { status : 'inprogress' ,donorName:name,donorEmail:email});
                    if (res.data.modifiedCount > 0) {
                        Swal.fire('Success', `Done`, 'success');
                        
                    }
                } catch (error) {
                    Swal.fire('Error!', 'Failed to update status.', `${error}`);
                }
            }
        });
    };
    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/donation-req/${id}`);
                setRequest(res.data);
            } catch (error) {
                console.error('Failed to fetch request:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequest();
    }, [id]);

    if (loading) {
        return <div className="text-center mt-10 text-gray-500"><Loading /></div>;
    }

    if (!request) {
        return <div className="text-center mt-10 text-red-500">Request not found.</div>;
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-10 mt-6 mb-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">Donation Request Details</h2>

            <div className="space-y-4 text-sm md:text-base">
                <Detail label="Requester Name" value={request.requesterName} />
                <Detail label="Requester Email" value={request.requesterEmail} />
                <Detail label="Recipient Name" value={request.recipientName} />
                <Detail label="Hospital Name" value={request.hospitalName} />
                <Detail label="District" value={request.district} />
                <Detail label="Upazila" value={request.upazila} />
                <Detail label="Blood Group" value={request.bloodGroup} />
                <Detail label="Donation Date" value={request.donationDate} />
                <Detail label="Donation Time" value={request.donationTime} />
                <Detail label="Status" value={request.status} />
                <Detail label="Created At" value={new Date(request.createdAt).toLocaleString()} />
            </div>
            <div className='text-center mt-2'>
                <button onClick={handleDonate} className='btn bg-red-500 text-white'>Donate</button>
            </div>
        </div>
    );
};

const Detail = ({ label, value }) => (
    <div className="flex justify-between border-b pb-2">
        <span className="font-medium text-gray-600">{label}:</span>
        <span className="text-gray-800">{value || 'N/A'}</span>
    </div>
);

export default RequestDetails;
