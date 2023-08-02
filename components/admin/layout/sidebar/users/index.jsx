import { Box } from "@mui/material";
import UserTable from "./table";
import { useUserStore } from "@/zustand/categories";

export default function UserComponent() {
  return (
    <Box color={"white"}>
        <UserTable />
    </Box>
  )
}