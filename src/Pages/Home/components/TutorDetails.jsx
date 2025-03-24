import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { useParams } from "react-router-dom";

import SessionCard from "../../../component/SessionCard";
import useAxiosPublic from "../../../hook/useAxiosPublic";

const TutorDetails = () => {
  const { email } = useParams();
  // console.log(email);
  const [tutor, setTutor] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const [session, setSession] = useState([]);
  useEffect(() => {
    axiosPublic
      .get(`/users/${email}`)
      .then((res) => {
        console.log(res);
        setTutor(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Facing an error ", error);
        setLoading(false);
      });
  }, [axiosPublic, email]);
  useEffect(() => {
    axiosPublic
      .get(`/session?tutorEmail=${email}`)
      .then((res) => {
        // console.log(res);
        setSession(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Facing an error ", error);
        setLoading(false);
      });
  }, [axiosPublic, email]);
  console.log(session);
  return (
    <div className="w-11/12 mx-auto">
      <h1>TutorDetails</h1>
      <h1> sessions:{session.length}</h1>

      <div>
        <div className="flex flex-col md:flex-row justify-between border items-center border-[#eae8e8] p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <img
              src={tutor.userImg}
              className="w-20 h-20 border border-red rounded-full"
              alt=""
            />
            <div className="text-center  md:text-left">
              <h1 className="text-lg"> {tutor?.name || "Unknown"}</h1>
              <p className="text-sm"> {tutor?.email || "Unknown"}</p>
            </div>
          </div>
          <div className="pt-3 md:pt-0">
            <Button className="flex items-center" variant="outlined">
              <MdOutlineEmail className="mr-1" size={15} /> Contact
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {session.map((item) => (
          <SessionCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default TutorDetails;
