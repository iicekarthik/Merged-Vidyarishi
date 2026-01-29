import dbConnect from "@/vidyarishiapi/config/db";
import User from "@/vidyarishiapi/models/User-info/User";
import { isValidPhone } from "@/vidyarishiapi/utils/validators";
import { checkOtp } from "@/vidyarishiapi/services/otp.service";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/vidyarishiapi/utils/jwt";
import { errorHandler } from "@/vidyarishiapi/lib/errorHandler";
import AppError from "@/vidyarishiapi/lib/AppError";
import Admin from "@/vidyarishiapi/models/Admin-info/Admin";

const isProd = process.env.NODE_ENV === "production";

const accessTokenCookie = token =>
  `accessToken=${token}; Max-Age=1200; HttpOnly; Path=/; ${isProd ? "SameSite=None; Secure" : "SameSite=Lax"
  }`;

const refreshTokenCookie = token =>
  `refreshToken=${token}; Max-Age=604800; HttpOnly; Path=/; ${isProd ? "SameSite=None; Secure" : "SameSite=Lax"
  }`;

async function handler(req, res) {
  if (req.method !== "POST") throw new AppError("Only POST allowed", 405);

  const { phone, otp } = req.body;
  if (!isValidPhone(phone) || !otp) {
    throw new AppError("Phone & OTP required", 400);
  }

  await dbConnect();

  // 🔍 Check ADMIN first
  // const admin = await Admin.findOne({ phone });

  // if (admin) {
  //   const result = await checkOtp(phone, otp);

  //   if (!result.success) {
  //     throw new AppError(result.msg || "OTP validation failed", 400);
  //   }

  //   const accessToken = generateAccessToken({
  //     _id: admin._id,
  //     phone: admin.phone,
  //     role: "admin",
  //   });

  //   const refreshToken = await generateRefreshToken({
  //     _id: admin._id,
  //   });

  //   res.setHeader("Set-Cookie", [
  //     accessTokenCookie(accessToken),
  //     refreshTokenCookie(refreshToken),
  //   ]);

  //   return res.status(200).json({
  //     status: "admin_login_success",
  //     isAdmin: true,
  //     admin: {
  //       id: admin._id,
  //       name: admin.fullName,
  //       phone: admin.phone,
  //     },
  //   });
  // }


  // 🔥 NEW: Check OTP using new validation system (attempts, expiry, lock)
  const result = await checkOtp(phone, otp);

  if (!result.success) {
    // Return specific failure message (invalid, expired, locked, or attempts left)
    throw new AppError(result.msg || "OTP validation failed", 400);
  }
  const user = await User.findOne({ phone });

  // LOGIN FLOW
  if (user) {

    if (!user.isPhoneNumberVerified) {
      user.isPhoneNumberVerified = true;
      await user.save();
    }

      // ⭐ UPDATE LAST LOGIN
  user.lastLoginAt = new Date();
  await user.save();

    // ⭐ Reload updated user
    const updatedUser = await User.findById(user._id);

    const accessToken = generateAccessToken(updatedUser);
    const refreshToken = await generateRefreshToken(updatedUser);

    res.setHeader("Set-Cookie", [
      accessTokenCookie(accessToken),
      refreshTokenCookie(refreshToken),
    ]);

    return res.status(200).json({
      status: "login_success",
      isUserExist: true,
      user: updatedUser,
    });
  }

  // 🆕 CREATE USER ON OTP VERIFY (NEW USER)
  let newUser = await User.create({
    phone,
    isPhoneNumberVerified: true,
     lastLoginAt: new Date(),
  });

  const accessToken = generateAccessToken(newUser);
  const refreshToken = await generateRefreshToken(newUser);

  res.setHeader("Set-Cookie", [
    accessTokenCookie(accessToken),
    refreshTokenCookie(refreshToken),
  ]);

  return res.status(200).json({
    status: "continue_registration",
    isUserExist: false,
    user: newUser,
  });

}

export default errorHandler(handler);
