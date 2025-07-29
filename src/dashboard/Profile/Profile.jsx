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
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-md mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">My Profile</h2>
        <button
          className="px-4 py-1 bg-blue-500 text-white rounded"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label>Name</label>
          <input
            name="name"
            type="text"
            value={profile.name || ''}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label>Email (read-only)</label>
          <input
            name="email"
            type="email"
            value={profile.email || ''}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label>Avatar URL</label>
          <input
            name="avatar"
            type="text"
            value={profile.avatar || ''}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label>District</label>
          <input
            name="district"
            type="text"
            value={profile.district || ''}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label>Upazila</label>
          <input
            name="upazila"
            type="text"
            value={profile.upazila || ''}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label>Blood Group</label>
          <input
            name="bloodGroup"
            type="text"
            value={profile.bloodGroup || ''}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border p-2 rounded"
          />
        </div>

        {isEditing && (
          <button
            onClick={handleUpdate}
            className="w-full bg-green-500 text-white p-2 rounded mt-4"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
