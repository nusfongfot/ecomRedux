import { Box, Button, Rating, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import styles from "./styles.module.scss";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { MdOutlineRemove } from "react-icons/md";

function AddReviews({ product }) {
  const [style, setStyle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState();
  const [size, setSize] = useState(product?.allSize[0]?.size);

  const [images, setImages] = useState("");
  const imgRef = useRef();

  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img, i) => {
      if (images.length == 3 || i == 2) {
        alert("Maximum 3 images are allowed !");
      }
      if (
        img.type !== "image/jpeg" &&
        img.type !== "image/webp" &&
        img.type !== "image/png"
      ) {
        alert(
          `${img.name} format is unsupported ! only JPEG, WEBP, PNG are allowed.`
        );
        files = files.filter((item) => item.name !== img.name);
      } else if (img.size > 1024 * 1024 * 5) {
        alert("Image is size too large max 5mb allowed.");
        files = files.filter((item) => item.name !== img.name);
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (e) => {
          setImages((images) => [...images, e.target.result]);
        };
      }
    });
  };

  const removeImg = (image) => {
    setImages((images) => images.filter((img) => img !== image));
  };

  const handleChangeSize = (event) => {
    setSize(event.target.value);
  };

  const handleChangeStyle = (event) => {
    setStyle(event.target.value);
  };

  const handleOnChangeReview = (event) => {
    setReview(event.target.value);
  };

  return (
    <Box mb={3}>
      <Box sx={{ display: "flex", gap: "10px" }} mt={2}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Typography>Size:</Typography>
          <FormControl
            sx={{ minWidth: 120, background: "white", mt: 2 }}
            size="small"
          >
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={size}
              label="Age"
              onChange={handleChangeSize}
            >
              {product?.allSize?.map((size, i) => (
                <MenuItem value={size.size} key={i}>
                  {size.size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Typography>Style:</Typography>
          <FormControl
            sx={{ minWidth: 120, background: "white", mt: 2 }}
            size="small"
          >
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={style}
              label="Age"
              onChange={handleChangeStyle}
              sx={{ height: "45px" }}
            >
              {product?.colors?.map((product, i) => (
                <MenuItem value={product.color} key={i}>
                  <img
                    src={product.image}
                    width="40"
                    height="40"
                    alt="img"
                    style={{ marginTop: "6px" }}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Stack direction="row" alignItems="center" spacing={2} mt={2}>
        <Button variant="contained" component="label" sx={{ width: "150px" }}>
          Upload
          <input
            hidden
            accept="image/png,image/jpeg,image/webp"
            multiple
            type="file"
            ref={imgRef}
            onClick={() => imgRef.current.click()}
            onChange={handleImages}
          />
        </Button>
      </Stack>

      <Box className={styles.imgs_wrap}>
        {images.length > 0
          ? images.map((img, i) => {
              return (
                <Box component={"span"} key={i}>
                  <MdOutlineRemove onClick={() => removeImg(img)} />
                  <img src={img} alt="item" />
                </Box>
              );
            })
          : null}
      </Box>

      <Box sx={{ background: "white", mt: 2, padding: "10px" }}>
        <TextField
          id="outlined-multiline-flexible"
          placeholder="Write Your Review Here"
          multiline
          fullWidth
          rows={5}
          sx={{ background: "white", mt: 2 }}
          value={review}
          onChange={handleOnChangeReview}
        />
        <Rating
          name="half-rating-read"
          defaultValue={0}
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          precision={0.5}
          style={{ color: "#facf19", fontSize: "3rem" }}
        />
        <Button variant="contained" fullWidth>
          Submit
        </Button>
      </Box>
    </Box>
  );
}
export default AddReviews;
