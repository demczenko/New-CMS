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
              <div className="col-span-full md:col-span-6 py-4">
                <div className="container mx-auto px-4">
                  <RenderHeading />
                  <hr className="my-4" />
                  <Render />
                </div>
              </div>
              <div className="col-span-full md:col-span-3 py-4">
                <div className="container h-full mx-auto px-4">
                  <RightBar />
                </div>
              </div>
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
