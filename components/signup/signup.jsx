import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import { FormHelperText, IconButton, OutlinedInput } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { successToast, errorToast } from "@/utils/notification";
import { useLoading } from "@/contexts/loadingContext";
import * as AuthAPI from "@/API/authAPI";

const theme = createTheme();

const initialData = {
  fullname: "",
  email: "",
  password: "",
  confirmpassword: "",
};

export default function SignUp() {
  const router = useRouter();
  const { startLoading, stopLoading } = useLoading();
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState(initialData);
  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const validate = () => {
    const newErrors = {};
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (values.fullname.length < 4) {
      newErrors.fullname = "FullName must be at least 4 characters.";
    }
    if (!re.test(values.email)) {
      newErrors.email = "Email is invalid";
    }
    if (values.password.length <= 5) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (values.confirmpassword !== values.password || !values.confirmpassword) {
      newErrors.confirmpassword = "Password doesn't match";
    }
    return newErrors;
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleOnChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    try {
      if (Object.keys(newErrors).length === 0) {
        startLoading();
        await AuthAPI.register(values);
        successToast("Register Succesfully", 1000);
        router.push("/");
        stopLoading();
      }
    } catch (error) {
      if (error.code === "ERR_BAD_REQUEST") {
        errorToast("This email already exists", 1000);
      }
      stopLoading();
    }
  };

  useEffect(() => {
    if (values) {
      setErrors(Boolean(!errors));
    }
  }, [values]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>

            <Box
              component="form"
              sx={{ width: "100%" }}
              onSubmit={handleSubmit}
            >
              <TextField
                margin="normal"
                fullWidth
                placeholder="Full Name"
                name="fullname"
                value={values.fullname}
                onChange={handleOnChange}
                error={Boolean(errors.fullname)}
                helperText={errors.fullname}
              />
              <TextField
                margin="normal"
                fullWidth
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleOnChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              <OutlinedInput
                placeholder="Password"
                fullWidth
                id="confirm"
                name="password"
                value={values.password}
                onChange={handleOnChange}
                type={showPassword ? "text" : "password"}
                sx={{ mt: 2 }}
                error={Boolean(errors.password)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText sx={{ ml: 2 }} error={Boolean(errors.password)}>
                {errors.password}
              </FormHelperText>
              <OutlinedInput
                placeholder="Confirm-Password"
                fullWidth
                id="outlined-adornment-password"
                name="confirmpassword"
                value={values.confirmpassword}
                onChange={handleOnChange}
                error={Boolean(errors.confirmpassword)}
                type={showPassword ? "text" : "password"}
                sx={{ mt: 3 }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText
                sx={{ ml: 2 }}
                error={Boolean(errors.confirmpassword)}
              >
                {errors.confirmpassword}
              </FormHelperText>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", mt: 2 }}
              onClick={() => router.push("/")}
            >
              <Button variant="text">Back To Home</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
