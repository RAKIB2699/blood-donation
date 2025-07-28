import React, { useState, useEffect } from "react";

const SearchDonors = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [donors, setDonors] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);

  const [formData, setFormData] = useState({
    bloodGroup: "",
    districtId: "",
    upazila: ""
  });

  // Fetch districts
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

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Search donors
  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchClicked(true);

    const query = new URLSearchParams();
    if (formData.bloodGroup) query.append("bloodGroup", formData.bloodGroup);
    if (formData.districtId) query.append("districtId", formData.districtId);
    if (formData.upazila) query.append("upazila", formData.upazila);

    const res = await fetch(`http://localhost:3000/blood?${query}`);
    const data = await res.json();
    setDonors(data);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Search Donors</h2>

      <form onSubmit={handleSearch} className="space-y-3">
        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

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

        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Search
        </button>
      </form>

      {/* Donor results */}
      <div className="mt-6">
        {!searchClicked ? null : donors.length === 0 ? (
          <p className="text-gray-500 text-center mt-4">No donors found</p>
        ) : (
          <ul className="space-y-3 mt-4">
            {donors.map((donor) => (
              <li key={donor._id} className="border p-4 rounded shadow">
                <h3 className="font-bold">{donor.name}</h3>
                <p>Email: {donor.email}</p>
                <p>Blood Group: {donor.bloodGroup}</p>
                <p>District ID: {donor.districtId}</p>
                <p>Upazila: {donor.upazila}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchDonors;
