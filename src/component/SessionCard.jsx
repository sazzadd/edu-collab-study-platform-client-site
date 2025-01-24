import { isAfter, isBefore, isWithinInterval, parseISO, format } from "date-fns";
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

  const startDate = parseISO(registrationStartDate);
  const endDate = parseISO(registrationEndDate);
  const currentDate = new Date();

  // Format the start and end date to dd-MM-yyyy
  const formattedStartDate = format(startDate, 'dd-MM-yyyy');
  const formattedEndDate = format(endDate, 'dd-MM-yyyy');

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
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">
            {sessionTitle}
          </h2>

          {registrationFee === 0 ? (
            <span className="px-3 py-1 bg-[#10b9815c] text-[#10b981] text-sm font-bold rounded-lg shadow animate-pulse">
              Free
            </span>
          ) : (
            <span className="text-lg font-bold text-[#10b981]">
              ${registrationFee}
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
      <div className="flex items-center justify-between bg-[#f0fdf4] p-4 rounded-b-xl">
        {/* Status */}
        {sessionStatus === "ongoing" && (
          <span className="relative flex h-3 w-3 text-green-500">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            <span className="ml-2 animate-bounce font-semibold">Ongoing</span>
          </span>
        )}
        {sessionStatus === "upcoming" && (
          <span className="relative flex h-3 w-3 text-blue-500">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            <span className="ml-2 font-semibold">Upcoming...</span>
          </span>
        )}
        {sessionStatus === "closed" && (
          <span className="ml-2 font-semibold bg-red-100 px-2 py-2 rounded text-red-500">
            Closed
          </span>
        )}

        {/* View details Button */}
        {sessionStatus === "ongoing" && (
          <Link to={`/SessionDetails/${_id}`}>
            <button className="relative inline-flex items-center justify-start px-6 border border-[#10b9815c] py-2 overflow-hidden font-medium transition-all bg-white rounded hover:bg-[#10b981] group">
              <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#10b9815c] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                View details
              </span>
            </button>
          </Link>
        )}
        {sessionStatus === "upcoming" && (
          <button
            disabled
            className="px-6 py-2 border border-gray-300 text-gray-400 bg-gray-100 rounded cursor-not-allowed"
          >
            View details
          </button>
        )}
      </div>
    </div>
  );
};

export default SessionCard;
