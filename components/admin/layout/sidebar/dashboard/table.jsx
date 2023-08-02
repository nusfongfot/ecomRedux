import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useOrderStore } from "@/zustand/categories";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import KeyIcon from "@mui/icons-material/Key";
import { Stack } from "@mui/material";
import styles from "./styles.module.scss";
import { SlEye } from "react-icons/sl";

const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 230,
    headerAlign: "center",
    headerClassName: styles.header,
    align: "center",
  },
  {
    field: "payment",
    headerName: "Total",
    width: 180,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "paid",
    headerName: "Payment",
    width: 180,
    align: "center",
    sortable: false,
    headerAlign: "center",
    renderCell: (params) => (
      <img
        src={params.value}
        alt="Image"
        style={{ width: "25px", height: "25px" }}
      />
    ),
  },
  {
    field: "status",
    headerName: "Status",
    type: "number",
    headerAlign: "center",
    width: 160,
    align: "center",
    renderCell: (params) => (
      <span
        style={{
          color:
            params.value == "Not Processed"
              ? "#e3530e"
              : params.value == "Processing"
              ? "#54b7d3"
              : params.value == "Dispatched"
              ? "#1e91cf"
              : params.value == "Cancelled"
              ? "#e3ddd4"
              : params.value == "Completed"
              ? "#4cb64c"
              : "",
        }}
      >
        {params.value}
      </span>
    ),
  },
  {
    field: "coupon",
    headerName: "View",
    headerAlign: "center",
    align: "center",
    width: 220,
    renderCell: (params) => (
      <Box sx={{ cursor: "pointer" }}>
        <SlEye />
        {/* {params.value} */}
      </Box>
    ),
  },
];

export default function TableDashBoard() {
  const { orders } = useOrderStore();
  const rows = orders.map((order, i) => {
    return {
      id: order._id,
      name: order.user.name,
      payment: order.total + " $",
      paid: order.isPaid
        ? "../../../images/verified.png"
        : "../../../images/unverified.png",
      status: order.status,
      coupon: "",
    };
  });

  return (
    <Box
      sx={{
        height: "auto",
        width: "100%",
        background: "white",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnFilter
        // sx={{
        //   background: "white",
        //   width: { xs: 300, sm: 500, md: 640, lg: "100%" },
        //   height: "auto",
        // }}
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus":
            {
              outline: "none !important",
            },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgba(0,0,255,0.6)",
            color: "white",
            fontSize: 16,
            margin: 0,
            padding: 0,
          },
        }}
      />
    </Box>
  );
}
