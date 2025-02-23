import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";

// 🔑 Define Props Interface for NavDropdownItem
interface NavDropdownItemProps {
  label: string;
  click?: () => void;
  isRoute?: boolean;
  route?: string;
}

export const NavDropdownItem: React.FC<NavDropdownItemProps> = ({
  label,
  click,
  isRoute = false,
  route = "#",
}) => {
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

// 🔑 Define Props Interface for NavDropdown
interface NavDropdownProps {
  children: ReactNode;
}

export const NavDropdown: React.FC<NavDropdownProps> = ({ children }) => {
  return (
    <ul className="py-1" role="menu">
      {children}
    </ul>
  );
};
