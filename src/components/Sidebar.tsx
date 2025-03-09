import { NavLink } from "react-router-dom";
import { HomeIcon, CubeIcon, CalendarIcon, ChartBarIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  const navItems = [
    { name: "Stores", path: "/", icon: <HomeIcon className="w-5 h-5" /> },
    { name: "SKUs", path: "/skus", icon: <CubeIcon className="w-5 h-5" /> },
    { name: "Planning", path: "/planning", icon: <CalendarIcon className="w-5 h-5" /> },
    { name: "Charts", path: "/charts", icon: <ChartBarIcon className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      <div className="p-4 text-lg font-bold">GSynergy</div>
      <nav className="flex-1">
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 p-3 hover:bg-gray-700 transition ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
