import { Button, Input, Textarea } from "@material-tailwind/react";
import { format } from "date-fns";
import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import {
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaEdit,
  FaEnvelope,
  FaUser,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hook/useAxiosPublic";
import { AuthContext } from "../../../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
// imgg bb api and key 
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddSession = () => {
  const { user } = useContext(AuthContext);
  const navigete = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const [classStartDate, setClassStartDate] = useState(null);
  const [classEndDate, setClassEndDate] = useState(null);
  const [registrationStartDate, setRegistrationStartDate] = useState(null);
  const [registrationEndDate, setRegistrationEndDate] = useState(null);

  // const fakeUser = { name: "John Doe", email: "john.doe@example.com" };

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        " content-type": "multipart/form-data",
      },
    });
    console.log(res.data);
    console.log({
      ...data,
      classStartDate: classStartDate
        ? format(classStartDate, "dd-MM-yyyy")
        : null,
      classEndDate: classEndDate ? format(classEndDate, "dd-MM-yyyy") : null,
      registrationStartDate: registrationStartDate
        ? format(registrationStartDate, "dd-MM-yyyy")
        : null,
      registrationEndDate: registrationEndDate
        ? format(registrationEndDate, "dd-MM-yyyy")
        : null,
    });
    if (res.data.success) {
      const sessions = {
        sessionTitle: data.sessionTitle,
        sessionDescription: data.sessionDescription,
        sessionDuration: data.sessionDuration,
        image: res.data.data.display_url,
        registrationStartDate: data.registrationStartDate,
        registrationEndDate: data.registrationEndDate,
        classStartDate: data.classStartDate,
        classEndDate: data.classEndDate,
        registrationFee: 0,
        status: "pending",
        tutorName: user?.displayName,
        tutorEmail: user?.email,
      };
      const sessionsRes = await axiosPublic.post("/session", sessions);
      console.log(sessionsRes.data);
      if (sessionsRes.data.insertedId) {
        // reset()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `session added succesfully`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigete('/dashboard/allSessions')
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Create a New Study Session
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {/* Session Title */}
        <div className="col-span-1">
          <Input
            {...register("sessionTitle", {
              required: "Session title is required.",
              minLength: {
                value: 15,
                message: "Session title must be at least 15 characters long.",
              },
            })}
            label="Session Title"
            icon={<FaEdit />}
            error={errors.sessionTitle ? true : false}
            onChange={(e) => {
              if (e.target.value.length >= 15) {
                clearErrors("sessionTitle");
              }
            }}
          />
          {errors.sessionTitle && (
            <p className="text-red-500 text-sm mt-1">
              {errors.sessionTitle.message}
            </p>
          )}
        </div>

        {/* Tutor Info */}
        <div className="col-span-1">
          <Input
            label="Tutor Email"
            icon={<FaEnvelope />}
            value={user?.email}
            disabled
          />
        </div>
        <div className="col-span-1">
          <Input
            label="Tutor Name"
            icon={<FaUser />}
            value={user?.displayName}
            disabled
          />
        </div>

        {/* Image upload*/}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            {...register("image", { required: "Image file is required." })}
            type="file"
            accept="image/*"
            className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.imageFile && (
            <p className="text-red-500 text-sm mt-1">
              {errors.imageFile.message}
            </p>
          )}
        </div>

        {/* Session Description */}
        <div className="col-span-2">
          <Textarea
            {...register("sessionDescription", {
              required: "Session description is required.",
              minLength: {
                value: 20,
                message:
                  "Session description must be at least 20 characters long.",
              },
            })}
            label="Session Description"
            icon={<FaEdit />}
            error={errors.sessionDescription ? true : false}
            onChange={(e) => {
              if (e.target.value.length >= 20) {
                clearErrors("sessionDescription");
              }
            }}
          />
          {errors.sessionDescription && (
            <p className="text-red-500 text-sm mt-1">
              {errors.sessionDescription.message}
            </p>
          )}
        </div>

        {/* Dates */}
        <div className="col-span-1">
          <label className="text-sm font-medium text-gray-700 flex items-center">
            <FaCalendarAlt className="mr-2" /> Registration Start Date
          </label>
          <DatePicker
            selected={registrationStartDate}
            onChange={(date) => setRegistrationStartDate(date)}
            dateFormat="dd-MM-yyyy"
            className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholderText="Select registration start date"
            required
          />
          {errors.registrationStartDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.registrationStartDate.message}
            </p>
          )}
        </div>

        <div className="col-span-1">
          <label className="text-sm font-medium text-gray-700 flex items-center">
            <FaCalendarAlt className="mr-2" /> Registration End Date
          </label>
          <DatePicker
            selected={registrationEndDate}
            onChange={(date) => setRegistrationEndDate(date)}
            dateFormat="dd-MM-yyyy"
            className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholderText="Select registration end date"
            required
          />
          {errors.registrationEndDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.registrationEndDate.message}
            </p>
          )}
        </div>

        <div className="col-span-1">
          <label className="text-sm font-medium text-gray-700 flex items-center">
            <FaCalendarAlt className="mr-2" /> Class Start Date
          </label>
          <DatePicker
            selected={classStartDate}
            onChange={(date) => setClassStartDate(date)}
            dateFormat="dd-MM-yyyy"
            className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholderText="Select class start date"
            required
          />
          {errors.classStartDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.classStartDate.message}
            </p>
          )}
        </div>

        <div className="col-span-1">
          <label className="text-sm font-medium text-gray-700 flex items-center">
            <FaCalendarAlt className="mr-2" /> Class End Date
          </label>
          <DatePicker
            selected={classEndDate}
            onChange={(date) => setClassEndDate(date)}
            dateFormat="dd-MM-yyyy"
            className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholderText="Select class end date"
            required
          />
          {errors.classEndDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.classEndDate.message}
            </p>
          )}
        </div>

        {/* Session Duration */}
        <div className="col-span-1">
          <label className="text-sm font-medium text-gray-700 flex items-center">
            <FaClock className="mr-2" /> Session Duration (Minutes)
          </label>
          <input
            {...register("sessionDuration", {
              required: "Session duration is required.",
              valueAsNumber: true,
              min: {
                value: 1,
                message: "Session duration must be at least 1 minute.",
              },
            })}
            type="number"
            className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter session duration in minutes"
          />
          {errors.sessionDuration && (
            <p className="text-red-500 text-sm mt-1">
              {errors.sessionDuration.message}
            </p>
          )}
        </div>

        {/* Registration Fee */}
        <div className="col-span-1">
          <Input
            label="Registration Fee"
            icon={<FaDollarSign />}
            value={0}
            disabled
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex justify-end mt-4">
          <Button type="submit" color="indigo">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddSession;
