import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hook/useAxiosPublic";

const MeetOurTutor = () => {
  const [tutors, setTutors] = useState([]);
  const [approvedTutors, setApprovedTutors] = useState([]);
  const [sessions, setSessions] = useState({});
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get("/tutor")
      .then((res) => {
        setTutors(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Facing an error ", error);
        setLoading(false);
      });
  }, [axiosPublic]);

  useEffect(() => {
    if (tutors.length > 0) {
      const fetchSessions = async () => {
        const sessionData = {};
        const approvedTutorEmails = new Set();

        for (const tutor of tutors) {
          try {
            const res = await axiosPublic.get(`/session?tutorEmail=${tutor.email}`);
            const approvedSessions = res.data.filter(session => session.status === "approved");

            if (approvedSessions.length > 0) {
              sessionData[tutor.email] = approvedSessions;
              approvedTutorEmails.add(tutor.email);
            }
          } catch (error) {
            console.log(`Error fetching session for ${tutor.email}: `, error);
          }
        }

        setSessions(sessionData);
        setApprovedTutors(tutors.filter(tutor => approvedTutorEmails.has(tutor.email))); 
      };
      
      fetchSessions();
    }
  }, [axiosPublic, tutors]);

  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-4xl py-7 font-bold text-center mb-7 text-gray-900">
        Meet Our <span className="text-[#10b981]">Tutors</span>
      </h1>

      <Marquee pauseOnHover={true} speed={50}>
        {approvedTutors.length > 0 ? (
          approvedTutors.map((tutor) => (
            <Link key={tutor.email} to={`/TutorDetails/${tutor.email}`}>
              <div className="bg-gray-100 shadow p-6 w-40 h-40 rounded-xl border border-[#a0f0d5] mx-3">
                <img
                  src={tutor.userImg}
                  className="w-20 h-20 rounded-full object-cover mx-auto"
                  alt={tutor.name || "Tutor"}
                />
                <h6 className="text-center text-lg ">{tutor.name || "Unknown"}</h6>
                <p className="text-sm text-center text-gray-600">
                  {sessions[tutor.email]?.length > 0 
                    ? `${sessions[tutor.email].length} sessions` 
                    : "No Session"}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No approved tutors found.</p>
        )}
      </Marquee>
    </div>
  );
};

export default MeetOurTutor;
