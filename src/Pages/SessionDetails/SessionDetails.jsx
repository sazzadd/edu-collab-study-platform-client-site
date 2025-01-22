import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaEnvelope,
  FaInfoCircle,
  FaShoppingCart,
  FaUserAlt,
} from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import useSession from "../../hook/useSession";

const SessionDetails = () => {
  const { id } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate(); // To navigate to login page
  const location = useLocation();
  // const [session, loading] = useSession();
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
  const {
    sessionTitle,
    sessionDescription,
    tutorName,
    image,
    tutorEmail,
    sessionDuration,
    registrationStartDate,
    registrationEndDate,
    classStartDate,
    classEndDate,
    status,
    _id,
  } = sessionData || {};
  console.log( sessionTitle,
    sessionDescription,
    tutorName,
    image,
    tutorEmail,
    sessionDuration,
    registrationStartDate,
    registrationEndDate,
    classStartDate,
    classEndDate,
    status,
    _id)
  const handleAddToBook = (session) => {
    if (user && user.email) {
      console.log(sessionTitle);
      const sessionItem ={
        sessionId:_id,
        bookedEmail:user.email,
        tutorName,
        tutorEmail,
        status,
        sessionTitle,
        sessionDescription
      }
    } else {
      setShowPopup(true); // Show the popup
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const redirectToLogin = () => {
    closePopup();
    navigate("/auth/login", { state: { from: location.pathname } }); // Redirect to the login page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!sessionData) {
    return <div>Session not found!</div>;
  }

  
  console.log(image)
  return (
    <div>
      {/* Background Section */}
      <div
        className="h-[50vh] w-full bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url(${sessionData.image})`,
        }}
      >
        <div className="absolute inset-0 bg-indigo-600/500 backdrop-blur-sm"></div>
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
            <button
              onClick={() => handleAddToBook(sessionData)}
              className="bg-[#10B981] text-white px-6 md:px-8 py-3 rounded-full font-semibold hover:bg-[#059669] transition-colors transform hover:scale-105 flex items-center gap-2"
            >
              <FaShoppingCart />
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h3 className="text-xl font-semibold mb-4">Are you sure?</h3>
          <p className="mb-6">You need to login to confirm your booking!</p>
          <div className="flex justify-end gap-4">
            <button
                  onClick={closePopup}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
               onClick={redirectToLogin}
              className="bg-[#10B981] text-white px-4 py-2 rounded"
            >
              Login
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default SessionDetails;
