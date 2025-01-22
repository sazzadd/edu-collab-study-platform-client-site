import {
  Button,
  Card,
  CardBody,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Tooltip,
} from "@material-tailwind/react";

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaInfo, FaReact, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../../hook/useAxiosSecure";
import { AuthContext } from "../../../../provider/AuthProvider";
const AllSession = () => {
  const { user } = useContext(AuthContext);
  const tutorEmail = user.email; // Optional filtering by tutor email
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [feedback, setFeedback] = useState("");
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const url = `/session?tutorEmail=${tutorEmail}`;

        const { data } = await axiosSecure.get(url);
        if (Array.isArray(data)) {
          setSessions(data);
        } else {
          console.error("Unexpected data format:", data);
          toast.error("Invalid data format received.");
        }
      } catch (error) {
        console.error("Error fetching sessions:", error);
        toast.error("Failed to fetch sessions.");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [tutorEmail]);

  const handleStatusChange = async (sessionId, status) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/session/${sessionId}`,
        { status }
      );

      if (response.data.modifiedCount > 0) {
        setSessions((prevSessions) =>
          prevSessions.map((session) =>
            session._id === sessionId ? { ...session, status } : session
          )
        );
        toast.success("Session status updated successfully!");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update session status.");
    }
  };
  const handleDialogOpen = (feedbackText) => {
    setFeedback(feedbackText);
    setOpenDialog(!openDialog);
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">
        {tutorEmail ? "My Sessions" : "All Sessions"}
      </h2>

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
                        <div>
                          {/* {session.status === "rejected" &&
                            session.adminFeedback && (
                              <p className="text-sm text-red-600 mt-4">
                                Admin Feedback: {session.adminFeedback}
                              </p>
                            )} */}
                          <div>
                            {session.status === "rejected" &&
                              session.adminFeedback && (
                                <>
                                  <Tooltip
                                    content={session.adminFeedback}
                                    placement="top"
                                  >
                                    <p
                                      className="text-sm text-red-500 mt-4 cursor-pointer"
                                      onClick={() =>
                                        handleDialogOpen(session.adminFeedback)
                                      }
                                    >
                                      <Button className="bg-indigo-100 text-black hover:bg-indigo-200 transition duration-300 flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
                                        See Admin Feedback
                                        <FaInfo className="text-lg" />
                                      </Button>{" "}
                                    </p>
                                  </Tooltip>

                                  <Dialog
                                    open={openDialog}
                                    handler={handleDialogOpen}
                                    className="max-w-xs mx-auto p-3 bg-white rounded-lg shadow-md"
                                  >
                                    <DialogHeader className="text-base font-medium text-gray-800 border-b pb-2">
                                      Admin Feedback
                                    </DialogHeader>
                                    <DialogBody className="py-2 text-sm text-gray-700">
                                      <p>{feedback}</p>
                                    </DialogBody>
                                    <DialogFooter className="flex justify-end pt-2 border-t">
                                      <Button
                                        onClick={() => setOpenDialog(false)}
                                        className="px-3 py-1 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-all duration-300 text-xs flex items-center gap-2"
                                      >
                                        Close
                                      </Button>
                                    </DialogFooter>
                                  </Dialog>
                                </>
                              )}
                          </div>
                        </div>
                        {session.status === "rejected" && (
                          <button
                            onClick={() =>
                              handleStatusChange(session._id, "pending")
                            }
                            className="mt-4 flex items-center justify-center px-4 py-1 text-white bg-indigo-400 hover:bg-indigo-600 rounded shadow-lg transition duration-300"
                          >
                            <FaReact className="mr-2" /> Re Request
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

export default AllSession;
