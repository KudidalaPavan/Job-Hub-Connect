import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import AdditionalDetails from "./Components/AdditionalDetails/AdditionalDeatils";
import UploadResume from "./Components/AdditionalDetails/UploadResume";
import AppliedJobs from "./Components/AppliedJobs/AppliedJobs";
import Blog from "./Components/Blog/Blog";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import Home from "./Components/Home/Home";
import JobDetails from "./Components/JobDetails/JobDetails";
import JobSection from "./Components/JobSection/JobSection2";
import Login from "./Components/Register/Login";
import Register from "./Components/Register/Register";
import Review from "./Components/Review/Review";
import SimplePieChart from "./Components/Statistic/pie";
import Statistic from "./Components/Statistic/Statistic";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "registerPage",
    element: <Register />,
  },
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/allJobs",
        element: <JobSection />,
      },
      {
        path: "/additionalDetails/:id",
        element: <AdditionalDetails />,
      },
      {
        path: "/uploadResume/:id",
        element: <UploadResume />,
      },
      {
        path: "/appliedjobs",
        element: <AppliedJobs />,
      },
      {
        path: "/home",
        element: <Home />,
        loader: () => fetch('/category.json'),
      },
      {
        path: "details",
        element: <JobDetails />,
      },
      {
        path: "details/:id",
        element: <JobDetails />,
        loader: () => fetch('/company.json'),
      },
      {
        path: "faq",
        element: <Blog />,
      },
      {
        path: "stat",
        element: <Statistic />,
      },
      {
        path: "pie",
        element: <SimplePieChart />,
      },
      {
        path: "review/:id",
        element: <Review />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);