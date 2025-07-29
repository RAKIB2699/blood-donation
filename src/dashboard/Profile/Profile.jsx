import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch user data from DB
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/get-user?email=${user.email}`)
        .then((res) => {
          setProfileData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to load profile");
          setLoading(false);
        });
    }
  }, [user?.email]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  // Handle save
  const handleSave = () => {
    axios
      .patch(`http://localhost:3000/update-profile/${user.email}`, profileData)
      .then((res) => {
        if (res.data.success) {
          toast.success("Profile updated");
          setEditable(false);
        } else {
          toast.error(res.data.message || "Update failed");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Server error");
      });
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Profile</h2>
        {!editable ? (
          <button
            onClick={() => setEditable(true)}
            className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save
          </button>
        )}
      </div>

      <form className="grid grid-cols-1 gap-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          value={profileData?.name || ""}
          onChange={handleChange}
          disabled={!editable}
          className="border p-2 rounded"
          placeholder="Name"
        />

        {/* Email (Not Editable) */}
        <input
          type="email"
          value={profileData?.email || ""}
          disabled
          className="border p-2 rounded bg-gray-100"
          placeholder="Email"
        />

        {/* Avatar */}
        <input
          type="text"
          name="avatar"
          value={profileData?.avatar || ""}
          onChange={handleChange}
          disabled={!editable}
          className="border p-2 rounded"
          placeholder="Avatar URL"
        />

        {/* Blood Group */}
        <input
          type="text"
          name="bloodGroup"
          value={profileData?.bloodGroup || ""}
          onChange={handleChange}
          disabled={!editable}
          className="border p-2 rounded"
          placeholder="Blood Group"
        />

        {/* District */}
        <input
          type="text"
          name="district"
          value={profileData?.district || ""}
          onChange={handleChange}
          disabled={!editable}
          className="border p-2 rounded"
          placeholder="District"
        />

        {/* Upazila */}
        <input
          type="text"
          name="upazila"
          value={profileData?.upazila || ""}
          onChange={handleChange}
          disabled={!editable}
          className="border p-2 rounded"
          placeholder="Upazila"
        />
      </form>
    </div>
  );
};

export default Profile;
