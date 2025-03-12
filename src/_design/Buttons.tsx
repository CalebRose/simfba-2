import React, { ButtonHTMLAttributes, ReactNode } from "react";

// 🔑 Define Button Props Interface
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "success" | "danger";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  classes?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  disabled = false,
  size = "md",
  classes = "",
  ...props
}) => {
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white",
    secondary: "bg-gray-500 hover:bg-gray-700 text-white",
    success: "bg-green-500 hover:bg-green-700 text-white",
    danger: "bg-red-500 hover:bg-red-700 text-white",
  };

  const sizes = {
    sm: "text-sm px-3 py-2",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3",
  };

  const disabledStyles = "bg-gray-400 text-gray-300 cursor-not-allowed";

  // ✅ Combine styles based on props
  const buttonStyle = `${variants[variant] || variants.primary} ${
    sizes[size] || sizes.md
  } ${disabled ? disabledStyles : ""}`;

  return (
    <button
      className={`rounded shadow transition-all duration-200 ${buttonStyle}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// 🔑 Define PillButton Props Interface
interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  classes?: string;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "basketball"
    | "hockey"
    | "primaryOutline"
    | "secondaryOutline"
    | "successOutline"
    | "dangerOutline"
    | "basketballOutline"
    | "hockeyOutline";
  isSelected?: boolean;
}

export const PillButton: React.FC<PillButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  isSelected = false,
  classes = "",
  ...props
}) => {
  const styles = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white",
    secondary: "bg-gray-500 hover:bg-gray-700 text-white",
    success: "bg-green-500 hover:bg-green-700 text-white",
    danger: "bg-red-500 hover:bg-red-700 text-white",
    basketball: "bg-orange-500 hover:bg-orange-700 text-white",
    hockey: "bg-gray-500 hover:bg-gray-700 text-white",
    primaryOutline:
      "bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white border border-blue-500 hover:border-transparent",
    secondaryOutline:
      "bg-transparent hover:bg-gray-500 text-gray-500 font-semibold hover:text-white border border-gray-500 hover:border-transparent",
    successOutline:
      "bg-transparent hover:bg-green-500 text-green-500 font-semibold hover:text-white border border-green-500 hover:border-transparent",
    dangerOutline:
      "bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white border border-red-500 hover:border-transparent",
    basketballOutline:
      "bg-transparent hover:bg-orange-500 text-orange-500 font-semibold hover:text-white border border-orange-500 hover:border-transparent",
    hockeyOutline:
      "bg-transparent hover:bg-gray-500 text-gray-500 font-semibold hover:text-white border border-gray-500 hover:border-transparent",
  };

  // ✅ Apply selected styles
  const buttonStyle = isSelected
    ? styles.success
    : styles[variant] || styles.primary;

  return (
    <button
      type="button"
      className={`flex items-center justify-center px-2 min-[320px]:h-8 md:max-w-[5.5em] lg:max-w-[8em] lg:w-auto sm:h-12 md:px-4 min-[320px]:mb-2 rounded-full shadow ${buttonStyle} ${classes}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// 🔑 Define ButtonGroup Props Interface
interface ButtonGroupProps {
  children: ReactNode;
  classes?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  classes = "",
}) => {
  return (
    <div
      className={`flex pt-2 lg:pt-0 flex-wrap flex-row space-x-2 gap-y-2 lg:space-x-2 ${classes}`}
    >
      {children}
    </div>
  );
};
