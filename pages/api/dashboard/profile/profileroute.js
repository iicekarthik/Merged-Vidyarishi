// pages/api/dashboard/profileroute.js

import dbConnect from "@/vidyarishiapi/config/db";
import User from "@/vidyarishiapi/models/User-info/User";
import {
  verifyAccessToken,         // verifyAccessToken() → check access token valid / expired
  verifyRefreshToken,        // verifyRefreshToken() → refresh token verify
  generateAccessToken,       // generateAccessToken() → new access token generate karta hai
} from "@/vidyarishiapi/utils/jwt";
import { errorHandler } from "@/vidyarishiapi/lib/errorHandler";
import AppError from "@/vidyarishiapi/lib/AppError";
import { parse } from "cookie";         //Yeh plain text cookie string ko object me convert karta hai

const isProd = process.env.NODE_ENV === "production";

const accessTokenCookie = token =>                                   // production me        Development me
  `accessToken=${token}; Max-Age=1200; HttpOnly; Path=/; ${isProd ? "SameSite=None; Secure" : "SameSite=Lax"
  }`;

async function handler(req, res) {
  if (req.method !== "GET") {
    throw new AppError("Only GET allowed", 405);
  }

  await dbConnect();

  // Parse cookies
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const accessToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;

  // Try access token first
  let userPayload = accessToken ? verifyAccessToken(accessToken) : null;

  // Try refresh token \ If Access Token FAILS → Try Refresh Token
  if (!userPayload && refreshToken) {
    const refreshPayload = await verifyRefreshToken(refreshToken);

    // Refresh Token Invalid → Unauthorized
    if (!refreshPayload) throw new AppError("Unauthorized", 401);

    // Generate NEW ACCESS TOKEN
    const newAccessToken = generateAccessToken({ _id: refreshPayload.id });

    res.setHeader("Set-Cookie", accessTokenCookie(newAccessToken));

    userPayload = { id: refreshPayload.id };   //Ab hum user ko authenticated treat kar sakte hain
  }

  // Unauthorized
  if (!userPayload?.id) {
    return res.status(401).json({ user: null });   //Means access token+refresh token dono fail → user=logged out
  }

  // Fetch user from database
  const user = await User.findById(userPayload.id).lean();   //.lean() → plain JS object return (faster).
  if (!user) throw new AppError("User not found", 404);

  const { password, __v, ...safeUser } = user;

  return res.status(200).json(safeUser);
}

export default errorHandler(handler);
