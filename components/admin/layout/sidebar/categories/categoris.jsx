import AdminInput from "@/components/inputs/adminInput";
import { errorToast, successToast } from "@/utils/notification";
import { useCategoriesStore } from "@/zustand/categories";
import { Box, Button, Divider, Typography } from "@mui/material";
import axios from "axios";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

export default function CreateCategories() {
  const { categories, setCategories } = useCategoriesStore();
  const [name, setName] = useState("");
  const validate = Yup.object({
    name: Yup.string()
      .required("Category name is required.")
      .min(2, "Category name must be atleast 2 characters")
      .max(30, "Category name is max 30 characters")
      .matches(
        /^[a-zA-z\s]*$/,
        "Numbers and special characters are not allowed"
      ),
  });
  console.log('categories',categories)

  const submitHandler = async () => {
    try {
      const { data } = await axios.post("/api/admin/category", { name });
      setCategories(data.categories);
      setName("");
      successToast(data.message, 2000);
    } catch (error) {
      errorToast(error.response.data.message, 2000);
    }
  };

  return (
    <Box sx={{ color: "white" }}>
      <Formik
        enableReinitialize
        initialValues={{ name }}
        validationSchema={validate}
        // onSubmit={submitHandler}
      >
        {(formik) => (
          <Form>
            <Box>
              <Typography>Create a Category</Typography>
              <Divider sx={{ background: "white", mb: 2, mt: 2 }} />
              <AdminInput
                type="text"
                value={name}
                label="Name"
                placeholder="Category Name"
                onChange={(e) => setName(e.target.value)}
              />
              <Button type="submit" variant="contained" onClick={submitHandler}>
                Add Category
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
