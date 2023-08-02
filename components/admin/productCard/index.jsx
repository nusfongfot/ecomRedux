import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper";
import styles from "./product.module.scss";
import Link from "next/link";
import { TbEdit } from "react-icons/tb";
import { AiOutlineEye } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";

export default function ProductCard({ product }) {
  return (
    <Box>
      <Typography variant="h5">{product.name}</Typography>
      <Typography sx={{ color: "rgba(86, 212, 238, 0.7)" }} variant="subtitle2">
        {product.category.name}
      </Typography>

      <Box sx={{ mt: 2, mb: 2 }}>
        <Swiper
          className="products__swiper"
          spaceBetween={10}
          // navigation={true}
          breakpoints={{
            300: {
              slidesPerView: 1,
            },
            600: {
              slidesPerView: 3,
            },
            993: {
              slidesPerView: 5,
            },
            1232: {
              slidesPerView: 5,
            },
            1520: {
              slidesPerView: 6,
            },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {product.subProducts.map((p, i) => {
            return (
              <SwiperSlide key={i}>
                <Box className={styles.product_item}>
                  <Box className={styles.product_item_img}>
                    <img src={p.images[0].url} alt="" />
                  </Box>
                  <Box className={styles.product_actions}>
                    <Link
                      href={`/admin/dashboard/product/${product._id}`}
                      target="_blank"
                    >
                      <TbEdit color="blue" />
                    </Link>
                    <Link
                      href={`/product/${product.slug}?style=${i}`}
                      target="_blank"
                    >
                      <AiOutlineEye color="green" />
                    </Link>
                    <Link href={""}>
                      <RiDeleteBin2Line color="red" />
                    </Link>
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
