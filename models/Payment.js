import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    cfOrderId: { type: Number },
    orderId: { type: String, required: true, unique: true },
    customerName: String,
    customerEmail: String,
    customerPhone: String,
    orderAmount: Number,
    currency: String,
    orderNote: String,
    orderStatus: String,
    paymentSessionId: String,
    paymentLink: String,
    paymentCreatedAt: String,
  },
  { timestamps: true }
);

export default mongoose.models.AllPayment ||
  mongoose.model("AllPayment", PaymentSchema);
