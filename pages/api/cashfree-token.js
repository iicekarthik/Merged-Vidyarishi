// import dbConnect from "@/lib/mongoose";
// import axios from "axios";
// import Payment from "../../models/Payment";

// export default async function handler(req, res) {
//   await dbConnect();

//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   const { orderId, orderAmount, courseId, courseName, Name, Phone, Email } = req.body;

//   if (!orderId || !orderAmount ||!courseId || !courseName || !Name || !Phone || !Email) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   try {
//     const response = await axios.post(
//       process.env.CASHFREE_CHECKOUT_URL,
//       {
//         order_id: orderId,
//         order_amount: orderAmount,
//         order_currency: "INR",
//         customer_details: {
//           customer_id: orderId,
//           customer_name: Name,
//           customer_email: Email,
//           customer_phone: Phone,
//         },
//         order_meta: {
//           return_url: `${process.env.NEXT_PUBLIC_RETURN_URL}?order_id=${orderId}`,
//         },
//         order_note: `Payment for ${courseName}`,
//       },
//       {
//         headers: {
//           "x-client-id": process.env.CASHFREE_APP_ID,
//           "x-client-secret": process.env.CASHFREE_SECRET_KEY,
//           "x-api-version": "2023-08-01",
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     console.log("CF ID:", process.env.CASHFREE_APP_ID?.slice(0, 10));
//     console.log("CF SECRET:", !!process.env.CASHFREE_SECRET_KEY);

//     const session = response.data;

//     if (session?.payment_session_id) {
//       const paymentRecord = await Payment.create({
//         courseId,
//         orderId,
//         cfOrderId: session.cf_order_id || "",
//         customerName: Name,
//         customerEmail: Email,
//         customerPhone: Phone,
//         orderAmount,
//         currency: "INR",
//         orderStatus: "PENDING",
//         orderNote: session.order_note,
//         paymentSessionId: session.payment_session_id,
//         // paymentLink: session.payments.url || "",
//         paymentLink: "",
//         paymentCreatedAt: session.created_at || new Date().toISOString(),
//       });

//       if (paymentRecord) {
//         return res.status(200).json({
//           paymentSessionId: session.payment_session_id,
//         });
//         // return res.status(200).json({
//         //   paymentSessionId: session.payment_session_id,
//         //   paymentLink: session.payments.url,
//         // });
//       }
//     }

//     return res.status(500).json({ message: "Cashfree session failed" });
//   } catch (error) {
//     console.error("Cashfree Error:", error.response?.data || error.message);

//     if (error.code === 11000) {
//       return res.status(409).json({ message: "Order already exists" });
//     }

//     return res.status(500).json({
//       message: error.response?.data?.message || "Failed to create order",
//     });
//   }
// }

import dbConnect from "@/lib/mongoose";
import axios from "axios";
import Payment from "../../models/Payment";
import { authMiddleware } from "@/vidyarishiapi/middleware/authMiddleware";

export default authMiddleware(async function handler(req, res) {
  await dbConnect();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const userId = req.user.id; // ✅ NOW DEFINED FROM JWT

  const {
    orderId,
    orderAmount,
    courseIds,
    courseName,
    Name,
    Phone,
    Email,
  } = req.body;

  if (
    !orderId ||
    !orderAmount ||
    !courseIds ||
    !courseName ||
    !Name ||
    !Phone ||
    !Email
  ) {
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
          "x-api-version": "2023-08-01",
          "Content-Type": "application/json",
        },
      }
    );

    const session = response.data;

    if (!session?.payment_session_id) {
      return res.status(500).json({ message: "Cashfree session failed" });
    }

    await Payment.create({
      userId, // ✅ FIXED
      courseIds,
      orderId,
      cfOrderId: session.cf_order_id || "",
      customerName: Name,
      customerEmail: Email,
      customerPhone: Phone,
      orderAmount,
      currency: "INR",
      orderStatus: "PENDING",
      orderNote: `${courseName}`,
      // orderNote: `Payment for ${courseName}`,
      paymentSessionId: session.payment_session_id,
      paymentLink: "",
      paymentCreatedAt: session.created_at || new Date().toISOString(),
    });

    return res.status(200).json({
      paymentSessionId: session.payment_session_id,
    });
  } catch (error) {
    console.error("Cashfree Error:", error.response?.data || error.message);
    return res.status(500).json({
      message: error.response?.data?.message || "Failed to create order",
    });
  }
});

