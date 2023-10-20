import { Data, ErrorPage, Template } from "./pages/index.js";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  RenderArea,
  RenderHeading,
  RightBar,
  RouterGuard,
} from "./components/index.js";

const ROUTES = {
  data: "data",
  template: "template",
  render: "render",
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.data,
        element: <Data />,
      },
      {
        path: ROUTES.template,
        element: (
          <RouterGuard>
            <Template />
          </RouterGuard>
        ),
      },
      {
        path: ROUTES.render,
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
