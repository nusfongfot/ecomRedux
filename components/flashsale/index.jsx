import { Box, Container, Grid, Typography } from "@mui/material";
import { MdFlashOn } from "react-icons/md";
import CountDown from "../countdown";
import styles from "./flash.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { flashDealsArray, gamingSwiper, homeImprovSwiper, women_accessories, women_shoes, women_swiper } from "@/data/home";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper";
import FlashCard from "./card";
import Category from "../category";
import { women_dresses } from "@/data/home";
import ProductsSwiper from "../productsSwiper";

function FlashSale() {
  return (
    <Box sx={{ mb: 3 }}>
      <Box className={styles.flashContent}>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h4">FLASH SALE</Typography>
          <MdFlashOn />
        </Box>
        <CountDown />
      </Box>
      <Box sx={{ mt: 2 }} className={styles.card}>
        <Swiper
          spaceBetween={10}
          loop={true}
          breakpoints={{
            300: {
              slidesPerView: 2,
            },
            993: {
              slidesPerView: 6,
            },
          }}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {flashDealsArray.map((product, i) => {
            return (
              <SwiperSlide key={i}>
                <FlashCard product={product} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} lg={4}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Category
              header="Dresses"
              products={women_dresses}
              background="#5a31f4"
            />
          </Box>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Category
              header="Shoes / High Heels"
              products={women_shoes}
              background="#3c811f"
            />
          </Box>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Category
              header="Accessories"
              products={women_accessories}
              background="#000000"
            />
          </Box>
        </Grid>
      </Grid>
      <ProductsSwiper products={women_swiper} />
      <ProductsSwiper products={gamingSwiper} header="For Gamers" />
      <ProductsSwiper products={homeImprovSwiper} header="House Improvements" />
    </Box>
  );
}
export default FlashSale;
