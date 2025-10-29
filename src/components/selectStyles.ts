import type { StylesConfig } from "react-select";
import type { Option } from "../constants/genres";

export const reactSelectStyles: StylesConfig<Option, false> = {
  control: (base, state) => ({
    ...base,
    minHeight: 46,
    height: 46,
    borderRadius: 8, // rounded-lg
    borderColor: state.isFocused
      ? "#f59e0b" /* amber-500 */
      : "#d1d5db" /* gray-300 */,
    boxShadow: state.isFocused ? "0 0 0 2px rgba(255, 185, 0, 1)" : "none", // focus:ring-amber-400
    "&:hover": {
      borderColor: state.isFocused ? "#f59e0b" : "#d1d5db",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0 10px",
  }),
  indicatorsContainer: (base) => ({
    ...base,
    height: 46,
  }),
  input: (base) => ({
    ...base,
    margin: 0,
  }),
  menu: (base) => ({
    ...base,
    zIndex: 50,
  }),
  singleValue: (base) => ({
    ...base,
    marginLeft: 0,
    marginRight: 0,
  }),
  placeholder: (base) => ({
    ...base,
    marginLeft: 0,
    marginRight: 0,
    color: "#6b7280", // gray-500
  }),
};
