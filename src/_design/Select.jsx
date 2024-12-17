import React from "react";
import Select from "react-select";
import { selectStyles } from "../_hooks/useSelectStyles";

export const SelectDropdown = (props) => {
  return <Select styles={selectStyles} {...props} />;
};
