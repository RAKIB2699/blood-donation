import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:3000/all-pending-donation")
      .then((res) => res.json())
      .then((data) => setRequests(data));
  }, []);

  const handleView = (id) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/donation-request/${id}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Donation Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-500">No pending requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requests.map((req) => (
            <div key={req._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
              <h3 className="text-lg font-semibold">{req.recipientName}</h3>
              <p>
                <span className="font-medium">Location:</span> {req.upazila}, {req.district}
              </p>
              <p>
                <span className="font-medium">Blood Group:</span> {req.bloodGroup}
              </p>
              <p>
                <span className="font-medium">Date:</span> {req.donationDate}
              </p>
              <p>
                <span className="font-medium">Time:</span> {req.donationTime}
              </p>
              <button
                onClick={() => handleView(req._id)}
                className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingRequests;
