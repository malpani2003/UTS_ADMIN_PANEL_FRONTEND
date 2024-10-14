import React, { useState, useEffect } from "react";
import axios from "axios";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/careers`;

export default function CareerManagement() {
  const [careers, setCareers] = useState([]);
  const [newCareer, setNewCareer] = useState({
    title: "",
    description: "",
    applyLink: "",
    icon: "",
  });
  const [editingCareer, setEditingCareer] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_BASE_URL);
      setCareers(response.data.data);
    } catch (error) {
      console.error("Error fetching careers:", error);
      setError("Failed to fetch careers. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCareer = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(API_BASE_URL, newCareer);
      fetchCareers();
      setNewCareer({ title: "", description: "", applyLink: "", icon: "" });
    } catch (error) {
      console.error("Error adding career:", error);
      setError("Failed to add career. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCareer = async () => {
    if (!editingCareer) return;
    setIsLoading(true);
    try {
      await axios.put(`${API_BASE_URL}/${editingCareer._id}`, editingCareer);
      fetchCareers();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating career:", error);
      setError("Failed to update career. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCareer = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchCareers();
    } catch (error) {
      console.error("Error deleting career:", error);
      setError("Failed to delete career. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-800">Manage Careers</h1>

        {/* Add New Career Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Career</h2>
          <form onSubmit={handleAddCareer} className="space-y-4">
            <input
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Title"
              value={newCareer.title}
              onChange={(e) => setNewCareer({ ...newCareer, title: e.target.value })}
              required
            />
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Description"
              value={newCareer.description}
              onChange={(e) => setNewCareer({ ...newCareer, description: e.target.value })}
              required
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Apply Link"
              value={newCareer.applyLink}
              onChange={(e) => setNewCareer({ ...newCareer, applyLink: e.target.value })}
              required
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Icon URL"
              value={newCareer.icon}
              onChange={(e) => setNewCareer({ ...newCareer, icon: e.target.value })}
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
              disabled={isLoading}
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              {isLoading ? "Adding..." : "Add Career"}
            </button>
          </form>
        </div>

        {/* Error Handling */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* Careers Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apply Link</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {careers.map((career) => (
                <tr key={career._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{career.title}</td>
                  <td className="px-6 py-4">{career.description}</td>
                  <td className="px-6 py-4">
                    <a href={career.applyLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      Apply Link
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <img src={career.icon} alt={career.title} className="w-8 h-8 object-contain" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        setEditingCareer(career);
                        setIsEditModalOpen(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCareer(career._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="relative p-8 bg-white w-full max-w-md m-auto rounded-md shadow-lg">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Edit Career</h3>
              <input
                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={editingCareer.title}
                onChange={(e) => setEditingCareer({ ...editingCareer, title: e.target.value })}
              />
              <textarea
                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={editingCareer.description}
                onChange={(e) => setEditingCareer({ ...editingCareer, description: e.target.value })}
              />
              <input
                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={editingCareer.applyLink}
                onChange={(e) => setEditingCareer({ ...editingCareer, applyLink: e.target.value })}
              />
              <input
                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={editingCareer.icon}
                onChange={(e) => setEditingCareer({ ...editingCareer, icon: e.target.value })}
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleUpdateCareer}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}
