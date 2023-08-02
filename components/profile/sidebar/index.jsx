import { sidebarData } from "@/data/profile";
import styles from "./styles.module.scss";
import Item from "./item";
import { Box, Typography } from "@mui/material";

export default function SideBarProfile({ data }) {
  return (
    <Box className={styles.sidebar}>
      <Box className={styles.sidebar_container}>
        <img src={data.image} alt="" />
        <Typography className={styles.sidebar_name}>{data.name}</Typography>
        <ul>
          {sidebarData.map((item, i) => (
            <Item
              key={i}
              item={item}
              visible={data.tab == i.toString()}
              index={i.toString()}
            />
          ))}
        </ul>
      </Box>
    </Box>
  );
}
