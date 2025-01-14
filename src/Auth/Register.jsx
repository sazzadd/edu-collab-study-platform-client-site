import Lottie from "lottie-react";
import React, { useState } from "react";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import registerAnimation from "../assets/lottie/register.json";
const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="bg-white pt-16 pb-10 shadow-lg rounded-lg flex flex-col md:flex-row w-[90%] max-w-4xl">
        {/* Form Section */}
        <div className="flex-1 py-8 px-6 md:px-10">
          <h2 className="text-2xl font-semibold text-[#10b981] mb-6">
            Sign Up to Your Account
          </h2>
          <p className="text-gray-600 mb-6">
            Already have an account?{" "}
            <Link
              className="text-[#10b981] font-semibold underline"
              to="/auth/login"
            >
              {" "}
              Login here
            </Link>
          </p>
          <form className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                placeholder="Your full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b981] transition text-sm"
              />
            </div>
            {/* Photo */}
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Photo
              </label>
              <input
                type="text"
                placeholder="Your photo URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b981] transition text-sm"
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b981] transition text-sm"
              />
            </div>
            {/* Password */}
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Your password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b981] transition text-sm"
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute inset-y-0 right-4 text-gray-500"
                >
                  {passwordVisible ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            {/* Role */}
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Role
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b981] transition text-sm">
                <option>Select Role</option>
                <option>Student</option>
                <option>Instructor</option>
                <option>Admin</option>
              </select>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#10b981] text-white py-2 px-4 rounded-md hover:bg-[#0e9b76] transition text-sm"
            >
              Sign Up
            </button>
          </form>
          {/* Social Media Buttons */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-2 text-sm">
              Sign Up with Social Media
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-[#10b981] text-white p-2 rounded-full hover:bg-[#0e9b76] transition">
                <FaFacebook size={16} />
              </button>
              <button className="bg-[#10b981] text-white p-2 rounded-full hover:bg-[#0e9b76] transition">
                <FaGoogle size={16} />
              </button>
              <button className="bg-[#10b981] text-white p-2 rounded-full hover:bg-[#0e9b76] transition">
                <FaGithub size={16} />
              </button>
            </div>
          </div>
        </div>
        {/* Image Section */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-[#a7f3d075]">
          {/* <img
            src="https://i.ibb.co/rGtLQvZ/Computer-login-pana.png"
            alt="Register"
            className="max-w-full rounded-r-lg"
          /> */}
          <Lottie animationData={registerAnimation}></Lottie>
        </div>
      </div>
    </div>
  );
};

export default Register;
