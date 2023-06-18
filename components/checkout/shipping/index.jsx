import { useState } from "react";
import styles from "./styles.module.scss";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  styled,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import "yup-phone";
import ShippingInput from "@/components/inputs/shippingInput";
import { countries } from "@/data/countries";
import SingularSelect from "@/components/selects";
import {
  changeActiveAddress,
  deleteAddress,
  saveAddress,
} from "@/API/saveCart";
import { FaIdCard, FaMapMarked, FaMapMarkedAlt } from "react-icons/fa";
import { GiPhone } from "react-icons/gi";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { CiCircleRemove } from "react-icons/ci";

const StyledSelect = styled(Select)({
  "& .MuiSelect-select": {
    backgroundColor: "white",
    color: "black",
  },
});

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

function Shipping({ user, addresses, setAddresses }) {
  const [shipping, setShipping] = useState(initialValues);
  const [visible, setVisible] = useState(user?.address.length ? false : true);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };

  const saveShippingHandler = async () => {
    const res = await saveAddress(shipping);
    console.log("resadd", res.addresses);
    setAddresses(res.addresses);
    setVisible(false);
    setShipping(initialValues);
  };

  const changeActiveHandler = async (id) => {
    const res = await changeActiveAddress(id);
    setAddresses(res.addresses);
  };

  const deleteHandler = async (id) => {
    const res = await deleteAddress(id);
    setAddresses(res.addresses);
  };

  return (
    <Box className={styles.shipping} sx={{ margin: "10px" }}>
      <Typography variant="h4" fontWeight={600}>
        Shipping Information
      </Typography>
      <Box className={styles.addresses}>
        {addresses.map((address, i) => (
          <Box position={"relative"} key={i}>
            <Box
              position={"absolute"}
              top={"1rem"}
              right={"1rem"}
              onClick={() => deleteHandler(address._id)}
            >
              <CiCircleRemove fontSize={32} />
            </Box>
            <Box
              className={`${styles.address} ${address.active && styles.acitve}`}
              key={i}
              onClick={() => changeActiveHandler(address._id)}
            >
              <Box className={styles.address_side}>
                <img src={user.image} alt="" />
                <Box className={styles.address_col}>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <FaIdCard fontSize={18} />
                    {address?.firstName?.toUpperCase()}{" "}
                    {address?.lastName?.toUpperCase()}
                    <GiPhone />
                    {address?.phoneNumber}
                  </span>
                </Box>
                <Box className={styles.address_col}>
                  <span style={{ display: "flex", gap: "10px" }}>
                    <FaMapMarkedAlt fontSize={18} />
                    {address?.address1}
                  </span>
                  <span>{address?.address2}</span>
                  <span>
                    {address?.state}, {address?.city}, {address?.country}
                  </span>
                  <span>{address?.zipcode}</span>
                </Box>
              </Box>
              {/* <span
              className={styles.active_text}
              // style={{ display: `${selectedAddress !== address && "none"}` }}
            >
              Active
            </span> */}
            </Box>
          </Box>
        ))}
      </Box>
      <Button
        variant="contained"
        className={styles.hide_show}
        onClick={() => setVisible(!visible)}
      >
        {visible ? (
          <span>
            <IoMdArrowDropdownCircle
              style={{ fontSize: "2rem", fill: "#222" }}
            />{" "}
          </span>
        ) : (
          <span>
            Add new address <AiOutlinePlus />
          </span>
        )}
      </Button>
      {visible && (
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validate}
          onSubmit={saveShippingHandler}
        >
          {(formink) => (
            <Form>
              <SingularSelect
                name="country"
                value={shipping.country}
                placeholder="Country"
                handleChange={handleChange}
                data={countries}
              />
              <Box className={styles.col}>
                <ShippingInput
                  name="firstName"
                  placeholder={"FirstName"}
                  onChange={handleChange}
                  value={shipping.firstName}
                />
                <ShippingInput
                  name="lastName"
                  placeholder={"LastName"}
                  value={shipping.lastName}
                  onChange={handleChange}
                />
              </Box>
              <Box className={styles.col}>
                <ShippingInput
                  name="state"
                  placeholder={"State"}
                  onChange={handleChange}
                  value={shipping.state}
                />
                <ShippingInput
                  name="city"
                  placeholder={"City"}
                  onChange={handleChange}
                  value={shipping.city}
                />
              </Box>
              <Box className={styles.col}>
                <ShippingInput
                  name="phoneNumber"
                  placeholder={"Phone"}
                  onChange={handleChange}
                  value={shipping.phoneNumber}
                />
                <ShippingInput
                  name="zipcode"
                  placeholder={"ZipCode"}
                  onChange={handleChange}
                  value={shipping.zipcode}
                />
              </Box>

              <Box sx={{ margin: "10px" }}>
                <ShippingInput
                  name="address1"
                  placeholder={"Addredd1"}
                  onChange={handleChange}
                  value={shipping.address1}
                />
                <ShippingInput
                  name="address2"
                  placeholder={"Addredd2"}
                  onChange={handleChange}
                  value={shipping.address2}
                />
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  onClick={saveShippingHandler}
                >
                  Save Address
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      )}
    </Box>
  );
}
export default Shipping;
