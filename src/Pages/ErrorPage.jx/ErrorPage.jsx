import Lottie from "lottie-react";
import React from "react";
import { Link } from "react-router-dom";
import ErrorAnimation from "../../assets/lottie/error.json";
const ErrorPage = () => {
  return (
    <div className="bg-gray-100 h-screen flex flex-col justify-center items-center">
      {/* SVG Emoji */}
      <div className="relative">
        <svg
          className="emoji-404 animate-bounce"
          enableBackground="new 0 0 226 249.135"
          height="249.135"
          viewBox="0 0 226 249.135"
          width="226"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="113" cy="113" fill="#FFE585" r="109" />
          <line
            fill="none"
            opacity="0.29"
            stroke="#6E6E96"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
            x1="88.866"
            x2="136.866"
            y1="245.135"
            y2="245.135"
          />
          <line
            fill="none"
            opacity="0.17"
            stroke="#6E6E96"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
            x1="154.732"
            x2="168.732"
            y1="245.135"
            y2="245.135"
          />
          <line
            fill="none"
            opacity="0.17"
            stroke="#6E6E96"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
            x1="69.732"
            x2="58.732"
            y1="245.135"
            y2="245.135"
          />
          <circle cx="68.732" cy="93" fill="#6E6E96" r="9" />
          <circle cx="156.398" cy="93" fill="#6E6E96" r="9" />
        </svg>
        
      </div>

      {/* Text Section */}
      <div className="text-center tracking-widest mt-4">
        <h1 className="text-gray-500 text-6xl">
          4<span className="mx-2">0</span>4
        </h1>
        <p className="text-gray-500 text-xl mt-2">
          Sorry, we couldn't find what you are looking for!
        </p>
      </div>

      {/* Go Back Button */}
      <div className="mt-6">
        <Link
          to="/"
          className="text-gray-500 font-mono text-xl bg-gray-200 p-3 rounded-md hover:shadow-md"
        >
          Go back
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
