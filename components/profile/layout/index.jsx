import Header from "@/components/header/header";
import Head from "next/head";
import styles from "./styles.module.scss";
import SideBarProfile from "../sidebar";
import { Box } from "@mui/material";

export default function LayoutProfile({ children, session, tab }) {
  return (
    <Box>
      <Head>
        <title>{session?.name}</title>
      </Head>
      <Header />
      <Box className={styles.layout_container}>
        <SideBarProfile
          data={{ image: session?.image, name: session?.name, tab }}
        />
        <Box className={styles.layout_content}>{children}</Box>
      </Box>
    </Box>
  );
}
