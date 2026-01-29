// pages/api/dashboard/update-profile-info.js
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

async function handler(req, res) {
  if (req.method !== "POST") {
    throw new AppError("Only POST allowed", 405);
  }

  // Parse cookies
  // Browser se accessToken & refreshToken nikaale ja rahe hain . Agar cookie header empty ho → cookies = {}.
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const accessToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;

  // Validate access token
  let userPayload = accessToken ? verifyAccessToken(accessToken) : null;

  // If expired → try refresh token
  // Agar access token expire ho gaya . But user logout nahi hona chahiye .
  // Isliye hum refresh token check karte hain
  if (!userPayload && refreshToken) {
    // Refresh token se user ki ID milti hai. Agar valid nahi → refreshPayload = null
    const refreshPayload = await verifyRefreshToken(refreshToken);
    if (!refreshPayload) throw new AppError("Unauthorized", 401);

    // New 20-minute access token generate. Backend automatically session refresh kar raha hai.
    const newAccessToken = generateAccessToken({ _id: refreshPayload.id });

    // Set new cookie
    // Refresh ke baad response me new accessToken cookie set ho jaati hai
    // sameSite=strict → Only your site can send this cookie
    res.setHeader("Set-Cookie", `accessToken=${newAccessToken}; ${cookieSettings};`);
    userPayload = { id: refreshPayload.id };
  }

  if (!userPayload?.id) {
    throw new AppError("Unauthorized", 401);
  }

  await dbConnect();

  const {
    firstName,
    lastName,
    skill,
    biography,
    gender,
    dob,
    qualification,
    state,
    city,
    course,
    alternatePhone,
    alternateEmail,
  } = req.body || {};

  const update = {};        //Empty object jisme hum sirf wahi fields daalenge jo user ne bheje hain

  // Build fullName only if any name part provided
  if (firstName !== undefined || lastName !== undefined) {
    const fullName = `${firstName || ""} ${lastName || ""}`.trim();
    if (fullName) update.fullName = fullName;
  }

  if (gender !== undefined) update.gender = gender;
  if (dob !== undefined) update.dob = dob;
  if (qualification !== undefined) update.qualification = qualification;
  if (state !== undefined) update.state = state;
  if (city !== undefined) update.city = city;
  if (course !== undefined) update.course = course;

  // "undefined field database me kabhi update nahi hoti"

  // VALIDATION (backend-safe)
  if (alternatePhone && !/^[0-9]{10}$/.test(alternatePhone)) {
    throw new AppError("Alternate phone must be 10 digits", 400);
  }

  if (alternateEmail && !alternateEmail.includes("@")) {
    throw new AppError("Invalid alternate email", 400);
  }

  // Alternate contacts (ALWAYS update, allow empty to clear)
  if (alternatePhone !== undefined)
    update.alternatePhone = alternatePhone || "";

  if (alternateEmail !== undefined)
    update.alternateEmail = alternateEmail || "";

  if (skill !== undefined) update.skill = skill;
  if (biography !== undefined) update.biography = biography;


  if (skill !== undefined) update.skill = skill;
  if (biography !== undefined) update.biography = biography;

  if (Object.keys(update).length === 0) {
    throw new AppError("No valid fields to update", 400);
  }

  const user = await User.findByIdAndUpdate(        //user ko ID se update karega
    userPayload.id,
    update,
    { new: true }     //updated user return karega
  ).lean();   //pure JS object (fast)
  if (!user) throw new AppError("User not found", 404);

  return res.status(200).json({ status: "success", user });
}

export default errorHandler(handler);
