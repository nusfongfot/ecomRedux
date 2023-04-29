import styles from "@/styles/product.module.scss";
import { connectDb, disconnectDb } from "@/utils/db";
import ProductModel from "@/models/Product";
import Head from "next/head";
import { Box, Container } from "@mui/material";
import Header from "@/components/header/header";
import CategoryModel from "@/models/Category";
import SubCategoryModel from "@/models/Subcategory";
import UserModel from "@/models/User";
import MainSwiper from "@/components/productPage/mainSwiperZoom";
import { useState } from "react";
import Infos from "@/components/productPage/infos";
import Reviews from "@/components/productPage/reviews";

function ProductPage({ product }) {
  const [activeImg, setActiveImg] = useState("");
  return (
    <Box>
      <Head>
        <Box component="title">{product.name}</Box>
      </Head>
      <Header country={""} />
      <Box className={styles.product}>
        <Container maxWidth="xl">
          <Box className={styles.path}>
            Home / {product.category.name}
            {product.subCategories.map((sub) => {
              return <Box component={"span"}>/{sub.name}</Box>;
            })}
          </Box>
          <Box className={styles.product_main}>
            <MainSwiper images={product.images} activeImg={activeImg} />
            <Infos product={product} setActiveImg={setActiveImg} />
          </Box>
          <Box>
            <Reviews product={product} />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
export default ProductPage;

export async function getServerSideProps(context) {
  const { query } = context;
  const slug = query.slug;
  // const newSlug = slug.replace(/-/g, " ");

  const style = query.style;
  const size = query.size || 0;
  connectDb();
  //--------------
  let product = await ProductModel.findOne({ _id: slug })
    .populate({ path: "category", model: CategoryModel })
    .populate({ path: "subCategories", model: SubCategoryModel })
    .populate({ path: "reviews.reviewBy", model: UserModel })
    .lean();

  let subProduct = product?.subProducts[style];
  let prices = subProduct?.sizes.map((s) => s.price).sort((a, b) => a - b);
  let newProduct = {
    ...product,
    style,
    images: subProduct?.images,
    sizes: subProduct?.sizes,
    discount: subProduct?.discount,
    sku: product?.sku,
    colors: product?.subProducts.map((p) => p.color),
    priceRange: subProduct.discount
      ? `From ${(prices[0] - prices[0] / subProduct.discount).toFixed(2)} to ${(
          prices[prices.length - 1] -
          prices[prices.length - 1] / subProduct.discount
        ).toFixed(2)} $`
      : `From ${prices[0]} to ${prices[prices.length - 1]} $`,
    price:
      subProduct.discount > 0
        ? (
            subProduct.sizes[size].price -
            subProduct.sizes[size].price / subProduct.discount
          ).toFixed(2)
        : subProduct.sizes[size].price,
    priceBefore: subProduct.sizes[size].price,
    quantity: subProduct.sizes[size].qty,
    ratings: [
      {
        percentage: 76,
      },
      {
        percentage: 14,
      },
      {
        percentage: 6,
      },
      {
        percentage: 4,
      },
      {
        percentage: 0,
      },
    ],
    allSize: product.subProducts
      .map((p) => {
        return p.sizes;
      })
      .flat()
      .sort((a, b) => {
        return a.size - b.size;
      })
      .filter(
        (el, i, arr) => arr.findIndex((el2) => el2.size === el.size) === i
      ),
  };
  //--------------
  disconnectDb();
  return {
    props: {
      product: JSON.parse(JSON.stringify(newProduct)),
    },
  };
}
