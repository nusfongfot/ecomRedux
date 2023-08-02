import { connectDb, disconnectDb } from "@/utils/db";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductModel from "@/models/Product";
import CategoryModel from "@/models/Category";
import Layout from "@/components/admin/layout";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/material";
import SingularSelect from "@/components/selects";
import MultipleSelect from "@/components/selects/multipleSelect";

const initialState = {
  name: "",
  description: "",
  brand: "",
  sku: "",
  discount: 0,
  images: [],
  description_images: [],
  parent: "",
  category: "",
  subCategories: "",
  color: {
    color: "",
    image: "",
  },
  sizes: {
    size: "",
    qty: "",
    price: "",
  },
  details: [{ name: "", value: "" }],
  questions: [{ name: "", value: "" }],
  shippingFee: "",
};

export default function CrateProductPage({ parents, categories }) {
  const [product, setProduct] = useState(initialState);
  const [subs, setSubs] = useState([]);
  const [colorImage, setColorImage] = useState("");
  const [images, setImages] = useState("");
  const [description_images, setDescription_images] = useState("");
  const [loading, setLoading] = useState(false);
  const validate = Yup.object({});
  const findProduct = parents.find((item) => item.name == product.parent);

  const getParentData = async () => {
    if (!product.parent) return;
    const { data } = await axios.get(`/api/product/${findProduct._id}`);
    if (data) {
      setProduct({
        ...product,
        name: data.name,
        description: data.description,
        brand: data.brand,
        category: data.category,
        subCategories: data.subCategories,
        questions: [],
        details: [],
      });
    }
  };

  const getSubs = async () => {
    const { data } = await axios.get("/api/admin/subCategory", {
      params: {
        category: product.category,
      },
    });
    setSubs(data);
  };

  const createProduct = () => {};

  const handleChange = (e) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
  };

  useEffect(() => {
    getParentData();
  }, [product.parent]);

  useEffect(() => {
    getSubs();
  }, [product.category]);

  return (
    <Layout>
      <h1>Create Product Page</h1>
      <Formik
        enableReinitialize
        initialValues={{
          name: product.name,
          brand: product.brand,
          description: product.description,
          category: product.category,
          subCategories: product.subCategories,
          parent: product.parent,
          sku: product.sku,
          discount: product.discount,
          color: product.color.color,
          imageInputFile: "",
          styleInout: "",
        }}
        validationSchema={validate}
        onSubmit={() => {
          createProduct();
        }}
      >
        {(formik) => (
          <Form>
            {/* <Images
              name="imageInputFile"
              header="Product Carousel Images"
              text="Add images"
              images={images}
              setImages={setImages}
              setColorImage={setColorImage}
            /> */}
            <Box>
              {product.color.image && (
                <img src={product.color.image} className="" alt="" />
              )}
              {product.color.color && (
                <span style={{ background: `${product.color.color}` }}></span>
              )}
              {/* <Colors
                name="color"
                product={product}
                setProduct={setProduct}
                colorImage={colorImage}
              /> */}
              {/* <Style
                name="styleInput"
                product={product}
                setProduct={setProduct}
                colorImage={colorImage}
              /> */}
              <SingularSelect
                name="parent"
                value={product.parent}
                label="parent"
                data={parents}
                header="Add to an existing product"
                handleChange={handleChange}
              />
              <SingularSelect
                name="category"
                value={product.category}
                label="Category"
                data={categories}
                header="Select a Category"
                handleChange={handleChange}
                disabled={product.parent}
              />
              {product.category && (
                <MultipleSelect
                  value={product.subCategories}
                  data={subs}
                  header="Select SubCategoris"
                  name="subCategories"
                  disabled={product.parent}
                  handleChange={handleChange}
                />
              )}
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await connectDb();
  const results = await ProductModel.find().select("name subProducts").lean();
  const categories = await CategoryModel.find().lean();
  await disconnectDb();
  return {
    props: {
      parents: JSON.parse(JSON.stringify(results)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
