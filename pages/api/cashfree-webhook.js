import crypto from "crypto";
import dbConnect from "@/lib/mongoose";
import Payment from "@/models/Payment";

export const config = {
  api: {
    bodyParser: false, // ❗ required for signature verification
  },
};

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  await dbConnect();

  try {
    const rawBody = await getRawBody(req);

    const signature = req.headers["x-webhook-signature"];
    const timestamp = req.headers["x-webhook-timestamp"];

    if (!signature || !timestamp) {
      return res.status(400).send("Missing webhook headers");
    }

    // ✅ Verify signature
    const payloadToSign = `${timestamp}.${rawBody}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.CASHFREE_WEBHOOK_SECRET)
      .update(payloadToSign)
      .digest("base64");

    if (expectedSignature !== signature) {
      return res.status(401).send("Invalid signature");
    }

    const event = JSON.parse(rawBody);

    const orderId = event?.data?.order?.order_id;
    const paymentStatus = event?.type; 
    // PAYMENT_SUCCESS | PAYMENT_FAILED

    if (!orderId) {
      return res.status(400).send("Invalid payload");
    }

    let finalStatus = "PENDING";
    if (paymentStatus === "PAYMENT_SUCCESS") finalStatus = "PAID";
    if (paymentStatus === "PAYMENT_FAILED") finalStatus = "FAILED";

    await Payment.findOneAndUpdate(
      { orderId },
      {
        orderStatus: finalStatus,
        cfOrderId: event?.data?.order?.cf_order_id,
        paymentUpdatedAt: new Date(),
      },
      { new: true }
    );

    // ✅ Always return 200 to Cashfree
    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("Webhook Error:", err);
    return res.status(500).send("Webhook error");
  }
}
