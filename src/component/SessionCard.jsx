import { Rating } from "@smastrom/react-rating";
import {
  format,
  isAfter,
  isBefore,
  isWithinInterval,
  parseISO,
} from "date-fns";
import { useEffect, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hook/useAxiosPublic";

const SessionCard = ({ item }) => {
  const {
    _id,
    sessionTitle,
    sessionDescription,
    tutorName,
    registrationStartDate,
    registrationEndDate,
    status,
    image,
    registrationFee,
  } = item;
  const [avgRating, setAvgRating] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  // avg rating
  useEffect(() => {
    const fetchAvgRating = async () => {
      try {
        const response = await axiosPublic.get(`/get-average-review/${_id}`);
        setAvgRating(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching material:", error);
        setLoading(false);
      }
    };

    fetchAvgRating();
  }, [_id, axiosPublic]);
  const startDate = parseISO(registrationStartDate);
  const endDate = parseISO(registrationEndDate);
  const currentDate = new Date();

  // Format the start and end date to dd-MM-yyyy
  const formattedStartDate = format(startDate, "dd-MM-yyyy");
  const formattedEndDate = format(endDate, "dd-MM-yyyy");

  let sessionStatus = "";
  if (isWithinInterval(currentDate, { start: startDate, end: endDate })) {
    sessionStatus = "ongoing";
  } else if (isBefore(currentDate, startDate)) {
    sessionStatus = "upcoming";
  } else if (isAfter(currentDate, endDate)) {
    sessionStatus = "closed";
  }

  if (status !== "approved") {
    return null;
  }

  return (
    <div className="max-w-md bg-[#f3faf9] rounded-xl shadow-lg overflow-hidden">
      {/* Image Header */}
      <div className="w-full">
        <img
          src={image}
          alt="Session Illustration"
          className="h-56 w-full object-cover rounded-t-xl"
        />
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-4">
        {/* Average Rating Section */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="flex items-center text-yellow-400">
            {/* Fake star icons for average rating */}
            <span className="text-yellow-500 w-[110px]">
              <Rating
                value={avgRating?.averageRating || 0}
                // onChange={setRatingValue} //
                size={12} //
                color="#f8e71c"
                readOnly
              />
            </span>
          </div>
          <span className="text-gray-500">
            {" "}
            <span className="text-gray-700 text-sm font-medium ml-2">
              {avgRating?.averageRating
                ? `${avgRating.averageRating.toFixed(1)} / 5 `
                : "No rating yet"}
            </span>
          </span>
        </div>

        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">
            {sessionTitle}
          </h2>

          {registrationFee === 0 ? (
            <span className="px-3 py-1 bg-[#10b9815c] text-[#10b981] text-sm font-bold rounded-lg shadow animate-pulse">
              Free
            </span>
          ) : (
            <span className="text-lg flex font-bold text-[#10b981]">
              <span>৳ </span> {registrationFee}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-600">
          {sessionDescription.length > 100
            ? `${sessionDescription.slice(0, 100)}...`
            : sessionDescription}
        </p>

        <div className="space-y-3">
          {/* Registration Dates */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <BiCalendar className="h-4 w-4 text-[#10b9815c]" />
            <span>Registration Start: {formattedStartDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <BiCalendar className="h-4 w-4 text-[#10b981]" />
            <span>Registration End: {formattedEndDate}</span>
          </div>

          {/* Tutor Information */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-semibold">Tutor:</span>
            <span>{tutorName}</span>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#f0fdf4] p-4 rounded-b-xl">
        {/* Status */}
        <div className="flex items-center sm:justify-start justify-between sm:mb-0 mb-2">
          {sessionStatus === "ongoing" && (
            <span className="relative flex h-3 w-3 text-green-500 text-[10px] sm:text-base">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              <span className="ml-2 animate-bounce font-semibold">Ongoing</span>
            </span>
          )}
          {sessionStatus === "upcoming" && (
            <span className="relative flex h-3 w-3 text-blue-500 text-[10px] sm:text-base">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              <span className="ml-2 font-semibold">Upcoming...</span>
            </span>
          )}
          {sessionStatus === "closed" && (
            <span className="ml-2 font-semibold bg-red-100 px-2 py-1 sm:py-2 rounded text-red-500 text-[10px] sm:text-base">
              Closed
            </span>
          )}
        </div>

        {/* View details Button */}
        {sessionStatus === "ongoing" && (
          <Link to={`/SessionDetails/${_id}`}>
            <button className="text-[#10b981] hover:text-[#3e4543] border border-[#10b981] hover:bg-[#10b9815c] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto">
              View details
            </button>
          </Link>
        )}
        {sessionStatus === "upcoming" && (
          <button
            disabled
            className="px-6 py-2 border border-gray-300 text-gray-400 bg-gray-100 rounded cursor-not-allowed w-full sm:w-auto"
          >
            View details
          </button>
        )}
      </div>
    </div>
  );
};

export default SessionCard;
