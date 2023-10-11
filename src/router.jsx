import { Data, ErrorPage, Render, Template } from "./pages/index.js";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "data",
        element: <Data />,
      },
      {
        path: "template",
        element: <Template />,
      },
      {
        path: "render",
        element: <Render />,
      },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={routes} />;
};
