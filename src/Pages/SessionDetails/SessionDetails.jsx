"use client";

import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import axios from "axios";
import { format } from "date-fns";
import Lottie from "lottie-react";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaCalendarAlt,
  FaClock,
  FaEnvelope,
  FaShoppingCart,
  FaStar,
  FaUserAlt,
} from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import loadingAnimation from "../../assets/lottie/loading.json";
import useAxiosPublic from "../../hook/useAxiosPublic";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useRole from "../../hook/useRole";
import { AuthContext } from "../../provider/AuthProvider";
const SessionDetails = () => {
  const { id } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [userData, userLoading] = useRole();
  const [isBooked, setIsBooked] = useState(false);

  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState([]);

  // rating value state
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingError, setRatingError] = useState(false);

  //check booked
  useEffect(() => {
    if (user && user?.email) {
      axiosPublic
        .get(`/booked/check?sessionId=${id}&userEmail=${user?.email}`)
        .then((res) => setIsBooked(res.data.isBooked));
    }
  }, [user, id, axiosPublic, isBooked]);

  // Updated formatSessionDuration function
  const formatSessionDuration = (minutes) => {
    const days = Math.floor(minutes / 1440); // 1 day = 1440 minutes
    const hours = Math.floor((minutes % 1440) / 60);
    const remainingMinutes = minutes % 60;

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
    // Scroll to the top when the component is loaded
    window.scrollTo(1, 0);
  }, []);

  // avg rating
  useEffect(() => {
    const fetchAvgRating = async () => {
      try {
        const response = await axiosPublic.get(`/get-average-review/${id}`);
        setAvgRating(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching material:", error);
        setLoading(false);
      }
    };

    fetchAvgRating();
  }, [id, axiosPublic, reviews]);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const response = await axios.get(
          `https://study-platform-server-eta.vercel.app/session/${id}`
        );
        setSessionData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching session details:", error);
        setLoading(false);
      }
    };

    fetchSessionDetails();
  }, [id, isBooked]);

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
    _id,
  } = sessionData || {};

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

      axiosPublic.post("/booked", sessionItem).then((res) => {
        if (res.data.success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Session has been booked successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/viewBookedSession");
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
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Validate rating
    if (ratingValue === 0) {
      setRatingError(true);
      return;
    }

    setRatingError(false);

    const userData = {
      ...data,
      rating: ratingValue,
      userEmail: user?.email,
      userName: user?.displayName,
      userImage: user?.photoURL,
      sessionId: _id,
    };

    axios
      .post("https://study-platform-server-eta.vercel.app/review", userData)
      .then((response) => {
        fetchReviewsForSession();
        // Reset form and rating
        reset();
        setRatingValue(0);

        // Success Alert
        Swal.fire({
          icon: "success",
          title: "Review Submitted!",
          text: "Your review has been added successfully.",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          // Already Reviewed Alert
          Swal.fire({
            icon: "info",
            title: "Already Reviewed",
            text: error.response.data.message,
            confirmButtonText: "Okay",
          });
        } else {
          // Error Alert
          Swal.fire({
            icon: "error",
            title: "Submission Failed",
            text: "There was an error submitting your review. Please try again.",
            confirmButtonText: "Retry",
          });
        }
      });
  };

  const fetchReviewsForSession = async () => {
    try {
      const response = await axios.get(
        `https://study-platform-server-eta.vercel.app/reviews?sessionId=${id}`
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews for session:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchReviewsForSession();
    }
  }, [id]);

  const closePopup = () => {
    setShowPopup(false);
  };

  const redirectToLogin = () => {
    closePopup();
    navigate("/auth/login", { state: { from: location.pathname } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className=" w-4/12 lg:w-40 mx-auto flex justify-center items-center h-screen">
          <Lottie animationData={loadingAnimation} />
        </div>
      </div>
    );
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {sessionTitle || "Session Title"}
          </h1>

          {/* Average Rating Section */}
          <div className="flex items-center mb-6">
            <div className="flex items-center">
              <div className="w-[120px]">
                <Rating
                  value={avgRating?.averageRating || 0}
                  readOnly
                  style={{ maxWidth: 120 }}
                />
              </div>
              <span className="text-gray-700 text-sm font-medium ml-2">
                {avgRating?.averageRating
                  ? `${avgRating.averageRating.toFixed(1)} / 5 `
                  : "No rating yet"}
                <span className="text-gray-500 ml-1">
                  ({reviews.length}{" "}
                  {reviews.length === 1 ? "review" : "reviews"})
                </span>
              </span>
            </div>
          </div>

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
            <button
              onClick={() => handleAddToBook(sessionData)}
              disabled={
                isBooked ||
                userData.role === "admin" ||
                userData.role === "tutor"
              }
              className={`bg-[#10B981] disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-[#059669] text-white px-6 md:px-8 py-3 rounded-full font-semibold transition-colors transform hover:scale-105 flex items-center gap-2`}
            >
              <FaShoppingCart />
              {isBooked ? "Already Booked" : "Book Now"}
            </button>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div>
        <div className="mt-12 bg-white p-6 md:p-8 rounded-lg shadow-md max-w-3xl mx-auto">
          {/* Review Form */}
          {isBooked && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Add a Review
              </h2>
              <div>
                <textarea
                  {...register("review", { required: "Review is required" })}
                  className={`w-full h-24 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10B981] ${
                    errors.review ? "border-red-500" : ""
                  }`}
                  placeholder="Write your review here..."
                ></textarea>
                {errors.review && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.review.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-gray-600 block mb-2">
                  Rate this session: <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-1">
                  <div className="w-[180px]">
                    <Rating
                      value={ratingValue}
                      onChange={(value) => {
                        setRatingValue(value);
                        setRatingError(false);
                      }}
                      style={{ maxWidth: 180 }}
                    />
                  </div>
                  <span className="ml-2 text-gray-600">
                    {ratingValue > 0 ? `${ratingValue.toFixed(1)}/5` : ""}
                  </span>
                </div>
                {ratingError && (
                  <p className="text-red-500 text-sm mt-1">
                    Please provide a rating before submitting
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-all"
              >
                Submit Review
              </button>
            </form>
          )}

          {/* Review Display */}
          <div className="py-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Reviews {reviews.length > 0 && `(${reviews.length})`}
            </h2>

            {reviews.length > 0 ? (
              <div className="space-y-8">
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <img
                      src={review.userImage || "/placeholder.svg"}
                      alt={review.userName}
                      className="w-12 h-12 rounded-full object-cover border border-gray-200"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h3 className="font-bold text-gray-800">
                          {review.userName}
                        </h3>
                        <div className="flex items-center mt-1 sm:mt-0">
                          <div className="flex text-yellow-400">
                            <Rating
                              style={{ maxWidth: 100 }}
                              value={review.rating}
                              readOnly
                            />
                          </div>
                          <span className="ml-2 text-sm text-gray-600">
                            {review.rating ? review.rating.toFixed(1) : "N/A"}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 mt-2">{review.review}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <FaStar className="mx-auto text-gray-300 text-4xl mb-3" />
                <p className="text-gray-500">
                  No reviews available for this session.
                </p>
                {isBooked && (
                  <p className="text-gray-400 mt-2">
                    Be the first to share your experience!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 animate-fadeIn">
            <h3 className="text-xl font-semibold mb-4">Are you sure?</h3>
            <p className="mb-6">You need to login to confirm your booking!</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closePopup}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={redirectToLogin}
                className="bg-[#10B981] text-white px-4 py-2 rounded hover:bg-[#059669] transition-colors"
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
