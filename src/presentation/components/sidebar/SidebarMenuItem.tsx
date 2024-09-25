import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  icon: string;
  title: string;
  description: string;
}

export default function SidebarMenuItem({
  to,
  icon,
  title,
  description,
}: Props) {
  return (
    <NavLink
      key={to}
      to={to}
      end
      className={({ isActive }) =>
        isActive
          ? "flex justify-center items-center text-white bg-gray-800 rounded-md p-2 mb-2 transition-colors"
          : "flex justify-center items-center text-gray-800 hover:bg-gray-800 hover:text-white rounded-md p-2 mb-2 transition-colors"
      }
    >
      <i className={`${icon} text-2xl mr-4 text-indigo-400`}> </i>
      <div className="flex flex-col flex-grow">
        <span className="text-inherit white-lg font-semibold">{title}</span>
        <span className="text-gray-400 text-sm">{description}</span>
      </div>
    </NavLink>
  );
}
