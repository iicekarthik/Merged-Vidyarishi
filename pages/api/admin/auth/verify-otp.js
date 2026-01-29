import dbConnect from "@/vidyarishiapi/config/db";
import Admin from "@/vidyarishiapi/models/Admin-info/Admin";
import { verifyEmailOtp } from "@/vidyarishiapi/services/emailOtp.service";
import { generateAccessToken, generateRefreshToken } from "@/vidyarishiapi/utils/jwt";
import { errorHandler } from "@/vidyarishiapi/lib/errorHandler";

async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { email, otp } = req.body;
  if (!email || !otp)
    return res.status(400).json({ message: "Email & OTP required" });

  await dbConnect();

  const admin = await Admin.findOne({ email });
  if (!admin)
    return res.status(401).json({ message: "Admin not found" });

  const result = await verifyEmailOtp(email, otp);
  if (!result.success)
    return res.status(401).json({ message: "Invalid or expired OTP" });

  const accessToken = generateAccessToken(admin);
  const refreshToken = await generateRefreshToken(admin);

  // res.setHeader("Set-Cookie", [
  //   `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=1200; SameSite=Lax`,
  //   `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax`,
  // ]);

    res.setHeader("Set-Cookie", [
    // ✅ SESSION COOKIE → no auto logout
    `accessToken=${accessToken}; HttpOnly; Path=/; SameSite=Lax`,
    // ✅ Persistent refresh token (7 days)
    `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax`,
  ]);

  res.json({ success: true });
}

export default errorHandler(handler);
