import dbConnect from "@/vidyarishiapi/config/db";
import Admin from "@/vidyarishiapi/models/Admin-info/Admin";
import { sendOtpEmail } from "@/vidyarishiapi/services/emailOtp.service";
import { errorHandler } from "@/vidyarishiapi/lib/errorHandler";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  await dbConnect();

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  await sendOtpEmail(email);

  res.json({ success: true, message: "OTP sent to email" });
}

export default errorHandler(handler);
