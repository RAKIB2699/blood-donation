import React, {  useState } from 'react';
import { FaUserShield, FaUserCheck, FaUser, FaBan, FaBars } from 'react-icons/fa';
import { Menu, MenuHandler, MenuList, MenuItem, Button } from '@material-tailwind/react';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AllUsers = () => {
    // const [users, setUsers] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;


     const axiosSecure = useAxiosSecure();
    const {data:users, refetch}= useQuery({
        queryKey: ['all-users'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.patch(`http://localhost:3000/users/${id}/status`, { status: newStatus });
            // fetchUsers();
            refetch()

        } catch (err) {
            console.error('Failed to update status:', err);
        }
    };

    const handleRoleChange = async (id, role) => {
        try {
            await axios.patch(`http://localhost:3000/users/${id}/role`, { role });
            // fetchUsers();
            refetch()
        } catch (err) {
            console.error('Failed to update role:', err);
        }
    };

    const filteredUsers =
        statusFilter === 'all' ? users : users.filter((user) => user.status === statusFilter);

    const totalPages = Math.ceil(filteredUsers?.length / itemsPerPage);
    const paginatedUsers = filteredUsers?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

   
    // console.log(data);
    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">All Users</h2>

            <div className="mb-4 flex flex-wrap gap-2">
                <Button onClick={() => setStatusFilter('all')}>All</Button>
                <Button onClick={() => setStatusFilter('active')}>Active</Button>
                <Button onClick={() => setStatusFilter('blocked')}>Blocked</Button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border text-left">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2">Avatar</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Role</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers?.map((user) => (
                            <tr key={user._id} className="border-t">
                                <td className="p-2">
                                    <img
                                        src={user?.avatar || '/default-avatar.png'}
                                        alt="avatar"
                                        className="w-10 h-10 rounded-full"
                                    />
                                </td>
                                <td className="p-2">{user.email}</td>
                                <td className="p-2">{user?.name}</td>
                                <td className="p-2 capitalize">{user.role}</td>
                                <td className="p-2 capitalize">{user.status}</td>
                                <td className="p-2">
                                    <Menu placement="bottom-end">
                                        <MenuHandler>
                                            <Button variant="outlined" size="sm">
                                                <FaBars />
                                            </Button>
                                        </MenuHandler>
                                        <MenuList>
                                            {user.status === 'active' && (
                                                <MenuItem
                                                    onClick={() => handleStatusChange(user._id, 'blocked')}
                                                >
                                                    <FaBan className="inline mr-2" /> Block
                                                </MenuItem>
                                            )}
                                            {user.status === 'blocked' && (
                                                <MenuItem
                                                    onClick={() => handleStatusChange(user._id, 'active')}
                                                >
                                                    <FaUserCheck className="inline mr-2" /> Unblock
                                                </MenuItem>
                                            )}
                                            {user.role !== 'volunteer' && (
                                                <MenuItem
                                                    onClick={() => handleRoleChange(user._id, 'volunteer')}
                                                >
                                                    <FaUser className="inline mr-2" /> Make Volunteer
                                                </MenuItem>
                                            )}
                                           
                                        </MenuList>
                                    </Menu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded ${
                            currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllUsers;
