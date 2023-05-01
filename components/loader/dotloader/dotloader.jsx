import { Box } from "@mui/system";
import { DotLoader } from "react-spinners";
import styles from "./dot.module.scss";
import { useLoadingStore } from "@/zustand/loadingStore";

export default function DotLoading() {
  const { isLoading } = useLoadingStore();
  return (
    <Box className={styles.loadingCss}>
      {isLoading && (
        <Box>
          <DotLoader color="green" />
        </Box>
      )}
    </Box>
  );
}
