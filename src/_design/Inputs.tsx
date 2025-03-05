import React, { ChangeEvent } from "react";

interface ToggleSwitchProps {
  // The current boolean state of the switch.
  checked: boolean;
  // Callback to toggle the switch state.
  onChange: (checked: boolean) => void;
  // Optional extra classes for the overall container.
  className?: string;
  // Optional extra classes for the switch track.
  trackClassName?: string;
  // Optional extra classes for the switch knob.
  knobClassName?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  className = "",
  trackClassName = "",
  knobClassName = "",
}) => {
  return (
    <div
      className={`relative inline-block w-12 h-6 ${className}`}
      onClick={() => onChange(!checked)}
    >
      {/* Hidden checkbox for accessibility */}
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="opacity-0 w-0 h-0"
      />
      {/* Track */}
      <span
        className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-colors duration-300 ${
          checked ? "bg-blue-500" : "bg-gray-300"
        } ${trackClassName}`}
      ></span>
      {/* Knob */}
      <span
        className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 transform ${
          checked ? "translate-x-6" : "translate-x-0"
        } ${knobClassName}`}
      ></span>
    </div>
  );
};
