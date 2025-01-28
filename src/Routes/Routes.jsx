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
import ViewAllTutorMaterials from "../Pages/Dashboard/Tutor/ViewAllTutorMaterials/ViewAllTutorMaterials";
import ViewAll from "./../component/ViewAll";
import ManageAllSession from "./../Pages/Dashboard/Admin/ManageAllSession";
import UpdateSession from "./../Pages/Dashboard/Admin/UpdateSession";
import ViewAllMaterials from "./../Pages/Dashboard/Admin/ViewAllMaterials";
import ViewAllUsers from "./../Pages/Dashboard/Admin/ViewAllUsers";
import Payment from "./../Pages/Dashboard/Payment/Payment";
import AllMaterialsStudent from "./../Pages/Dashboard/Student/AllMaterialsStudent";
import ManageNote from "./../Pages/Dashboard/Student/ManageNote";
import ViewBookedSession from "./../Pages/Dashboard/Student/ViewBookedSession";
import AllSession from "./../Pages/Dashboard/Tutor/AllSession/AllSession";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import StudentRoute from "./StudentRoute";
import TutorRoute from "./TutorRoute";
import WelcomeDashboard from "../Pages/Dashboard/common/WelcomeDashboard";

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
      {
        path: "sessions",
        element: <ViewAll></ViewAll>,
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
      // admin routes
      {
        index: true, 
        element:<WelcomeDashboard></WelcomeDashboard>,
      },
      {
        path: "viewAllUsers",
        element: (
          <AdminRoute>
            <ViewAllUsers></ViewAllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "viewAllSession",
        element: (
          <AdminRoute>
            <ManageAllSession></ManageAllSession>
          </AdminRoute>
        ),
      },
      {
        path: "updateSession/:id",
        element: (
          <AdminRoute>
            <UpdateSession></UpdateSession>
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://study-platform-server-eta.vercel.app/session/${params.id}`
          ),
      },
      {
        path: "viewAllMaterials",
        element: (
          <AdminRoute>
            <ViewAllMaterials></ViewAllMaterials>
          </AdminRoute>
        ),
      },

      // Tutor Routes

      {
        path: "addSession",

        element: (
          <TutorRoute>
            <AddSession></AddSession>
          </TutorRoute>
        ),
      },
      {
        path: "allSessions",
        element: <AllSession></AllSession>,
      },
      {
        path: "UploadMaterials",
        element: (
          <TutorRoute>
            <UploadMeterials></UploadMeterials>
          </TutorRoute>
        ),
      },
      {
        path: "viewAllTutorMaterials",
        element: (
          <TutorRoute>
            <ViewAllTutorMaterials></ViewAllTutorMaterials>
          </TutorRoute>
        ),
      },
      // student
      {
        path: "payment/:id",
        element: <Payment></Payment>,
        loader: ({ params }) =>
          fetch(
            `https://study-platform-server-eta.vercel.app/booked/${params.id}`
          ),
      },
      {
        path: "CreateNote",
        element: (
          <StudentRoute>
            <CreateNote></CreateNote>
          </StudentRoute>
        ),
      },
      {
        path: "viewBookedSession",
        element: (
          <StudentRoute>
            <ViewBookedSession></ViewBookedSession>
          </StudentRoute>
        ),
      },
      {
        path: "manageNote",
        element: (
          <StudentRoute>
            <ManageNote></ManageNote>
          </StudentRoute>
        ),
      },
      {
        path: "StudentAllMaterials",
        element: (
          <StudentRoute>
            <AllMaterialsStudent></AllMaterialsStudent>
          </StudentRoute>
        ),
      },
      // common can visit all user
    ],
  },

  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);
