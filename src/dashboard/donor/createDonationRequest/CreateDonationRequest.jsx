import React, { useContext, useEffect, useState } from 'react';

import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from '../../../Provider/AuthProvider';

const CreateDonationRequest = () => {
    const { user } = useContext(AuthContext);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);

    const [formData, setFormData] = useState({
        recipientName: '',
        district: '',
        upazila: '',
        donationDate: '',
        donationTime: '',
        bloodGroup: '',
    });

    // Load districts and upazilas
    useEffect(() => {
        fetch("/districts.json")
            .then((res) => res.json())
            .then((data) => {
                const table = data.find(item => item.type === "table" && item.name === "districts");
                if (table) setDistricts(table.data);
            });
    }, []);

    // Load upazilas
    useEffect(() => {
        fetch("/upazilas.json")
            .then((res) => res.json())
            .then((data) => {
                const table = data.find(item => item.type === "table" && item.name === "upazilas");
                if (table) setUpazilas(table.data);
            });
    }, []);

    // Filter upazilas based on selected district
    useEffect(() => {
        if (formData.districtId) {
            const filtered = upazilas.filter(
                (u) => u.district_id === formData.districtId
            );
            setFilteredUpazilas(filtered);
        } else {
            setFilteredUpazilas([]);
        }
    }, [formData.districtId, upazilas]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            donorName: user?.displayName || '',
            donorEmail: user?.email || '',
            status: 'pending',
        };

        try {
            const res = await axios.post('http://localhost:3000/donation-requests', payload);
            if (res.data.insertedId) {
                Swal.fire('Success', 'Donation request created successfully', 'success');
                setFormData({
                    recipientName: '',
                    district: '',
                    upazila: '',
                    donationDate: '',
                    donationTime: '',
                    bloodGroup: '',
                });
            }
        } catch (error) {
            console.error('Failed to create donation request:', error);
            Swal.fire('Error', 'Failed to create donation request', 'error');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Create Donation Request</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block">Recipient Name</label>
                    <input
                        type="text"
                        name="recipientName"
                        value={formData.recipientName}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block">District</label>
                    <select
                        name="districtId"
                        value={formData.districtId}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="">Select District</option>
                        {districts.map((d) => (
                            <option key={d.id} value={d.id}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block">Upazila</label>
                    <select
                        name="upazila"
                        value={formData.upazila}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        disabled={!formData.districtId}
                    >
                        <option value="">Select Upazila</option>
                        {filteredUpazilas.map((u) => (
                            <option key={u.id} value={u.name}>
                                {u.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block">Donation Date</label>
                    <input
                        type="date"
                        name="donationDate"
                        value={formData.donationDate}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block">Donation Time</label>
                    <input
                        type="time"
                        name="donationTime"
                        value={formData.donationTime}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block">Blood Group</label>
                    <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    >
                        <option value="">Select Blood Group</option>
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
                            <option key={group} value={group}>
                                {group}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Submit Request
                </button>
            </form>
        </div>
    );
};

export default CreateDonationRequest;
