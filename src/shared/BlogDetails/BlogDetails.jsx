
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`https://blood-donation-server-olive.vercel.app/blog-post/${id}`)
      .then(res => setBlog(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!blog) return <p className="text-center py-10">Loading blog...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <img src={blog.thumbnail} alt={blog.title} className="w-full h-64 object-cover rounded-xl mb-6" />
       <div
                                        className="prose max-w-none mt-2"
                                        dangerouslySetInnerHTML={{ __html: blog.content }}
                                    ></div>
    </div>
  );
};

export default BlogDetails;
