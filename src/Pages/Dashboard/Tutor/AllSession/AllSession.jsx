import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../provider/AuthProvider";

const AllSession = () => {
  const { user } = useContext(AuthContext);
  const tutorEmail = user.email; // Optional filtering by tutor email
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [activeTab, setActiveTab] = useState("pending"); // Default active tab
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const url = tutorEmail
          ? `http://localhost:5000/session?tutorEmail=${tutorEmail}`
          : "http://localhost:5000/session";

        const { data } = await axios.get(url);
        setSessions(data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [tutorEmail]);

  // Filter sessions based on the active tab
  useEffect(() => {
    const filtered = sessions.filter((session) => session.status === activeTab);
    setFilteredSessions(filtered);
  }, [activeTab, sessions]);

  if (loading) {
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  }

  // Calculate counts for each status
  const statusCounts = {
    pending: sessions.filter((session) => session.status === "pending").length,
    approved: sessions.filter((session) => session.status === "approved").length,
    rejected: sessions.filter((session) => session.status === "rejected").length,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">
        {tutorEmail ? "My Sessions" : "All Sessions"}
      </h2>

      {/* Tabs for filtering by status */}
      <div className="flex justify-center space-x-4 mb-8">
        {Object.keys(statusCounts).map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded ${
              activeTab === status ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} ({statusCounts[status]})
          </button>
        ))}
      </div>

      {/* Display filtered sessions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSessions.map((session) => (
          <div
            key={session._id}
            className={`p-6 border rounded shadow-md ${
              session.status === "pending"
                ? "bg-yellow-100"
                : session.status === "approved"
                ? "bg-green-100"
                : "bg-red-100"
            }`}
          >
            <img
              src={session.image}
              alt={session.sessionTitle}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{session.sessionTitle}</h3>
            <p className="text-sm text-gray-600 mb-2">{session.sessionDescription}</p>
            <p className="font-medium">
              <strong>Duration:</strong> {session.sessionDuration} hours
            </p>
            <p className="font-medium">
              <strong>Fee:</strong> ${session.registrationFee}
            </p>
            <p className={`font-semibold mt-4 ${getStatusColor(session.status)}`}>
              <strong>Status:</strong> {session.status}
            </p>
            <p className="text-gray-600">
              <strong>Tutor:</strong> {session.tutorName} ({session.tutorEmail})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "text-yellow-600";
    case "approved":
      return "text-green-600";
    case "rejected":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

export default AllSession;
