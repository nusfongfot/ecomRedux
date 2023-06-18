import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import { FormHelperText, IconButton, OutlinedInput } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styles from "./sign.module.scss";
import Image from "next/image";
import google from "@/public/icons/google.png";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import * as AuthAPI from "@/API/authAPI";
import { errorToast, successToast } from "@/utils/notification";
import { useLoadingStore } from "@/zustand/loadingStore";

const theme = createTheme();

const initialData = {
  email: "",
  password: "",
};

export default function SignIn({ providers }) {
  const router = useRouter();
  const { data: session } = useSession();

  const { startLoading, stopLoading } = useLoadingStore();
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState(initialData);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validate = () => {
    const newErrors = {};
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!re.test(values.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!values.password) {
      newErrors.password = "Password must be required";
    }
    return newErrors;
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
        await AuthAPI.login(values);
        successToast("Login Succesfully", 1000);
        router.replace("/");
      }
      stopLoading();
    } catch (error) {
      if (error.code === "ERR_BAD_REQUEST") {
        errorToast("Email or Password is not correct!", 1000);
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
        <CssBaseline />
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                margin="normal"
                type="email"
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
                name="password"
                value={values.password}
                onChange={handleOnChange}
                type={showPassword ? "text" : "password"}
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>

              <Grid item>
                <Link onClick={() => router.push("/signup")} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 2,
                width: "100%",
              }}
            >
              <Box className={styles.line} />
              <Typography>or</Typography>
              <Box className={styles.line} />
            </Box>

            {providers.map((provider) => {
              return (
                <Button
                  key={provider.id}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                  variant="contained"
                  onClick={() => {
                    signIn(provider.id, {
                      redirect: false,
                      callbackUrl: "/",
                    });
                  }}
                >
                  <Image height={20} width={20} src={google} alt="google" />
                  Sign in with {provider.name}
                  <Box />
                </Button>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
