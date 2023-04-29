import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { offersAarray } from "@/data/home";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper";
import { Box } from "@mui/material";
import Link from "next/link";
import styles from "./offer.module.scss";

export default function SwiperOffers() {
  return (
    <Box
      sx={{ color: "black", height: "230px" }}
      className={styles.offerSwiper}
    >
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {offersAarray.map((val, i) => {
          return (
            <SwiperSlide key={i} style={{ position: "relative" }}>
              <Link href="/">
                <img className={styles.imgOff} src={val.image} alt="img" />
                <span className={styles.price}>{val.price}$</span>
                <span className={styles.discount}>{val.discount} %</span>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}
