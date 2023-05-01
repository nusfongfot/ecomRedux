import { Box, Button, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import { BsFillCartXFill } from "react-icons/bs";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

function EmptyCart() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <Box className={styles.empty}>
      <BsFillCartXFill style={{ fontSize: "52px" }} />
      <Typography variant="h3" mt={2}>
        Cart is Empty
      </Typography>
      {session ? (
        <Link href={"/"}>
          <Button
            variant="contained"
            sx={{ mt: 2, width: "300px", height: "50px" }}
          >
            Shop Now
          </Button>
        </Link>
      ) : (
        <Button
          variant="contained"
          sx={{ mt: 2, width: "300px", height: "50px" }}
          onClick={() => router.push("/signin")}
        >
          Sign In
        </Button>
      )}
    </Box>
  );
}
export default EmptyCart;
