import React from "react";

const tags = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body: "p",
  "body-small": "p",
  small: "p",
  xs: "p",
  alternate: "p"
};

const sizes = {
  h1: "text-4xl sm:text-5xl font-semibold",
  h2: "text-3xl sm:text-4xl font-semibold",
  h3: "text-2xl sm:text-3xl font-semibold",
  h4: "text-xl sm:text-2xl font-semibold",
  h5: "text-lg sm:text-xl font-semibold",
  h6: "text-base sm:text-lg font-semibold",
  body: "text-base sm:text-lg",
  "body-small": "text-sm sm:text-base",
  small: "text-xs sm:text-sm",
  xs:"text-[0.5em] sm:text-[0.7em]",
  alternate: "text-xs sm:text-lg"
};

const styles = {
  primary: "font-sans antialiased",
  secondary: "font-sans antialiased text-gray-400",
  success: "font-sans antialiased text-green-500",
  danger: "font-sans antialiased text-red-500",
};

export const Text = ({ variant = "primary", children, className = "", as, classes = "", ...props }) => {
  const sizeClasses = sizes[variant];
  const Tag = as || tags[variant];
  const textStyle = styles[variant] || styles.primary;
  const finalClass = `${textStyle} ${sizeClasses} ${className} ${classes}`;

  return <Tag className={finalClass} {...props}>{children}</Tag>;
};