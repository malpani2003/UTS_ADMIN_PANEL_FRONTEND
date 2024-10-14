// src/components/Admin/TestimonialManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestimonialManagement = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    position: '',
    message: '',
    image: null,
  });
  const [editTestimonialId, setEditTestimonialId] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/testimonials`);
      setTestimonials(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError('Failed to fetch testimonials');
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setNewTestimonial({
      ...newTestimonial,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(newTestimonial).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      if (editTestimonialId) {
        await axios.put(`${process.env.REACT_APP_API_URL}/testimonials/${editTestimonialId}`, formData);
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/testimonials`, formData);
      }
      fetchTestimonials();
      resetForm();
    } catch (error) {
      setError('Failed to save testimonial');
    }
  };

  const resetForm = () => {
    setNewTestimonial({
      name: '',
      position: '',
      message: '',
      image: null,
    });
    setEditTestimonialId(null);
  };

  const handleEdit = (testimonial) => {
    setNewTestimonial({
      name: testimonial.name,
      position: testimonial.position,
      message: testimonial.message,
      image: null,
    });
    setEditTestimonialId(testimonial._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/testimonials/${id}`);
        fetchTestimonials();
      } catch (error) {
        setError('Failed to delete testimonial');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-800">Testimonial Management</h1>

      {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">{editTestimonialId ? 'Edit Testimonial' : 'Create New Testimonial'}</h2>
            <input
              type="text"
              name="name"
              value={newTestimonial.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="mb-2 w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="position"
              value={newTestimonial.position}
              onChange={handleChange}
              placeholder="Position"
              required
              className="mb-2 w-full p-2 border border-gray-300 rounded"
            />
            <textarea
              name="message"
              value={newTestimonial.message}
              onChange={handleChange}
              placeholder="Message"
              required
              className="mb-2 w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className="mb-2 w-full p-2 border border-gray-300 rounded"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              {editTestimonialId ? 'Update Testimonial' : 'Create Testimonial'}
            </button>
          </form>

          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">All Testimonials</h2>
            <ul className="divide-y divide-gray-200">
              {testimonials && testimonials.map((testimonial) => (
                <li key={testimonial._id} className="py-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.position}</p>
                    <p className="text-gray-500">{testimonial.message}</p>
                    {testimonial.image && (
                      <img
                        src={testimonial.image}
                        alt={`${testimonial.name}'s testimonial`}
                        className="w-24 h-24 object-cover mt-2 rounded"
                      />
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEdit(testimonial)} 
                      className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(testimonial._id)} 
                      className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default TestimonialManagement;
