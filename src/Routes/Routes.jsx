import { createBrowserRouter } from "react-router-dom";
import Register from "../Auth/Register";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import SessionDetails from "../Pages/SessionDetails/SessionDetails";
import AuthLayout from "./../Auth/AuthLayout";
import Login from "./../Auth/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/SessionDetails/:id",
        element: <SessionDetails></SessionDetails>,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "login", // /auth/login path
        element: <Login></Login>,
      },
      {
        path: "register", // /auth/register path
        element: <Register></Register>,
      },
    ],
  },
]);
