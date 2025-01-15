import axios from "axios";
import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { FaEyeSlash } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import registerAnimation from "../assets/lottie/register.json";
import useAxiosPublic from "../hook/useAxiosPublic";
import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
  const navigate = useNavigate();
  const { setUser, updateUserProfile, createNewUser } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const imageFile = { image: data.photoURL[0] };
    console.log(data, imageFile, image_hosting_api);

    try {
      const res = await axios.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      console.log(res.data);

      // Try to create a new user in Firebase
      createNewUser(data.email, data.password)
        .then((result) => {
          const user = result.user;
          setUser(user);

          // Update Firebase user profile
          updateUserProfile({
            displayName: data.name,
            photoURL: res.data.data.display_url,
          })
            .then(() => {
              const userInfo = {
                name: data.name,
                email: data.email,
                userImg: res.data.data.display_url,
                role: data.role,
              };

              // Add user information to your database
              axiosPublic
                .post("/users", userInfo)
                .then((res) => {
                  if (res.data.insertedId) {
                    toast.success("Registered successfully");
                    navigate("/");
                  } else {
                    console.error("User not added, response:", res.data);
                    toast.error("Failed to add user.");
                  }
                })
                .catch((error) => {
                  console.error("Error:", error);
                  toast.error("Failed to add user to the database.");
                });
            })
            .catch((error) => {
              console.error("Error updating profile:", error);
              toast.error("An error occurred while updating user profile.");
            });
        })
        .catch((error) => {
          // Handle Firebase specific errors
          if (error.code === "auth/email-already-in-use") {
            toast.error(
              "This email is already registered. Please try logging in."
            );
          } else if (error.code === "auth/weak-password") {
            toast.error(
              "Password is too weak. Please choose a stronger password."
            );
          } else {
            console.error("Error during Firebase registration:", error);
            toast.error("An error occurred during registration.");
          }
        });
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("An error occurred during image upload.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="bg-white pt-16 pb-10 shadow-lg rounded-lg flex flex-col md:flex-row w-[90%] max-w-4xl">
        {/* Form Section */}
        <Helmet>
          <title>Edu Platform | Sign Up</title>
        </Helmet>
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
              <div className="flex items-center gap-2 border border-gray-300 rounded-md py-1 bg-gray-50 hover:bg-gray-100">
                <FiUpload className="text-gray-600 text-lg" />
                <input
                  {...register("photoURL", {
                    required: "Photo URL is required",
                  })}
                  name="photoURL"
                  type="file"
                  accept="image/*"
                  className="w-full text-sm text-gray-500 file:mr-4  file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
                />
              </div>
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
                  {passwordVisible ? <FaEyeSlash /> : "👁️"}
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
                <option value="Instructor">Tutor</option>
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
