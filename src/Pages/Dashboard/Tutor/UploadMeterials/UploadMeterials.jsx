import React from "react";
import useSession from "../../../../hook/useSession";
import { FiUpload } from "react-icons/fi"; // React Icon

const UploadMeterials = () => {
  // Using useSession hook to fetch session data
  const [sessions, loading] = useSession();

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  // Filter sessions with status: "approved"
  const approvedSessions = sessions.filter((session) => session.status === "approved");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Upload Materials</h1>
      {approvedSessions.length === 0 ? (
        <p className="text-center text-gray-600">No approved materials available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {approvedSessions.map(
            ({
              _id,
              sessionTitle,
              image,
              tutorName,
            }) => (
              <div
                key={_id}
                className="border shadow-lg rounded-lg overflow-hidden p-4 hover:shadow-xl transition-shadow"
              >
                {/* Card Image */}
                <div className="w-full h-32 bg-gray-200 overflow-hidden rounded-lg mb-4">
                  <img
                    src={image}
                    alt={sessionTitle}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Card Content */}
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {sessionTitle}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  Tutor: {tutorName || "Unknown"}
                </p>

                {/* Upload Button */}
                <button className="flex items-center justify-center w-full border border-black text-black bg-white py-2 rounded-lg hover:bg-gray-100 transition-all">
                  <FiUpload className="mr-2" />
                  Upload
                </button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default UploadMeterials;
