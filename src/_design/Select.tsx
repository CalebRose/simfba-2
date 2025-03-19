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
  control: (base: CSSObjectWithLabel) => ({
    ...base,
    minHeight: "32px", // shorter control
    fontSize: "0.75rem", // smaller text
  }),
  valueContainer: (base: CSSObjectWithLabel) => ({
    ...base,
    padding: "0 6px", // tighter padding
  }),
  singleValue: (base: CSSObjectWithLabel) => ({
    ...base,
    fontSize: "0.75rem",
  }),
  placeholder: (base: CSSObjectWithLabel) => ({
    ...base,
    fontSize: "0.75rem",
  }),
  menu: (base: CSSObjectWithLabel) => ({
    ...base,
    fontSize: "0.75rem",
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
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
      }} // Pass the generic type
      menuPortalTarget={document.body}
      menuPosition="fixed"
      {...props}
    />
  );
};
