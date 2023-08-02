import {
  useOrderStore,
  useProductStore,
  useUserStore,
} from "@/zustand/categories";
import { Box, TextField, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import { TbUsers } from "react-icons/tb";
import { SlHandbag } from "react-icons/sl";
import { SiProducthunt } from "react-icons/si";
import { GiTakeMyMoney } from "react-icons/gi";
import Link from "next/link";
import TableDashBoard from "./table";

export default function DashBoardComponent() {
  const { products } = useProductStore();
  const { users } = useUserStore();
  const { orders } = useOrderStore();

  return (
    <Box sx={{ color: "white" }}>
      <TextField
        id="outlined-basic"
        label="Search..."
        variant="outlined"
        sx={{ background: "white" }}
        fullWidth
        type="search"
      />
      <Box className={styles.cards}>
        <Box className={styles.card}>
          <Box className={styles.card_icon}>
            <TbUsers />
          </Box>
          <Box className={styles.card_infos}>
            <Typography variant="h5">+{users.length}</Typography>
            <span style={{ fontWeight: 600 }}>Users</span>
          </Box>
        </Box>

        <Box className={styles.card}>
          <Box className={styles.card_icon}>
            <SlHandbag />
          </Box>
          <Box className={styles.card_infos}>
            <Typography variant="h5">+{orders.length}</Typography>
            <span style={{ fontWeight: 600 }}>Orders</span>
          </Box>
        </Box>

        <Box className={styles.card}>
          <Box className={styles.card_icon}>
            <SiProducthunt />
          </Box>
          <Box className={styles.card_infos}>
            <Typography variant="h5">+{products.length}</Typography>
            <span style={{ fontWeight: 600 }}>Products</span>
          </Box>
        </Box>

        <Box className={styles.card}>
          <Box className={styles.card_icon}>
            <GiTakeMyMoney />
          </Box>
          <Box className={styles.card_infos}>
            <Typography variant="h5">
              +{orders.reduce((acc, val) => acc + val.total, 0)} $
            </Typography>
            <Typography>
              +
              {orders
                .filter((item) => !item.isPaid)
                .reduce((acc, val) => acc + val.total, 0)}{" "}
              $ Unpaid yet.
            </Typography>
            <span style={{ fontWeight: 600 }}>Total Earnings</span>
          </Box>
        </Box>
      </Box>
      <Box className={styles.data}>
        <Box className={styles.orders}>
          <Box className={styles.heading}>
            <Typography variant="h4" mt={2} mb={3}>
              Recent Orders
            </Typography>
            <Link className={styles.link} href={"/admin/dashboard/orders"}>
              View All
            </Link>
          </Box>
          <Box mt={5}>
            <TableDashBoard />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
