import dbConnect from "@/lib/mongoose";
import Payment from "@/models/Payment";
import transporter from "@/lib/mail/mailer";
import { receiptEmailTemplate } from "@/lib/templates/paymentReceipt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: "orderId is required" });
    }

    await dbConnect();

    const payment = await Payment.findOne({ orderId });

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    await transporter.sendMail({
      from: `"Vidyarishi" <${process.env.SMTP_MAIL}>`,
      to: payment.customerEmail,
      subject: "Your Payment Receipt - Vidyarishi",
      html: receiptEmailTemplate({
        customerName: payment.customerName,
        customerEmail: payment.customerEmail,
        customerPhone: payment.customerPhone,
        courseName: payment.orderNote,
        amount: payment.orderAmount,
        paymentStatus: payment.orderStatus,
        transactionDate: payment.createdAt.toLocaleString("en-IN"),
      }),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email sending error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}


// import transporter from "@/lib/mail/mailer";
// import { receiptEmailTemplate } from "@/lib/templates/paymentReceipt";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     const { orderId, customerEmail, customerName } = req.body;

//     // console.log(req.body)

//     if (!orderId || !customerEmail || !customerName) {
//       return res.status(400).json({ error: "Missing parameters" });
//     }

//     // const receiptUrl = `${process.env.BASE_URL}/api/generate-receipt?orderId=${orderId}`;

//     await transporter.sendMail({
//       from: `"Vidyarishi <${process.env.SMTP_MAIL}>`,
//       to: customerEmail,
//       subject: "Your Payment Receipt - Vidyarishi",
//       html: receiptEmailTemplate({
//         customerName,
//       }),
//     });

//     return res.status(200).json({ success: true, message: "Email sent" });
//   } catch (err) {
//     console.error("Email sending error:", err);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }
