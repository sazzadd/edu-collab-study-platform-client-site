import Lottie from "lottie-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import registerAnimation from "../assets/lottie/register.json";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                name="name"
                type="text"
                placeholder="Your full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b981] transition text-sm"
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            {/* Photo */}
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Photo URL
              </label>
              <input
                {...register("photoURL", { required: "Photo URL is required" })}
                name="photoURL"
                type="text"
                placeholder="Your photo URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b981] transition text-sm"
              />
              {errors.photoURL && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.photoURL.message}
                </p>
              )}
            </div>
            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Email
              </label>
              <input
                {...register("email", { required: "Email is required" })}
                name="email"
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b981] transition text-sm"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* Password */}
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    validate: {
                      hasUppercase: (value) =>
                        /[A-Z]/.test(value) ||
                        "Password must contain at least one uppercase letter",
                      hasLowercase: (value) =>
                        /[a-z]/.test(value) ||
                        "Password must contain at least one lowercase letter",
                    },
                  })}
                  name="password"
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
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* Role */}
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Role
              </label>
              <select
                {...register("role", { required: "Role is required" })}
                name="role"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b981] transition text-sm"
              >
                <option value="">Select Role</option>
                <option value="Student">Student</option>
                <option value="Instructor">Instructor</option>
                <option value="Admin">Admin</option>
              </select>
              {errors.role && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#10b981] text-white py-2 px-4 rounded-md hover:bg-[#0e9b76] transition text-sm"
            >
              Sign Up
            </button>
          </form>
        </div>
        {/* Image Section */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-[#a7f3d075]">
          <Lottie animationData={registerAnimation}></Lottie>
        </div>
      </div>
    </div>
  );
};

export default Register;
