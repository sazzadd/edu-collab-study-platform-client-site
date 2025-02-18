import React from "react";
import {
  FaBookOpen,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaUsers,
} from "react-icons/fa";

const services = [
  {
    id: 1,
    icon: <FaUsers className="text-4xl text-[#10b981]" />,
    title: "Student Collaboration",
    description:
      "Connect with fellow students to book study sessions, share notes, and collaborate on educational resources.",
    linkText: "Join now",
  },
  {
    id: 2,
    icon: <FaChalkboardTeacher className="text-4xl text-[#10b981]" />,
    title: "Expert Tutoring",
    description:
      "Access experienced tutors for study sessions, guidance, and personalized learning opportunities.",
    linkText: "Find a tutor",
  },
  {
    id: 3,
    icon: <FaBookOpen className="text-4xl text-[#10b981]" />,
    title: "Study Materials",
    description:
      "Explore and download study materials for your booked sessions, including images and links to Google Drive resources.",
    linkText: "View materials",
  },
  {
    id: 4,
    icon: <FaCalendarAlt className="text-4xl text-[#10b981]" />,
    title: "Session Scheduling",
    description:
      "Book and manage your study sessions with tutors, with clear start and end dates, and flexible scheduling options.",
    linkText: "Book now",
  },
];

const ServicesSection = () => {
  return (
    <section className="w-11/12 mx-auto px-6 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col items-center space-y-4 p-6 border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-white"
          >
            {service.icon}
            <h3 className="text-xl font-semibold text-gray-800">
              {service.title}
            </h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
