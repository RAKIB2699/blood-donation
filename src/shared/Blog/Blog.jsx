// src/pages/Blog.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('https://blood-donation-server-olive.vercel.app/blogs?status=published')
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Published Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map(blog => (
          <div key={blog._id} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-sm text-gray-500 mb-2">By {blog.authorName} | {new Date(blog.date).toLocaleDateString()}</p>
            <p className="text-gray-600 mb-4">{blog.summary?.slice(0, 100)}...</p>
            <Link
              to={`/blogs/${blog._id}`}
              className="text-blue-600 hover:underline font-medium"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
