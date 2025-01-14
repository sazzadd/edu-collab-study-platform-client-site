import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from './../Auth/AuthLayout';
import Login from './../Auth/Login';
import Register from "../Auth/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
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
