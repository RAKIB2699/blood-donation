import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../../Provider/AuthProvider';
import useRole from '../../../hooks/useRole';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditRequest = () => {
  const data = useLoaderData();
  const {
    recipientName,
    hospitalName,
    upazila,
    district,
    bloodGroup,
    donationDate,
    donationTime,
    districtId,
  } = data;

  const { user } = useContext(AuthContext);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { status } = useRole();

  const [formData, setFormData] = useState({
    recipientName,
    hospitalName,
    district,
    districtId: districtId || '',
    upazila,
    bloodGroup,
    donationDate,
    donationTime,
  });

  // Fetch districts
  useEffect(() => {
    fetch('/districts.json')
      .then((res) => res.json())
      .then((data) => {
        const table = data.find(
          (item) => item.type === 'table' && item.name === 'districts'
        );
        if (table) setDistricts(table.data);
      });
  }, []);

  // Fetch upazilas
  useEffect(() => {
    fetch('/upazilas.json')
      .then((res) => res.json())
      .then((data) => {
        const table = data.find(
          (item) => item.type === 'table' && item.name === 'upazilas'
        );
        if (table) setUpazilas(table.data);
      });
  }, []);

  // Filter upazilas
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
      updatedAt: new Date(),
    };

    try {
      await axios.patch(
        `https://blood-donation-server-olive.vercel.app/edit-donation-request/${id}`,
        requestData
      );
      Swal.fire('Success!', 'Donation updated successfully', 'success');
      navigate(-1);
    } catch (error) {
      console.error(error);
      Swal.fire('Error!', 'Something went wrong.', 'error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Edit Donation Request</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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
        <div>
          <label className="block font-medium">District</label>
          <select
            name="districtId"
            required
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
          <label className="block font-medium">Upazila</label>
          <select
            name="upazila"
            required
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
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditRequest;
