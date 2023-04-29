import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Box, Typography } from "@mui/material";
import styles from "./product.module.scss";

function ProductsSwiper({ header, products }) {
  return (
    <Box className={styles.wrapper}>
      {header ? (
        <Typography variant="h4" className={styles.header}>
          {header}
        </Typography>
      ) : null}
      <Box sx={{ mt: 2 }}>
        <Swiper
          className="products__swiper"
          spaceBetween={10}
          navigation={true}
          breakpoints={{
            300: {
              slidesPerView: 2,
            },
            600: {
              slidesPerView: 3,
            },
            993: {
              slidesPerView: 5,
            },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {products.map((product, i) => {
            return (
              <SwiperSlide key={i} style={{ height: "350px" }}>
                <Box className={styles.product}>
                  <Box className={styles.product_img}>
                    <img src={product.image} />
                  </Box>
                  <Box className={product.price ? styles.product_infos : null}>
                    <Typography variant="subtitle2" className={styles.title}>
                      {product.name}
                    </Typography>

                    {product.price ? (
                      <Box
                        component="span"
                        sx={{ color: "red", fontWeight: 700 }}
                      >
                        USD {product.price}$
                      </Box>
                    ) : null}
                  </Box>
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </Box>
  );
}
export default ProductsSwiper;
