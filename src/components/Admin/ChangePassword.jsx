// src/components/Admin/ChangePassword.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/change-password', { oldPassword, newPassword });
      alert(response.data.message);
    } catch (error) {
      alert('Failed to change password.');
    }
  };

  return (
    <form onSubmit={handleChangePassword} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Old Password</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">Update Password</button>
    </form>
  );
};

export default ChangePassword;
