import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEye,
} from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hook/useAxiosSecure";
const ManageAllSession = () => {
  const [sessions, setSessions] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [showApproveModal, setShowApproveModal] = useState(false); // State to control approve modal visibility
  const [showRejectModal, setShowRejectModal] = useState(false); // State to control reject modal visibility
  const [selectedSession, setSelectedSession] = useState(null); // Selected session for update
  const [registrationFee, setRegistrationFee] = useState(""); // State to hold the updated registrationFee
  const [feedback, setFeedback] = useState(""); // State to hold the feedback for rejection
  const axiosSecure = useAxiosSecure();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editSession, setEditSession] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axiosSecure.get("/session");
        setSessions(response.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, [axiosSecure]);

  const pendingSessions = sessions.filter(
    (session) => session.status === "pending"
  );
  const approvedSessions = sessions.filter(
    (session) => session.status === "approved"
  );

  const tabsData = [
    { label: `Pending (${pendingSessions.length})`, value: "pending" },
    { label: `Approved (${approvedSessions.length})`, value: "approved" },
  ];

  const handleApproveClick = (session) => {
    setSelectedSession(session);
    setRegistrationFee(session.registrationFee);
    setShowApproveModal(true);
  };
// 3
  const handleRejectClick = (session) => {
    setSelectedSession(session);
    setShowRejectModal(true); // Open the reject modal
  };
  const handleApproveSession = async () => {
    // Validate registrationFee input
    if (registrationFee === "" || isNaN(parseFloat(registrationFee))) {
      toast.error("Please enter a valid registration fee.");
      return;
    }
  
    try {
      // Update session in the database
      const response = await axiosSecure.patch(
        `/session/${selectedSession._id}`,
        {
          registrationFee: parseFloat(registrationFee), // Convert to a number
          status: "approved",
        }
      );
  
      // Check if the database update was successful
      if (response.data.modifiedCount > 0) {
        // Update state with the approved session
        setSessions((prevSessions) =>
          prevSessions.map((session) =>
            session._id === selectedSession._id
              ? { ...session, registrationFee: parseFloat(registrationFee), status: "approved" }
              : session
          )
        );
  
        setShowApproveModal(false); // Close the modal
        toast.success("Session approved successfully!");
      }
    } catch (error) {
      console.error("Error approving session:", error);
      toast.error("Failed to approve the session. Please try again.");
    }
  };
  



  //   // Check if registrationFee is valid for paid type
  //   if (
  //     registrationFee === "" ||
  //     (registrationFee !== "0" && isNaN(parseFloat(registrationFee)))
  //   ) {
  //     toast.error("Please enter a valid registration fee.");
  //     return;
  //   }

  //   try {
  //     const response = await axiosSecure.patch(
  //       `/session/${selectedSession._id}`,
  //       {
  //         // Ensure it's a number
  //         status: "approved",
  //       }
  //     );

  //     if (response.data.modifiedCount > 0) {
  //       setSessions((prevSessions) =>
  //         prevSessions.map((session) =>
  //           session._id === selectedSession._id
  //             ? { ...session, registrationFee, status: "approved" }
  //             : session
  //         )
  //       );
  //       setShowApproveModal(false);
  //       toast.success("Session approved successfully!");
  //     }
  //   } catch (error) {
  //     console.error("Error approving session:", error);
  //     toast.error("Failed to approve the session. Please try again.");
  //   }
  // };

  const handleRejectSession = async () => {
    if (!feedback) {
      alert("Feedback is required for rejection!");
      return;
    }

    try {
      await axiosSecure.patch(`/session/${selectedSession._id}`, {
        adminFeedback: feedback,
        status: "rejected",
      });
      setShowRejectModal(false);
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session._id === selectedSession._id
            ? { ...session, adminFeedback: feedback, status: "rejected" }
            : session
        )
      );
      toast.warning("session is rejected");
    } catch (error) {
      console.error("Error rejecting session:", error);
    }
  };

  //   delete approved seesion
  const handleDeleteSession = (sessionId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSession(sessionId);
      }
    });
  };

  const deleteSession = async (sessionId) => {
    try {
      await axiosSecure.delete(`/session/${sessionId}`);
      setSessions((prevSessions) =>
        prevSessions.filter((session) => session._id !== sessionId)
      );
      Swal.fire("Deleted!", "Your session has been deleted.", "success");
    } catch (error) {
      Swal.fire("Error!", "There was an issue deleting the session.", "error");
    }
  };
  const handleEditClick = (session) => {
    setEditSession({
      title: session.sessionTitle,
      description: session.description,
    });
    setShowEditModal(true);
  };
  const handleUpdateSession = async () => {
    try {
      const response = await axiosSecure.patch(
        `/session/${selectedSession._id}`,
        {
          sessionTitle: editSession.title,
          description: editSession.description,
        }
      );

      if (response.data.modifiedCount > 0) {
        setSessions((prevSessions) =>
          prevSessions.map((session) =>
            session._id === selectedSession._id
              ? {
                  ...session,
                  sessionTitle: editSession.title,
                  description: editSession.description,
                }
              : session
          )
        );
        toast.success("Session updated successfully!");
        setShowEditModal(false);
      }
    } catch (error) {
      console.error("Error updating session:", error);
      toast.error("Failed to update the session. Please try again.");
    }
  };

  return (
    <div className="px-6 py-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-center mb-4">
        Manage All Sessions
      </h1>

      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        className="max-w-full mx-auto mb-8"
      >
        <TabsHeader>
          {tabsData.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          <TabPanel value="pending">
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full table-auto border-collapse text-left">
                <thead className="bg-gray-100 text-sm text-gray-600">
                  <tr>
                    <th className="px-6 py-3 border-b">Index</th>
                    <th className="px-6 py-3 border-b">Title</th>
                    <th className="px-6 py-3 border-b">Status</th>
                    <th className="px-6 py-3 border-b">View Details</th>
                    <th className="px-6 py-3 border-b">Approve/Reject</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {pendingSessions.map((session, index) => (
                    <tr key={session._id} className="hover:bg-gray-100">
                      <td className="px-6 py-3 border-b">{index + 1}</td>
                      <td className="px-6 py-3 border-b">
                        {session.sessionTitle}
                      </td>
                      <td className="px-6 py-3 border-b text-gray-500">
                        {session.status}
                      </td>
                      <td className="px-6 py-3 border-b">
                        <button className="px-3 py-1.5 text-blue-600 hover:bg-blue-200 rounded-md flex items-center gap-2">
                          <AiOutlineEye />
                        </button>
                      </td>
                      <td className="px-6 py-3 border-b">
                        <div className="flex items-center gap-3">
                          {session.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleApproveClick(session)}
                                className="px-3 py-1 text-blue-500 border border-blue-500 hover:bg-blue-100 rounded-md flex items-center gap-2"
                              >
                                <AiOutlineCheck /> Approve
                              </button>
                              <button
                                onClick={() => handleRejectClick(session)} // Reject button click
                                className="px-3 py-1 text-red-500 border border-red-500 hover:bg-red-100 rounded-md flex items-center gap-2"
                              >
                                <AiOutlineClose /> Reject
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>

          <TabPanel value="approved">
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full table-auto border-collapse text-left">
                <thead className="bg-gray-100 text-sm text-gray-600">
                  <tr>
                    <th className="px-6 py-3 border-b">Index</th>
                    <th className="px-6 py-3 border-b">Title</th>
                    <th className="px-6 py-3 border-b">Status</th>
                    <th className="px-6 py-3 border-b">View Details</th>
                    <th className="px-6 py-3 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {approvedSessions.map((session, index) => (
                    <tr key={session._id} className="hover:bg-gray-100">
                      <td className="px-6 py-3 border-b">{index + 1}</td>
                      <td className="px-6 py-3 border-b">
                        {session.sessionTitle}
                      </td>
                      <td className="px-6 py-3 border-b text-gray-500">
                        {session.status}
                      </td>
                      <td className="px-6 py-3 border-b">
                        <button className="px-3 py-1.5 text-blue-600 hover:bg-blue-200 rounded-md flex items-center gap-2">
                          <AiOutlineEye />
                        </button>
                      </td>
                      <td className="px-6 py-3 border-b">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleEditClick(session)}
                            className="text-yellow-500 hover:bg-yellow-200 rounded-md p-3"
                          >
                            <AiOutlineEdit className="text-xl" />
                          </button>
                          <button
                            onClick={() => handleDeleteSession(session._id)}
                            className="text-red-500 hover:bg-red-200 rounded-md p-3"
                          >
                            <AiOutlineDelete className="text-xl" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>
        </TabsBody>
      </Tabs>

      {/* Modal for rejecting session */}
      <Dialog open={showRejectModal} handler={setShowRejectModal}>
        <DialogHeader>Reject Session</DialogHeader>
        <DialogBody>
          <p className="mb-4">
            Please provide feedback for rejecting the session:
          </p>
          <Input
            label="Feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </DialogBody>
        <DialogFooter>
          <Button
            color="red"
            onClick={() => setShowRejectModal(false)}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#6366F1", color: "#fff" }}
            onClick={handleRejectSession}
          >
            Confirm Reject
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Modal for updating registrationFee */}
      {/* {showApproveModal && (
        <Dialog
          open={showApproveModal}
          handler={() => setShowApproveModal(false)}
          size="sm"
        >
          <DialogHeader>Update Registration Fee</DialogHeader>
          <DialogBody>
            <div className="flex flex-col gap-4">
              <Input
                label="Registration Fee"
                type="number"
                value={registrationFee}
                onChange={(e) => setRegistrationFee(e.target.value)}
              />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              onClick={handleApproveSession}
              color="indigo"
              className="mr-2"
            >
              Approve
            </Button>
            <Button onClick={() => setShowApproveModal(false)} color="red">
              Cancel
            </Button>
          </DialogFooter>
        </Dialog>
      )} */}
      {showApproveModal && (
        <Dialog
          open={showApproveModal}
          handler={() => setShowApproveModal(false)}
          size="sm"
        >
          <DialogHeader>Approve Session and Add Fee</DialogHeader>
          <DialogBody>
            <div className="flex flex-col gap-4">
              <div>
                <p className="mb-2 font-medium">Select Registration Type:</p>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="registrationType"
                      value="free"
                      checked={registrationFee === "0"}
                      onChange={() => setRegistrationFee("0")}
                    />
                    Free
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="registrationType"
                      value="paid"
                      checked={registrationFee !== "0"}
                      onChange={() => setRegistrationFee("")}
                    />
                    Paid
                  </label>
                </div>
              </div>
              {registrationFee !== "0" && (
                <Input
                  label="Registration Fee"
                  type="number"
                  onChange={(e) => {
                    const value = e.target.value;
                    // Ensure the fee is not zero
                    if (value > 0 || value === "") {
                      setRegistrationFee(value);
                    }
                  }}
                />
              )}
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              onClick={handleApproveSession}
              color="indigo"
              className="mr-2"
            >
              Approve
            </Button>
            <Button onClick={() => setShowApproveModal(false)} color="red">
              Cancel
            </Button>
          </DialogFooter>
        </Dialog>
      )}

      {/* modal for upadte title and des*/}
      {showEditModal && (
        <Dialog
          open={showEditModal}
          handler={() => setShowEditModal(false)}
          size="sm"
        >
          <DialogHeader>Edit Session</DialogHeader>
          <DialogBody>
            <div className="flex flex-col gap-4">
              <Input
                label="Title"
                value={editSession.title}
                onChange={(e) =>
                  setEditSession({ ...editSession, title: e.target.value })
                }
              />
              <Input
                label="Description"
                value={editSession.description}
                onChange={(e) =>
                  setEditSession({
                    ...editSession,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              color="indigo"
              onClick={handleUpdateSession}
              className="mr-2"
            >
              Update
            </Button>
            <Button onClick={() => setShowEditModal(false)} color="red">
              Cancel
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  );
};

export default ManageAllSession;
