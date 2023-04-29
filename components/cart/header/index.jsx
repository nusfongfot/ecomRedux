import { AppBar, Box } from "@mui/material";
import styles from "./styles.module.scss";
import Link from "next/link";
import { MdPlayArrow } from "react-icons/md";

function Header() {
  return (
    <AppBar
      className={styles.header}
      sx={{ background: "black", height: "64px" }}
    >
      <Box className={styles.header_container}>
        <Box className={styles.header_left}>
          <Link href={"/"}>
            <img src="../../../logo.png" alt="logo" />
          </Link>
        </Box>
        <Box className={styles.header_right}>
          <Link href={"/browse"}>
            Continue Shopping <MdPlayArrow />
          </Link>
        </Box>
      </Box>
    </AppBar>
  );
}
export default Header;
