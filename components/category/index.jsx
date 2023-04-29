import { Box, Grid, ImageList, ImageListItem, Typography } from "@mui/material";
import { BsArrowRightCircle } from "react-icons/bs";
import styles from "./cate.module.scss";

function Category({ header, products, background }) {
  return (
    <Box className={styles.cate} sx={{ background: background }}>
      <Box className={styles.cate_header}>
        <Typography variant="h4">{header}</Typography>
        <BsArrowRightCircle />
      </Box>

      <ImageList sx={{ overflow: "hidden" }} cols={3} rowHeight={220}>
        {products.map((item, index) => (
          <ImageListItem key={index} className={styles.product}>
            <img src={item.image} alt={item.title} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
export default Category;
