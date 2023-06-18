import { Box, MenuItem, TextField } from "@mui/material";
import styles from "./styles.module.scss";
import { ErrorMessage, useField } from "formik";

export default function SingularSelect({
  data,
  handleChange,
  placeholder,
  ...props
}) {
  const [field, meta] = useField(props);
  const valuesInput = props.value;
  return (
    <Box sx={{ margin: "10px", mb: 2 }}>
      <TextField
        variant="outlined"
        name={field.name}
        select
        label={placeholder}
        value={valuesInput}
        onChange={handleChange}
        sx={{
          background:
            meta.touched && meta.error && !valuesInput
              ? "rgb(243, 201, 201)"
              : "white",
        }}
        fullWidth
      >
        {data.map((item, i) => (
          <MenuItem key={i} value={item.name}>
            {item.name}
          </MenuItem>
        ))}
      </TextField>
      <p style={{ color: "red" }}>
        {meta.touched && meta.error && !valuesInput && (
          <ErrorMessage name={field.name} />
        )}
      </p>
    </Box>
  );
}
