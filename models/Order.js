import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        name: { type: String },
        image: { type: String },
        size: { type: String },
        qty: { type: Number },
        color: { color: String, image: String },
        price: { type: Number },
      },
    ],
    shippingAddress: {
      firstName: { type: String },
      lastName: { type: String },
      phoneNumber: { type: String },
      address1: { type: String },
      address2: { type: String },
      city: { type: String },
      state: { type: String },
      zipcode: { type: String },
      country: { type: String },
    },
    paymentMethod: { type: String },
    paymentResult: { id: String, status: String, email: String },
    total: { type: Number, required: true },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    taxPrice: { type: Number, default: 0 },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Processing",
        "Dispatched",
        "Canceled",
        "Completed",
      ],
    },
    paidAt: {
      type: Date,
    },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
