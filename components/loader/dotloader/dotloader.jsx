import { useLoading } from "@/contexts/loadingContext";
import { Box } from "@mui/system";
import { DotLoader } from "react-spinners";
import styles from "./dot.module.scss";

export default function DotLoading() {
  const { loading } = useLoading();
  return (
    <Box className={styles.loadingCss}>
      {loading && (
        <Box>
          <DotLoader color="green" />
        </Box>
      )}
    </Box>
  );
}
