import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav>
      <ul className="space-y-2">
        <SidebarItem title="Data" to={'data'} />
        <SidebarItem title="Templates" to={'template'} />
        <SidebarItem title="Render" to={'render'} />
      </ul>
    </nav>
  );
};

const SidebarItem = ({ title, to }) => {
  return (
    <li>
      <Link className="bg-slate-100 rounded-md p-4 block cursor-pointer transition-colors font-semibold hover:bg-slate-50 dark:text-white" to={to}>{title}</Link>
    </li>
  );
};

export default Sidebar;
