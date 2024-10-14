import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/login`,
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json", // Ensure the request has the correct content type
          },
        }
      );
      // Redirect to the admin dashboard on successful login
      window.location.href = "/admin";
      alert(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800">Unstop Techinal Solution Admin Panel</h2>
          <p className="mt-2 text-sm text-gray-500">
            Sign in to manage the application
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold shadow-lg hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {/* <p className="text-center text-gray-500 mt-4">
          Forgot your password?{" "}
          <a href="/reset-password" className="text-blue-600 hover:underline">
            Reset it here
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
