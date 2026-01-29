// pages/api/dashboard/update-profile-social.js
import dbConnect from "@/vidyarishiapi/config/db";
import User from "@/vidyarishiapi/models/User-info/User";
import {
  verifyAccessToken,
  verifyRefreshToken,
  generateAccessToken,
} from "@/vidyarishiapi/utils/jwt";
import { errorHandler } from "@/vidyarishiapi/lib/errorHandler";
import AppError from "@/vidyarishiapi/lib/AppError";
import { parse } from "cookie";

const isProd = process.env.NODE_ENV === "production";
const cookieSettings = isProd
  ? "Max-Age=1200; HttpOnly; Path=/; SameSite=None; Secure"
  : "Max-Age=1200; HttpOnly; Path=/; SameSite=Lax";

// very small sanitizer for URLs (allow only http(s) urls)
const isSafeUrl = (value) => {
  if (!value) return false;
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

async function handler(req, res) {
  if (req.method !== "POST") {
    throw new AppError("Only POST allowed", 405);
  }

  // Parse cookies
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const accessToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;

  // Validate access token
  let userPayload = accessToken ? verifyAccessToken(accessToken) : null;

  // If expired → try refresh token
  if (!userPayload && refreshToken) {
    const refreshPayload = await verifyRefreshToken(refreshToken);
    if (!refreshPayload) throw new AppError("Unauthorized", 401);

    const newAccessToken = generateAccessToken({ _id: refreshPayload.id });
    res.setHeader("Set-Cookie", `accessToken=${newAccessToken}; ${cookieSettings};`);
    userPayload = { id: refreshPayload.id };
  }

  if (!userPayload?.id) {
    throw new AppError("Unauthorized", 401);
  }

  await dbConnect();

  const { facebook, twitter, linkedin, website, github } = req.body || {};

  const update = {};

  if (facebook !== undefined) {
    if (facebook && !isSafeUrl(facebook)) throw new AppError("Invalid facebook URL", 400);
    update.facebook = facebook;
  }
  if (twitter !== undefined) {
    if (twitter && !isSafeUrl(twitter)) throw new AppError("Invalid twitter URL", 400);
    update.twitter = twitter;
  }
  if (linkedin !== undefined) {
    if (linkedin && !isSafeUrl(linkedin)) throw new AppError("Invalid linkedin URL", 400);
    update.linkedin = linkedin;
  }
  if (website !== undefined) {
    if (website && !isSafeUrl(website)) throw new AppError("Invalid website URL", 400);
    update.website = website;
  }
  if (github !== undefined) {
    if (github && !isSafeUrl(github)) throw new AppError("Invalid github URL", 400);
    update.github = github;
  }

  if (Object.keys(update).length === 0) {
    throw new AppError("No valid social fields to update", 400);
  }

  const user = await User.findByIdAndUpdate(userPayload.id, update, { new: true }).lean();
  if (!user) throw new AppError("User not found", 404);

  return res.status(200).json({ status: "success", user });
}

export default errorHandler(handler);
