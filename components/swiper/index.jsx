import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";
import { Box } from "@mui/material";

export default function SwiperCustom() {
  return (
    <Box>
      <Swiper
        className="products__swiper"
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {[...Array(10).keys()].map((i, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                style={{ width: "100%", height: "auto" }}
                src={`/images/swiper/${i + 1}.jpg`}
                alt="img1"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}
