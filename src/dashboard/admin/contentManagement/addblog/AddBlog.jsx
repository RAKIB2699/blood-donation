import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import JoditEditor from 'jodit-react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import axios from 'axios';

const imageBB_API_KEY = import.meta.env.VITE_IMAGEBB_API_KEY;
const imageBB_URL = `https://api.imgbb.com/1/upload?key=${imageBB_API_KEY}`;

const AddBlog = () => {
  const { register, handleSubmit, reset } = useForm();
  const [content, setContent] = useState('');
  const editor = useRef(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('image', data.thumbnail[0]);

      const { data: imageRes } = await axios.post(imageBB_URL, formData);
      const thumbnail = imageRes.data.url;

      const blogData = {
        title: data.title,
        thumbnail,
        content,
        createdAt: new Date(),
      };

      await axios.post('http://localhost:3000/blogs', blogData);

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Blog added successfully!',
        confirmButtonColor: '#d33',
      });

      reset();
      setContent('');
      navigate('/dashboard/content-management');
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while adding the blog.',
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <div className="p-4 md:p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Add New Blog</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block font-medium mb-1">Blog Title</label>
          <input
            type="text"
            {...register('title', { required: true })}
            placeholder="Enter blog title"
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            {...register('thumbnail', { required: true })}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Blog Content</label>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={newContent => setContent(newContent)}
          />
        </div>

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded transition"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
