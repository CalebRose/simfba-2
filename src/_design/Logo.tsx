import React from "react";
import { Text } from "./Typography";

// 🔑 Define Props Interface for Logo
interface LogoProps {
  url: string;
  variant?: "tiny" | "normal" | "small" | "large";
  label?: string;
  classes?: string;
  textClass?: string;
}

export const Logo: React.FC<LogoProps> = ({
  url,
  variant = "normal",
  label,
  classes = "",
  textClass = "",
}) => {
  const styles: Record<NonNullable<LogoProps["variant"]>, string> = {
    tiny: "h-6 max-h-6 max-w-8",
    normal: "h-8 md:h-20 md:max-h-20 md:max-w-20",
    small: "h-12 md:max-h-12 md:max-w-12",
    large: "h-14 max-w-14 md:h-40 md:max-w-40",
  };

  const logoStyle = styles[variant] ?? styles.normal;

  return (
    <div className={`flex flex-col justify-center items-center ${classes}`}>
      <img
        className={`self-center object-contain align-middle items-center ${logoStyle}`}
        src={url}
        alt="logo"
      />
      {label && label.length > 0 && (
        <Text variant="alternate" className={textClass}>
          {label}
        </Text>
      )}
    </div>
  );
};
