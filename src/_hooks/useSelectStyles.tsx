import { StylesConfig } from "react-select";

export interface SelectOption {
  value: string;
  label: string;
}

// 🔑 Define styles config using the correct type
export const selectStyles = <IsMulti extends boolean = false>(): StylesConfig<
  SelectOption,
  IsMulti
> => ({
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#2d3748" : "#1a202c",
    borderColor: state.isFocused ? "#4A90E2" : "#4A5568",
    color: "#ffffff",
    width: "40vw",
    maxWidth: "300px",
    padding: "0.3rem",
    boxShadow: state.isFocused ? "0 0 0 1px #4A90E2" : "none",
    borderRadius: "8px",
    transition: "all 0.2s ease",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#1a202c",
    borderRadius: "8px",
  }),
  menuList: (provided) => ({
    ...provided,
    backgroundColor: "#1a202c",
    padding: "0",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#2d3748" : "#1a202c",
    color: "#ffffff",
    padding: "10px",
    cursor: "pointer",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#ffffff",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#A0AEC0",
  }),
});
