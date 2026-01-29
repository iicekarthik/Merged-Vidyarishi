import transporter from "@/lib/mail/mailer";
import { receiptEmailTemplate } from "@/lib/templates/paymentReceipt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { orderId, customerEmail, customerName } = req.body;

    // console.log(req.body)

    if (!orderId || !customerEmail || !customerName) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    // const receiptUrl = `${process.env.BASE_URL}/api/generate-receipt?orderId=${orderId}`;

    await transporter.sendMail({
      from: `"Vidyarishi <${process.env.SMTP_MAIL}>`,
      to: customerEmail,
      subject: "Your Payment Receipt - Vidyarishi",
      html: receiptEmailTemplate({
        customerName,
      }),
    });

    return res.status(200).json({ success: true, message: "Email sent" });
  } catch (err) {
    console.error("Email sending error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
