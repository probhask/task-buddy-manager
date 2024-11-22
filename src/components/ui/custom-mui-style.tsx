import {
  FormControl,
  FormLabel,
  TextField,
  Typography,
  styled,
} from "@mui/material";

export const ErrorText = styled(Typography)({
  fontSize: "12px",
  marginTop: "3px",
  marginLeft: "5px",
  fontWeight: "500",
  color: "#C62E2E",
});
export const StyledFormControl = styled(FormControl)({
  display: "flex",
  flexDirection: "column",
  gap: 2,
  width: "100%",
});
export const StyledFormLabel = styled(FormLabel)({
  fontWeight: 600,
  width: "fit-content",
  color: `var(--color-text-primary)`,
});

export const StyledTextField = styled(TextField)({
  accentColor: "red",
  caretColor: "var(--color-text-primary)",
  width: "100%",
  color: "var(--color-text-primary)",

  "& .MuiInputBase-root": {
    color: "var(--color-text-primary)",
  },
  "& .MuiInputBase-root:hover:focus:focus-visible:focus-within": {
    color: "var(--color-text-primary)",
  },

  "& .MuiInput-underline:before": {
    borderBottomColor: "var(--color-text-primary)", // default border color (white with  opacity 0.5)
  },
  "& .MuiInput-underline:hover:before": {
    borderBottomColor: "var(--color-text-primary)", // hover state border color (fully white )
  },
  "& .MuiInput-underline:hover:after": {
    borderBottomColor: "var(--color-text-primary)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "var(--color-text-primary)", // Focused state border color  when we leave cursor out off input
  },
  "& .Mui-error:after": {
    borderBottomColor: "var(--color-text-primary)",
  },
  // overflow: "hidden",
  "& .MuiOutlinedInput-root": {
    // backgroundColor: "var(--color-accent-primary)",
    color: "var(--color-text-primary)",
    "& fieldset": {
      borderColor: "var(--color-text-primary)",
      colors: "var(--color-text-primary)",
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
  },
  "& .MuiInputLabel-root": {
    color: "var(--color-text-primary)",
    fontWeight: 600,
  },
  "& label .Mui-focused": {
    color: "var(--color-text-primary)",
  },
  // "& .MuiInputLabel-root.Mui-focused": {
  //   color: "var(--color-text-primary)",
  // },
});
