import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Provider/AuthProvider';
import useRole from '../../../hooks/useRole';
import { useNavigate } from 'react-router';



const CreateDonationRequest = () => {
    const { user } = useContext(AuthContext);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [selectedDistrictId, setSelectedDistrictId] = useState('');
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const navigate = useNavigate();
    
    const {status} = useRole();
    // console.log(status);

    const [formData, setFormData] = useState({
        recipientName: '',
        hospitalName: '',
        
        upazila: '',
        bloodGroup: '',
        donationDate: '',
        donationTime: '',
    });

    useEffect(() => {
        fetch("/districts.json")
            .then((res) => res.json())
            .then((data) => {
                const table = data.find((item) => item.type === "table" && item.name === "districts");
                if (table) setDistricts(table.data);
            });
    }, []);

    // Fetch upazilas
    useEffect(() => {
        fetch("/upazilas.json")
            .then((res) => res.json())
            .then((data) => {
                const table = data.find((item) => item.type === "table" && item.name === "upazilas");
                if (table) setUpazilas(table.data);
            });
    }, []);

    // Filter upazilas by selected district
    useEffect(() => {
        if (formData.districtId) {
            const filtered = upazilas.filter((u) => u.district_id === formData.districtId);
            setFilteredUpazilas(filtered);
        } else {
            setFilteredUpazilas([]);
        }
    }, [formData.districtId, upazilas]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === 'district') {
            setSelectedDistrictId(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (status !== 'active') {
            return Swal.fire({
                icon: 'error',
                title: 'Blocked!',
                text: 'You are not allowed to create a donation request.',
            });
        }

        const requestData = {
            ...formData,
            requesterName: user?.displayName,
            requesterEmail: user?.email,
           
            status: 'pending',
            createdAt: new Date(),
        };

        try {
            const res = await axios.post('https://blood-donation-server-olive.vercel.app/donation-requests', requestData);
            if (res.data.insertedId) {
                Swal.fire('Success!', 'Donation request created.', 'success');
                navigate('/dashboard/my-donation-requests')
                setFormData({
                    recipientName: '',
                    hospitalName: '',
                    districtId: '',
                    upazila: '',
                    bloodGroup: '',
                    donationDate: '',
                    donationTime: '',
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error!', 'Something went wrong.', 'error');
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Create Donation Request</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name and Email (Read-only) */}
                <div>
                    <label className="block font-medium">Your Name</label>
                    <input
                        type="text"
                        value={user?.displayName || ''}
                        readOnly
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>
                <div>
                    <label className="block font-medium">Your Email</label>
                    <input
                        type="email"
                        value={user?.email || ''}
                        readOnly
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* Recipient Name */}
                <div>
                    <label className="block font-medium">Recipient Name</label>
                    <input
                        type="text"
                        name="recipientName"
                        required
                        value={formData.recipientName}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* Hospital Name */}
                <div>
                    <label className="block font-medium">Hospital Name</label>
                    <input
                        type="text"
                        name="hospitalName"
                        required
                        value={formData.hospitalName}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* District Dropdown */}
                <div>
                    <label className="block font-medium">District</label>
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

                {/* Upazila Dropdown */}
                <div>
                    <label className="block font-medium">Upazila</label>
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

                {/* Blood Group */}
                <div>
                    <label className="block font-medium">Blood Group</label>
                    <select
                        name="bloodGroup"
                        required
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="">Select</option>
                        <option>A+</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                        <option>O+</option>
                        <option>O-</option>
                    </select>
                </div>

                {/* Donation Date */}
                <div>
                    <label className="block font-medium">Donation Date</label>
                    <input
                        type="date"
                        name="donationDate"
                        required
                        value={formData.donationDate}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* Donation Time */}
                <div>
                    <label className="block font-medium">Donation Time</label>
                    <input
                        type="time"
                        name="donationTime"
                        required
                        value={formData.donationTime}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    Submit Request
                </button>
            </form>
        </div>
    );
};

export default CreateDonationRequest;
