import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar as MTNavbar,
  Typography,
} from "@material-tailwind/react";
import React, { useContext, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const handleLogout = () => {
    logOut();
    setOpenMenu(false);
  };

  return (
    <MTNavbar className="bg-white fixed top-0 left-1/2 transform -translate-x-1/2 z-50 shadow-md w-full px-6 py-4">
  {/* Navbar container with full-width and center-aligned content */}
  <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between">
    {/* Left: Logo and Company Name */}
    <div className="flex items-center gap-3">
      <img src="/logo.png" alt="Company Logo" className="w-10 h-10" />
      <Typography
        variant="h6"
        className="text-gray-900 font-bold hover:text-green-600 transition"
      >
        CompanyName
      </Typography>
    </div>

    {/* Center: Navigation Items */}
    <div className="hidden md:flex gap-8 mx-auto">
      <Link
        to="/"
        className="text-gray-700 hover:text-green-600 transition font-medium"
      >
        Home
      </Link>
      <Link
        to="/dashboard"
        className="text-gray-700 hover:text-green-600 transition font-medium"
      >
        Dashboard
      </Link>
    </div>

    {/* Right: User Avatar or Login/Register */}
    <div className="hidden md:flex items-center gap-4">
      {user ? (
        <Menu open={openMenu} handler={setOpenMenu} placement="bottom-end">
          <MenuHandler>
            <Avatar
              src={user.photoURL || "/default-avatar.png"}
              alt="User Avatar"
              className="cursor-pointer w-10 h-10 border-2 border-green-600"
            />
          </MenuHandler>
          <MenuList className="p-2 shadow-lg">
            <Typography
              variant="small"
              className="px-3 py-1 font-medium text-gray-700"
            >
              {user.displayName || "User"}
            </Typography>
            <MenuItem
              onClick={handleLogout}
              className="text-red-500 hover:bg-red-100"
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <div className="flex gap-4">
          <Link to="/auth/login">
            <Button className="bg-green-200 text-gray-800 hover:bg-green-300 transition">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="bg-yellow-300 text-gray-800 hover:bg-yellow-400 transition">
              Register
            </Button>
          </Link>
        </div>
      )}
    </div>

    {/* Mobile Menu Button */}
    <div className="md:hidden">
      <IconButton
        variant="text"
        onClick={() => setOpenMobileMenu(!openMobileMenu)}
        className="text-gray-700 focus:outline-none"
      >
        <FaBars size={24} />
      </IconButton>
    </div>
  </div>

  {/* Mobile Menu */}
  {openMobileMenu && (
    <div className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-lg p-4 md:hidden">
      <Link
        to="/"
        className="block text-gray-700 hover:text-green-600 py-2 transition"
        onClick={() => setOpenMobileMenu(false)}
      >
        Home
      </Link>
      <Link
        to="/dashboard"
        className="block text-gray-700 hover:text-green-600 py-2 transition"
        onClick={() => setOpenMobileMenu(false)}
      >
        Dashboard
      </Link>
      <hr className="my-4 border-gray-300" />
      {user ? (
        <div>
          <Typography
            variant="small"
            className="block text-gray-700 font-medium py-1"
          >
            {user.displayName || "User"}
          </Typography>
          <Button
            onClick={() => {
              handleLogout();
              setOpenMobileMenu(false);
            }}
            className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white"
          >
            Logout
          </Button>
        </div>
      ) : (
        <div className="mt-4">
          <Link to="/auth/login">
            <Button
              className="w-full bg-green-200 text-gray-800 hover:bg-green-300 transition"
              onClick={() => setOpenMobileMenu(false)}
            >
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button
              className="mt-2 w-full bg-yellow-300 text-gray-800 hover:bg-yellow-400 transition"
              onClick={() => setOpenMobileMenu(false)}
            >
              Register
            </Button>
          </Link>
        </div>
      )}
    </div>
  )}
</MTNavbar>

  );
};

export default Navbar;
