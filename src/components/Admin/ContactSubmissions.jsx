import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ContactSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/contacts`);
      setSubmissions(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch contact submissions. Please try again later.");
      console.error("Error fetching submissions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-800">
          Contact Form Submissions
        </h1>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-gray-800 mb-4"></div>
            <p className="text-gray-600">Loading submissions...</p>
          </div>
        ) : (
          <>
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
                role="alert"
              >
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {error}</span>
              </div>
            )}

            {!error && submissions.length === 0 && (
              <p className="text-gray-600 text-center text-lg">
                No submissions found.
              </p>
            )}

            {!error && submissions.length > 0 && (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {submissions.map((submission) => (
                    <li
                      key={submission._id}
                      className="px-6 py-4 hover:bg-gray-100 transition duration-150 ease-in-out"
                    >
                      <div className="flex items-start justify-between">
                        <div className="w-full">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {submission.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Email: {submission.email}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            Mobile: {submission.mobileNumber}
                          </p>
                        </div>
                        <div className="ml-4 text-right">
                          <p className="text-xs text-gray-500">Submitted on</p>
                          <p className="mt-1 text-sm text-gray-800">
                            {formatDate(submission.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 border-t border-gray-200 pt-2">
                        <p className="text-sm text-gray-700">
                          {submission.message}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
