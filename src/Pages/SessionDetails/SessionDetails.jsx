import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import axios from "axios";
import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaEnvelope,
  FaShoppingCart,
  FaUserAlt,
} from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useRole from "../../hook/useRole";
import { AuthContext } from "../../provider/AuthProvider";
import { useForm } from "react-hook-form";
const SessionDetails = () => {
  const { id } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [userData, userLoading] = useRole();
  const [isBooked, setIsBooked] = useState(false);
  console.log(userData.role);
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  //check booked
  useEffect(() => {
    if (user && user?.email) {
      axiosSecure
        .get(`/booked/check?sessionId=${id}&userEmail=${user?.email}`)
        .then((res) => setIsBooked(res.data.isBooked));
    }
  }, [user, id, axiosSecure, isBooked]);

  // Updated formatSessionDuration function
  const formatSessionDuration = (minutes) => {
    const days = Math.floor(minutes / 1440); // 1 day = 1440 minutes
    const hours = Math.floor((minutes % 1440) / 60);
    const remainingMinutes = minutes % 60;
    const UserEmail = user?.email;

    if (minutes >= 525600) {
      // 1 year = 525600 minutes
      const years = Math.floor(minutes / 525600);
      const months = Math.floor((minutes % 525600) / 43200); // 1 month = 43200 minutes
      return `${years} year${years > 1 ? "s" : ""} ${months} month${
        months > 1 ? "s" : ""
      }`;
    }

    // If duration is more than a day, show days and hours
    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ${hours} hour${
        hours > 1 ? "s" : ""
      }`;
    }

    // If duration is more than an hour but less than a day, show hours and minutes
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ${remainingMinutes} minute${
        remainingMinutes > 1 ? "s" : ""
      }`;
    }

    // For durations less than an hour, just show minutes
    return `${remainingMinutes} minute${remainingMinutes > 1 ? "s" : ""}`;
  };

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
    registrationFee,
    status,
    _id,
  } = sessionData || {};
  console.log(registrationFee);
  // const handleAddToBook = (session) => {
  //   if (user && user?.email) {
  //     console.log(sessionTitle);
  //     const sessionItem = {
  //       sessionId: _id,
  //       bookedUserEmail: user?.email,
  //       bookedUserName: user?.displayName,
  //       bookedUserImage: user?.photoURL,
  //       tutorName,
  //       tutorEmail,
  //       status,
  //       sessionTitle,
  //       sessionDescription,
  //       image,
  //     };
  //     axiosSecure.post("/booked", sessionItem).then((res) => {
  //       console.log(res.data);
  //       if (res.data.insertedId) {
  //         console.log(res.data);
  //         Swal.fire({
  //           position: "top-end",
  //           icon: "success",
  //           title: "Section has booked Successfully",
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //       }
  //     });
  //   } else {
  //     setShowPopup(true);
  //   }
  // };
  const handleAddToBook = (session) => {
    if (user && user?.email) {
      const sessionItem = {
        sessionId: _id,
        bookedUserEmail: user?.email,
        bookedUserName: user?.displayName,
        bookedUserImage: user?.photoURL,
        tutorName,
        tutorEmail,
        PaymentStatus: registrationFee === 0 ? "incomplete" : "paid",
        sessionTitle,
        sessionDescription,
        image,
        registrationFee,
      };

      axiosSecure.post("/booked", sessionItem).then((res) => {
        if (res.data.success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Session has been booked successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: res.data.message || "Failed to book the session!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } else {
      setShowPopup(true);
    }
  };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    
    console.log("Form Data:", data);
  };

  // Watch rating 
  const rating = watch("rating", 0);
  const closePopup = () => {
    setShowPopup(false);
  };

  const redirectToLogin = () => {
    closePopup();
    navigate("/auth/login", { state: { from: location.pathname } });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!sessionData) {
    return <div>Session not found!</div>;
  }

  // Format the dates using date-fns
  const formattedRegistrationStartDate = format(
    new Date(registrationStartDate),
    "dd-MM-yyyy"
  );
  const formattedRegistrationEndDate = format(
    new Date(registrationEndDate),
    "dd-MM-yyyy"
  );
  const formattedClassStartDate = format(
    new Date(classStartDate),
    "dd-MM-yyyy"
  );
  const formattedClassEndDate = format(new Date(classEndDate), "dd-MM-yyyy");

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
                <strong>Session Duration:</strong>{" "}
                {sessionDuration
                  ? formatSessionDuration(sessionDuration)
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-[#a7f3d0]" />
              <span>
                <strong>Registration Start:</strong>{" "}
                {formattedRegistrationStartDate || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-[#a7f3d0]" />
              <span>
                <strong>Registration End:</strong>{" "}
                {formattedRegistrationEndDate || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-[#a7f3d0]" />
              <span>
                <strong>Class Start:</strong> {formattedClassStartDate || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-[#a7f3d0]" />
              <span>
                <strong>Class End:</strong> {formattedClassEndDate || "N/A"}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-4xl font-bold">
              {registrationFee === 0 ? (
                <span className="px-3 py-2 bg-[#10b9815c] text-[#10b981] text-sm font-bold rounded-lg shadow animate-pulse">
                  Free
                </span>
              ) : (
                `৳ ${registrationFee}`
              )}
            </div>
            {/* <button
              onClick={() => handleAddToBook(sessionData)}
              disabled={userData.role !== "student"}
              className={`${
                userData.role === "student"
                  ? "bg-[#10B981] hover:bg-[#059669]"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white px-6 md:px-8 py-3 rounded-full font-semibold transition-colors transform hover:scale-105 flex items-center gap-2`}
            >
              <FaShoppingCart />
              Book Now
            </button> */}
            <button
              onClick={() => handleAddToBook(sessionData)}
              disabled={isBooked || userData.role !== "student"}
              className={`${
                isBooked || userData.role !== "student"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#10B981] hover:bg-[#059669]"
              } text-white px-6 md:px-8 py-3 rounded-full font-semibold transition-colors transform hover:scale-105 flex items-center gap-2`}
            >
              <FaShoppingCart />
              {isBooked ? "Already Booked" : "Book Now"}
            </button>
          </div>
        </div>
      </div>
      {/* Review Section */}
      {/* <Review></Review> */}
      <div>
        <div className="mt-12 bg-white p-6 md:p-8 rounded-lg shadow-md max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Add a Review
          </h2>

          {/* Review Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Review Textarea */}
            <div>
              <textarea
                {...register("review", { required: "Review is required" })}
                className="w-full h-24 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                placeholder="Write your review here..."
              ></textarea>
              {errors.review && (
                <p className="text-red-500 text-sm">{errors.review.message}</p>
              )}
            </div>

            {/* Rating Component */}
            <div>
              <label className="text-gray-600 block mb-2">
                Rate this session:
              </label>
              <Rating
                value={rating}
                onChange={(value) => setValue("rating", value)}
                style={{ maxWidth: 150 }}
              />
              {rating === 0 && (
                <p className="text-red-500 text-sm mt-2">
                  Please provide a rating.
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-6 py-3 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-all"
            >
              Submit Review
            </button>
          </form>

          {/* Review Display */}
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Reviews</h2>
          <div className="space-y-6">
            {/* Single Review */}
            <div className="flex items-start gap-4">
              <img
                src="https://via.placeholder.com/50"
                alt="User"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-bold text-gray-800">John Doe</h3>
                <div className="flex gap-1 text-yellow-400 mb-1">
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                </div>
                <p className="text-gray-600">
                  This session was extremely insightful and engaging. Highly
                  recommended!
                </p>
              </div>
            </div>
            {/* Add more reviews here as needed */}
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
