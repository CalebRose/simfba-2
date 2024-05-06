import { NavLink } from "react-router-dom";

export const NavDropdownItem = ({ label, click, isRoute, route }) => {
  const listClass =
    "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white";
  return (
    <li>
      {isRoute ? (
        <NavLink to={route} className={listClass}>
          {label}
        </NavLink>
      ) : (
        <a href="#" className={listClass} role="menuitem" onClick={click}>
          {label}
        </a>
      )}
    </li>
  );
};

export const NavDropdown = ({ children }) => {
  return (
    <ul className="py-1" role="none">
      {children}
    </ul>
  );
};
