import { ErrorMessage, useField } from "formik";
import styles from "../styles.module.scss";
import { Box, FormHelperText, TextField, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    backgroundColor: "white",
    width: "100%",
  },
});

export default function ShippingInput({ placeholder, ...props }) {
  const inputRef = useRef(null);
  const [field, meta] = useField(props);
  const [move, setMove] = useState(false);
  const valuesInput = props.value;

  return (
    <Box
      className={`${styles.input} ${
        meta.touched && meta.error && !valuesInput ? styles.error : styles.input
      }`}
    >
      <StyledTextField
        // error={false}
        fullWidth
        id="outlined-error-helper-text"
        label={placeholder}
        // helperText="Incorrect entry."
        type={field.type}
        name={field.name}
        {...field}
        {...props}
      />

      <p style={{ color: "red" }}>
        {meta.touched && meta.error && !valuesInput && (
          <ErrorMessage name={field.name} />
        )}
      </p>
    </Box>
  );
}
