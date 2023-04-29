import { Box, Pagination } from "@mui/material";
import { useState } from "react";
import Reviews from "./Reviews";
import styles from "./styles.module.scss";

function Tables({ reviews }) {
  const [page, setPage] = useState(1);
  const PER_PAGE = 3;
  const count = Math.ceil(reviews.length / PER_PAGE);

  const handleChangePage = (e, p) => {
    setPage(p);
  };

  return (
    <Box className={styles.able}>
      <Box className={styles.table_header}></Box>
      <Box className={styles.table_data}>
        {reviews.map((review, i) => (
          <Reviews review={review} key={i} />
        ))}
      </Box>
      <Box>
        <Pagination
          count={count}
          page={page}
          onChange={handleChangePage}
          color="primary"
          variant="outlined"
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
}
export default Tables;
