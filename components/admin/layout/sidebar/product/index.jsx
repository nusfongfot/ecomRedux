import ProductCard from "@/components/admin/productCard";
import { useProductStore } from "@/zustand/categories";
import { Box } from "@mui/material";

export default function ProductComponent() {
  const { products } = useProductStore();

  return (
    <Box sx={{ color: "white" }}>
      <Box>
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </Box>
    </Box>
  );
}
