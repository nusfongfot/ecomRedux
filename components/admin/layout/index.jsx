import { Container, Grid, Box } from "@mui/material";
import SideBar from "./sidebar";
import styles from "./styles.module.scss";

export default function Layout({ children }) {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <SideBar />
      <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
