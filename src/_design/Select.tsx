import Select, {
  Props as SelectProps,
  GroupBase,
  CSSObjectWithLabel,
} from "react-select";
import { SelectOption, selectStyles } from "../_hooks/useSelectStyles";
import { useMobile } from "../_hooks/useMobile";

// 🔑 Properly type the props using the generic for multi-select
type SelectDropdownProps<IsMulti extends boolean = false> = SelectProps<
  SelectOption,
  IsMulti,
  GroupBase<SelectOption>
>;

const mobileFriendlySelectStyles = {
  control: (base: CSSObjectWithLabel, state: any) => ({
    ...base,
    minHeight: "32px", // shorter control
    fontSize: "0.75rem", // smaller text
    backgroundColor: state.isFocused ? "#2d3748" : "#1a202c",
    borderColor: state.isFocused ? "#4A90E2" : "#4A5568",
    color: "#ffffff",
    padding: "0.3rem",
    boxShadow: state.isFocused ? "0 0 0 1px #4A90E2" : "none",
    borderRadius: "8px",
    transition: "all 0.2s ease",
  }),
  valueContainer: (base: CSSObjectWithLabel) => ({
    ...base,
    padding: "0 6px", // tighter padding
  }),
  singleValue: (base: CSSObjectWithLabel) => ({
    ...base,
    fontSize: "0.75rem",
    color: "#fff",
  }),
  placeholder: (base: CSSObjectWithLabel) => ({
    ...base,
    fontSize: "0.75rem",
    color: "#A0AEC0",
  }),
  option: (base: any, state: { isFocused: any }) => ({
    ...base,
    backgroundColor: state.isFocused ? "#2d3748" : "#1a202c",
    color: "#fff",
    padding: "10px",
    cursor: "pointer",
    // etc.
  }),
  menu: (base: CSSObjectWithLabel) => ({
    ...base,
    fontSize: "0.75rem",
    backgroundColor: "#1a202c",
    borderRadius: "8px",
  }),
  menuList: (provided: any) => ({
    ...provided,
    backgroundColor: "#1a202c",
    padding: "0",
  }),
};

export const SelectDropdown = <IsMulti extends boolean = false>(
  props: SelectDropdownProps<IsMulti>
) => {
  const [isMobile] = useMobile();
  const mobileStyle = isMobile ? mobileFriendlySelectStyles : {};
  return (
    <Select<SelectOption, IsMulti>
      placeholder={props.placeholder || "Select an option..."}
      styles={{
        ...selectStyles<IsMulti>(),
        ...mobileStyle,
        ...props.styles,
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
      }} // Pass the generic type
      menuPortalTarget={document.body}
      menuPosition="fixed"
      {...props}
    />
  );
};
