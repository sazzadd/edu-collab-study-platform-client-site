import React from "react";
import { FaArrowRight } from "react-icons/fa"; // React Icon import
import { useNavigate } from "react-router-dom"; // useNavigate import
import useSession from "../hook/useSession";
import SessionCard from "./SessionCard";

const SessionSec = () => {
  const [session, loading] = useSession();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center min-h-screen items-center">
        <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (session.length === 0) {
    return <div className="text-center text-lg">No sessions available.</div>;
  }

  // Navigate to the other route when "Explore More" is clicked
  const handleExploreMore = () => {
    navigate("/sessions"); // Change "/sessions" to your desired route
  };

  return (
    <div className="py-9">
      {/* Stylish Heading */}
      <div className="relative w-full mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 relative z-10">
          <span className="text-[#0f766e]">Tredding</span> Sessions
        </h1>
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-full bg-[#0f766e]"></div>
        <p className="text-center text-gray-600 mt-2">
          Discover the most popular and trending sessions tailored just for you.
        </p>
      </div>

      <div className="w-11/12 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {session.slice(0, 6).map((item) => (
            <SessionCard key={item._id} item={item} />
          ))}
        </div>
      </div>

      {session.length > 6 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleExploreMore}
            className="px-6 py-3 bg-green-100 text-black rounded-full flex items-center justify-center gap-2 hover:bg-green-200 transition duration-300"
          >
            Explore More
            <FaArrowRight /> {/* React Icon */}
          </button>
        </div>
      )}
    </div>
  );
};

export default SessionSec;
