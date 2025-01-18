import {
  Card,
  CardBody,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaClock, FaDollarSign, FaReact, FaUser } from "react-icons/fa";
import { AuthContext } from "../../../../provider/AuthProvider";

const AllSession = () => {
  const { user } = useContext(AuthContext);
  const tutorEmail = user.email; // Optional filtering by tutor email
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const url = tutorEmail
          ? `http://localhost:5000/session?tutorEmail=${tutorEmail}`
          : "http://localhost:5000/session";

        const { data } = await axios.get(url);
        setSessions(data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [tutorEmail]);

  if (loading) {
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  }

  // Calculate counts for each status
  const statusCounts = {
    pending: sessions.filter((session) => session.status === "pending").length,
    approved: sessions.filter((session) => session.status === "approved")
      .length,
    rejected: sessions.filter((session) => session.status === "rejected")
      .length,
  };

  const tabsData = [
    { label: `Pending (${statusCounts.pending})`, value: "pending" },
    { label: `Approved (${statusCounts.approved})`, value: "approved" },
    { label: `Rejected (${statusCounts.rejected})`, value: "rejected" },
  ];

  const handleStatusChange = (sessionId) => {
    // Make an API request to change the status to 'approved'
    axios
      .put(`http://localhost:5000/session/${sessionId}`, { status: "approved" })
      .then((response) => {
        // Update the sessions state with the new status
        setSessions((prevSessions) =>
          prevSessions.map((session) =>
            session._id === sessionId
              ? { ...session, status: "approved" }
              : session
          )
        );
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">
        {tutorEmail ? "My Sessions" : "All Sessions"}
      </h2>

      {/* Tabs for filtering by status */}
      <Tabs value="pending" className="max-w-full mx-auto mb-8">
        <TabsHeader className="max-w-2xl mx-auto">
          {tabsData.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody className="overflow-x-auto">
          {tabsData.map(({ value }) => (
            <TabPanel key={value} value={value}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {sessions
                  .filter((session) => session.status === value)
                  .map((session) => (
                    <Card
                      key={session._id}
                      className="shadow-lg border rounded-lg min-w-0"
                    >
                      <img
                        src={session.image}
                        alt={session.sessionTitle}
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                      <CardBody className="p-4">
                        <h3 className="text-lg font-semibold mb-2">
                          {session.sessionTitle}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {session.sessionDescription}
                        </p>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <FaClock /> {session.sessionDuration} hours
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <FaDollarSign /> ${session.registrationFee}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <FaUser /> {session.tutorName}
                        </div>
                      </CardBody>
                      <div className="p-4">
                        <strong>Status:</strong>{" "}
                        <span
                          className={`text-center ${getStatusColor(
                            session.status
                          )} p-1 rounded-lg`}
                        >
                          {session.status}
                        </span>
                        {session.status === "rejected" && (
                          <button
                            onClick={() => handleStatusChange(session._id)}
                            className="mt-4 flex items-center justify-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg transition duration-300"
                          >
                            <FaReact className="mr-2" /> Reactivate
                          </button>
                        )}
                      </div>
                    </Card>
                  ))}
              </div>
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "border-2 border-rounded border-yellow-100 text-yellow-700";
    case "approved":
      return "bg-green-100 text-green-600";
    case "rejected":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default AllSession;
