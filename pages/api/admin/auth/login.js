// pages/api/admin/auth/login.js
import dbConnect from "@/vidyarishiapi/config/db";
import Admin from "@/vidyarishiapi/models/Admin-info/Admin";
import { comparePassword } from "@/vidyarishiapi/utils/password";
import { sendOtpEmail } from "@/vidyarishiapi/services/emailOtp.service";
import { errorHandler } from "@/vidyarishiapi/lib/errorHandler";

async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email & password required" });

  await dbConnect();

  const admin = await Admin.findOne({ email });
  if (!admin)
    return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await comparePassword(password, admin.password);
  if (!isMatch)
    return res.status(401).json({ message: "Invalid credentials" });

  // ✅ Password verified → Send OTP
  await sendOtpEmail(email);

  return res.json({
    success: true,
    message: "OTP sent to registered email",
  });
}

export default errorHandler(handler);
