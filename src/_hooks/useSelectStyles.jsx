export const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#2d3748" : "#1a202c", // Darker background for dark mode
    borderColor: state.isFocused ? "#4A90E2" : "#4A5568", // Border color for focus
    color: "#ffffff", // Text color
    width: "300px", // Set dropdown width
    padding: "0.3rem",
    boxShadow: state.isFocused ? "0 0 0 1px #4A90E2" : "none", // Optional focus ring
    borderRadius: "8px",
    transition: "all 0.2s ease",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#1a202c", // Dark background for dropdown menu
    borderRadius: "8px",
  }),
  menuList: (provided) => ({
    ...provided,
    backgroundColor: "#1a202c", // Match dropdown menu
    padding: "0",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#2d3748" : "#1a202c", // Highlight on hover
    color: "#ffffff", // Text color
    padding: "10px",
    cursor: "pointer",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#ffffff", // Text color
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#A0AEC0", // Placeholder color
  }),
};
