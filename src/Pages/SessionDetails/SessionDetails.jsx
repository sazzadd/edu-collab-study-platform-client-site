import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaEnvelope,
  FaInfoCircle,
  FaShoppingCart,
  FaUserAlt,
} from "react-icons/fa";
import { useParams } from "react-router-dom";

const SessionDetails = () => {
  const { id } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/session/${id}`);
        setSessionData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching session details:", error);
        setLoading(false);
      }
    };

    fetchSessionDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!sessionData) {
    return <div>Session not found!</div>;
  }

  const {
    sessionTitle,
    sessionDescription,
    tutorName,
    tutorEmail,
    sessionDuration,
    registrationStartDate,
    registrationEndDate,
    classStartDate,
    classEndDate,
    status,
  } = sessionData;

  return (
    <div>
      {/* Background Section */}
      <div
        className="h-[50vh] w-full bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage:
            'url("https://i.ibb.co/XZ1DTVB/1702962448246.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-indigo-600/60 backdrop-blur-sm"></div>
      </div>

      {/* Card Section */}
      <div className="relative -mt-16 flex justify-center">
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-green-300 w-full max-w-3xl shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">
            {sessionTitle || "Session Title"}
          </h1>
          <p className="text-gray-600 mb-6">
            {sessionDescription || "No description available."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 mb-6">
            <div className="flex items-center gap-2">
              <FaUserAlt className="text-[#a7f3d0]" />
              <span>
                <strong>Tutor Name:</strong> {tutorName || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-[#a7f3d0]" />
              <span>
                <strong>Tutor Email:</strong> {tutorEmail || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-[#a7f3d0]" />
              <span>
                <strong>Session Duration:</strong> {sessionDuration || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-[#a7f3d0]" />
              <span>
                <strong>Registration Start:</strong>{" "}
                {registrationStartDate || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-[#a7f3d0]" />
              <span>
                <strong>Registration End:</strong>{" "}
                {registrationEndDate || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-[#a7f3d0]" />
              <span>
                <strong>Class Start:</strong> {classStartDate || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-[#a7f3d0]" />
              <span>
                <strong>Class End:</strong> {classEndDate || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaInfoCircle className="text-[#a7f3d0]" />
              <span>
                <strong>Status:</strong> {status || "N/A"}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-4xl font-bold">$28</div>
            <button className="bg-[#10B981] text-white px-6 md:px-8 py-3 rounded-full font-semibold hover:bg-[#059669] transition-colors transform hover:scale-105 flex items-center gap-2">
              <FaShoppingCart />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
