import { Data, ErrorPage, Render, Template } from "./pages/index.js";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RouterGuard } from "./components/index.js";

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
        element: <RouterGuard><Render /></RouterGuard>,
      },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={routes} />;
};
