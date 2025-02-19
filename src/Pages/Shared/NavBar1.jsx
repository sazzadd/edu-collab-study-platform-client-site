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

const NavBar1 = () => {
  const { user, logOut } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const handleLogout = () => {
    logOut();
    setOpenMenu(false);
  };

  return (
    <MTNavbar className="sticky top-0 z-50 shadow-md w-full max-w-full rounded-none px-4 py-3">
      {/* Full-width Container */}
      <div className="container mx-auto flex items-center justify-between">
        {/* Left: Logo & Name */}
        <div className="flex items-center gap-3">
          <img
            src="https://i.ibb.co.com/McPGBp5/10321676-removebg-preview-1.png"
            alt="Logo"
            className="w-10 h-10"
          />
          <Typography
            variant="h5"
            className="text-gray-900 font-bold hover:text-green-600 transition"
          >
            <span className="text-[#0f766e]">Edu</span>Collab
          </Typography>
        </div>

        {/* Center: Nav Items (Desktop) */}
        <div className="hidden md:flex gap-8 absolute left-1/2 transform -translate-x-1/2">
          <Link
            to="/"
            className="text-gray-700 font-medium hover:text-[#0f766e] transition-colors"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="text-gray-700 font-medium hover:text-[#0f766e] transition-colors"
          >
            Dashboard
          </Link>
        </div>

        {/* Right: Auth Section */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <Menu open={openMenu} handler={setOpenMenu}>
              <MenuHandler>
                <Avatar
                  src={user.photoURL}
                  alt="Avatar"
                  className="cursor-pointer border-2 border-[#0f766e]"
                />
              </MenuHandler>
              <MenuList>
                <Typography variant="small" className="font-bold p-2">
                  {user.displayName}
                </Typography>
                <MenuItem onClick={handleLogout} className="text-red-500">
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <div className="flex gap-3">
              <Link to="/auth/login">
                <Button className="bg-[#10b981a6] text-gray-800 hover:bg-[#10b981] transition">
                  Login
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button className="bg-yellow-300 text-gray-800 hover:bg-yellow-400 transition">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <IconButton
          variant="text"
          className="md:hidden text-gray-700"
          onClick={() => setOpenMobileMenu(!openMobileMenu)}
        >
          <FaBars className="h-6 w-6" />
        </IconButton>
      </div>

      {/* Mobile Menu Dropdown */}
      {openMobileMenu && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <Link to="/" className="block text-gray-700">
            Home
          </Link>
          <Link to="/dashboard" className="block text-gray-700">
            Dashboard
          </Link>
          <div className="pt-4 border-t">
            {user ? (
              <>
                <Typography className="font-bold">
                  {user.displayName}
                </Typography>
                <Button
                  onClick={handleLogout}
                  fullWidth
                  color="red"
                  className="mt-2"
                >
                  Logout
                </Button>
              </>
            ) : (
              <div className="space-y-2">
                <Link to="/login">
                  <Button
                    fullWidth
                    color="teal"
                    className="bg-green-200 mb-3 text-gray-800 hover:bg-green-300 transition"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    fullWidth
                    color="teal"
                    className="bg-yellow-300 text-gray-800 hover:bg-yellow-400 transition"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </MTNavbar>
  );
};

export default NavBar1;
