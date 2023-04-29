import { Box, Typography } from "@mui/material";
import styles from "./offer.module.scss";
import SwiperOffers from "./swiper";
function Offers() {
  return (
    <Box sx={{ mt: 3 }}>
      <Box className={styles.main}>
        <SwiperOffers />
      </Box>
    </Box>
  );
}
export default Offers;
