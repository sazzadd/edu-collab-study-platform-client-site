import React, { useContext } from "react";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

import useAxiosPublic from "./../../hook/useAxiosPublic";
import { AuthContext } from "./../../provider/AuthProvider";

const SocialLogin = () => {
  const { userLogin, user, setUser, googleSignIn, githubSignIn } =
    useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        userImg: result.user?.photoURL,
        role: "student",
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        navigate(from, { replace: true });
      });
    });
  };
  const handleGithubSignIn = () => {
    githubSignIn().then(async (result) => {
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        userImg: result.user?.photoURL,
        role: "student",
      };
      await axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res);
        navigate(from, { replace: true });
      });
    });
  };
  return (
    <div className="mt-6 text-center">
      <p className="text-gray-600 mb-2 text-sm">Login with Social Media</p>
      <div className="flex justify-center space-x-4">
        <button className="bg-[#10b981] text-white p-2 rounded-full hover:bg-[#0e9b76] transition">
          <FaFacebook size={16} />
        </button>
        <button className="bg-[#10b981] text-white p-2 rounded-full hover:bg-[#0e9b76] transition">
          <FaGoogle onClick={handleGoogleSignIn} size={16} />
        </button>
        <button className="bg-[#10b981] text-white p-2 rounded-full hover:bg-[#0e9b76] transition">
          <FaGithub onClick={handleGithubSignIn} size={16} />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
