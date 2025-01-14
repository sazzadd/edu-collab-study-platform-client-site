import React from "react";
import { FaReact } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#EDFBFF] text-gray-800 px-6 md:px-16 py-8 md:py-16 rounded-lg shadow-lg">
      {/* Left Content */}
      <div className="md:w-1/2 text-center md:text-left space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          <span className="text-[#10b981]">Empower</span>{" "}
          <span className="text-[#0f766e]">Your Learning Journey</span>
        </h1>
        <p className="text-lg md:text-xl font-medium text-gray-600">
          Master new skills in technology, design, and more with interactive
          courses crafted by experts.
        </p>
        <button className="bg-[#10b981] text-white hover:bg-[#0f9c73] font-semibold py-2 px-6 rounded-lg flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
          <FaReact size={20} />
          Get Started
        </button>
      </div>

      {/* Right Illustration */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src="https://i.ibb.co/hDbvFS2/Learning-bro.png" // Replace with your illustration URL
          alt="Learning Illustration"
          className="w-3/4 md:w-full "
        />
      </div>
    </div>
  );
};

export default Banner;
