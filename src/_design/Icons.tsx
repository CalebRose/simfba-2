import React from "react";
import {
  LockClosedIcon,
  ScissorsIcon,
  ShieldExclamationIcon,
  ShieldCheckIcon,
  UserPlusIcon,
  UserIcon,
  InformationCircleIcon,
  IdentificationIcon,
} from "@heroicons/react/16/solid";

// 🔑 Define Props Interface for LockIcon
interface LockIconProps {
  textColorClass?: "text-white" | "text-black" | string; // Add specific classes for better type safety
}

export const LockIcon: React.FC<LockIconProps> = ({
  textColorClass = "text-black",
}) => {
  // ✅ Dynamically set stroke and fill based on the provided textColorClass
  const iconColor = textColorClass === "text-white" ? "#FFF" : "#000";

  return (
    <div className="absolute bottom-2 right-2">
      <LockClosedIcon
        className="size-6"
        style={{
          stroke: iconColor,
          fill: iconColor,
        }}
      />
    </div>
  );
};

export const ScissorIcon: React.FC<LockIconProps> = ({
  textColorClass = "text-black",
}) => {
  // ✅ Dynamically set stroke and fill based on the provided textColorClass
  const iconColor = textColorClass === "text-white" ? "#FFF" : "#000";

  return <ScissorsIcon className="size-5" />;
};

export const ShieldExclamation: React.FC<LockIconProps> = ({
  textColorClass = "text-black",
}) => {
  // ✅ Dynamically set stroke and fill based on the provided textColorClass
  const iconColor = textColorClass === "text-white" ? "#FFF" : "#000";

  return <ShieldExclamationIcon className="size-5" />;
};

export const ShieldCheck: React.FC<LockIconProps> = ({
  textColorClass = "text-black",
}) => {
  // ✅ Dynamically set stroke and fill based on the provided textColorClass
  const iconColor = textColorClass === "text-white" ? "#FFF" : "#000";

  return <ShieldCheckIcon className="size-5" />;
};

export const UserPlus: React.FC<LockIconProps> = ({
  textColorClass = "text-black",
}) => {
  // ✅ Dynamically set stroke and fill based on the provided textColorClass
  const iconColor = textColorClass === "text-white" ? "#FFF" : "#000";

  return <UserPlusIcon className="size-5" />;
};

export const User: React.FC<LockIconProps> = ({
  textColorClass = "text-black",
}) => {
  // ✅ Dynamically set stroke and fill based on the provided textColorClass
  const iconColor = textColorClass === "text-white" ? "#FFF" : "#000";

  return <UserIcon className="size-5" />;
};

export const Info: React.FC<LockIconProps> = ({
  textColorClass = "text-black",
}) => {
  // ✅ Dynamically set stroke and fill based on the provided textColorClass
  const iconColor = textColorClass === "text-white" ? "#FFF" : "#000";

  return <IdentificationIcon className="size-5" />;
};
