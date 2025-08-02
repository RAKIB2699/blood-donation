import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Provider/AuthProvider';
import useRole from '../../../hooks/useRole';

const ContentManagement = () => {
    const [filter, setFilter] = useState('all');
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { role } = useRole();
    const { refetch, data: blogs = [], isLoading, isError } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/blogs');
            return res.data;
        },
    });

    const handleStatusToggle = async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === 'draft' ? 'published' : 'draft';
            await axiosSecure.patch(`/blogs/${id}/status`, { status: newStatus });
            Swal.fire('Updated!', `Blog status changed to ${newStatus}`, 'success');
            refetch();
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Failed to update blog status', 'error');
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This blog will be deleted permanently!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/blogs/${id}`);
                    Swal.fire('Deleted!', 'Blog has been deleted.', 'success');
                    refetch();
                } catch (err) {
                    console.error(err);
                    Swal.fire('Error', 'Failed to delete blog', 'error');
                }
            }
        });
    };

    const filteredBlogs = blogs.filter((blog) => {
        if (filter === 'all') return true;
        return blog.status === filter;
    });

    if (isLoading) return <p>Loading blogs...</p>;
    if (isError) return <p>Failed to load blogs.</p>;

    return (
        <div className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Content Management</h2>
                <button
                    onClick={() => navigate('/dashboard/add-blog')}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
                >
                    Add Blog
                </button>
            </div>

            <div className="mb-6">
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border px-4 py-2 rounded"
                >
                    <option value="all">All</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredBlogs.length === 0 ? (
                    <p className="text-gray-500 text-center col-span-full">No blogs found.</p>
                ) : (
                    filteredBlogs.map((blog) => (
                        <div key={blog._id} className="bg-white shadow rounded-lg overflow-hidden">
                            {/* blog content remains unchanged */}
                            <img src={blog.thumbnail} alt="thumbnail" className="w-full h-48 object-cover" />
                            <div className="p-4 space-y-2">
                                <h3 className="text-lg font-bold">{blog.title}</h3>
                                <p className="text-sm text-gray-500">
                                    <div
                                        className="prose max-w-none mt-2"
                                        dangerouslySetInnerHTML={{ __html: blog.content }}
                                    ></div>
                                </p>
                                <div className="flex gap-3 mt-4 flex-wrap">
                                    {role === 'admin' && (
                                        <>
                                            <button
                                                onClick={() => handleStatusToggle(blog._id, blog.status)}
                                                className={`flex items-center gap-1 px-3 py-1 rounded text-white text-sm ${blog.status === 'draft'
                                                    ? 'bg-green-600 hover:bg-green-700'
                                                    : 'bg-yellow-600 hover:bg-yellow-700'
                                                    }`}
                                            >
                                                {blog.status === 'draft' ? <FaCheck /> : <FaTimes />}
                                                {blog.status === 'draft' ? 'Publish' : 'Unpublish'}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(blog._id)}
                                                className="flex items-center gap-1 px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-sm"
                                            >
                                                <FaTrash /> Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}

            </div>
        </div>
    );
};

export default ContentManagement;
