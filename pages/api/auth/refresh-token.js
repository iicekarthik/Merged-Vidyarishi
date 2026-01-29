import {
  verifyRefreshToken,
  generateAccessToken,
} from "@/vidyarishiapi/utils/jwt";
import User from "@/vidyarishiapi/models/User-info/User";
import dbConnect from "@/vidyarishiapi/config/db";
import { errorHandler } from "@/vidyarishiapi/lib/errorHandler";
import AppError from "@/vidyarishiapi/lib/AppError";
import { parse } from "cookie";

// Agar app production (live) me chal raha hai to different cookie rules apply honge.
const isProd = process.env.NODE_ENV === "production";

// Access token:
// 1200 seconds = 20 minutes valid
// HttpOnly → JS cannot read token → secure
// Path=/ → whole site me available
// Production me: SameSite=None; Secure (HTTPS required)
// Development me: SameSite=Lax
const accessTokenCookie = token =>
  `accessToken=${token}; Max-Age=1200; HttpOnly; Path=/; ${isProd ? "SameSite=None; Secure" : "SameSite=Lax"
  }`;

async function handler(req, res) {
  if (req.method !== "POST") throw new AppError("Method not allowed", 405);

  await dbConnect();

  // Request header se cookies ko parse kiya
  // refreshToken cookie extract kar li
  // If user logout ho chuka ho → yaha null hoga.
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const refreshToken = cookies.refreshToken;

  if (!refreshToken) throw new AppError("Refresh token required", 400);

  // Refresh token verify steps:
  // Token valid hona chahiye
  // Expired nahi hona chahiye
  // Signature match hona chahiye
  // Nahi to → unauthorized.
  const payload = await verifyRefreshToken(refreshToken);
  if (!payload) throw new AppError("Invalid refresh token", 401);

  // payload.id = user ki ID hoti hai.
  // User database se fetch karta hai
  const user = await User.findById(payload.id);
  if (!user) throw new AppError("User not found", 404);

  const newAccessToken = generateAccessToken(user);

  // Browser ke andar cookie update ho gayi.
  // User ko phir se login nahi karna padega.
  res.setHeader("Set-Cookie", accessTokenCookie(newAccessToken));

  return res.status(200).json({ status: "refreshed" });
}

export default errorHandler(handler);