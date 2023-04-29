import { simillar_products } from "@/data/products";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./similarSwiper.module.scss";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";
import { Autoplay, Navigation } from "swiper";
import { Box } from "@mui/system";

function SimilarSwiper() {
  return (
    <Box>
      <Swiper
        slidesPerView={4}
        spaceBetween={5}
        slidesPerGroup={3}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className={`products__swiper ${styles.swiperSimilar}`}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            width: 640,
            slidesPerView: 5,
          },
        }}
      >
        {simillar_products.map((p,i) => (
          <SwiperSlide key={i}>
            <Link href={""}>
              <img src={p} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
export default SimilarSwiper;
