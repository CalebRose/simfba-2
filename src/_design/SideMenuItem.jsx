import { useState } from "react";

export const SideMenuItem = ({
  logo,
  label,
  isRoute,
  route,
  click,
  dropdown,
  isTop,
}) => {
  const [isOpen, setIsOpen] = useState(false); // State to track if dropdown is open

  // Toggle the isOpen state
  const toggleDropdown = (event) => {
    event.preventDefault(); // Prevent the default anchor action
    setIsOpen(!isOpen);
  };
  return (
    <li className={`flex flex-col items-center ${isTop ? "w-full" : ""}`}>
      <a
        href={isRoute ? route : "#"}
        onClick={dropdown ? toggleDropdown : click}
        className="flex w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        {logo && (
          <img
            src={logo}
            alt="sport logo"
            className="max-h-8 max-w-6 object-contain"
          />
        )}
        <span className="ml-3">{label}</span>
        {dropdown && (
          <span className="ml-auto">
            {" "}
            {/* Icon indicating dropdown */}
            {isOpen ? "▲" : "▼"}
          </span>
        )}
      </a>
      {isOpen && dropdown && (
        <ul className="pl-2">
          {dropdown.map((item, index) => (
            <SideMenuItem key={index} {...item} /> // Spread item properties if they are objects representing menu items
          ))}
        </ul>
      )}
    </li>
  );
};

const greyLabel = ({ label }) => (
  <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
    {label}
  </span>
);

const numberLabel = ({ num }) => (
  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
    {num}
  </span>
);
