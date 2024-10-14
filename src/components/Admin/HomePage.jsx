import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [aboutUs, setAboutUs] = useState('');
  const [testimonials, setTestimonials] = useState([{ text: '', shortDescription: '', imageURL: '' }]);
  const [services, setServices] = useState([{ name: '', description: '', imageUrl: '' }]);
  const [homePageData, setHomePageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Set the base URL for Axios with credentials
  const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`, // API base URL
    withCredentials: true, // Enable sending credentials
  });

  // Fetch existing homepage data
  useEffect(() => {
    const fetchHomePage = async () => {
      try {
        const response = await axiosInstance.get('home-page/home');
        setHomePageData(response.data);
        setAboutUs(response.data.aboutUs);
        setTestimonials(response.data.testimonials);
        setServices(response.data.services);
      } catch (err) {
        setError('Error fetching homepage data');
      } finally {
        setLoading(false);
      }
    };

    fetchHomePage();
  }, []);

  const handleTestimonialChange = (index, field, value) => {
    const newTestimonials = [...testimonials];
    newTestimonials[index][field] = value;
    setTestimonials(newTestimonials);
  };

  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  };

  const addTestimonial = () => {
    setTestimonials([...testimonials, { text: '', shortDescription: '', imageURL: '' }]);
  };

  const addService = () => {
    setServices([...services, { name: '', description: '', imageUrl: '' }]);
  };

  const createOrUpdateHomePage = async (e) => {
    e.preventDefault();
    const data = { aboutUs, testimonials, services };

    try {
      if (homePageData) {
        // Update existing data
        await axiosInstance.put('home-page/home', data);
      } else {
        // Create new data
        await axiosInstance.post('home-page/home', data);
      }
      alert('Homepage data saved successfully!');
    } catch (err) {
      setError('Error saving homepage data');
    }
  };

  const deleteHomePage = async () => {
    try {
      await axiosInstance.delete('home-page/home');
      alert('Homepage data deleted successfully!');
      setHomePageData(null);
      setAboutUs('');
      setTestimonials([{ text: '', shortDescription: '', imageURL: '' }]);
      setServices([{ name: '', description: '', imageUrl: '' }]);
    } catch (err) {
      setError('Error deleting homepage data');
    }
  };

  // Loader component
  const Loader = () => (
    <div className="flex justify-center items-center h-full">
      <div className="loader"></div>
    </div>
  );

  if (loading) return <Loader />;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-800">Home Page Management</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={createOrUpdateHomePage} className="mb-6 mx-auto bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block mb-2 text-lg font-semibold" htmlFor="aboutUs">About Us</label>
          <textarea
            id="aboutUs"
            value={aboutUs}
            onChange={(e) => setAboutUs(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            rows="4"
            required
          />
        </div>

        <h2 className="text-2xl font-semibold mb-2">Testimonials</h2>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="mb-4 border p-4 rounded bg-gray-50">
            <label className="block mb-2" htmlFor={`testimonialText_${index}`}>Testimonial Text</label>
            <textarea
              id={`testimonialText_${index}`}
              value={testimonial.text}
              onChange={(e) => handleTestimonialChange(index, 'text', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              rows="2"
              required
            />
            <label className="block mb-2" htmlFor={`testimonialShortDesc_${index}`}>Short Description</label>
            <input
              type="text"
              id={`testimonialShortDesc_${index}`}
              value={testimonial.shortDescription}
              onChange={(e) => handleTestimonialChange(index, 'shortDescription', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              required
            />
            <label className="block mb-2" htmlFor={`testimonialImageURL_${index}`}>Image URL</label>
            <input
              type="text"
              id={`testimonialImageURL_${index}`}
              value={testimonial.imageURL}
              onChange={(e) => handleTestimonialChange(index, 'imageURL', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            />
          </div>
        ))}
        <button type="button" onClick={addTestimonial} className="bg-blue-500 text-white p-2 rounded mb-4 transition duration-300 hover:bg-blue-600">Add Testimonial</button>

        <h2 className="text-2xl font-semibold mb-2">Services</h2>
        {services.map((service, index) => (
          <div key={index} className="mb-4 border p-4 rounded bg-gray-50">
            <label className="block mb-2" htmlFor={`serviceName_${index}`}>Service Name</label>
            <input
              type="text"
              id={`serviceName_${index}`}
              value={service.name}
              onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              required
            />
            <label className="block mb-2" htmlFor={`serviceDescription_${index}`}>Description</label>
            <textarea
              id={`serviceDescription_${index}`}
              value={service.description}
              onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              rows="2"
              required
            />
            <label className="block mb-2" htmlFor={`serviceImageURL_${index}`}>Image URL</label>
            <input
              type="text"
              id={`serviceImageURL_${index}`}
              value={service.imageUrl}
              onChange={(e) => handleServiceChange(index, 'imageUrl', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            />
          </div>
        ))}
        <button type="button" onClick={addService} className="bg-blue-500 text-white p-2 rounded mb-4 transition duration-300 hover:bg-blue-600">Add Service</button>
        <br></br>
        <button type="submit" className="bg-green-500 text-white p-2 rounded transition duration-300 hover:bg-green-600">Save HomePage Data</button>
      </form>

      <button onClick={deleteHomePage} className="bg-red-500 text-white p-3 rounded transition duration-300 hover:bg-red-600">Delete HomePage Data</button>

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

export default HomePage;
