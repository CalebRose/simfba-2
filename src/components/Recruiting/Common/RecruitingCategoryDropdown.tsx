import { FC } from "react";
import { Button } from "../../../_design/Buttons";
import { Text } from "../../../_design/Typography";
import { SelectDropdown } from "../../../_design/Select";

interface RecruitingCategoryDropdownProps {
  label: string;
  options: { label: string; value: string }[];
  change: () => void;
}

export const RecruitingCategoryDropdown: FC<
  RecruitingCategoryDropdownProps
> = ({ label, options, change }) => {
  return (
    <div className="flex flex-col">
      <Text variant="h6" classes="text-start">
        {label}
      </Text>
      <SelectDropdown options={options} onChange={change} />
    </div>
  );
};
