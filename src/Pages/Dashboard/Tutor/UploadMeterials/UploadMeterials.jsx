import {
  Button,
  Card,
  Dialog,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../provider/AuthProvider";

const UploadMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const tutorEmail = user?.email;

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(image_hosting_api, formData, {
        headers: { "content-type": "multipart/form-data" },
      });
      return response.data.success ? response.data.data.display_url : null;
    } catch (error) {
      console.error("Image upload failed:", error);
      Swal.fire({
        icon: "error",
        title: "Image Upload Failed",
        text: "Please try uploading a different image.",
      });
      return null;
    }
  };

  const onSubmit = async (data) => {
    if (!selectedSession) {
      Swal.fire("Error", "Please select a session", "warning");
      return;
    }

    Swal.fire({
      title: "Uploading...",
      text: "Please wait while your material is being uploaded.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const imageUrl = await uploadImageToImgBB(data.image[0]);
    if (!imageUrl) return;

    const material = {
      sessionTitle: selectedSession.sessionTitle,
      sessionId: selectedSession._id,
      tutorEmail: tutorEmail,
      image: imageUrl,
      link: data.link,
      materialTitle: data.materialTitle,
    };

    axios
      .post("https://study-platform-server-eta.vercel.app/material", material)
      .then((res) => {
        if (res.data.insertedId) {
          setMaterials([...materials, material]);
          Swal.fire({
            icon: "success",
            title: "Material uploaded successfully!",
            timer: 1500,
            showConfirmButton: false,
          });
          handleClose();
          // navigate("/dashboard/viewAllTutorMaterials")
        }
      })
      .catch((err) => {
        console.error("Error saving material to database:", err);
        Swal.fire(
          "Upload Failed",
          "Failed to save material to the database.",
          "error"
        );
      });
  };

  useEffect(() => {
    if (tutorEmail) {
      axios
        .get(
          `https://study-platform-server-eta.vercel.app/session?tutorEmail=${tutorEmail}`
        )
        .then((res) => {
          setSessions(res.data || []);
        })
        .catch((error) => {
          console.error("Error fetching sessions:", error);
        });
    }
  }, [tutorEmail]);

  const handleClose = () => {
    setOpenUploadModal(false);
    reset();
  };

  return (
    <div className="p-8">
      <Card
        className="p-6 mb-8 cursor-pointer bg-blue-50 hover:bg-indigo-100"
        onClick={() => setOpenUploadModal(true)}
      >
        <div className="flex items-center justify-center gap-2">
          <FaPlus className="w-5 h-5" />
          <Typography variant="h6">Upload Material</Typography>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {materials.map((material, index) => (
          <Card key={index} className="p-6">
            <img
              src={material.image}
              alt={material.sessionTitle}
              className="h-48 object-cover rounded-lg mb-4"
            />
            <Typography variant="h5">{material.sessionTitle}</Typography>
            <Button variant="outlined" className="mt-4">
              View Details
            </Button>
          </Card>
        ))}
      </div>

      <Dialog open={openUploadModal} handler={handleClose}>
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <Typography variant="h4" className="text-xl font-bold">
              Upload Material
            </Typography>
            <FaTimes
              className="w-6 h-6 cursor-pointer text-gray-600 hover:text-gray-800 transition-colors"
              onClick={handleClose}
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Select Session */}
            <Select
              label="Select Session"
              onChange={(value) =>
                setSelectedSession(sessions.find((s) => s._id === value))
              }
              className="text-gray-700"
            >
              {sessions.map((session) => (
                <Option key={session._id} value={session._id}>
                  {session.sessionTitle}
                </Option>
              ))}
            </Select>

            {/* Session ID & Tutor Email */}
            <div className="grid gap-6 md:grid-cols-2">
              <Input
                label="Session ID"
                value={selectedSession?._id || ""}
                readOnly
              />
              <Input
                label="Tutor Email"
                value={selectedSession?.tutorEmail || ""}
                readOnly
              />
            </div>

            {/* Material Title */}
            <Input
              label="Material Title"
              {...register("materialTitle", { required: true })}
            />
            {errors.materialTitle && (
              <p className="text-red-500 text-sm">Material title is required</p>
            )}

            {/* File Upload */}
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: true })}
              className="w-full text-sm text-gray-500 file:bg-blue-50 file:text-indigo-600 hover:file:bg-indigo-100"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">Image is required</p>
            )}

            {/* Share Link */}
            <Input
              label="Share Link"
              {...register("link", { required: true })}
            />
            {errors.link && (
              <p className="text-red-500 text-sm">Share link is required</p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              Upload
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default UploadMaterials;
