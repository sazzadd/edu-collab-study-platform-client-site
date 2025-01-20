import { Button, Input, Textarea } from "@material-tailwind/react";
import { format } from "date-fns";
import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import {
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaEdit,
  FaEnvelope,
  FaUser,
} from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "./../../../hook/useAxiosSecure";
// imgg bb api and key
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateSession = () => {
  const { user } = useContext(AuthContext);
  const { sessionTitle, sessionDescription, _id } = useLoaderData();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  
    if (res.data.success) {
      const sessionData = {
        sessionTitle: data.sessionTitle,
        sessionDescription: data.sessionDescription,
        
      };
  
      // Send updated session data to backend
      const updateResponse = await axiosSecure.patch(`/session/${_id}`, sessionData);
  
      if (updateResponse.data.message === "Session updated successfully") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Session updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  //   console.log(session);
  return (
    <div>
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
              defaultValue={sessionTitle}
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

          

          {/* Session Description */}
          <div className="col-span-2">
            <Textarea
              defaultValue={sessionDescription}
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
       

      

        

          

          {/* Submit Button */}
          <div className="col-span-2 flex justify-end mt-4">
            <Button type="submit" color="indigo">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSession;
