import { Button, Input, Textarea } from "@material-tailwind/react";
import { differenceInMinutes } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import {
  FaCalendarAlt,
  FaClock,
  FaEdit,
  FaEnvelope,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hook/useAxiosPublic";
import { AuthContext } from "../../../../provider/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddSession = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const [classStartDate, setClassStartDate] = useState(null);
  const [classEndDate, setClassEndDate] = useState(null);
  const [registrationStartDate, setRegistrationStartDate] = useState(null);
  const [registrationEndDate, setRegistrationEndDate] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const watchImage = watch("image");

  useEffect(() => {
    if (watchImage?.[0]) {
      const file = watchImage[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [watchImage]);

  useEffect(() => {
    if (classStartDate && classEndDate) {
      const duration = differenceInMinutes(classEndDate, classStartDate);
      setValue("sessionDuration", duration > 0 ? duration : 1440);
    }
  }, [classStartDate, classEndDate, setValue]);

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    
    try {
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: { "content-type": "multipart/form-data" },
      });

      if (res.data.success) {
        const sessionData = {
          ...data,
          image: res.data.data.display_url,
          registrationStartDate,
          registrationEndDate,
          classStartDate,
          classEndDate,
          registrationFee: 0,
          status: "pending",
          tutorName: user?.displayName,
          tutorEmail: user?.email,
        };

        const sessionRes = await axiosPublic.post("/session", sessionData);
        if (sessionRes.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Session added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/allSessions");
        }
      }
    } catch (error) {
      console.error("Error submitting session:", error);
      Swal.fire("Error!", "Failed to create session.", "error");
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-3xl mx-auto w-full">
      <h2 className="text-xl sm:text-3xl font-semibold mb-6 text-center text-gray-800">
        Create a New Study Session
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Session Title */}
        <div className="sm:col-span-2">
          <Input
            {...register("sessionTitle", {
              required: "Session title is required",
              minLength: {
                value: 15,
                message: "Title must be at least 15 characters",
              },
            })}
            label="Session Title"
            icon={<FaEdit />}
            error={!!errors.sessionTitle}
          />
          {errors.sessionTitle && (
            <p className="text-red-500 text-sm mt-1">{errors.sessionTitle.message}</p>
          )}
        </div>

        {/* Image Upload with Preview */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Session Thumbnail
          </label>
          <div className="flex items-center gap-4">
            <label className="flex-1 cursor-pointer">
              <div className="flex items-center justify-between px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 transition-colors">
                <span className="text-gray-600 truncate">
                  {imagePreview ? "Change Image" : "Choose an image"}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                {...register("image", { required: "Image is required" })}
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
                  className="w-20 h-20 object-cover rounded-lg border-2 border-indigo-100 shadow-sm"
                />
              </div>
            )}
          </div>
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Tutor Information */}
        <div className="sm:col-span-1">
          <Input
            label="Tutor Email"
            icon={<FaEnvelope />}
            value={user?.email}
            disabled
          />
        </div>
        <div className="sm:col-span-1">
          <Input
            label="Tutor Name"
            icon={<FaUser />}
            value={user?.displayName}
            disabled
          />
        </div>

        {/* Session Description */}
        <div className="sm:col-span-2">
          <Textarea
            {...register("sessionDescription", {
              required: "Description is required",
              minLength: {
                value: 50,
                message: "Description must be at least 50 characters",
              },
            })}
            label="Session Description"
            icon={<FaEdit />}
            error={!!errors.sessionDescription}
            rows={4}
          />
          {errors.sessionDescription && (
            <p className="text-red-500 text-sm mt-1">
              {errors.sessionDescription.message}
            </p>
          )}
        </div>

        {/* Date Pickers Section */}
        <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Registration Dates */}
          <div className="space-y-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FaCalendarAlt className="mr-2 text-indigo-600" />
                Registration Start Date
              </label>
              <DatePicker
                selected={registrationStartDate}
                onChange={setRegistrationStartDate}
                dateFormat="dd-MM-yyyy"
                className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholderText="Select start date"
                required
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FaCalendarAlt className="mr-2 text-indigo-600" />
                Registration End Date
              </label>
              <DatePicker
                selected={registrationEndDate}
                onChange={setRegistrationEndDate}
                dateFormat="dd-MM-yyyy"
                minDate={registrationStartDate}
                className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholderText="Select end date"
                required
              />
            </div>
          </div>

          {/* Class Dates */}
          <div className="space-y-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FaCalendarAlt className="mr-2 text-indigo-600" />
                Class Start Date
              </label>
              <DatePicker
                selected={classStartDate}
                onChange={setClassStartDate}
                dateFormat="dd-MM-yyyy"
                minDate={registrationEndDate}
                className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholderText="Select start date"
                required
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FaCalendarAlt className="mr-2 text-indigo-600" />
                Class End Date
              </label>
              <DatePicker
                selected={classEndDate}
                onChange={setClassEndDate}
                dateFormat="dd-MM-yyyy"
                minDate={classStartDate}
                className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholderText="Select end date"
                required
              />
            </div>
          </div>
        </div>

        {/* Session Duration */}
        <div className="sm:col-span-2">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <FaClock className="mr-2 text-indigo-600" />
            Session Duration (minutes)
          </label>
          <input
            {...register("sessionDuration", {
              required: "Duration is required",
              min: { value: 1, message: "Minimum duration is 1 minute" },
            })}
            type="number"
            className="w-full p-2 border rounded-md bg-gray-50"
            readOnly
          />
          {errors.sessionDuration && (
            <p className="text-red-500 text-sm mt-1">
              {errors.sessionDuration.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="sm:col-span-2 mt-4">
          <Button
            type="submit"
            color="indigo"
            className="w-full py-3 text-base font-medium rounded-lg transition-all hover:shadow-lg"
          >
            Create Session
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddSession;