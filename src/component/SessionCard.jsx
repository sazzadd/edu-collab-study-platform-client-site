import { BiCalendar } from "react-icons/bi";
import { Link } from "react-router-dom";

const SessionCard = ({ item }) => {
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
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Image Header */}
      <div className="w-full">
        <img
          src="https://i.ibb.co/XZ1DTVB/1702962448246.jpg"
          alt="Session Illustration"
          className="h-56 w-full object-cover rounded-t-xl"
        />
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">{sessionTitle}</h2>
          <span className="text-lg font-bold text-[#10b981]">${5000}</span>
        </div>

        <p className="text-sm text-gray-600">{sessionDescription}</p>

        <div className="space-y-3">
          {/* Registration Date */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <BiCalendar className="h-4 w-4 text-[#10b981]" />
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
        <span className={`px-3 py-1 text-sm font-medium rounded-full ${status === 'Closed' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
          {status}
        </span>
        
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
