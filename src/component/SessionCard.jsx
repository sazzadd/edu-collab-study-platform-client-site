import { isAfter, isBefore, isWithinInterval, parseISO } from "date-fns";
import { BiCalendar } from "react-icons/bi";
import { Link } from "react-router-dom";

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

  // Convert the registration start and end dates to Date objects
  const startDate = parseISO(registrationStartDate);
  const endDate = parseISO(registrationEndDate);
  const currentDate = new Date();

  // Determine the session status based on current time
  let sessionStatus = "";

  if (isWithinInterval(currentDate, { start: startDate, end: endDate })) {
    sessionStatus = "ongoing";
  } else if (isBefore(currentDate, startDate)) {
    sessionStatus = "upcoming";
  } else if (isAfter(currentDate, endDate)) {
    sessionStatus = "closed";
  }

  // Only show the card if session status is "approved"
  if (status !== "approved") {
    return null;
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
            {sessionTitle}
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
        {sessionStatus === "ongoing" && (
          <span className="relative flex h-3 w-3 text-green-500">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            <span className="ml-2 animate-bounce  font-semibold">Ongoing</span>
          </span>
        )}
        {sessionStatus === "upcoming" && (
          <span className="relative flex h-3 w-3  text-blue-500">
            <span className="animate-ping    absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3  "></span>
            <span className="ml-2  font-semibold ">
              Upcoming{" "}
              
            </span>
          </span>
        )}
        {sessionStatus === "closed" && (
           <span className="ml-2 font-semibold  text-red-500">Closed</span>
        )}

        {/* Read More Button */}
        <Link to={`/SessionDetails/${_id}`}>
          <button className="relative inline-flex items-center justify-start px-6 border border-green-300 py-2 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
            <span className="w-48 h-48 rounded rotate-[-40deg] bg-green-300 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
              View details
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SessionCard;
