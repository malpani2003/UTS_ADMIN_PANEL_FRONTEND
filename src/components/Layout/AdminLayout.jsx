// src/components/Layout/AdminLayout.jsx
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLayout = () => {
  const navigate = useNavigate();
 
  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/logout`, // Using the environment variable
        {},
        {
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-300">
      {/* Navigation Sidebar */}
      <nav className="hidden md:flex flex-col w-72 bg-gray-800 p-6 md:h-screen">
        <h1 className="text-2xl font-bold text-white mb-6">Admin Panel</h1>
        <ul className="space-y-4">
          {[
            { to: "/admin/blogs", label: "Blog Management" },
            { to: "/admin/contact-submissions", label: "Contact Submissions" },
            { to: "/admin/careers", label: "Careers Management" },
            // { to: "/admin/change-password", label: "Change Password" },
            { to: "/admin/testimonial", label: "Testimonial" },
            { to: "/admin/home-page", label: "Home Page Management" },
            { to: "/admin/sliders", label: "Sliders Management" },
          ].map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `block py-2 px-4 rounded transition-colors duration-200 
                   ${
                     isActive
                       ? "bg-blue-600 text-white"
                       : "text-gray-200 hover:bg-blue-600 hover:text-white"
                   }`
                }
                aria-current={({ isActive }) => (isActive ? "page" : undefined)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li className="mt-6">
            <button
              onClick={handleLogout}
              className="w-full py-2 px-4 text-left text-gray-200 hover:bg-red-600 hover:text-white transition-colors duration-200 rounded"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <div className="flex-1 bg-gray-100">
        {/* Outlet for nested routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
