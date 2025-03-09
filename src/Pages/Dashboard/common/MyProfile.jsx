import React, { useContext, useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import { AuthContext } from "../../../provider/AuthProvider";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;
  const axiosPublic = useAxiosPublic();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userEmail) {
      axiosPublic
        .get(`/users/${userEmail}`)
        .then((res) => setUserData(res.data))
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [userEmail]);

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg">
      {/* Cover Photo */}

      <div className="relative w-full h-60 md:h-60 lg:h-70 overflow-hidden rounded-t-lg">
        <img
          src="https://dynamic.brandcrowd.com/template/preview/design/7dc6a13c-9083-4ba1-b4ef-a57276cc48f9?v=4&designTemplateVersion=1&size=design-preview-standalone-1x"
          alt="Cover"
          className="w-full object-cover object-center"
        />
        
      </div>

      {/* Profile Info */}
      <div className="text-center p-5 relative">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-900 absolute left-1/2 transform -translate-x-1/2 -top-14">
          <img
            src={
              userData?.userImg ||
              "https://i.ibb.co/TxF6C6Cg/default-profile.png"
            }
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-16">
          <h2 className="text-xl font-bold">{userData?.name || "User Name"}</h2>
          <p className="text-gray-400">
            {userData?.email || "user@example.com"}
          </p>
          <p className="text-gray-500">Role: {userData?.role || "Unknown"}</p>
          <button className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold">
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
