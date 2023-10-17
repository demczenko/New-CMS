import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { RightBar, Sidebar } from "./components";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { pathname } = useLocation();
  return (
    <>
      <Toaster />
      <main className="grid grid-cols-12 min-h-screen">
        <div className="col-span-full md:col-span-3 p-4">
          <Sidebar />
        </div>
        {pathname === "/render" ? (
          <Outlet />
        ) : (
          <div className="col-span-full md:col-span-9 py-4">
            <div className="container mx-auto px-4">
              <Outlet />
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default App;
