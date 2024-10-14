
import React from 'react';

const MainPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-blue-800">Welcome to the Admin Panel</h1>
      <p className="text-lg text-gray-700 mb-8">
        Manage your website content, review submissions, and configure the homepage from here.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow-md hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold mb-2">Blog Management</h2>
          <p className="text-gray-600">Add, edit, or delete blog posts.</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold mb-2">Contact Submissions</h2>
          <p className="text-gray-600">View and manage contact form submissions.</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold mb-2">Careers Management</h2>
          <p className="text-gray-600">Post job opportunities and manage applications.</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold mb-2">Testimonials</h2>
          <p className="text-gray-600">Add or remove client testimonials.</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold mb-2">Home Page Management</h2>
          <p className="text-gray-600">Customize the content of the homepage.</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold mb-2">Slider Management</h2>
          <p className="text-gray-600">Add, update, or remove homepage sliders.</p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
