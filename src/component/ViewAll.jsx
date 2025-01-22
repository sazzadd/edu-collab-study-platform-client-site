import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // React Icons
import useSession from "../hook/useSession";
import SessionCard from "./SessionCard";

const ViewAll = () => {
  const [session, loading] = useSession();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  // If session array is empty, display a message
  if (session.length === 0) {
    return <div className="text-center text-lg">No sessions available.</div>;
  }

  // Calculate total pages
  const totalPages = Math.ceil(session.length / itemsPerPage);

  // Ensure the current page is valid
  const adjustedPage = Math.min(currentPage, totalPages);
  const startIndex = (adjustedPage - 1) * itemsPerPage;
  const currentItems = session.slice(startIndex, startIndex + itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-semibold mb-6">
        View All Sessions
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-6">
        {currentItems.map((item) => (
          <SessionCard key={item._id} item={item} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-2">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 rounded-lg bg-green-100 text-black hover:bg-green-200 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === 1}
        >
          <FaChevronLeft className="inline mr-2" />
        </button>

        {/* Page Numbers */}
        <ul className="flex gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className="cursor-pointer">
              <button
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-lg border ${
                  currentPage === index + 1
                    ? "bg-green-300 text-white" // Active page button
                    : "bg-green-100 text-black hover:bg-green-200" // Default button
                } transition duration-300`}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 rounded-lg bg-green-100 text-black hover:bg-green-200 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === totalPages}
        >
          <FaChevronRight className="inline ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ViewAll;
