import { Card, CardBody } from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import { AuthContext } from "../../../provider/AuthProvider";
import Loading from "../../../component/Loading";

const ViewBookedSession = () => {
  const [bookedData, setBookedData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const email = user.email;
  
  useEffect(() => {
    const fetchBookedData = async () => {
      try {
        const response = await axiosPublic.get(`/booked?email=${email}`);
        setBookedData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching booked details:", error);
        setLoading(false);
      }
    };

    fetchBookedData();
  }, [email]);

  if (loading) {
    return (
      <Loading></Loading>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">View Booked Sessions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bookedData.map((session, index) => (
          <Card
            key={index}
            className="max-w-xs bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={session.image || "https://via.placeholder.com/150"}
              alt="Session Image"
              className="w-full h-32 object-contain rounded-t-lg"
            />
            <CardBody className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 truncate">
                {session.sessionTitle}
              </h2>
              <p className="text-gray-500 text-sm">
                Tutor: {session.tutorName}
              </p>
              {session.registrationFee === 0 ? (
                <p className="text-indigo-400 text-sm mt-2">
                  make sure to check all the materials provided by the tutor
                </p>
              ) : (
                <p className="text-red-500 text-sm mt-2">
                  Registration fee is due. Please make the payment.
                </p>
              )}
              <div className="flex justify-between mt-4">
                <Link to={`/SessionDetails/${session.sessionId}`}>
                  <button className="text-sm text-black border border-black bg-gray-100 hover:text-white hover:bg-gray-600 hover:scale-105 transform transition-all duration-300 px-3 py-1 rounded">
                    View Details
                  </button>
                </Link>

                {session.registrationFee > 0 && (
                  <button className="text-sm text-white bg-indigo-600 hover:bg-indigo-700 hover:scale-105 transform transition-all duration-300 px-3 py-1 rounded">
                    Pay Now
                  </button>
                )}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ViewBookedSession;
