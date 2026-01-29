import dbConnect from "@/vidyarishiapi/config/db";
import Enquiry from "@/vidyarishiapi/models/User-info/Enquiry";
import transporter from "@/lib/mail/mailer";
import { enquiryConfirmationTemplate } from "@/lib/templates/enquiryConfirmationEmail";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    await dbConnect();

    // ✅ THIS WAS MISSING / MISPLACED
    const { name, email, phone, courseName } = req.body;

    if (!name || !email || !phone || !courseName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Save enquiry
    await Enquiry.create({
      name,
      email,
      phone,
      courseName,
    });

    // ✅ Send confirmation email
    await transporter.sendMail({
      from: `"Vidyarishi" <${process.env.SMTP_MAIL}>`,
      to: email,
      subject: `We received your enquiry for ${courseName}`,
      html: enquiryConfirmationTemplate({
        name,
        courseName,
        phone,
      }),
    });

    return res.status(201).json({ success: true });
  } catch (error) {
    console.error("Enquiry API error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


// import dbConnect from "@/vidyarishiapi/config/db";
// import Enquiry from "@/vidyarishiapi/models/User-info/Enquiry";

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();

//   await dbConnect();
//   await Enquiry.create(req.body);

//   res.status(201).json({ success: true });
// }
