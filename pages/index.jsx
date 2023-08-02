import Head from "next/head";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import DotLoading from "@/components/loader/dotloader/dotloader";
import Header from "@/components/header/header";
import Main from "@/components/main/index";
import { connectDb } from "@/utils/db";
import ProductModel from "@/models/Product";
import { Box, Container } from "@mui/material";
import ProductCard from "@/components/productCard";
import { useLoadingStore } from "@/zustand/loadingStore";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home({ country, products }) {
  const { isLoading } = useLoadingStore();
  const router = useRouter();
  const { data: session } = useSession();

  

  return (
    <>
      <Head>
        <title>ShopPay</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading ? <DotLoading /> : null}
      <Header country={country} />
      <Main />
      <Container maxWidth="xl">
        <Box className="products">
          {products.map((product) => {
            return <ProductCard product={product} key={product._id} />;
          })}
        </Box>
      </Container>
    </>
  );
}

export async function getServerSideProps() {
  connectDb();
  let products = await ProductModel.find().sort({ createdAt: -1 }).lean();
  let data = await axios
    .get("https://api.ipregistry.co/?key=9wf6fxefynemfxk2")
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => console.log(err));
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      country: { name: data.name, flag: data.flag.emojitwo },
    },
  };
}
