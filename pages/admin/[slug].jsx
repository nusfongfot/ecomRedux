import Layout from "@/components/admin/layout";
import CategoriesComponent from "@/components/admin/layout/sidebar/categories";
import SubCategoriesComponent from "@/components/admin/layout/sidebar/subcategories";
import UserComponent from "@/components/admin/layout/sidebar/users";
import CategoryModel from "@/models/Category";
import ProductModel from "@/models/Product";
import UserModel from "@/models/User";
import OrderModel from "@/models/Order";
import SubCategoryModel from "@/models/Subcategory";
import { connectDb, disconnectDb } from "@/utils/db";
import {
  useCategoriesStore,
  useOrderStore,
  useProductStore,
  useUserStore,
} from "@/zustand/categories";
import { useRouter } from "next/router";
import { useEffect } from "react";
import OrderComponent from "@/components/admin/layout/sidebar/orders";
import { Box } from "@mui/material";
import DashBoardComponent from "@/components/admin/layout/sidebar/dashboard/dashboard";
import Head from "next/head";

export default function AdminPage({
  categories,
  subCategories,
  products,
  users,
  orders,
}) {
  const router = useRouter();
  const page = router.query.slug;
  const { setCategories, setSubCategories } = useCategoriesStore();
  const { setProducts } = useProductStore();
  const { setUsers } = useUserStore();
  const { setOrders } = useOrderStore();

  useEffect(() => {
    setCategories(categories);
    setSubCategories(subCategories);
    setProducts(products);
    setUsers(users);
    setOrders(orders);
  }, []);

  return (
    <Box>
      <Head>
        <title>DashBoard</title>
      </Head>
      <Layout>
        {page == "users" ? <UserComponent /> : null}
        {page == "categories" ? <CategoriesComponent /> : null}
        {page == "subcategories" ? <SubCategoriesComponent /> : null}
        {page == "orders" ? <OrderComponent /> : null}
        {page == "dashboard" ? <DashBoardComponent /> : null}
      </Layout>
    </Box>
  );
}

export async function getServerSideProps(context) {
  await connectDb();
  const categories = await CategoryModel.find({})
    .sort({ updatedAt: -1 })
    .lean();
  const subCategories = await SubCategoryModel.find({})
    .sort({ updatedAt: -1 })
    .lean();
  const products = await ProductModel.find({})
    .populate({ path: "category", model: CategoryModel })
    .sort({ createdAt: -1 })
    .lean();
  const results = await ProductModel.find().select("name subProducts").lean();
  const reCategories = await CategoryModel.find().lean();
  const users = await UserModel.find({}).sort({ createdAt: -1 }).lean();
  const orders = await OrderModel.find({})
    .populate({ path: "user", model: UserModel, select: "name email image" })
    .sort({ createdAt: -1 })
    .lean();
  await disconnectDb();
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(products)),
      parents: JSON.parse(JSON.stringify(results)),
      paCategories: JSON.parse(JSON.stringify(reCategories)),
      users: JSON.parse(JSON.stringify(users)),
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}
