import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  // or: #10b981
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
      <div className="navbar bg-base-100">
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
            Edu Platform
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{list}</ul>
        </div>
        <div className="navbar-end">
          <Link className="btn" to="/auth/login">
            login
          </Link>
          <Link className="btn" to="/auth/register">
            Rgister
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
<div className="navbar bg-base-100">
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
          <a>Item 1</a>
        </li>
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li>
              <a>Submenu 1</a>
            </li>
            <li>
              <a>Submenu 2</a>
            </li>
          </ul>
        </li>
        <li>
          <a>Item 3</a>
        </li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li>
        <a>Item 1</a>
      </li>
      <li>
        <details>
          <summary>Parent</summary>
          <ul className="p-2">
            <li>
              <a>Submenu 1</a>
            </li>
            <li>
              <a>Submenu 2</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a>Item 3</a>
      </li>
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>
</div>;
