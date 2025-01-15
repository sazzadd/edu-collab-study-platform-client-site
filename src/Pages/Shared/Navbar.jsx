import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const Navbar = () => {
  // or: #10b981
  //   #a7f3d075
  const { user, logOut } = useContext(AuthContext);
  const list = (
    <>
      <li className="mx-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "border border-[#10b981] text-[#10b981] scale-105 transition-all duration-200"
              : "text-[#10b981] hover:text-[#059669] hover:scale-105 transition-all duration-200"
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
              ? "border border-[#10b981] text-[#10b981] scale-105 transition-all duration-200"
              : "text-[#10b981] hover:text-[#059669] hover:scale-105 transition-all duration-200"
          }
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">
            <img
              className="h-12 w-12"
              src="https://i.ibb.co.com/fQJVGy6/1490820801-12-82409.png"
              alt=""
            />{" "}
            <span className="text-[#0f766e] font-bold"> Edu </span> Platform
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{list}</ul>
        </div>
        <div className="navbar-end space-x-2">
          {/* <>{user ? <p>{user.displayName}</p>:null} */}
          {user ? <p> {user.displayName}</p> : null}
          {/* {user ? (
            <button
              onClick={logOut}
              className=" bg-transparent border py-2  border-[#10b981] text-[#10b981] hover:bg-[#10b981] hover:text-white hover:shadow-lg  px-4 text-sm rounded-md transition-all duration-300"
              to="/auth/login"
            >
              Logout
            </button>
          ) : (
            <Link
              className=" bg-transparent border py-2  border-[#10b981] text-[#10b981] hover:bg-[#10b981] hover:text-white hover:shadow-lg  px-4 text-sm rounded-md transition-all duration-300"
              to="/auth/login"
            >
              Login
            </Link>
          )} */}
          {/* <Link
            className=" bg-[#10b981] text-white hover:bg-[#0f9c73] hover:shadow-lg py-2 px-4 text-sm rounded-md transition-all duration-300"
            to="/auth/register"
          >
            Register

          </Link> */}

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex="0"
                role="button"
                className="btn btn-ghost btn-circle avatar hover:scale-110 transition-all duration-300"
              >
                <div className="w-13 rounded-full border-2 border-yellow-400">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" />
                  ) : (
                    <img
                      alt="Default Profile"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  )}
                </div>
              </div>
              <div
                className="tooltip tooltip-bottom"
                data-tip={user.displayName || "User"}
              ></div>
              <ul
                tabIndex="0"
                className="menu menu-sm z-[1000] absolute dropdown-content bg-white rounded-lg mt-3 w-48 p-2 shadow-lg transition-all duration-300"
              >
                <li className="font-semibold text-gray-900">
                  {user.displayName}
                </li>
                <li className="font-semibold text-gray-500">{user.email}</li>
                {/* <>{navLinks}</> */}
                <li className="font-semibold">
                  <button
                    onClick={logOut}
                    className="w-full py-2 px-4 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="space-x-3 flex">
              <Link
                to="/auth/login"
                className="py-2 px-4 text-sm font-medium text-gray-800 bg-[#10b981] rounded-lg shadow-md border  hover:bg-yellow-500 hover:text-white transition-all duration-200"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-lg shadow-md border border-gray-700 hover:bg-gray-700 hover:border-gray-600 transition-all duration-200"
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
