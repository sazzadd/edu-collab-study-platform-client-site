import React, { useState } from "react";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#fafafa75]">
      <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-[90%] max-w-4xl">
        {/* Form Section */}
        <div className="flex-1 p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#10b981] mb-6">
            Sign Up to your Account
          </h2>
          <p className="text-gray-600 mb-4">
            Already have an account?{" "}
            <a href="/login" className="text-[#10b981] underline">
              Login
            </a>
          </p>
          <form className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b981]"
              />
            </div>
            {/* Photo */}
            <div>
              <label className="block text-gray-700">Photo</label>
              <input
                type="text"
                placeholder="Your photo URL"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b981]"
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b981]"
              />
            </div>
            {/* Password */}
            <div>
              <label className="block text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Your password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b981]"
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute inset-y-0 right-4 text-gray-500"
                >
                  {passwordVisible ? "🙈" : "👁️"}
                </button>
              </div>
              <a
                href="/forgot-password"
                className="text-sm text-[#10b981] underline"
              >
                Forgot password?
              </a>
            </div>
            {/* Role */}
            <div>
              <label className="block text-gray-700">Role</label>
              <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b981]">
                <option>Select Role</option>
                <option>Student</option>
                <option>Instructor</option>
                <option>Admin</option>
              </select>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#10b981] text-white py-2 px-4 rounded-md hover:bg-[#0e9b76] transition"
            >
              Sign Up
            </button>
          </form>
          {/* Social Media Buttons */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-2">Sign Up with social Media</p>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
                <FaFacebook size={20} />
              </button>
              <button className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition">
                <FaGoogle size={20} />
              </button>
              <button className="bg-gray-800 text-white p-2 rounded-full hover:bg-black transition">
                <FaGithub size={20} />
              </button>
            </div>
          </div>
        </div>
        {/* Image Section */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-[#a7f3d075]">
          <img
            src="https://i.ibb.co/rGtLQvZ/Computer-login-pana.png"
            alt="Register"
            className="max-w-full rounded-r-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
