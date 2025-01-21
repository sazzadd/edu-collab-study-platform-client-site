import { useContext } from "react";
import { BiCalendar } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

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

  // Only show the card if the session status is "approved"
  if (status !== "approved") {
    return null; // Don't render anything if status is not approved
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
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
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">
            {sessionTitle} khaice amare
          </h2>

          {registrationFee === 0 ? (
            <span className="px-3 py-1 bg-green-100 text-green-600 text-sm font-bold rounded-lg shadow animate-pulseColor">
              Free
            </span>
          ) : (
            <span className="text-lg font-bold text-[#10b981]">
              ${registrationFee}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-600">{sessionDescription}</p>

        <div className="space-y-3">
          {/* Registration Dates */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <BiCalendar className="h-4 w-4 text-[#10b9815c]" />
            <span>Registration Start: {registrationStartDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <BiCalendar className="h-4 w-4 text-[#10b981]" />
            <span>Registration End: {registrationEndDate}</span>
          </div>

          {/* Tutor Information */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-semibold">Tutor:</span>
            <span>{tutorName}</span>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between bg-[#f3faf9] p-4 rounded-b-xl">
        {/* Status */}

        {/* Read More Button */}
        <Link to={`/SessionDetails/${_id}`}>
          <button className="rounded-md bg-[#10b981] text-white px-6 py-2 text-sm font-semibold hover:bg-[#0ea371] transition-all duration-300">
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SessionCard;
