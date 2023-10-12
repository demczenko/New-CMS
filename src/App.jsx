import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./components";

const App = () => {
  return (
    <main className="grid grid-cols-12 min-h-screen">
      <div className="col-span-full md:col-span-3 p-4">
        <Sidebar />
      </div>
      <div className="col-span-full md:col-span-9 py-4">
        <div className="container mx-auto px-4">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default App;
