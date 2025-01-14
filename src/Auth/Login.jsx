import React, { useEffect, useRef, useState } from "react";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import { toast } from "react-toastify";
const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState({});
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [captchaValidated, setCaptchaValidated] = useState(false);
  useEffect(() => {
    try {
      loadCaptchaEnginge(6);
    } catch (err) {
      console.error("Captcha Engine Error:", err);
    }
  }, []);
  const handleValidateCaptcha = () => {
    const user_captcha_value = captchaRef.current.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
      setCaptchaValidated(true);
      toast.success("Captcha validated!");
    } else {
      setDisabled(true);
      toast.error("Captcha validation failed.");
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="bg-white shadow-lg rounded-lg flex flex-col-reverse md:flex-row w-[90%] max-w-4xl">
        {/* Image Section */}
        <div className="flex-1 items-center justify-center bg-[#a7f3d075] hidden md:flex">
          <img
            src="https://i.ibb.co/rGtLQvZ/Computer-login-pana.png"
            alt="Login"
            className="max-w-full rounded-l-lg"
          />
        </div>
        {/* Form Section */}
        <div className="flex-1 py-8 px-6 md:px-10">
          <h2 className="text-2xl font-semibold text-[#10b981] mb-6">
            Login to Your Account
          </h2>
          <p className="text-gray-600 mb-6">
            Don't have an account?{" "}
            <a
              href="/auth/register"
              className="text-[#10b981] font-semibold underline"
            >
              Register here
            </a>
          </p>
          <form className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b981] transition text-sm"
              />
            </div>
            {/* Password */}
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Your password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b981] transition text-sm"
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute inset-y-0 right-4 text-gray-500"
                >
                  {passwordVisible ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            {/* Submit Button */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Captcha
              </label>
              <LoadCanvasTemplate />
              <input
                type="text"
                name="captcha"
                ref={captchaRef}
                placeholder="Type here"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b981] transition text-sm"
              />
              <button
                type="button"
                onClick={handleValidateCaptcha}
                className="btn mt-5 btn-outline btn-xs px-3 py-1 text-xs font-medium rounded-full border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white shadow-md hover:shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
              >
                Validate
              </button>
            </div>
            {/*  */}
            <input
              disabled={disabled}
              className={`w-full py-2 rounded-lg text-white transition-opacity duration-300 ${
                disabled
                  ? "bg-gray-300 cursor-not-allowed opacity-70"
                  : "w-full bg-[#10b981] text-white py-2 px-4 rounded-md hover:bg-[#0e9b76] transition text-sm hover:bg-blue-500 cursor-pointer"
              }`}
              type="submit"
              value="Login"
            />
            
          </form>
          {/* Social Media Buttons */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-2 text-sm">
              Login with Social Media
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-[#10b981] text-white p-2 rounded-full hover:bg-[#0e9b76] transition">
                <FaFacebook size={16} />
              </button>
              <button className="bg-[#10b981] text-white p-2 rounded-full hover:bg-[#0e9b76] transition">
                <FaGoogle size={16} />
              </button>
              <button className="bg-[#10b981] text-white p-2 rounded-full hover:bg-[#0e9b76] transition">
                <FaGithub size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
