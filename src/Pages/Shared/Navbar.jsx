import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const list = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold border-b-2 border-blue-600"
              : "text-gray-700 hover:text-blue-600 hover:border-blue-600 border-b-2 transition-all"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold border-b-2 border-blue-600"
              : "text-gray-700 hover:text-blue-600 hover:border-blue-600 border-b-2 transition-all"
          }
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="https://i.ibb.co.com/fQJVGy6/1490820801-12-82409.png"
            alt="Logo"
            className="h-10 w-10"
          />
          <span className="text-xl font-bold text-gray-800">Edu Platform</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center space-x-6">{list}</ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden flex items-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Toggle Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* User Profile or Auth Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300 overflow-hidden">
                <img
                  src={
                    user.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                <div className="px-4 py-2 text-gray-900 font-semibold">
                  {user.displayName}
                </div>
                <div className="px-4 py-2 text-gray-500 text-sm">{user.email}</div>
                <button
                  onClick={logOut}
                  className="block w-full px-4 py-2 text-left text-sm text-white bg-red-500 hover:bg-red-600 rounded-b-lg transition duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex space-x-3">
              <Link
                to="/auth/login"
                className="px-4 py-2 text-sm font-medium text-gray-800 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition duration-200"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col space-y-2 px-4 py-3">{list}</ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
