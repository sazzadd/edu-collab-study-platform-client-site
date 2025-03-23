import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../hook/useAxiosPublic";

const TutorDetails = () => {
  const { email } = useParams();
  console.log(email);
  const [tutor, setTutor] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

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
  }, [axiosPublic]);

  return (
    <div>
      <h1>TutorDetails</h1>
      {tutor?.name || "Unknown"}
      <div>
        <div className="flex">
          <div>
            <img src="" className="w-20 h-20 border border-red rounded-full"  alt="" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default TutorDetails;
