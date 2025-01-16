import {
  Avatar,
  Drawer,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import React, { useContext, useState } from "react";
import { BiCalendarEdit } from "react-icons/bi";
import { FiBook, FiMenu, FiX } from "react-icons/fi";
import { GiNotebook } from "react-icons/gi";
import { MdOutlineHome } from "react-icons/md";
import { TbShoppingCartHeart } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const sidebarItems = [
  //student
  { icon: TbShoppingCartHeart, text: "View booked session", path: "/" },
  { icon: GiNotebook, text: "Create note", path: "/auth/lo" },
  { icon: BiCalendarEdit, text: "Manage personal notes", path: "/analytics" },
  { icon: FiBook, text: "View all study materials ", path: "/messages" },
  // Tutor
  { icon: GiNotebook, text: "Tutor", path: "/tutor" },

  //   all user and all role (common )
  { icon: MdOutlineHome, text: "Home", path: "/" },
];

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const Sidebar = () => (
    <div className="h-full bg-[#003e53] text-white p-4 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <Typography variant="h5" color="white">
          Dashboard
        </Typography>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          onClick={toggleSidebar}
          className="lg:hidden"
        >
          <FiX className="h-5 w-5" />
        </IconButton>
      </div>
      <div className="flex items-center space-x-4 mb-6">
        <Avatar
          // src={user.PhotoUrl}
          alt="user avatar"
          size="md"
          className="cursor-pointer"
        />
        <div>
          <Typography variant="small" color="white">
            Welcome,
          </Typography>
          <Typography variant="small" color="white" className="font-semibold">
            {user?.displayName}
          </Typography>
        </div>
      </div>
      <nav className="flex flex-col space-y-2 flex-grow">
        {sidebarItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-white bg-opacity-10 text-white"
                  : "text-gray-300 hover:bg-white hover:bg-opacity-10 hover:text-white"
              }`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.text}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for large screens */}
      <aside className="hidden lg:block w-64 h-screen">
        <Sidebar />
      </aside>

      {/* Drawer for small screens */}
      <Drawer
        open={isSidebarOpen}
        onClose={toggleSidebar}
        className="lg:hidden"
      >
        <Sidebar />
      </Drawer>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center">
              <IconButton
                color="gray"
                variant="text"
                className="mr-2 lg:hidden"
                onClick={toggleSidebar}
              >
                <FiMenu className="h-6 w-6" />
              </IconButton>
              <Typography
                variant="h6"
                color="blue-gray"
                className="hidden sm:block"
              >
                Welcome, {user?.email}
              </Typography>
            </div>
            <div className="flex items-center space-x-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="hidden md:block"
              >
                {/* {user.name} */}
              </Typography>
              <Avatar
                src={user?.photoURL}
                alt="user avatar"
                size="sm"
                className="cursor-pointer"
              />
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
