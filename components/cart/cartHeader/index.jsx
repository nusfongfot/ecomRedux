import { Box, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { compareArrays } from "@/utils/arrays_utils";

function CartHeader({ cartInfos, selected, setSelected }) {
  const [active, setActive] = useState("");

  const handleSelected = () => {
    if (selected.length !== cartInfos.length) {
      setSelected(cartInfos);
    } else {
      setSelected([]);
    }
  };

  useEffect(() => {
    // const check = JSON.stringify(cartInfos) === JSON.stringify(selected);
    const check = compareArrays(cartInfos, selected);
    setActive(check);
  }, [selected]);

  return (
    <Box className={`${styles.cart_header} ${styles.card}`}>
      <Typography variant="h5">Item Summary ({cartInfos.length})</Typography>
      <Box className={styles.flex} onClick={handleSelected}>
        <Box className={`${styles.checkbox} ${active ? styles.active : ""}`} />
        <span>Select all Items</span>
      </Box>
    </Box>
  );
}
export default CartHeader;
