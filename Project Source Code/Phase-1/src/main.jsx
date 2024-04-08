import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import Home from "./Components/Home/Home";
import JobDetails from "./Components/JobDetails/JobDetails";
import JobSection from "./Components/JobSection/JobSection2";
import Login from "./Components/Register/Login";
import Register from "./Components/Register/Register";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/allJobs",
        element: <JobSection/>,
      },
      {
        path:"/homePage",
        element: <Home />,
        loader: () => fetch('/category.json'),
      },
      {
        path:"registerPage",
        element:<Register/>,
      },
      {
        path: "details",
        element: <JobDetails/>,
      },
      {
        path: "details/:id",
        element: <JobDetails />,
        loader: () => fetch('/company.json'),
        // loader: ({ params }) => fetch(`company.json/${params.id}`),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);