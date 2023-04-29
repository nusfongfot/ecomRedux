import { Box, Container, Grid } from "@mui/material";
import FlashSale from "../flashsale";
import Menu from "../menu";
import Offers from "../offers";
import SwiperCustom from "../swiper";
import User from "../user";

function Main() {
  return (
    <Container maxWidth="xl">
      <Grid container>
        <Grid item xs={12} lg={3}>
          <Menu />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box style={{ width: "100%", height: "auto" }}>
            <SwiperCustom />
          </Box>
          <Box style={{ width: "100%", height: "250px" }}>
            <Offers />
          </Box>
        </Grid>
        <Grid item xs={12} lg={3}>
          <User />
        </Grid>
      </Grid>
      <Box>
        <FlashSale />
      </Box>
    </Container>
  );
}
export default Main;
