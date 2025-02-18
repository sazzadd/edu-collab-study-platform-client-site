import {
  Avatar,
  Drawer,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BiCalendarEdit } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { FiBook, FiMenu, FiX } from "react-icons/fi";
import { GiBookshelf, GiNotebook } from "react-icons/gi";
import {
  MdFileUpload,
  MdLibraryBooks,
  MdOutlineHome,
  MdOutlineLogout,
} from "react-icons/md";
import { TbShoppingCartHeart, TbUsers } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hook/useAdmin";
import useTutor from "../../hook/useTutor";
import { AuthContext } from "../../provider/AuthProvider";

const sidebarItems = {
  admin: [
    { icon: TbUsers, text: "View all users", path: "/dashboard/viewAllUsers" },
    {
      icon: GiNotebook,
      text: "View all study session",
      path: "/dashboard/viewAllSession",
    },
    {
      icon: MdLibraryBooks,
      text: "View all materials",
      path: "/dashboard/viewAllMaterials",
    },
  ],
  student: [
    {
      icon: TbShoppingCartHeart,
      text: "View booked session",
      path: "/dashboard/viewBookedSession",
    },

    {
      icon: BiCalendarEdit,
      text: "Create & Manage personal notes",
      path: "/dashboard/CreateNote",
    },
    {
      icon: FiBook,
      text: "View all study materials",
      path: "/dashboard/StudentAllMaterials",
    },
  ],
  tutor: [
    {
      icon: GiNotebook,
      text: "Create study session",
      path: "/dashboard/addSession",
    },
    {
      icon: GiNotebook,
      text: "View all sessions",
      path: "/dashboard/allSessions",
    },
    {
      icon: MdFileUpload,
      text: "Upload materials",
      path: "/dashboard/UploadMaterials",
    },
    {
      icon: GiBookshelf,
      text: "View all Upload materials",
      path: "/dashboard/viewAllTutorMaterials",
    },
  ],
  common: [
    { icon: MdOutlineHome, text: "Home", path: "/" },
    { icon: FaRegUserCircle, text: "My Profile", path: "/dashboard/myProfile" },
  ],
};

const Dashboard = () => {
  const [dynamicSidebarItems, setDynamicSidebarItems] = useState({
    common: [{ icon: MdOutlineHome, text: "Home", path: "/" }],
  });
  const [isAdmin] = useAdmin();
  const [isTutor] = useTutor();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const { user, logOut } = useContext(AuthContext);
  useEffect(() => {
    let updatedSidebarItems = { ...sidebarItems };

    if (isAdmin) {
      updatedSidebarItems = {
        ...updatedSidebarItems,
        admin: sidebarItems.admin,
      };
    }
    if (isTutor) {
      updatedSidebarItems = {
        ...updatedSidebarItems,
        tutor: sidebarItems.tutor,
      };
    }

    setDynamicSidebarItems(updatedSidebarItems);
  }, [isAdmin, isTutor]);

  // Fetch user data based on logged-in email
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://study-platform-server-eta.vercel.app/users/${user.email}`)
        .then((response) => {
          setUserRole(response.data.role);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const Sidebar = () => (
    <div className="h-svh bg-[#003e53] text-white p-4 flex flex-col overflow-y-hidden">
      <div>
        <div className="flex items-center justify-between mb-8">
          <Typography variant="h4" color="white">
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
          <div>
            <h1 className="text-xl">
              You are <span className="font-bold">{userRole}</span>{" "}
            </h1>
          </div>
        </div>
      </div>
      {/* Display items based on user role */}
      <div className="space-y-2 overflow-y-auto">
        {userRole === "student" &&
          sidebarItems.student?.map((item, index) => (
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
        {userRole === "admin" &&
          sidebarItems.admin?.map((item, index) => (
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
        {userRole === "tutor" &&
          sidebarItems.tutor?.map((item, index) => (
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
      </div>

      {/* Display common items */}
      <div className="flex-grow flex flex-col">
        <div className="mt-auto">
          {/* Divider */}
          <hr className="my-4 border-gray-500" />
          {sidebarItems.common.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-white bg-opacity-10 text-white"
                    : "text-gray-300 mb-1 hover:bg-white hover:bg-opacity-10 hover:text-white"
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.text}</span>
            </NavLink>
          ))}
          <button
            onClick={logOut}
            className="flex items-center mt-1 space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 text-gray-300 hover:bg-white hover:bg-opacity-10 hover:text-white"
          >
            <MdOutlineLogout />
            <span>LogOut</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* <Helmet>
        <title>Dashboard | EduCollab</title>
      </Helmet> */}
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
