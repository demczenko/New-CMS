import { Data, ErrorPage, Render, Template } from "./pages/index.js";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  RenderArea,
  RenderHeading,
  RightBar,
  RouterGuard,
} from "./components/index.js";

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
        element: (
          <RouterGuard>
            <Template />
          </RouterGuard>
        ),
      },
      {
        path: "render",
        element: (
          <RouterGuard>
            <RenderArea>
              <RenderHeading />
              <RightBar />
            </RenderArea>
          </RouterGuard>
        ),
      },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={routes} />;
};
