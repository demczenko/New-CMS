import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav>
      <ul className="space-y-2">
        <SidebarItem title="Data" to={"data"} />
        <SidebarItem title="Templates" to={"template"} />
        <SidebarItem title="Render" to={"render"} />
      </ul>
    </nav>
  );
};

const SidebarItem = ({ title, to }) => {
  const { pathname } = useLocation();
  return (
    <li>
      <Link
        className={`rounded-md p-2 block cursor-pointer transition-colors font-semibold hover:bg-slate-50 ${
          pathname.includes(to) && "bg-slate-100"
        } dark:text-white`}
        to={to}>
        {title}
      </Link>
    </li>
  );
};

export default Sidebar;
