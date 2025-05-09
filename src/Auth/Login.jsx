import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { FaEyeSlash, FaHome } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import { toast } from "react-toastify";
import SocialLogin from "../component/SocialLogin/SocialLogin";
import { AuthContext } from "../provider/AuthProvider";
const Login = () => {
  const { setUser, userLogin } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState({});
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [captchaValidated, setCaptchaValidated] = useState(false);
  useEffect(() => {
    try {
      loadCaptchaEnginge(2);
    } catch (err) {
      console.error("Captcha Engine Error:", err);
    }
  }, []);
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy: " + err);
      });
  };
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    userLogin(data.email, data.password)
      .then((result) => {
        const user = result.user;
        if (user) {
          toast.success("Login successful!");
          // setTimeout(() => {

          // }, 2000);
          navigate(from, { replace: true });
        }
      })
      .catch((err) => {
        setError({ ...error, login: err.code });
        toast.error(err.message);
      });
  };
  return (
    <div className=" min-h-screen relative flex justify-center items-center bg-white">
      <div className="absolute top-8 left-10 flex items-center gap-2 px-4 py-2 bg-[#10b981] text-white rounded-lg shadow-md hover:bg-[#0e9b76] transition">
        <Link to="/">
          <FaHome />
        </Link>
      </div>

      <Helmet>
        <title>EduCollab | Login</title>
      </Helmet>
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
        <div className="flex-1 py-8 px-6  md:px-10">
          <h2 className="text-2xl font-semibold mb-4 text-[#10b981] ">
            Login to Your Account
          </h2>
          {/* Sign in as Admin Popover */}
          <Popover>
  <PopoverHandler>
    <button className="text-sm text-gray-600 font-semibold hover:text-blue-600 transition-all duration-200">
      👉 Sign in as <span className="text-blue-500">ADMIN</span> 👈
    </button>
  </PopoverHandler>
  <PopoverContent className="w-64 p-4 shadow-lg rounded-xl bg-white space-y-3">
    <p className="text-sm text-gray-500 text-center">Copy credentials</p>

    <div className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md">
      <span className="text-sm text-gray-700">admin@gmail.com</span>
      <button
        onClick={() => copyToClipboard("admin@gmail.com")}
        className="text-xs text-blue-500 hover:underline"
      >
        Copy
      </button>
    </div>

    <div className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md">
      <span className="text-sm text-gray-700">Ador123</span>
      <button
        onClick={() => copyToClipboard("Ador123")}
        className="text-xs text-blue-500 hover:underline"
      >
        Copy
      </button>
    </div>
  </PopoverContent>
</Popover>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Email
              </label>
              <input
                {...register("email", { required: "email is required" })}
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
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    validate: {
                      hasUppercase: (value) =>
                        /[A-Z]/.test(value) ||
                        "Password must contain at least one uppercase letter",
                      hasLowercase: (value) =>
                        /[a-z]/.test(value) ||
                        "Password must contain at least one lowercase letter",
                    },
                  })}
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Your password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b981] transition text-sm"
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute inset-y-0 right-4 text-gray-500"
                >
                  {passwordVisible ? <FaEyeSlash /> : "👁️"}
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
                  : "w-full bg-[#10b981] text-white py-2 px-4 rounded-md hover:bg-[#0e9b76] transition text-sm hover:bg-[#0e9b76] cursor-pointer"
              }`}
              type="submit"
              value="Login"
            />
          </form>
          {/* Social Media Buttons */}
          <div>
            <SocialLogin></SocialLogin>
          </div>
          <p className="text-gray-600 mt-5 text-center">
            Don't have an account?{" "}
            <a
              href="/auth/register"
              className="text-[#10b981] font-semibold underline"
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
