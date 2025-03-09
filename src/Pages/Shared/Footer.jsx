import { Typography } from "@material-tailwind/react";
import React from "react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-12 shadow-lg">
      {/* Footer Container */}
      <div className=" mx-auto w-11/12 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section: Logo and Company Name */}
        <div className="flex items-center gap-4 mb-8 md:mb-0">
          <img
            src="https://i.ibb.co.com/McPGBp5/10321676-removebg-preview-1.png"
            alt="Company Logo"
            className="w-16 h-16"
          />
          <Typography variant="h5" className="font-bold text-xl text-gray-900">
            <span className="text-[#0f766e] font-bold">Edu</span>Collab
          </Typography>
        </div>

        {/* Center Section: Navigation Items */}
        <div className="flex flex-wrap gap-8 justify-center mb-8 md:mb-0">
          <Link
            to="/item1"
            className="text-gray-600 hover:text-green-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Home
          </Link>
          <Link
            to="/item2"
            className="text-gray-600 hover:text-green-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Dashboard
          </Link>
          <Link
            to="/about-us"
            className="text-gray-600 hover:text-green-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            About Us
          </Link>
          <Link
            to="/contact-us"
            className="text-gray-600 hover:text-green-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Contact Us
          </Link>
        </div>

        {/* Right Section: Social Icons */}
        <div className="flex gap-8 mb-8 md:mb-0">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-110"
          >
            <FaFacebook size={28} />
          </a>

          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-110"
          >
            <FaTwitter size={28} />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-700 transition duration-300 ease-in-out transform hover:scale-110"
          >
            <FaLinkedin size={28} />
          </a>
        </div>
      </div>

      {/* Footer Bottom: Copyright Message */}
      <div className="border-t border-gray-300 pt-6 text-center">
        <Typography variant="small" className="text-gray-600">
          &copy; {new Date().getFullYear()} CompanyName. All Rights Reserved.
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
