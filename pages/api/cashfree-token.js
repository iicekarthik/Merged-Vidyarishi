import dbConnect from "@/lib/mongoose";
import axios from "axios";
import Payment from "../../models/Payment";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { orderId, orderAmount, courseName, Name, Phone, Email } = req.body;

  if (!orderId || !orderAmount || !courseName || !Name || !Phone || !Email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const response = await axios.post(
      process.env.CASHFREE_CHECKOUT_URL,
      {
        order_id: orderId,
        order_amount: orderAmount,
        order_currency: "INR",
        customer_details: {
          customer_id: orderId,
          customer_name: Name,
          customer_email: Email,
          customer_phone: Phone,
        },
        order_meta: {
          return_url: `${process.env.NEXT_PUBLIC_RETURN_URL}?order_id=${orderId}`,
        },
        order_note: `Payment for ${courseName}`,
      },
      {
        headers: {
          "x-client-id": process.env.CASHFREE_APP_ID,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY,
          "x-api-version": "2022-09-01",
          "Content-Type": "application/json",
        },
      }
    );

    const session = response.data;

    if (session?.payment_session_id) {
      const paymentRecord = await Payment.create({
        orderId,
        cfOrderId: session.cf_order_id || "",
        customerName: Name,
        customerEmail: Email,
        customerPhone: Phone,
        orderAmount,
        currency: "INR",
        orderStatus: "PENDING",
        orderNote: session.order_note,
        paymentSessionId: session.payment_session_id,
        paymentLink: session.payments.url || "",
        paymentCreatedAt: session.created_at || new Date().toISOString(),
      });

      if (paymentRecord) {
        return res.status(200).json({
          paymentSessionId: session.payment_session_id,
          paymentLink: session.payments.url,
        });
      }
    }

    return res.status(500).json({ message: "Cashfree session failed" });
  } catch (error) {
    console.error("Cashfree Error:", error.response?.data || error.message);

    if (error.code === 11000) {
      return res.status(409).json({ message: "Order already exists" });
    }

    return res.status(500).json({
      message: error.response?.data?.message || "Failed to create order",
    });
  }
}
