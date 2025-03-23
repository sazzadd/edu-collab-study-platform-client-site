import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hook/useAxiosPublic";

const MeetOurTutor = () => {
  const [tutors, setTutor] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get("/tutor")
      .then((res) => {
        console.log(res);
        setTutor(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Facing an error ", error);
        setLoading(false);
      });
  }, [axiosPublic]);

  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-4xl py-7 font-bold text-center mb-7 text-gray-900 relative z-10 pl-4">
        Meet Our <span className="text-[#10b981]">Tutors</span>
      </h1>

      <Marquee pauseOnHover={true} speed={50}>
        {tutors.map((item, index) => (
          <Link  key={index} to={`/TutorDetails/${item.email}`}>
            <div
             
              className="bg-gray-100 overflow-hidden shadow p-6 w-40 h-40 rounded-xl border border-[#a0f0d5] mx-3"
            >
              <img
                src={item.userImg}
                className="w-20 h-20 rounded-full object-cover mx-auto"
                alt={item.name || "Tutor"}
              />
              <h6 className="text-center text-lg py-2">
                {item.name || "Unknown"}
              </h6>
            </div>
          </Link>
        ))}
      </Marquee>
    </div>
  );
};

export default MeetOurTutor;
