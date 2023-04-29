import { Box, Button, Rating, Typography } from "@mui/material";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import AddReviews from "./addReviews";
import styles from "./styles.module.scss";
import Tables from "./Tables";

function Reviews({ product }) {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <Box mt={8} className={styles.reviews}>
      <Box className={styles.reviews_container}>
        <Typography variant="h5">
          Customer Reviews ({product.reviews.length}+)
        </Typography>
        <Box className={styles.reviews_stats}>
          <Box className={styles.reviews_stats_overview}>
            <Box component={"span"}>Average Rating</Box>
            <Box className={styles.reviews_stats_overview_rating}>
              <Rating
                name="half-rating-read"
                defaultValue={product.rating}
                precision={0.5}
                readOnly
                style={{ color: "#FACF19" }}
              />
              {product.rating === 0 ? "No reviews yet." : product.rating}
            </Box>
          </Box>
          <Box className={styles.reviews_stats_reviews}>
            {product.ratings.map((rating, i) => {
              return (
                <Box className={styles.reviews_stats_reviews_review} key={i}>
                  <Rating
                    name="half-rating-read"
                    defaultValue={5 - i}
                    readOnly
                    style={{ color: "#FACF19" }}
                  />
                  <Box className={styles.bar}>
                    <Box
                      className={styles.bar_inner}
                      sx={{ width: `${rating.percentage}%` }}
                    ></Box>
                  </Box>
                  <Box
                    component={"span"}
                    sx={{ fontWeight: 700, fontSize: "14px" }}
                  >
                    {rating.percentage}%
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
        {session ? (
          <AddReviews product={product} />
        ) : (
          <Button
            onClick={() => router.push("/signin")}
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            fullWidth
          >
            Login to Add Review
          </Button>
        )}
        <Tables reviews={product.reviews} /> 
      </Box>
    </Box>
  );
}
export default Reviews;
