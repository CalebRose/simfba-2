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
    tiny: "h-6 max-h-6 max-w-8",
    normal: "h-8 md:h-20 md:max-h-20 md:max-w-20",
    small: "h-12 md:max-h-12 md:max-w-12",
    large: "h-14 max-w-14 md:h-40 md:max-w-40",
  };

  const logoStyle = styles[variant] || styles.normal;

  return (
    <div className={`flex flex-col justify-center items-center ${classes}`}>
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
