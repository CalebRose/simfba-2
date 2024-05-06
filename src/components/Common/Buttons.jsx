import React from "react";

export const Button = ({
  children,
  variant = "primary",
  onClick,
  ...props
}) => {
  const styles = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white",
    secondary: "bg-gray-500 hover:bg-gray-700 text-white",
    success: "bg-green-500 hover:bg-green-700 text-white",
    danger: "bg-red-500 hover:bg-red-700 text-white",
    // Add more variants as needed
  };
  // Use the styles for the provided variant, or default to primary if not found
  const buttonStyle = styles[variant] || styles.primary;

  return (
    <button
      className={`px-2 py-1 min-[320px]:h-10 sm:h-12 min-[320px]:px-3 min-[320px]:py-1.5 md:px-4 md:py-2 min-[320px]:mb-2 rounded shadow ${buttonStyle}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonGroup = ({ children, classes }) => {
  return (
    <div className={`flex flex-wrap flex-row space-x-2 ${classes}`}>
      {children}
    </div>
  );
};
