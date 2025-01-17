import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const list = (
    <>
      <li className="mx-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "border border-green-500 text-green-500 scale-105 transition-all duration-200"
              : "text-green-500 hover:text-green-600 hover:scale-105 transition-all duration-200"
          }
        >
          Home
        </NavLink>
      </li>
      <li className="mx-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "border border-green-500 text-green-500 scale-105 transition-all duration-200"
              : "text-green-500 hover:text-green-600 hover:scale-105 transition-all duration-200"
          }
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="flex items-center justify-between bg-white px-4 py-2 shadow-md w-11/12 mx-auto">
        <div className="flex items-center">
          <button
            className="lg:hidden flex items-center justify-center p-2 border rounded-md focus:outline-none"
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <Link to="/" className="flex items-center space-x-2">
            <img
              className="h-12 w-12"
              src="https://i.ibb.co.com/fQJVGy6/1490820801-12-82409.png"
              alt="Logo"
            />
            <span className="text-teal-700 font-bold text-xl">Edu Platform</span>
          </Link>
        </div>

        <div className="hidden lg:flex">
          <ul className="flex items-center space-x-4">{list}</ul>
        </div>

        <div className="flex items-center space-x-4">
          {user ? <p>{user.displayName}</p> : null}

          {user ? (
            <div className="relative">
              <button
                className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-yellow-400 overflow-hidden"
              >
                <img
                  className="object-cover w-full h-full"
                  src={
                    user.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt="Profile"
                />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                <div className="px-4 py-2 text-gray-900 font-semibold">
                  {user.displayName}
                </div>
                <div className="px-4 py-2 text-gray-500 text-sm">{user.email}</div>
                <button
                  onClick={logOut}
                  className="block w-full px-4 py-2 text-left text-sm text-white bg-red-500 rounded-b-lg hover:bg-red-600 transition duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex space-x-3">
              <Link
                to="/auth/login"
                className="px-4 py-2 text-sm font-medium text-gray-800 bg-green-500 rounded-lg hover:bg-green-600 hover:text-white transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-200"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
