import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BlogManagement() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    shortDescription: '',
    detail: '',
    image: null,
  });
  const [editBlogId, setEditBlogId] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/blogs`);
      setBlogs(response.data.data.blogs);
      setIsLoading(false);
    } catch (error) {
      setError('Failed to fetch blogs');
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setNewBlog({
      ...newBlog,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(newBlog).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      if (editBlogId) {
        await axios.put(`${process.env.REACT_APP_API_URL}/blogs/${editBlogId}`, formData);
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/blogs`, formData);
      }
      fetchBlogs(); 
      resetForm();
    } catch (error) {
      setError('Failed to save blog');
    }
  };

  const resetForm = () => {
    setNewBlog({
      title: '',
      author: '',
      shortDescription: '',
      detail: '',
      image: null,
    });
    setEditBlogId(null);
  };

  const handleEdit = (blog) => {
    setNewBlog(blog);
    setEditBlogId(blog._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/blogs/${id}`);
        fetchBlogs();
      } catch (error) {
        setError('Failed to delete blog');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-800">Blog Management</h1>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-lg shadow-md" role="alert">
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
            <p className="mt-4 text-blue-600 font-semibold">Loading blogs...</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="mb-12 bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-blue-200 pb-2">
                {editBlogId ? 'Edit Blog' : 'Create New Blog'}
              </h2>
              <div className="space-y-6">
                <input
                  type="text"
                  name="title"
                  value={newBlog.title}
                  onChange={handleChange}
                  placeholder="Title"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
                />
                <input
                  type="text"
                  name="author"
                  value={newBlog.author}
                  onChange={handleChange}
                  placeholder="Author"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
                />
                <input
                  type="text"
                  name="shortDescription"
                  value={newBlog.shortDescription}
                  onChange={handleChange}
                  placeholder="Short Description"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
                />
                <textarea
                  name="detail"
                  value={newBlog.detail}
                  onChange={handleChange}
                  placeholder="Detail"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out h-40"
                />
                <div className="flex items-center space-x-2 bg-gray-50 p-4 rounded-lg">
                  <label className="flex-shrink-0 text-blue-600 font-semibold">Image:</label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                    required={!editBlogId}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </div>
              <button type="submit" className="mt-6 w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                {editBlogId ? 'Update Blog' : 'Create Blog'}
              </button>
            </form>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-blue-200 pb-2">All Blogs</h2>
              <ul className="space-y-6">
                {blogs.map((blog) => (
                  <li key={blog._id} className="bg-gray-50 p-6 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl hover:bg-gray-100">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div className="mb-4 md:mb-0">
                        <h3 className="font-bold text-xl text-blue-700 mb-2">{blog.title}</h3>
                        <p className="text-gray-600 text-sm">{blog.shortDescription}</p>
                        <p className="text-gray-500 text-xs mt-1">Author: {blog.author}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEdit(blog)} 
                          className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(blog._id)} 
                          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}