import React from "react";

export const Text = ({
  children,
  as = "p",
  variant = "primary",
  size = "sm",
  classes,
  ...props
}) => {
  const styles = {
    primary: "font-sans antialiased",
    secondary: "font-sans antialiased text-gray-400",
    success: "font-sans antialiased text-green-500",
    danger: "font-sans antialiased text-red-500",
    // Add more variants as needed
  };
  // Use the styles for the provided variant, or default to primary if not found
  const textStyle = styles[variant] || styles.primary;
  const fontSizeStyles = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const fontSize = fontSizeStyles[size] || fontSizeStyles.base;
  const classStr = classes ? classes : "";
  const finalClass = `${textStyle} ${as === "p" ? fontSize : ""} ${classStr}`;
  if (as === "headerLg") {
    return (
      <h2 className={`${finalClass}`} {...props}>
        {children}
      </h2>
    );
  }

  if (as === "headerMd") {
    return (
      <h3 className={`${finalClass}`} {...props}>
        {children}
      </h3>
    );
  }

  if (as === "headerSm") {
    return (
      <h5 className={`${finalClass}`} {...props}>
        {children}
      </h5>
    );
  }
  return (
    <p className={`${finalClass}`} {...props}>
      {children}
    </p>
  );
};
