import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useOrderStore } from "@/zustand/categories";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import KeyIcon from "@mui/icons-material/Key";
import { Stack } from "@mui/material";
import styles from "./styles.module.scss";

const columns = [
  {
    field: "id",
    headerName: "Order",
    width: 210,
    headerAlign: "center",
    headerClassName: styles.header,
  },
  {
    field: "payment",
    headerName: "Payment Method",
    width: 150,
  },
  {
    field: "paid",
    headerName: "Paid",
    width: 80,
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
    width: 120,
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
    headerName: "Coupon",
    headerAlign: "center",
    align: "center",
    width: 150,
  },
  {
    field: "total",
    headerName: "Total",
    headerAlign: "center",
    align: "center",
    width: 120,
  },
  {
    field: "action",
    headerName: "Action",
    headerAlign: "center",
    align: "center",
    width: 120,
    renderCell: (params) => (
      <Stack flexDirection={"row"} gap={1} sx={{ cursor: "pointer" }}>
        <RemoveRedEyeIcon onClick={() => console.log("click", params)} />
        <KeyIcon />
        <DeleteIcon />
      </Stack>
    ),
  },
];

export default function TableOrders() {
  const { orders } = useOrderStore();
  const rows = orders.map((order, i) => {
    return {
      id: order._id,
      payment: order.paymentMethod,
      paid: order.isPaid
        ? "../../../images/verified.png"
        : "../../../images/unverified.png",
      status: order.status,
      coupon: order.couponApplied || "-",
      total: order.total,
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
