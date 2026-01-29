import { errorHandler } from "@/vidyarishiapi/lib/errorHandler";
import AppError from "@/vidyarishiapi/lib/AppError";
import dbConnect from "@/vidyarishiapi/config/db";
import User from "@/vidyarishiapi/models/User-info/User";
import { isValidPhone } from "@/vidyarishiapi/utils/validators";
import { createOtp } from "@/vidyarishiapi/services/otp.service";
// import Admin from "@/vidyarishiapi/models/Admin-info/Admin";

// 1️⃣ Frontend phone number send karta hai
// 2️⃣ Backend check karta hai number valid hai
// 3️⃣ Database check karta hai user exist karta hai ya nahi
// 4️⃣ OTP generate + send hota hai
// 5️⃣ Returns:

// User exist → exists: true

// New user → exists: false

// 6️⃣ Frontend next step OTP screen open karta hai

async function handler(req, res) {
  if (req.method !== "POST") throw new AppError("Only POST allowed", 405);

  const { phone } = req.body;

  if (!isValidPhone(phone)) throw new AppError("Invalid phone number", 400);

  await dbConnect();
  // 🔑 1️⃣ Check ADMIN first
  // const admin = await Admin.findOne({ phone });

  // if (admin) {
  //   await createOtp(phone); // ✅ SEND OTP
  //   return res.status(200).json({
  //     isAdmin: true,
  //     otpSent: true,
  //     message: "Admin OTP sent",
  //   });
  // }

  // 👤 2️⃣ Check STUDENT
  const user = await User.findOne({ phone });

  // 🔐 Send OTP only for students
  await createOtp(phone);

  return res.status(200).json({
    // isAdmin: false,
    exists: !!user,
    otpSent: true,
    message: "OTP sent successfully",
  });


}


export default errorHandler(handler);