import React from "react";
import { Text } from "./Text";

export const Logo = ({
  url,
  variant = "normal",
  label,
  classes = "",
  textClass = "",
}) => {
  const styles = {
    tiny: "max-h-8 max-w-8",
    normal: "max-h-20 max-w-20",
    small: "max-h-12 max-w-12",
    large: "h-40",
  };

  const logoStyle = styles[variant] || styles.normal;

  return (
    <div className={`flex flex-col justify-center ${classes}`}>
      <img
        className={`self-center object-contain align-middle items-center ${logoStyle}`}
        src={url}
        alt="user photo"
      />
      {label && label.length > 0 && (
        <Text as="headerSm" classes={`font-semibold ${textClass}`}>
          {label}
        </Text>
      )}
    </div>
  );
};
