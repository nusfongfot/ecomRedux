import Layout from "@/components/admin/layout";
import styles from "@/styles/dashboard.module.scss";
import CategoryModel from "@/models/Category";
import { connectDb, disconnectDb } from "@/utils/db";
import {
  useCategoriesStore,
  useProductStore,
  useUserStore,
} from "@/zustand/categories";
import { useEffect } from "react";
import SubCategoryModel from "@/models/Subcategory";
import ProductModel from "@/models/Product";
import UserModel from "@/models/User";

export default function DashBoard({
  categories,
  subCategories,
  products,
  users,
}) {
  const { setCategories, setSubCategories } = useCategoriesStore();
  const { setProducts } = useProductStore();
  const { setUsers } = useUserStore();

  useEffect(() => {
    setCategories(categories);
    setSubCategories(subCategories);
    setProducts(products);
    setUsers(users);
  }, []);

  return (
    <>
      <Layout />
    </>
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
  await disconnectDb();
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(products)),
      parents: JSON.parse(JSON.stringify(results)),
      paCategories: JSON.parse(JSON.stringify(reCategories)),
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}
