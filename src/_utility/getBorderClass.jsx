export const GetGradientBorderClass = (bool, variant, theme) => {
  const baseColor = theme === "light" ? "gray-200" : "gray-700";
  let variantColors = {
    success: "green-500",
    danger: "red-500",
    warning: "yellow-500",
  };
  let color = bool ? variantColors[variant] : baseColor;
  return `bg-gradient-to-b from-${color} to-${baseColor} bg-clip-padding`;
};

export const GetBorderClass = (variant = "", theme) => {
  const baseColor = theme === "light" ? "gray-200" : "gray-700";
  let variantColors = {
    success: "green-500",
    danger: "red-500",
    warning: "yellow-500",
  };
  let color = variant.length > 0 ? variantColors[variant] : baseColor;
  return `border-2 border-${color}`;
};

export const getTextColorBasedOnBg = (bgColor = "") => {
  // Remove the # if it exists
  if (bgColor === "") return "text-black";
  const hex = bgColor.replace("#", "");

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  // Return black or white based on luminance
  return luminance > 0.83
    ? "text-black"
    : luminance > 0.5
    ? "text-gray-900"
    : "text-white";
};
