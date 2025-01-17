import { createBrowserRouter } from "react-router-dom";
import Register from "../Auth/Register";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import MainLayout from "../Layouts/MainLayout";
import AddSession from "../Pages/AddSession/AddSession";
import ErrorPage from "../Pages/ErrorPage.jx/ErrorPage";
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
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      // Nested route for AddSession under dashboard
      {
        path: "addSession", // Relative path (resulting in /dashboard/addSession)
        element: <AddSession></AddSession>,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);
