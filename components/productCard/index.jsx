import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useState, useEffect } from "react";
import ProductSwiper from "./ProductSwiper";
import styled from "./styles.module.scss";

function ProductCard({ product }) {
  const [active, setActive] = useState(1);
  const [images, setImages] = useState(product.subProducts[active]?.images);
  const [prices, setPrices] = useState(
    product.subProducts[active]?.sizes.map((s) => s.price).sort((a, b) => a - b)
  );
  const [styles, setStyles] = useState(product.subProducts.map((p) => p.color));

  useEffect(() => {
    setImages(product.subProducts[active]?.images);
    setPrices(
      product.subProducts[active]?.sizes
        .map((s) => s.price)
        .sort((a, b) => a - b)
    );
  }, [active]);

  return (
    <Box className={styled.product}>
      <Box className={styled.product_container}>
        <Link href={`product/${product._id}?style=${active}`} target="_blank">
          <Box>
            <ProductSwiper images={images} />
          </Box>
        </Link>
        {product.subProducts[active]?.discount && (
          <Box className={styled.product_discount}>
            {product.subProducts[active]?.discount}
          </Box>
        )}
        <Box className={styled.product_info}>
          <Typography className={styled.product_text} variant="h5">
            {images
              ? product.name.length > 45
                ? `${product.name.substring(0, 37)}...`
                : product.name
              : null}
          </Typography>
          <Box component="span" sx={{ color: "red", fontWeight: 600 }}>
            {prices
              ? prices.length === 1
                ? `USD${prices && prices[0]}`
                : `USD${prices && prices[0] - prices[prices.length - 1]}$`
              : null}
          </Box>
          <Box className={styled.product_colors}>
            {styles &&
              styles.map((style, i) => {
                return !styles.image ? (
                  <img
                    key={i}
                    src={style.image}
                    className={i === active ? styled.active : ""}
                    onMouseOver={() => {
                      setImages(product.subProducts[i].images);
                      setActive(i);
                    }}
                    alt=""
                  />
                ) : (
                  <Box
                    component="span"
                    style={{ backgroundColor: `${style.color}` }}
                    onMouseOver={() => {
                      setImages(product.subProducts[i].images);
                      setActive(i);
                    }}
                  />
                );
              })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default ProductCard;
