import { Box, Rating, Typography } from "@mui/material";
import { AiOutlineLike } from "react-icons/ai";
import styles from "./styles.module.scss";

function Reviews({ review }) {
  return (
    <Box className={styles.review}>
      <Box className={styles.flex}>
        <Box className={styles.review_user}>
          <Typography variant="h5">{review?.reviewBy}</Typography>
          <img src={review?.image} alt="review" />
        </Box>

        <Box className={styles.content}>
          <Box>
            <Rating
              name="half-rating-read"
              defaultValue={review.rating}
              readOnly
              style={{ color: "#facf19" }}
            />
            <Box component={"p"}>{review.review}</Box>
            <Box component={"p"}>
              <Box component={"span"}>Overall Fit:</Box>
              {review.fit} &nbsp;&nbsp;
              <Box component={"span"}>Size:</Box>
              {review.size} &nbsp;&nbsp;
              <Box>
                <img
                  src={review.style.image}
                  alt="img"
                  className={styles.review_img}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className={styles.extra_container}>
        <Box className={styles.review_images}>
          {review.images.length > 0 &&
            review.images.map((img, i) => (
              <img src={img?.url} alt="img" key={i} />
            ))}
        </Box>
        <Box className={styles.review_extra}>
          <Box className={styles.review_extra_likes}>
            {review.likes && review.likes?.likes}
            <AiOutlineLike />
          </Box>
          <Box className={styles.review_extra_date}>
            {review.updatedAt.slice(0, 10)}
          </Box>
        </Box>
      </Box>

    </Box>
  );
}
export default Reviews;
