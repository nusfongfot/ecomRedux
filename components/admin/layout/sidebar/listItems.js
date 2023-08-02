import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import CategoryIcon from "@mui/icons-material/Category";
import Inventory2Icon from "@mui/icons-material/Inventory2";

export const nameSidebar = [
  {
    id: 1,
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/admin/dashboard",
  },
  { id: 2, title: "Sales", icon: <ShoppingCartIcon />, link: "/admin/sales" },
  { id: 3, title: "Orders", icon: <BarChartIcon />, link: "/admin/orders" },
  { id: 4, title: "Users", icon: <PeopleIcon />, link: "/admin/users" },
  { id: 5, title: "Messages", icon: <LayersIcon />, link: "/admin/messages" },
];

export const nameSecoundSidebar = [
  { id: 6, title: "All Products", icon: <DensitySmallIcon /> },
  { id: 7, title: "Create Product", icon: <ControlPointIcon /> },
];

export const nameThirdSidebar = [
  {
    id: 8,
    title: "Categories",
    icon: <CategoryIcon />,
    link: "/admin/categories",
  },
  {
    id: 9,
    title: "Sub-Categories",
    icon: <Inventory2Icon />,
    link: "/admin/subcategories",
  },
];

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader
      sx={{
        background: "transparent",
        color: "white",
        fontWeight: 700,
        fontSize: 18,
      }}
      component="div"
      // inset
    >
      Product
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
