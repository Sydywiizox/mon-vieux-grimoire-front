import type { StylesConfig } from "react-select";
import type { Option } from "../constants/genres";

export const reactSelectStyles: StylesConfig<Option, false> = {
  control: (base, state) => ({
    ...base,
    minHeight: 42,
    height: 42,
    borderRadius: 8, // rounded-lg
    borderColor: state.isFocused
      ? "#f59e0b" /* amber-500 */
      : "#d1d5db" /* gray-300 */,
    boxShadow: state.isFocused ? "0 0 0 2px rgba(245, 158, 11, 0.4)" : "none", // focus:ring-amber-400
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
    height: 42,
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
