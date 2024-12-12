import { NavLink } from "react-router";
import { ROOT_PATH } from "../../settings/routePath";

export default function TopBar() {
  return (
    <nav className="h-20 flex gap-x-2 bg-slate-500">
      <NavLink
        className={({ isActive }) =>
          `text-xl px-2 grid place-items-center ${
            isActive ? "text-lime-500" : ""
          }`
        }
        to={ROOT_PATH}
      >
        Home
      </NavLink>
    </nav>
  );
}
