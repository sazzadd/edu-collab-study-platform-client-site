import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../../hook/useAxiosPublic";

const AllTutor = () => {
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
      <div className="relative py-6 w-full mb-8 flex justify-center">
        <div className="relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-[40px] bg-[#0f766e]"></div>
          <h1 className="text-4xl py-7 font-bold text-left text-gray-900 relative z-10 pl-4">
            Our all <span className="text-[#0f766e]">Tutorrrrrrrr</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-1 gap-8">
        {tutors.map((tutor, index) => (
          <div key={index} className=""></div>
        ))}
      </div>
    </div>
  );
};

export default AllTutor;
