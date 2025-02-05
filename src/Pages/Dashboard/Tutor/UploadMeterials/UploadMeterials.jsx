import { useContext, useEffect, useState } from "react"
import { Card, Dialog, Input, Select, Option, Button, Typography } from "@material-tailwind/react"
import { FaTimes, FaPlus } from "react-icons/fa"
import ViewMaterialsDialog from "./ViewMaterialsDialog"
import axios from "axios"
import { AuthContext } from "../../../../provider/AuthProvider"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"

const fakeSessions = [
  {
    _id: "1",
    sessionTitle: "Mastering Time Management",
    image: "https://via.placeholder.com/150",
    tutorEmail: "tutor1@example.com",
    registrationFee: "$49",
    status: "Active",
  },
  {
    _id: "2",
    sessionTitle: "Ethical Hacking",
    image: "https://via.placeholder.com/150",
    tutorEmail: "tutor2@example.com",
    registrationFee: "$99",
    status: "Active",
  },
]

const UploadMaterials = () => {
  // const [sessions] = useState(fakeSessions)
  const [materials, setMaterials] = useState([])
  const [selectedSession, setSelectedSession] = useState(null)
  const [openUploadModal, setOpenUploadModal] = useState(false)
  const [openViewModal, setOpenViewModal] = useState(false)
  const [currentMaterial, setCurrentMaterial] = useState(null)
  const [sessions, setSessions] = useState([]);
  const { user } = useContext(AuthContext);
  const tutorEmail = user?.email;
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
              .post(
                "https://study-platform-server-eta.vercel.app/material",
                material
              )
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














  const [formData, setFormData] = useState({
    materialTitle: "",
    image: null,
    shareLink: "",
  })

  const handleUpload = () => {
    const newMaterial = {
      materialId: Date.now(),
      sessionId: selectedSession._id,
      ...formData,
      imageUrl: URL.createObjectURL(formData.image),
    }
    setMaterials([...materials, newMaterial])
    setOpenUploadModal(false)
    setFormData({ materialTitle: "", image: null, shareLink: "" })
  }

  const handleDelete = (materialId) => {
    setMaterials(materials.filter((m) => m.materialId !== materialId))
  }

  // Filter sessions that have materials uploaded
  const sessionsWithMaterials = sessions.filter((session) =>
    materials.some((material) => material.sessionId === session._id)
  )




  // fetch session
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
  }, [tutorEmail, sessions]);

  return (
    <div className="p-8">
      <Card className="p-6 mb-8 cursor-pointer bg-blue-50 hover:bg-blue-100" onClick={() => setOpenUploadModal(true)}>
        <div className="flex items-center justify-center gap-2">
          <FaPlus className="w-5 h-5" />
          <Typography variant="h6">Upload Material</Typography>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Display only sessions that have materials uploaded */}
        {sessionsWithMaterials.map((session) => (
          <Card key={session._id} className="p-6">
            <img
              src={session.image || "/placeholder.svg"}
              alt={session.sessionTitle}
              className="h-48 object-cover rounded-lg mb-4"
            />
            <Typography variant="h5">{session.sessionTitle}</Typography>
            <Button
              variant="outlined"
              className="mt-4"
              onClick={() => {
                setCurrentMaterial(session)
                setOpenViewModal(true)
              }}
            >
              View Details
            </Button>
          </Card>
        ))}
      </div>

      <Dialog open={openUploadModal} handler={() => setOpenUploadModal(false)}>
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <Typography variant="h4" className="text-xl font-bold">
              Upload Material
            </Typography>
            <FaTimes
              className="w-6 h-6 cursor-pointer text-gray-600 hover:text-gray-800 transition-colors"
              onClick={() => setOpenUploadModal(false)}
            />
          </div>

          <div className="space-y-6">
            {/* Select Session */}
            <div className="mb-8">
              <Select
                label="Select Session"
                onChange={(value) => setSelectedSession(sessions.find((s) => s._id === value))}
                className="text-gray-700"
                labelProps={{ className: "text-sm" }}
              >
                {sessions.map((session) => (
                  <Option key={session._id} value={session._id} className="text-sm">
                    {session.sessionTitle}
                  </Option>
                ))}
              </Select>
            </div>

            {/* Session ID & Tutor Email */}
            <div className="grid gap-6 md:grid-cols-2">
              <Input
                label="Session ID"
                value={selectedSession?._id || ""}
                className="text-sm"
                containerProps={{ className: "min-w-[200px]" }}
                readOnly
              />

              <Input
                label="Tutor Email"
                value={selectedSession?.tutorEmail || ""}
                className="text-sm"
                containerProps={{ className: "min-w-[200px]" }}
                readOnly
              />
            </div>

            {/* Material Title */}
            <Input
              label="Material Title"
              value={formData.materialTitle}
              onChange={(e) => setFormData({ ...formData, materialTitle: e.target.value })}
              className="text-sm"
              labelProps={{ className: "text-sm" }}
            />

            {/* File Upload */}
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {/* Share Link */}
            <Input
              label="Share Link"
              value={formData.shareLink}
              onChange={(e) => setFormData({ ...formData, shareLink: e.target.value })}
              className="text-sm"
              labelProps={{ className: "text-sm" }}
            />

            {/* Upload Button */}
            <Button
              className="mt-8 py-3 text-sm font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
              onClick={handleUpload}
              fullWidth
            >
              Upload Material
            </Button>
          </div>
        </div>
      </Dialog>

      <ViewMaterialsDialog
        open={openViewModal}
        handleClose={() => setOpenViewModal(false)}
        currentMaterial={currentMaterial}
        materials={materials}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default UploadMaterials
