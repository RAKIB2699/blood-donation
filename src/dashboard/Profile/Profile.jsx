import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/users/${user.email}`)
        .then((res) => setProfile(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:3000/users/${user.email}`, profile);
      if (res.data.modifiedCount > 0) {
        Swal.fire('Success!', 'Profile updated successfully', 'success');
        setIsEditing(false);
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error!', 'Something went wrong.', 'error');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-gradient-to-r from-red-50 via-red-100 to-red-50 shadow-2xl rounded-3xl mt-12 border border-red-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-red-700">My Profile</h2>
        <button
          className={`px-5 py-2 rounded-full font-semibold transition-all duration-300
            ${isEditing ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-500 text-white hover:bg-red-600'}`}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <div className="flex justify-center mb-8">
        <div className="relative group">
          <img
            src={profile.avatar || 'https://via.placeholder.com/150'}
            className="w-32 h-32 border-4 border-red-400 rounded-full shadow-xl object-cover transform transition-all duration-500 group-hover:scale-105"
          />
          {isEditing && (
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
              <span className="text-white font-semibold">Change</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            name="name"
            type="text"
            value={profile.name || ''}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border-2 border-red-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Email (read-only)</label>
          <input
            name="email"
            type="email"
            value={profile.email || ''}
            disabled
            className="w-full border-2 border-red-300 p-3 rounded-xl bg-red-50 text-gray-600 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">District</label>
          <input
            name="district"
            type="text"
            value={profile.district || ''}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border-2 border-red-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Upazila</label>
          <input
            name="upazila"
            type="text"
            value={profile.upazila || ''}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border-2 border-red-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Blood Group</label>
          <input
            name="bloodGroup"
            type="text"
            value={profile.bloodGroup || ''}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border-2 border-red-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          />
        </div>

        {isEditing && (
          <button
            onClick={handleUpdate}
            className="w-full bg-red-600 text-white p-3 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 mt-4 shadow-lg"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
