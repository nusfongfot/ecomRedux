import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const subcateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, , "must be atleast two characters"],
    maxlength: [32, , "must be 32 characters"],
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true,
  },
  parent: {
    type: ObjectId,
    ref: "Category",
    required: true,
  },
});

const SubCategory =
  mongoose.models.SubCategory || mongoose.model("SubCategory", subcateSchema);

export default SubCategory;
