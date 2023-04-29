import { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";
import { Box } from "@mui/material";
import styles from "./styles.module.scss";

export default function ProductSwiper({ images }) {
  const swiperRef = useRef(null);

  useEffect(() => {
    swiperRef.current.swiper.autoplay.stop();
  }, [swiperRef]);

  return (
    <Box
      className={styles.swiper}
      onMouseEnter={() => swiperRef.current.swiper.autoplay.start()}
      onMouseLeave={() => {
        swiperRef.current.swiper.autoplay.stop();
        swiperRef.current.swiper.slideTo();
      }}
    >
      <Swiper
        ref={swiperRef}
        centeredSlides={true}
        autoplay={{ delay: 500, stopOnLastSlide: false }}
        speed={500}
        modules={[Autoplay]}
      >
        {images &&
          images.map((img, index) => {
            return (
              <SwiperSlide key={index}>
                <img src={img.url} alt="img" />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </Box>
  );
}
