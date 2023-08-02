import { useCategoriesStore } from "@/zustand/categories";
import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import { useState } from "react";
import axios from "axios";
import { errorToast, successToast } from "@/utils/notification";

export default function ListSubCategory() {
  const { categories, setCategories } = useCategoriesStore();
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);

  const handleDeleteList = async (id) => {
    try {
      const { data } = await axios.delete("/api/admin/category", {
        data: { id },
      });
      setCategories(data.categories);
      successToast(data.message, 2000);
    } catch (error) {
      console.log(error);
      errorToast(error.response.data.message, 2000);
    }
  };

  return (
    <Box sx={{ color: "white" }}>
      <Grid item xs={12}>
        <Box sx={{ background: "white", mt: 5 }}>
          <List dense={dense} sx={{ height: "250px", overflowY: "scroll" }}>
            {categories.map((item) => (
              <ListItem
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteList(item._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={item.name}
                  secondary={secondary ? "Secondary text" : null}
                  sx={{ color: "black" }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>
    </Box>
  );
}
