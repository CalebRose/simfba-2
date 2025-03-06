import Select, { Props as SelectProps, GroupBase } from "react-select";
import { SelectOption, selectStyles } from "../_hooks/useSelectStyles";

// 🔑 Properly type the props using the generic for multi-select
type SelectDropdownProps<IsMulti extends boolean = false> = SelectProps<
  SelectOption,
  IsMulti,
  GroupBase<SelectOption>
>;

export const SelectDropdown = <IsMulti extends boolean = false>(
  props: SelectDropdownProps<IsMulti>
) => {
  return (
    <div className="flex w-full">
      <Select<SelectOption, IsMulti>
        styles={{
          ...selectStyles<IsMulti>(),
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }} // Pass the generic type
        menuPortalTarget={document.body}
        menuPosition="fixed"
        {...props}
      />
    </div>
  );
};
