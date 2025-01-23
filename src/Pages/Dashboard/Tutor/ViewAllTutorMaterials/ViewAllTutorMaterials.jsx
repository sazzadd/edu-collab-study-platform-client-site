import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaExternalLinkAlt, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../provider/AuthProvider";
import useAxiosPublic from "./../../../../hook/useAxiosPublic";

const ViewAllTutorMaterials = () => {
  const [materialsData, setMaterialsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const email = user.email;

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const response = await axiosPublic.get(`/material?email=${email}`);
        setMaterialsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching session details:", error);
        setLoading(false);
      }
    };

    fetchSessionDetails();
  }, [email,materialsData]);

  const handleDelete = (id) => {
    Swal.fire({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/material/${id}`)
          .then((response) => {
            if (response.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "The material has been deleted.",
                icon: "success",
              });
              const remaining = materialsData.filter(
                (material) => material._id !== id
              );
              setMaterialsData(remaining);
            }
          })
          .catch((error) => {
            console.error("Error deleting material:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the material.",
              icon: "error",
            });
          });
      }
    });
  };
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {materialsData.map((material) => (
        <div
          key={material._id}
          className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
        >
          <img
            src={material.image}
            alt={material.sessionTitle}
            className="w-full h-32 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">
              {material.sessionTitle}
            </h3>
            <p className="text-sm text-gray-500 mb-1">
              Session ID: {material.sessionId}
            </p>
            <p className="text-sm text-gray-500 mb-3">
              Tutor Email: {material.tutorEmail}
            </p>
            <div className="flex justify-between">
              <a
                href={material.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400"
              >
                <FaExternalLinkAlt size={20} />
              </a>
              <button className="text-green-400 hover:text-green-700">
                <FaEdit size={20} />
              </button>
              <button
                onClick={() => handleDelete(material._id)}
                className="text-red-400 hover:text-red-600"
              >
                <FaTrash size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewAllTutorMaterials;
