import axios from "axios";
import Lottie from "lottie-react";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { FaEyeSlash, FaHome } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import registerAnimation from "../assets/lottie/register.json";
import useAxiosPublic from "../hook/useAxiosPublic";
import { AuthContext } from "../provider/AuthProvider";
import SocialLogin from "../component/SocialLogin/SocialLogin";

const Register = () => {
  const navigate = useNavigate();
  const { setUser, updateUserProfile, createNewUser } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const axiosPublic = useAxiosPublic();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const photoURL = watch("photoURL");

  useEffect(() => {
    if (photoURL?.[0]) {
      const file = photoURL[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [photoURL]);

  const onSubmit = async (data) => {
    const imageFile = { image: data.photoURL[0] };

    try {
      const res = await axios.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      createNewUser(data.email, data.password)
        .then((result) => {
          const user = result.user;
          setUser(user);

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

              axiosPublic
                .post("/users", userInfo)
                .then((res) => {
                  if (res.data.insertedId) {
                    toast.success("Registered successfully");
                    navigate("/");
                  }
                })
                .catch((error) => {
                  toast.error("Failed to add user to the database.");
                });
            })
            .catch((error) => {
              toast.error("Error updating profile");
            });
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            toast.error("Email already registered");
          } else if (error.code === "auth/weak-password") {
            toast.error("Password is too weak");
          }
        });
    } catch (error) {
      toast.error("Image upload failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="absolute top-8 left-10 flex items-center gap-2 px-4 py-2 bg-[#10b981] text-white rounded-lg shadow-md hover:bg-[#0e9b76] transition">
        <Link to="/">
          <FaHome />
        </Link>
      </div>
      
      <div className="bg-white pt-16 pb-10 shadow-lg rounded-lg flex flex-col md:flex-row w-[90%] max-w-4xl">
        <Helmet>
          <title>Edu Platform | Sign Up</title>
        </Helmet>
        
        <div className="flex-1 py-8 px-6 md:px-10">
          <h2 className="text-2xl font-semibold text-[#10b981] mb-6">
            Sign Up to Your Account
          </h2>
          
          <p className="text-gray-600 mb-6">
            Already have an account?{" "}
            <Link className="text-[#10b981] font-semibold underline" to="/auth/login">
              Login here
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-gray-700 text-sm font-medium">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Your full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b981] transition text-sm"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Image Upload with Preview */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Profile Photo
              </label>
              <div className="flex items-center gap-4">
                <label className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#10b981] transition-colors bg-gray-50">
                    <span className="text-gray-600 truncate">
                      {imagePreview ? "Change Image" : "Choose an image"}
                    </span>
                    <FiUpload className="text-gray-600 text-lg" />
                  </div>
                  <input
                    {...register("photoURL", { required: "Photo is required" })}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
                {imagePreview && (
                  <div className="shrink-0">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-lg border-2 border-[#10b981]/20 shadow-sm"
                    />
                  </div>
                )}
              </div>
              {errors.photoURL && <p className="text-red-400 text-xs mt-1">{errors.photoURL.message}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-gray-700 text-sm font-medium">Email</label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b981] transition text-sm"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-gray-700 text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                    validate: {
                      hasUppercase: v => /[A-Z]/.test(v) || "At least one uppercase letter",
                      hasLowercase: v => /[a-z]/.test(v) || "At least one lowercase letter"
                    }
                  })}
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
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-gray-700 text-sm font-medium">Role</label>
              <select
                {...register("role", { required: "Role is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b981] transition text-sm"
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
              </select>
              {errors.role && <p className="text-red-400 text-xs mt-1">{errors.role.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#10b981] text-white py-2 px-4 rounded-md hover:bg-[#0e9b76] transition text-sm"
            >
              Sign Up
            </button>
          </form>

          <SocialLogin />
        </div>

        {/* Animation Section */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-[#a7f3d075]">
          <Lottie animationData={registerAnimation} />
        </div>
      </div>
    </div>
  );
};

export default Register;