import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  mainListItems,
  secondaryListItems,
  menuList,
  nameSidebar,
  nameSecoundSidebar,
  nameThirdSidebar,
} from "./listItems";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import OrderComponent from "./order";
import { useRouter } from "next/router";
import DashBoardComponent from "./dashboard/dashboard";
import CategoriesComponent from "./categories";
import SubCategoriesComponent from "./subcategories";
import ProductComponent from "./product";
import UserComponent from "./users";
import { AccountCircle } from "@mui/icons-material";
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';

const messages = [
  {
    id: 1,
    primary: "Brunch this week?",
    secondary:
      "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    person: "/static/images/avatar/5.jpg",
  },
  {
    id: 2,
    primary: "Birthday Gift",
    secondary: `Do you have a suggestion for a good present for John on his work
      anniversary. I am really confused & would love your thoughts on it.`,
    person: "/static/images/avatar/1.jpg",
  },
  {
    id: 3,
    primary: "Recipe to try",
    secondary:
      "I am try out this new BBQ recipe, I think this might be amazing",
    person: "/static/images/avatar/2.jpg",
  },
  {
    id: 4,
    primary: "Yes!",
    secondary: "I have the tickets to the ReactConf for this year.",
    person: "/static/images/avatar/3.jpg",
  },
  {
    id: 5,
    primary: "Doctor's Appointment",
    secondary:
      "My appointment for the doctor was rescheduled for next Saturday.",
    person: "/static/images/avatar/4.jpg",
  },
  {
    id: 6,
    primary: "Discussion",
    secondary: `Menus that are generated by the bottom app bar (such as a bottom
      navigation drawer or overflow menu) open as bottom sheets at a higher elevation
      than the bar.`,
    person: "/static/images/avatar/5.jpg",
  },
  {
    id: 7,
    primary: "Summer BBQ",
    secondary: `Who wants to have a cookout this weekend? I just got some furniture
      for my backyard and would love to fire up the grill.`,
    person: "/static/images/avatar/1.jpg",
  },
];

const drawerWidth = 240;

const nameNavbar = [
  { id: 1, title: "Dashboard", pathname: "dasboard" },
  { id: 2, title: "Sale", pathname: "sales" },
  { id: 3, title: "Orders", pathname: "orders" },
  { id: 4, title: "Users", pathname: "users" },
  { id: 5, title: "Integrations" },
  { id: 6, title: "All Products" },
  { id: 7, title: "Create Product" },
  { id: 8, title: "Categories" },
  { id: 9, title: "Sub-Categories" },
];

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    backgroundColor: theme.palette.grey[800],
    color: "white",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SideBar() {
  const router = useRouter();
  const page = router.query.slug;

  const [open, setOpen] = React.useState(true);
  const [active, setActive] = React.useState(1);

  const [noti, setNoti] = React.useState(true);
  const [anchorNoti, setAnchorNoti] = React.useState(null);

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClickActiveMenu = (item) => {
    setActive(item.id);
    localStorage.setItem("active", item.id);
    router.push(item.link);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuNoti = (event) => {
    setAnchorNoti(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseNoti = () => {
    setAnchorNoti(null);
  };

  React.useEffect(() => {
    const storedActive = localStorage.getItem("active");
    setActive(storedActive);
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {/* Dashboard */}
              {nameNavbar.map((item) => (item.id == active ? item.title : ""))}
            </Typography>

            {noti && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenuNoti}
                  color="inherit"
                >
                  <Badge badgeContent={messages.length} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorNoti}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorNoti)}
                  onClose={handleCloseNoti}
                >
                  <List sx={{ width: 300 }}>
                    {messages.map(({ id, primary, secondary, person }) => (
                      <React.Fragment key={id}>
                        {id === 1 && (
                          <ListSubheader
                            sx={{ bgcolor: "black", color: "white" }}
                          >
                            Today
                          </ListSubheader>
                        )}

                        {id === 3 && (
                          <ListSubheader
                            sx={{ bgcolor: "black", color: "white" }}
                          >
                            Yesterday
                          </ListSubheader>
                        )}

                        <ListItem button>
                          <ListItemAvatar>
                            <Avatar alt="Profile Picture" src={person} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={primary}
                            secondary={secondary}
                          />
                        </ListItem>
                      </React.Fragment>
                    ))}
                  </List>
                </Menu>
              </div>
            )}

            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon sx={{ color: "white" }} />
            </IconButton>
          </Toolbar>

          <Stack flexDirection={"row"} gap={2} p={1}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Box sx={{ display: !open ? "none" : "block" }}>
              <Box display={"flex"} alignItems={"center"} gap={"5px"}>
                <Typography variant="subtitle1">WelCome Back</Typography>
                <WavingHandIcon sx={{ color: "yellow", fontSize: 14 }} />
              </Box>

              <Typography variant="subtitle1">Sorawit Khongsrima</Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 1, background: "white" }} />
          <List component="nav">
            {nameSidebar.map((item) => (
              <Box key={item.id}>
                <ListItemButton
                  sx={{
                    background:
                      active == item.id ? "rgba(24, 19, 163, 0.7)" : "",
                  }}
                  onClick={() => handleClickActiveMenu(item)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </Box>
            ))}
            <Divider sx={{ my: 1, background: "white" }} />
            {/* {secondaryListItems} */}
            {/* <ListSubheader
              sx={{
                background: "transparent",
                color: "white",
                fontWeight: 700,
                fontSize: 18,
                display: !open ? "none" : "block",
              }}
              component="div"
              // inset
            >
              Product
            </ListSubheader>
            {nameSecoundSidebar.map((item) => (
              <Link
                href={`/admin/dashboard/product`}
                key={item.id}
              >
                <ListItemButton
                  sx={{
                    background:
                      active == item.id ? "rgba(24, 19, 163, 0.7)" : "",
                  }}
                  onClick={() => handleClickActiveMenu(item.id)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </Link>
            ))}
            <Divider sx={{ my: 1, background: "white" }} /> */}

            <ListSubheader
              sx={{
                background: "transparent",
                color: "white",
                fontWeight: 700,
                fontSize: 18,
                display: !open ? "none" : "block",
              }}
              component="div"
              // inset
            >
              Categores / Subs
            </ListSubheader>
            {nameThirdSidebar.map((item) => (
              <Box key={item.id}>
                <ListItemButton
                  sx={{
                    background:
                      active == item.id ? "rgba(24, 19, 163, 0.7)" : "",
                  }}
                  onClick={() => handleClickActiveMenu(item)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </Box>
            ))}
          </List>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}