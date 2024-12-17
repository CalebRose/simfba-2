import { LockClosedIcon } from "@heroicons/react/16/solid";

export const LockIcon = ({ textColorClass }) => {
  return (
    <div className="absolute bottom-2 right-2">
      <LockClosedIcon
        className="size-6"
        style={{
          stroke: textColorClass === "text-white" ? "#FFF" : "#000",
          fill: textColorClass === "text-white" ? "#FFF" : "#000",
        }}
      />
    </div>
  );
};
