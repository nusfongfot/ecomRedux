import { useState } from "react";
import styles from "./styles.module.scss";
import { Box } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import "yup-phone";

const initialValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  state: "",
  city: "",
  zipcode: "",
  address1: "",
  address2: "",
  country: "",
};

function Shipping({ setSelectedAddress, selectedAddress, user }) {
  const [addresses, setAddresses] = useState(user?.address || []);
  const [shipping, setShipping] = useState(initialValues);
  const validate = Yup.object({
    firstName: Yup.string()
      .required("Firstname is required.")
      .min(3, "Firstname must be atleast 3 characters long.")
      .max(20, "Firstname must be less than 20 characters long."),
    lastName: Yup.string()
      .required("LastName is required.")
      .min(3, "LastName must be atleast 3 characters long.")
      .max(20, "LastName must be less than 20 characters long."),
    phoneNumber: Yup.string()
      .required("phoneNumber is required.")
      .phone()
      //   .min(3, "phoneNumber must be atleast 3 characters long.")
      .max(10, "phoneNumber must be less than 10 characters long."),
    state: Yup.string()
      .required("State is required.")
      .min(3, "State must be atleast 3 characters long.")
      .max(60, "State must be less than 60 characters long."),
    city: Yup.string()
      .required("City is required.")
      .min(3, "City must be atleast 3 characters long.")
      .max(60, "City must be less than 60 characters long."),
    zipcode: Yup.string()
      .required("Zipcode is required.")
      .min(3, "Zipcode must be atleast 3 characters long.")
      .max(20, "Zipcode must be less than 20 characters long."),
    address1: Yup.string()
      .required("Address Line 1 is required.")
      .min(3, "Address Line 1 must be atleast 3 characters long.")
      .max(100, "Address Line 1 must be less than 100 characters long."),
    address2: Yup.string()
      .required("Address Line 2 is required.")
      .min(3, "Address Line 2 must be atleast 3 characters long.")
      .max(100, "Address Line 2 must be less than 100 characters long."),
    country: Yup.string()
      .required("Country is required.")
      .min(3, "Country must be atleast 3 characters long.")
      .max(20, "Country must be less than 20 characters long."),
  });

  return (
    <Box className={styles.shipping}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validate}
      >
        {(formink) => (
          <Form>
            <input type="text" />
          </Form>
        )}
      </Formik>
    </Box>
  );
}
export default Shipping;
