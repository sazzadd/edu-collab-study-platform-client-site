import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaEnvelope } from "react-icons/fa";
import useAxiosPublic from "../../hook/useAxiosPublic";

const TutorList = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic
      .get("/tutor")
      .then((res) => {
        console.log(res);
        setTutors(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the tutors!", error);
        setLoading(false);
      });
  }, [axiosPublic]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-11/12 mx-auto py-16">
      <Helmet>
        <title>EduCollab | Home</title>
      </Helmet>
      <h1 className="text-4xl py-7 font-bold text-center mb-7 text-gray-900 relative z-10 pl-4">
        Our all <span className="text-[#10b981]">Tutor</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-1 gap-8">
        {tutors.slice(0, 8).map((tutor, index) => (
          <div
            key={index}
            data-aos="flip-left"
            className="relative group mb-20 bg-white p-8 rounded-lg shadow-xl transition-all duration-500 transform hover:scale-110"
          >
            <div className="absolute -top-8">
              <img
                src={tutor.userImg}
                alt={tutor.name}
                className="w-24 h-24 rounded-full mb-4 border-4 border-[#10b981a2] transition-transform duration-500 transform group-hover:rotate-6 group-hover:scale-110"
              />
            </div>
            <h3 className="text-xl font-medium text-gray-600 mt-12 mb-3">
              {tutor.name}
            </h3>

            <p className="text-gray-600 flex italic" data-aos="slide-up">
              <span className="mt-1 mr-1">
                <FaEnvelope size={15}></FaEnvelope>
              </span>{" "}
              <span> </span> {tutor.email}
            </p>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-30 rounded-lg transition-opacity duration-500"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorList;
