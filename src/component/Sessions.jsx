import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import SessionCard from "./SessionCard";

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch sessions data with pagination
  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      const response = await fetch(
        `https://study-platform-server-eta.vercel.app/session?page=${currentPage}`
      );
      const data = await response.json();
      setSessions(data.sessions);
      setTotalPages(data.totalPages);
      setLoading(false);
    };
    fetchSessions();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-11/12 mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Sessions</h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {sessions.map((item) => (
              <SessionCard key={item._id} item={item}></SessionCard>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sessions;
