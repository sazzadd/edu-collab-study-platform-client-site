import React from "react";
import { FaArrowRight } from "react-icons/fa"; // React Icon import
import { useNavigate } from "react-router-dom"; // useNavigate import
import useSession from "../hook/useSession";
import SessionCard from "./SessionCard";

const SessionSec = () => {
  const [session, loading] = useSession();
  const navigate = useNavigate(); // Initialize navigate function

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

  // Navigate to the other route when "Explore More" is clicked
  const handleExploreMore = () => {
    navigate("/sessions"); // Change "/sessions" to your desired route
  };

  return (
    <div>
      <h1>Sessions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {session.slice(0, 6).map((item) => (
          <SessionCard key={item._id} item={item} />
        ))}
      </div>

      {session.length > 6 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleExploreMore}
            className="px-6 py-3 bg-indigo-100 text-black rounded-full flex items-center justify-center gap-2 hover:bg-indigo-200 transition duration-300"
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
