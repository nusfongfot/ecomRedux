import AdminInput from "@/components/inputs/adminInput";
import SingularSelect from "@/components/selects";
import { errorToast, successToast } from "@/utils/notification";
import { useCategoriesStore } from "@/zustand/categories";
import { Box, Button, Divider, Typography } from "@mui/material";
import axios from "axios";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

export default function CreateSubCategories() {
  const { setSubCategories, categories, subCategories } = useCategoriesStore();
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const validate = Yup.object({
    name: Yup.string()
      .required("SubCategory name is required.")
      .min(2, "SubCategory name must be atleast 2 characters")
      .max(30, "SubCategory name is max 30 characters")
      .matches(
        /^[a-zA-z\s]*$/,
        "Numbers and special characters are not allowed"
      ),
    parent: Yup.string().required("Please choose a parent category."),
  });

  const submitHandler = async () => {
    try {
      const { data } = await axios.post("/api/admin/subCategory", {
        name,
        parent,
      });
      setSubCategories(data.subCategories);
      setName("");
      setParent("");
      successToast(data.message, 2000);
    } catch (error) {
      errorToast(error.response.data.message, 2000);
    }
  };

  console.log('subCategories', subCategories)

  return (
    <Box sx={{ color: "white" }}>
      <Formik
        enableReinitialize
        initialValues={{ name, parent }}
        validationSchema={validate}
      >
        {(formik) => (
          <Form>
            <Box>
              <Typography>Create a SubCategory</Typography>
              <Divider sx={{ background: "white", mb: 2, mt: 2 }} />
              <AdminInput
                type="text"
                value={name}
                label="Name"
                placeholder="SubCategory Name"
                onChange={(e) => setName(e.target.value)}
              />
              <Box width={210}>
                <SingularSelect
                  data={categories}
                  value={parent}
                  name="parent"
                  placeholder={"Select Category"}
                  handleChange={(e) => setParent(e.target.value)}
                />
              </Box>

              <Button type="submit" variant="contained" onClick={submitHandler}>
                Add SubCategory
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
