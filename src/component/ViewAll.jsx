import Lottie from "lottie-react";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
import loadingAnimation from "../assets/lottie/loading.json";
import useSession from "../hook/useSession";
import SessionCard from "./SessionCard";

const ViewAll = () => {
  const [session, loading] = useSession("/session");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all"); // Default: Show all sessions
  const [searchQuery, setSearchQuery] = useState(""); // Search Query State
  const itemsPerPage = 6;

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-4/12 mx-auto flex justify-center items-center h-screen">
          <Lottie animationData={loadingAnimation} />
        </div>
      </div>
    );
  }

  if (session.length === 0) {
    return <div className="text-center text-lg">No sessions available.</div>;
  }

  // **Filter Logic**
  const filteredSessions = session.filter((item) => {
    const currentDate = new Date();
    const startDate = new Date(item.registrationStartDate);
    const endDate = new Date(item.registrationEndDate);

    let matchesFilter = true;
    if (filter === "ongoing") {
      matchesFilter = currentDate >= startDate && currentDate <= endDate;
    } else if (filter === "upcoming") {
      matchesFilter = currentDate < startDate;
    } else if (filter === "closed") {
      matchesFilter = currentDate > endDate;
    }

    // **Search Logic** (Check if sessionTitle includes the search query)
    const matchesSearch = item.sessionTitle
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);
  const adjustedPage = Math.min(currentPage, totalPages);
  const startIndex = (adjustedPage - 1) * itemsPerPage;
  const currentItems = filteredSessions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-11/12 mx-auto">
      <Helmet>
        <title>View All | Edu Platform </title>
      </Helmet>

      {/* Heading */}
      <div className="relative w-full mt-8 mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-900">
          <span className="text-[#0f766e]">All</span> Sessions
        </h1>
      </div>

      {/* **Search & Filter Section** */}
      {/* **Search & Filter Section** */}
      <div className="flex flex-col sm:flex-row justify-between mb-12 gap-4">
        {/* Search Input with Icon */}
        <div className="relative w-full sm:w-1/3">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by session title..."
            className="w-full pl-10 pr-4 py-3 border border-[#10b981]  rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#10b981]"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset pagination
            }}
          />
        </div>

        {/* Filter Dropdown */}
        <select
          className="px-4 py-3 border border-[#10b981] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#10b981] bg-white text-gray-900 transition duration-300"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1); // Reset pagination
          }}
        >
          <option value="all">All Sessions</option>
          <option value="ongoing">Ongoing Sessions</option>
          <option value="upcoming">Upcoming Sessions</option>
          <option value="closed">Closed Sessions</option>
        </select>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {currentItems.length > 0 ? (
          currentItems.map((item) => <SessionCard key={item._id} item={item} />)
        ) : (
          <p className="text-center text-lg col-span-3">No sessions found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 rounded-lg text-black bg-[#10b9812a] hover:bg-[#10b9815c] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
          >
            <FaChevronLeft className="inline mr-2" />
          </button>

          <ul className="flex gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className="cursor-pointer">
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-lg border ${
                    currentPage === index + 1
                      ? "bg-[#10b981] text-white"
                      : "bg-[#10b9815c] text-black hover:bg-[#10b98175]"
                  } transition duration-300`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 rounded-lg bg-[#10b9812a] hover:bg-[#10b9815c] text-black transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === totalPages}
          >
            <FaChevronRight className="inline ml-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewAll;
