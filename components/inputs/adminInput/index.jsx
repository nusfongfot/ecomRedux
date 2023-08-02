import { Box, TextField } from "@mui/material";
import styles from "../styles.module.scss";
import { useField } from "formik";
import styled from "@emotion/styled";

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    backgroundColor: "white",
    width: "100%",
  },
});

export default function AdminInput({ placeholder, label, ...props }) {
  const [field, meta] = useField({props});
  const valuesInput = props.value;

  return (
    <Box className={`${styles.input}`}>
      <StyledTextField
        fullWidth
        id="outlined-error-helper-text"
        label={placeholder}
        type={field.type}
        name={field.name}
        {...field}
        {...props}
      />

      <p style={{ color: "red" }}>
        {meta.touched && meta.error && <span>{meta.error.name}</span>}
      </p>
    </Box>
  );
}
