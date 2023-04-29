import { Box } from "@mui/material";
import styles from "./styles.module.scss";
import ReactImageMagnify from "react-image-magnify";
import { useState } from "react";

function MainSwiper({ images, activeImg }) {
  const [active, setActive] = useState(0);
  return (
    <Box className={styles.swiper}>
      <Box className={styles.swiper_active}>
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: "Wristwatch by Ted Baker London",
              isFluidWidth: true,
              src: activeImg || images[active].url,
            },
            largeImage: {
              src: activeImg || images[active].url,
              width: 1200,
              height: 1800,
            },
            enlargedImageContainerDimensions: {
              width: "130%",
              height: "107%",
            },
          }}
        />
      </Box>
      <Box className={styles.swiper_list}>
        {images.map((img, i) => {
          return (
            <Box
              className={`${styles.swiper_list_item} ${
                i === active && styles.active
              }`}
              key={i}
              onClick={() => setActive(i)}
            >
              <img src={img.url} alt="img" />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
export default MainSwiper;
