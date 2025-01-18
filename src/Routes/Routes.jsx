import { createBrowserRouter } from "react-router-dom";
import Register from "../Auth/Register";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import MainLayout from "../Layouts/MainLayout";
import AddSession from "../Pages/Dashboard/Tutor/AddSession/AddSession";
import UploadMeterials from "../Pages/Dashboard/Tutor/UploadMeterials/UploadMeterials";
import ErrorPage from "../Pages/ErrorPage.jx/ErrorPage";
import Home from "../Pages/Home/Home";
import SessionDetails from "../Pages/SessionDetails/SessionDetails";
import AuthLayout from "./../Auth/AuthLayout";
import Login from "./../Auth/Login";

import CreateNote from "../Pages/Dashboard/Student/CreateNote";
import AllSession from "./../Pages/Dashboard/Tutor/AllSession/AllSession";
import PrivateRoute from "./PrivateRoute";

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
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // Tutor Routes

      {
        path: "addSession",
        element: <AddSession></AddSession>,
      },
      {
        path: "allSessions",
        element: <AllSession></AllSession>,
      },
      {
        path: "UploadMaterials",
        element: <UploadMeterials></UploadMeterials>,
      },
      // student
      {
        path: "CreateNote",
        element: <CreateNote></CreateNote>,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);
