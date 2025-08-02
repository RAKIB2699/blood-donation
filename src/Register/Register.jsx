import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const Register = () => {
    const [error, setError] = useState();
    const { Register, setUser, updateUser } = useContext(AuthContext)
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [selectedDistrictId, setSelectedDistrictId] = useState('');
    const [selectedUpazila, setSelectedUpazila] = useState('');
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);

    // New form fields state
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const district = districts.find((item)=> item.id == selectedDistrictId)
    
    useEffect(() => {
        fetch('/districts.json')
            .then((res) => res.json())
            .then((data) => {
                const districtTable = data.find((item) => item.type === 'table' && item.name === 'districts');
                if (districtTable) {
                    setDistricts(districtTable.data);
                }
            });
    }, []);

    useEffect(() => {
        fetch('/upazilas.json')
            .then((res) => res.json())
            .then((data) => {
                const upazilaTable = data.find((item) => item.type === 'table' && item.name === 'upazilas');
                if (upazilaTable) {
                    setUpazilas(upazilaTable.data);
                }
            });
    }, []);

    useEffect(() => {
        if (selectedDistrictId) {
            const filtered = upazilas.filter(
                (upazila) => upazila.district_id === selectedDistrictId
            );
            setFilteredUpazilas(filtered);
        } else {
            setFilteredUpazilas([]);
        }
    }, [selectedDistrictId, upazilas]);

    // Handler for avatar file upload (upload logic needs to be implemented)
    // const handleAvatarUpload = (e) => {
    //     const file = e.target.files[0];
    //     if (!file) return;

    //     // Placeholder: create local URL for preview
    //     const url = URL.createObjectURL(file);
    //     setAvatarUrl(url);

    //     // TODO: Upload the file to ImageBB or your image hosting service and set the real URL
    // };
  const updatedUser ={
            name,
            photoURL: avatarUrl
        }
    // Form submit handler placeholder
    const handleSubmit = (e) => {
        e.preventDefault();

        const passwordExp = /(?=.*[a-z])(?=.*[A-Z]).{6,}/
        if (passwordExp.test(password) == false) {
            setError('password must be an uppercase one lowercase and minimum 6 digit')
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        Register(email, password)
            .then((result) => {
                updateUser(updatedUser)
                .then()
                .catch(err=>console.log(err))
                const user = result.user;
                setUser(user);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Register Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(location?.state || "/")
            })
            .catch((error) => {
                setError(error.message)
            })

        // Here you can prepare the registration data and send to backend
        const registrationData = {
            email,
            name,
            avatar: avatarUrl,
            bloodGroup,
            district: district.name,
            upazila: selectedUpazila,
            password,
            role: 'donor', // default role
            status: 'active', // default status
        };
      

        axios.post('http://localhost:3000/blood', registrationData)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        // console.log('Registration data:', registrationData);
        // TODO: send data to API
    };

    return (
        <div className="space-y-4 p-6 max-w-lg mx-auto">
            <h2 className="text-xl font-bold">Registration</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <input
                    type="email"
                    placeholder="Email"
                    required
                    className="input input-bordered w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Name */}
                <input
                    type="text"
                    placeholder="Full Name"
                    required
                    className="input input-bordered w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                {/* Avatar Upload */}
                <div>
                    <label className="block mb-1 font-semibold">Avatar</label>
                    <input
                        type="text"
                        placeholder='Enter PhotoURL'
                        onChange={(e)=>setAvatarUrl(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Blood Group */}
                <select
                    className="select select-bordered w-full"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    required
                >
                    <option value="">Select Blood Group</option>
                    {BLOOD_GROUPS.map((bg) => (
                        <option key={bg} value={bg}>
                            {bg}
                        </option>
                    ))}
                </select>

                {/* District Dropdown */}
                <select
                    className="select select-bordered w-full"
                    value={selectedDistrictId}
                    onChange={(e) => setSelectedDistrictId(e.target.value)}
                    required
                >
                    <option value="">Select District</option>
                    {districts.map((district) => (
                        <option key={district.id} value={district.id}>
                            {district.name}
                        </option>
                    ))}
                </select>

                {/* Upazila Dropdown */}
                <select
                    className="select select-bordered w-full"
                    value={selectedUpazila}
                    onChange={(e) => setSelectedUpazila(e.target.value)}
                    required
                >
                    <option value="">Select Upazila</option>
                    {filteredUpazilas.map((upazila) => (
                        <option key={upazila.id} value={upazila.name}>
                            {upazila.name}
                        </option>
                    ))}
                </select>


                {/* Password */}
                <input
                    type="password"
                    placeholder="Password"
                    required
                    minLength={6}
                    className="input input-bordered w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* Confirm Password */}
                <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    minLength={6}
                    className="input input-bordered w-full"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <p className="text-sm text-gray-600 text-center">
                    Already have an account? <span className="text-blue-600 underline cursor-pointer"><Link to='/login'>Login</Link></span>
                </p>

                <button type="submit" className="btn btn-primary w-full">
                    Register
                </button>
                {
                    error && <p className='text-red-500'>{error}</p>
                }
            </form>
        </div>
    );
};

export default Register;
