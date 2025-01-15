
import { BiCalendar } from "react-icons/bi";
import { Link } from "react-router-dom";

const SessionCard = ({ item }) => {
  // Destructure the session data
  const {
    _id,
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
  } = item;

  return (
    <div className="max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
      {/* Image Header */}
      <div className="w-full">
        <img
          src="https://i.ibb.co/XZ1DTVB/1702962448246.jpg"
          alt="Atomic structure illustration"
          className="h-48 w-full object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            {sessionTitle}
          </h2>
          <span className="text-lg font-bold text-[#10b981]">$5000</span>
        </div>

        <p className="text-sm text-gray-600">T{sessionDescription}</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <BiCalendar className="h-4 w-4" />
            <span>Registration Start Date: 2024-06-09</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <BiCalendar className="h-4 w-4" />
            <span>Registration End Date: 2024-06-30</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Ariful Islam</span>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between bg-[#a7f3d075] p-4">
        <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700">
          Closed
        </span>
        <Link to={`/SessionDetails/${_id}`}>
        <button className="rounded-md bg-[#10b981] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0ea371] focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:ring-offset-2">
          Read More
        </button>
        </Link>
        
      </div>
    </div>
  );
};

export default SessionCard;
