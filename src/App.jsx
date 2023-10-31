import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./components";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

const App = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Toaster />
      <Sidebar />
      <main className="grid grid-cols-12 min-h-screen">
        <div className="col-span-12">
          <div className="container mx-auto md:px-4 px-2">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
