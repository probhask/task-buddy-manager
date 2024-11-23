import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";

import { FORM_CONTROLS } from "@/types";
import { StyledTextField } from "../ui/custom-mui-style";
import { useFormikContext } from "formik";

function CommonFormElement({ currentItem }: { currentItem: FORM_CONTROLS }) {
  const { values, handleChange, handleBlur, setFieldValue } =
    useFormikContext<any>();
  const renderElement = () => {
    switch (currentItem?.componentType) {
      case "input":
        return (
          <StyledTextField
            // {...currentItem}
            type={currentItem.type}
            name={currentItem.name}
            id={currentItem?.name}
            placeholder={currentItem?.placeholder}
            value={values[currentItem?.name]}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="standard"
          />
        );

      case "checkbox": {
        return (
          <>
            <FormGroup
              row
              sx={{
                ":hover": {
                  color: "var(--color-text-primary)",
                },
              }}
            >
              {currentItem?.options &&
                currentItem.options.length > 0 &&
                currentItem.options.map((option) => (
                  <FormControlLabel
                    key={option.name}
                    name={currentItem?.name}
                    id={currentItem?.name}
                    onBlur={handleBlur}
                    value={option.value}
                    control={
                      <Checkbox
                        sx={{
                          ":hover": {
                            backgroundColor: "var(--color-btn-hover)",
                          },
                          color: option.color || "var(--color-text-primary)",
                          "&.Mui-checked": {
                            color: option.color || "var(--color-text-primary)",
                          },
                        }}
                        checked={
                          Array.isArray(values[currentItem.name]) &&
                          values[currentItem.name].includes(option.value)
                        }
                        onChange={(e) => {
                          const newValue = e.target.checked
                            ? Array.from(
                                new Set([
                                  ...(values[currentItem?.name] || []),
                                  option.value,
                                ])
                              )
                            : values[currentItem?.name].filter(
                                (item: string) => item !== option.value
                              );
                          setFieldValue(currentItem.name, newValue);
                        }}
                      />
                    }
                    label={option.name}
                  />
                ))}
            </FormGroup>
          </>
        );
      }

      case "radio":
        return (
          <>
            <RadioGroup
              id={currentItem?.name}
              name={currentItem.name}
              value={values[currentItem.name]}
              onChange={handleChange}
              onBlur={handleBlur}
              row
              sx={{
                ":hover": {
                  color: "var(--color-text-primary)",
                },
              }}
            >
              {currentItem?.options &&
                currentItem.options.length > 0 &&
                currentItem.options.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={
                      <Radio
                        sx={{
                          color: option?.color || "var(--color-text-primary)",
                          ":hover": {
                            backgroundColor: "var(--color-btn-hover)",
                          },
                          "&.Mui-checked": {
                            color: option?.color || "var(--color-text-primary)",
                          },
                        }}
                      />
                    }
                    label={option.name}
                  />
                ))}
            </RadioGroup>
          </>
        );

      case "select":
        return (
          <>
            <Select
              name={currentItem.name}
              id={currentItem.name}
              value={values[currentItem?.name]}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{
                backgroundColor: "var(--color-task-list)",
                color: "var(--color-text-primary)",

                "&.MuiOutlinedInput-root": {
                  color: "var(--color-text-secondary)",
                },
                "& fieldset": {
                  borderColor: "var(--color-text-primary)",
                  colors: "var(--color-text-primary)",
                  ":hover": {
                    borderColor: "var(--color-text-primary)",
                  },
                },
                "&:hover fieldset": {
                  borderColor: "var(--color-text-primary)",
                  color: "var(--color-text-primary)",
                },
                "& .Mui-focused fieldset": {
                  borderColor: "var(--color-text-primary)",
                  color: "var(--color-text-primary)",
                },
                "& input": {
                  //   backgroundColor: "var(--color-text-primary)",
                  color: "var(--color-text-primary)",
                },
              }}
            >
              {currentItem.items &&
                currentItem.items.length > 0 &&
                currentItem.items.map((item) => (
                  <MenuItem key={item.name} value={item.value}>
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
          </>
        );

      default:
        return <StyledTextField {...currentItem} name={currentItem.name} />;
    }
  };
  return renderElement();
}

export default CommonFormElement;
