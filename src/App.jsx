import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./components";
import { Toaster } from "react-hot-toast";
import { MenuIcon } from "lucide-react";
import { Button } from "./components/ui/button";
import { useState } from "react";

const App = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Toaster />
      <main className="grid grid-cols-12 min-h-screen relative">
        <div className="col-span-full md:col-span-3 p-4 hidden lg:block">
          <Sidebar />
        </div>
        <div className="col-span-2 md:col-span-1 p-4 block lg:hidden">
          <Button className="p-2" onClick={() => setIsOpen(!isOpen)}>
            <MenuIcon />
          </Button>
          {isOpen && <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)}/>}
        </div>
        {pathname === "/cms/render" ? (
          <Outlet />
        ) : (
          <div className="col-span-10 md:col-span-9 py-4">
            <div className="container mx-auto md:px-4 px-1">
              <Outlet />
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default App;
