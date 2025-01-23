import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../provider/AuthProvider";
import { FaEye, FaEdit, FaTrash, FaExternalLinkAlt } from "react-icons/fa";

const ViewAllTutorMaterials = () => {
  const [materialsData, setMaterialsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const email = user.email;

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/material?email=${email}`);
        setMaterialsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching session details:", error);
        setLoading(false);
      }
    };

    fetchSessionDetails();
  }, [email]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <p>Loading...</p>
    </div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {materialsData.map((material) => (
        <div key={material.sessionId} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
          <img
            src={material.image}
            alt={material.sessionTitle}
            className="w-full h-32 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{material.sessionTitle}</h3>
            <p className="text-sm text-gray-500 mb-1">Session ID: {material.sessionId}</p>
            <p className="text-sm text-gray-500 mb-3">Tutor Email: {material.tutorEmail}</p>
            <div className="flex justify-between">
              {/* View Button */}
              <a
                href={material.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                <FaExternalLinkAlt  size={20} />
              </a>
              {/* Update Button */}
              <button className="text-green-500 hover:text-green-700">
                <FaEdit size={20} />
              </button>
              {/* Delete Button */}
              <button className="text-red-500 hover:text-red-700">
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
