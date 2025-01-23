import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaReact } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../provider/AuthProvider";

const UploadMaterials = () => {
  const { user } = useContext(AuthContext);
  const tutorEmail = user?.email;
  const [sessions, setSessions] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState({});
  // imgg bb api and key
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // modal open  func

  const handleOpen = (session) => {
    setSelectedSession(session);
    reset({
      sessionTitle: session.sessionTitle,
      _id: session._id,
      tutorEmail: session.tutorEmail || tutorEmail,
    });
    setOpen(true);
  };
  // modal open  close
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (data) => {
    console.log("Uploading data:", data);

    const formData = new FormData();
    formData.append("image", data.image[0]);

    // Upload the image to imgBB
    axios
      .post(image_hosting_api, formData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((imageRes) => {
        if (imageRes.data.success) {
          const material = {
            sessionTitle: data.sessionTitle,
            sessionId: data._id,
            tutorEmail: data.tutorEmail,
            image: imageRes.data.data.display_url,
            link: data.link,
            materialTitle: data.materialTitle,
          };

          axios
            .post("http://localhost:5000/material", material)
            .then((materialRes) => {
              if (materialRes.data.insertedId) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Material uploaded successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
                handleClose();
              }
            })
            .catch((err) => {
              console.error("Error uploading material to backend:", err);
              Swal.fire({
                icon: "error",
                title: "Upload failed",
                text: "Failed to save material to the database.",
              });
            });
        }
      })
      .catch((err) => {
        console.error("Error uploading image to imgBB:", err);
        Swal.fire({
          icon: "error",
          title: "Image Upload Failed",
          text: "Please try uploading a different image.",
        });
      });
  };

  useEffect(() => {
    if (tutorEmail) {
      axios
        .get(`http://localhost:5000/session?tutorEmail=${tutorEmail}`)
        .then((res) => {
          setSessions(res.data || []);
        })
        .catch((error) => {
          console.error("Error fetching sessions:", error);
        });
    }
  }, [tutorEmail,sessions]);

  return (
    <>
      <div>
        <h1 className="text-center font-bold text-3xl py-10">
          Upload Tutor Material{" "}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sessions
            .filter((session) => session.status === "approved") // Filter only approved sessions
            .map((session) => (
              <Card key={session._id} className="overflow-hidden">
                <img
                  src={session.image || "https://via.placeholder.com/200x100"}
                  alt={session.sessionTitle}
                  className="h-[120px] w-full object-cover"
                />
                <CardBody className="p-3">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="mb-1 truncate"
                  >
                    {session.sessionTitle}
                  </Typography>
                  <h6> {session.status}</h6>
                </CardBody>
                <CardFooter className="pt-0 pb-2 px-3">
                  <Button
                    size="sm"
                    fullWidth
                    className="flex items-center justify-center gap-2 bg-white text-black border border-black hover:bg-gray-200"
                    onClick={() => handleOpen(session)}
                  >
                    <FaPlus className="h-4 w-4" /> Upload
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={open} handler={handleClose} size="sm">
        <DialogHeader>Upload Materials</DialogHeader>
        <DialogBody divider>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Session Title"
              value={selectedSession.sessionTitle || ""}
              // readOnly
              disabled
              {...register("sessionTitle")}
            />
            <Input
              label="Session ID"
              value={selectedSession._id || ""}
              readOnly
              {...register("_id")}
            />
            <Input
              label="Tutor Email"
              value={selectedSession.tutorEmail || tutorEmail || ""}
              readOnly
              {...register("tutorEmail")}
            />
            <Input
              label="Material Title"
              type="text"
              {...register("materialTitle", {
                required: "Please choose a file to upload.",
              })}
            />
            <Input
              label="upload Image"
              type="file"
              accept="image/*"
              {...register("image", {
                required: "Please choose a file to upload.",
              })}
            />
            {errors.file && (
              <Typography variant="small" color="red">
                {errors.file.message}
              </Typography>
            )}
            <Input
              label="Share Link"
              type="url"
              {...register("link", {
                required: "Please provide a valid URL.",
                pattern: {
                  value: /^(https?:\/\/)?([\w\d-]+\.){1,}[\w]{2,}(\/.*)?$/i,
                  message: "Invalid URL format.",
                },
              })}
            />
            {errors.url && (
              <Typography variant="small" color="red">
                {errors.url.message}
              </Typography>
            )}
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="indigo"
            className="flex items-center gap-2"
            onClick={handleSubmit(onSubmit)}
          >
            <FaReact className="h-4 w-4" /> Upload
          </Button>
          <Button
            variant="outlined"
            color="red"
            onClick={handleClose}
            className="ml-2"
          >
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default UploadMaterials;