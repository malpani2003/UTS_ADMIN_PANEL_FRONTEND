// src/pages/AdminDashboard.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/Layout/AdminLayout';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/admin/check-auth`, {
          withCredentials: true, // Make sure to send cookies with the request
        });
      } catch (err) {
        navigate('/');
      }
    };

    checkAuth();
  }, [navigate]);

  return <AdminLayout />;
};

export default AdminDashboard;
