import dbConnect from "@/lib/mongoose";
import axios from "axios";
import Payment from "../../models/Payment";
import transporter from "@/lib/mail/mailer";
import { receiptEmailTemplate } from "@/lib/templates/paymentReceipt";
import { adminPaymentNotificationTemplate } from "@/lib/templates/paymentReceiptForAdmin";
import Cart from "@/vidyarishiapi/models/User-info/Cart";

export default async function handler(req, res) {
  await dbConnect();

  const { order_id } = req.query;

  if (!order_id) {
    return res.status(400).json({ message: "Missing order_id in query" });
  }

  try {
    const { data } = await axios.get(
      `${process.env.CASHFREE_CHECKOUT_URL}/${order_id}`,
      {
        headers: {
          "x-client-id": process.env.CASHFREE_APP_ID,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY,
          "x-api-version": "2023-08-01",
        },
      }
    );

    if (!data?.order_status) {
      return res.status(400).json({ message: "Invalid Cashfree response" });
    }

    const normalizedStatus =
      data.order_status === "PAID" ||
        data.order_status === "SUCCESS"
        ? "PAID"
        : "FAILED";


    const payment = await Payment.findOneAndUpdate(
      { orderId: order_id },
      {
        orderStatus: data.order_status,
        cfOrderId: data.cf_order_id,
        paymentCreatedAt: data.created_at,
      },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    if (normalizedStatus === "PAID") {
      await Cart.deleteMany({
        userId: payment.userId, // 🔥 clears entire cart
      });
    }

    // const customerName = payment.customerName;
    // const customerEmail = payment.customerEmail;
    // const customerPhone = payment.customerPhone;
    // const courseName = payment.orderNote;
    // const amount = payment.orderAmount;
    // const transactionDate = payment.updatedAt;
    // const paymentStatus = payment.orderStatus;

    // await transporter.sendMail({
    //   from: `Vidyarishi <${process.env.SMTP_MAIL}>`,
    //   to: customerEmail,
    //   subject: `Payment Confirmation - ₹${amount} Paid`,
    //   html: receiptEmailTemplate({
    //     customerName,
    //     customerEmail,
    //     customerPhone,
    //     courseName,
    //     amount,
    //     paymentStatus,
    //     transactionDate,
    //   }),
    // });

    // await transporter.sendMail({
    //   from: `Vidyarishi <${process.env.SMTP_MAIL}>`,
    //   to: process.env.ADMIN_EMAIL,
    //   subject: `${customerName} - ₹${amount} Paid to Vidyarishi `,
    //   html: adminPaymentNotificationTemplate({
    //     customerName,
    //     customerEmail,
    //     customerPhone,
    //     courseName,
    //     amount,
    //     paymentStatus,
    //     transactionDate,
    //   }),
    // });

    return res.status(200).json({
      status: normalizedStatus,
      // status: data.order_status,
        courseIds: payment.courseIds, // ✅ REQUIRED
      payment: {
        orderAmount: data.order_amount,
        customerPhone: data.customer_details?.customer_phone,
        customerEmail: data.customer_details?.customer_email,
        customerName: data.customer_details?.customer_name,
        createdAt: data.created_at,
        orderStatus: data.order_status,
        orderNote: payment?.orderNote,
      },
    });
  } catch (error) {
    console.error(
      "Verification failed:",
      error.response?.data || error.message
    );
    return res.status(500).json({ message: "Internal server error" });
  }
}
