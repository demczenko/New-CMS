import { Link, useLocation } from "react-router-dom";
import { Separator } from "./ui/separator";
import { ComponentIcon, DatabaseIcon, LayoutTemplate } from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <nav>
      {isOpen ? (
        <ul className="space-y-2 p-4 absolute z-10 inset-0 bg-white/60 backdrop-blur-sm">
          <span className="text-xl font-semibold text-neutral-800">
            Navigation
          </span>
          <Separator />
          <SidebarItem
            onClick={onClose}
            icon={<DatabaseIcon />}
            title="Data"
            to={"data"}
          />

          <SidebarItem
            onClick={onClose}
            icon={<LayoutTemplate />}
            title="Templates"
            to={"template"}
          />
          <SidebarItem
            onClick={onClose}
            icon={<ComponentIcon />}
            title="Render"
            to={"render"}
          />
        </ul>
      ) : (
        <ul className="space-y-2">
          <span className="text-xl font-semibold text-neutral-800">
            Navigation
          </span>
          <Separator />
          <SidebarItem icon={<DatabaseIcon />} title="Data" to={"data"} />
          <SidebarItem
            icon={<LayoutTemplate />}
            title="Templates"
            to={"template"}
          />
          <SidebarItem icon={<ComponentIcon />} title="Render" to={"render"} />
        </ul>
      )}
    </nav>
  );
};

const SidebarItem = ({ icon, title, to, onClick }) => {
  const { pathname } = useLocation();
  return (
    <li
      className="flex items-center gap-2"
      onClick={onClick ? onClick : () => {}}>
      {icon}
      <Link
        className={`rounded-md grow p-2 block cursor-pointer transition-colors font-semibold hover:bg-slate-50 ${
          pathname.includes(to) && "bg-slate-100"
        } dark:text-white`}
        to={to}>
        {title}
      </Link>
    </li>
  );
};

export default Sidebar;
