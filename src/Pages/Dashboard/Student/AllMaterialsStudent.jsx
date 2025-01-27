import { Button } from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import { AuthContext } from "../../../provider/AuthProvider";

const AllMaterialsStudent = () => {
  const [materialData, setMaterialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const email = user?.email;

  useEffect(() => {
    const fetchMaterialData = async () => {
      try {
        const response = await axiosPublic.get(
          `/get-student-material/${email}`
        );
        setMaterialData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching material:", error);
        setLoading(false);
      }
    };

    fetchMaterialData();
  }, [axiosPublic, email]);
  const handleDownloadImage = async (material) => {
    const response = await fetch(material?.image);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = material?.materialTitle;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  };
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {materialData.map((material) => (
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
            
              <p className="text-sm text-gray-500 mb-3">
                Tutor Email: {material.tutorEmail}
              </p>
              <p className="text-lg  text-gray-900 mb-3">
                Material title: {material.materialTitle}
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
                <Button
                  onClick={() => handleDownloadImage(material)}
                  className="bg-indigo-500 text-white"
                >
                  download image{" "}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMaterialsStudent;
