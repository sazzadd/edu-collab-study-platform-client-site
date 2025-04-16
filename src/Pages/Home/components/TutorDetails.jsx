import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { useParams } from "react-router-dom";

import SessionCard from "../../../component/SessionCard";
import useAxiosPublic from "../../../hook/useAxiosPublic";

const TutorDetails = () => {
  const { email } = useParams();
  const [tutor, setTutor] = useState({});
  const [session, setSession] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const res = await axiosPublic.get(`/users/${email}`);
        setTutor(res.data);
      } catch (error) {
        console.error("Error fetching tutor:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTutor();
  }, [axiosPublic, email]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axiosPublic.get(`/session?tutorEmail=${email}`);
        setSession(res.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };
    fetchSessions();
  }, [axiosPublic, email]);

  return (
    <div className="w-11/12 max-w-7xl mx-auto">
      {/* Tutor Info Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow p-6 mt-10 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={tutor.userImg || "https://i.ibb.co/2t7HjQk/placeholder.jpg"}
            alt={tutor.name || "Tutor"}
            className="w-20 h-20 rounded-full object-cover border-2 border-[#10b981]"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {tutor?.name || "Unknown"}
            </h2>
            <p className="text-sm text-gray-600">{tutor?.email || "Unknown"}</p>
          </div>
        </div>
        <Button
          className="flex items-center gap-2"
          variant="outlined"
          color=""
          onClick={() => {
            if (tutor?.email) {
              window.location.href = `mailto:${tutor.email}?subject=Tutoring Session Inquiry&body=Hi ${tutor.name},%0D%0A%0D%0AI am interested in one of your tutoring sessions. Could you please share more details?%0D%0A%0D%0AThank you!`;
            }
          }}
        >
          <MdOutlineEmail size={18} />
          Contact
        </Button>
      </div>

      {/* Sessions Section */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Available Sessions{" "}
          <span className="text-[#10b981]">({session.length})</span>
        </h3>
        {!loading && session.length === 0 && (
          <p className="text-gray-500 text-sm">
            No sessions available for this tutor yet.
          </p>
        )}
      </div>

      {/* Session Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
        {session.map((item) => (
          <SessionCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default TutorDetails;
