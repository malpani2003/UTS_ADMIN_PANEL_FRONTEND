import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit3 } from 'lucide-react';

const SliderManagement = () => {
  const [slides, setSlides] = useState([]);
  const [newSlide, setNewSlide] = useState({
    imageUrl: '',
    heading: '',
    subheading: '',
    buttonText: '',
    buttonLink: '',
  });
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState('');

  // Axios instance with credentials
  const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/sliders`,
    withCredentials: true,
  });

  // Fetch all slides
  const fetchSlides = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/slides');
      setSlides(response.data);
    } catch (err) {
      setError('Failed to fetch slides');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSlide({ ...newSlide, [name]: value });
  };

  // Add new slide
  const addNewSlide = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/add-slide', newSlide);
      alert('Slide added successfully!');
      fetchSlides();
      setNewSlide({
        imageUrl: '',
        heading: '',
        subheading: '',
        buttonText: '',
        buttonLink: '',
      });
    } catch (err) {
      setError('Failed to add slide');
    }
  };

  // Delete a slide
  const deleteSlide = async (id) => {
    try {
      await axiosInstance.delete(`/delete-slide/${id}`);
      alert('Slide deleted successfully!');
      fetchSlides();
    } catch (err) {
      setError('Failed to delete slide');
    }
  };

  // Loader component
  const Loader = () => (
    <div className="flex justify-center items-center h-full">
      <div className="loader"></div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-800">Manage Slides</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={addNewSlide} className="mb-6 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add New Slide</h2>
        {['imageUrl', 'heading', 'subheading', 'buttonText', 'buttonLink'].map((field) => (
          <div key={field} className="mb-4">
            <label className="block mb-2 capitalize" htmlFor={field}>{field.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type="text"
              id={field}
              name={field}
              value={newSlide[field]}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              required
            />
          </div>
        ))}
        <button type="submit" className="bg-green-500 text-white p-3 rounded transition duration-300 hover:bg-green-600">Add Slide</button>
      </form>
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Existing Slides</h2>
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {slides.map((slide) => (
              <div key={slide._id} className="border p-4 rounded bg-gray-50 relative">
                <img src={slide.imageUrl} alt={slide.heading} className="w-full h-48 object-cover rounded mb-4" />
                <h3 className="text-xl font-bold mb-2">{slide.heading}</h3>
                <p className="text-gray-700 mb-2">{slide.subheading}</p>
                <a href={slide.buttonLink} className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-600">
                  {slide.buttonText}
                </a>
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button onClick={() => deleteSlide(slide._id)} className="text-red-500 hover:text-red-700">
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


      <style jsx>{`
        .loader {
          border: 8px solid #f3f3f3;
          border-top: 8px solid #3498db;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SliderManagement;
