import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { menuArray } from "@/data/home";
import {
  GiLargeDress,
  GiClothes,
  Gi3DHammer,
  GiWatch,
  GiBallerinaShoes,
  GiHeadphones,
  GiHealthCapsule,
  GiSportMedal,
  GiBigDiamondRing,
} from "react-icons/gi";
import { MdOutlineSportsEsports, MdOutlineSmartToy } from "react-icons/md";
import { BiCameraMovie, BiGift, BiCategoryAlt } from "react-icons/bi";
import { FaBaby } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi";
import { AiOutlineSecurityScan } from "react-icons/ai";
import { BsPhoneVibrate } from "react-icons/bs";
import { Typography } from "@mui/material";
import styles from "./menu.module.scss";

export default function Menu() {
  return (
    <Box
      sx={{
        mb: 2,
        mt: 2,
        maxWidth: "95%",
      }}
    >
      <Box sx={{ gap: "10px", display: "flex", alignItems: "center" }}>
        <BiCategoryAlt style={{ fontSize: "25px" }} />
        <Typography sx={{ fontWeight: 700 }} variant="h5">
          Categories
        </Typography>
      </Box>
      <nav aria-label="main mailbox folders">
        <List className={styles.listItem} sx={{ overflow: "auto" }}>
          {menuArray.map((val, i) => {
            return (
              <ListItem disablePadding key={i}>
                <ListItemButton>
                  <ListItemIcon>
                    {i == 0 ? (
                      <GiLargeDress />
                    ) : i == 1 ? (
                      <GiClothes />
                    ) : i == 2 ? (
                      <GiHeadphones />
                    ) : i == 3 ? (
                      <GiWatch />
                    ) : i == 4 ? (
                      <HiOutlineHome />
                    ) : i == 5 ? (
                      <GiHealthCapsule />
                    ) : i == 6 ? (
                      <GiBallerinaShoes />
                    ) : i == 7 ? (
                      <GiBigDiamondRing />
                    ) : i == 8 ? (
                      <GiSportMedal />
                    ) : i == 9 ? (
                      <FaBaby />
                    ) : i == 10 ? (
                      <BiCameraMovie />
                    ) : i == 11 ? (
                      <MdOutlineSportsEsports />
                    ) : i == 12 ? (
                      <BsPhoneVibrate />
                    ) : i == 13 ? (
                      <MdOutlineSmartToy />
                    ) : i == 14 ? (
                      <BiGift />
                    ) : i == 15 ? (
                      <Gi3DHammer />
                    ) : i == 16 ? (
                      <AiOutlineSecurityScan />
                    ) : (
                      ""
                    )}
                  </ListItemIcon>
                  <ListItemText
                    className={styles.textList}
                    primary={val.name}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </nav>
    </Box>
  );
}
