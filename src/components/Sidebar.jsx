import { Link, useLocation } from "react-router-dom";
import {
  ComponentIcon,
  DatabaseIcon,
  GithubIcon,
  LayoutTemplate,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";

const Sidebar = () => {
  return (
    <nav className="border-b mb-6 p-2 flex items-center justify-between">
      <span className="text-2xl font-semibold flex items-end gap-2">
        CMS by
        <a target="_blank" href="https://github.com/DemaPy">
          <GithubIcon className="w-6 h-6" />
        </a>
        <Badge>BETA 1.0</Badge>
      </span>
      <div>
        <ul className="space-x-2 hidden md:flex">
          <Button variant="secondary" className="">
            <SidebarItem icon={<DatabaseIcon />} title="Data" to={"data"} />
          </Button>
          <Button variant="secondary" className="">
            <SidebarItem
              icon={<LayoutTemplate />}
              title="Templates"
              to={"template"}
            />
          </Button>
          <Button variant="secondary" className="">
            <SidebarItem
              icon={<ComponentIcon />}
              title="Render"
              to={"render"}
            />
          </Button>
        </ul>
        <DropdownMenu>
          <DropdownMenuTrigger className="block md:hidden" asChild>
            <Button variant="outline">Navigation</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-fit">
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="space-y-2">
              <DropdownMenuItem asChild>
                <Button variant="secondary" className="w-full justify-start">
                  <SidebarItem
                    icon={<DatabaseIcon />}
                    title="Data"
                    to={"data"}
                  />
                </Button>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Button variant="secondary" className="w-full justify-start">
                  <SidebarItem
                    icon={<LayoutTemplate />}
                    title="Templates"
                    to={"template"}
                  />
                </Button>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Button variant="secondary" className="w-full justify-start">
                  <SidebarItem
                    icon={<ComponentIcon />}
                    title="Render"
                    to={"render"}
                  />
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

const SidebarItem = ({ icon, title, to }) => {
  const { pathname } = useLocation();
  return (
    <li className="flex items-center gap-2">
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
