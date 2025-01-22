import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../provider/AuthProvider";

const UploadMeterials = () => {
  const { user } = useContext(AuthContext);
  const tutorEmail = user?.email;
  const [sessions, setSessions] = useState([]);

  console.log(sessions);
  useEffect(() => {
    if (tutorEmail) {
      axios
        .get(`http://localhost:5000/session?email=${tutorEmail}`)
        .then((res) => {
          setSessions(res.data || []);
          // console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching sessions:", error);
        });
    }
  }, [tutorEmail]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sessions.map((session) => (
        <div
          key={session._id}
          className="border rounded-lg p-4 shadow-md bg-white"
        >
          <h3 className="text-lg font-bold">{session.sessionTitle}</h3>
        </div>
      ))}
    </div>
  );
};

export default UploadMeterials;
