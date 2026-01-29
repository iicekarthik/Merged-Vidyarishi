import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import Admin from "@/vidyarishiapi/models/Admin-info/Admin";
import { otpEmailTemplate } from "@/vidyarishiapi/templates/otpEmail.template";

const OTP_EXPIRY_MINUTES = Number(process.env.OTP_EXPIRY_MINUTES || 5);

// SMTP Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
  // logger: true,
  // debug: true,
});

// Generate numeric OTP
const generateOtp = () =>
  otpGenerator.generate(4, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

// SEND OTP
export const sendOtpEmail = async (email) => {
  const otp = generateOtp();
  const expiresAt = new Date(
    Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
  );

  await Admin.updateOne(
    { email },
    {
      $set: {
        emailOtp: otp,
        emailOtpExpiresAt: expiresAt,
      },
    }
  );

  await transporter.sendMail({
    from: `"Vidyarishi" <${process.env.SMTP_MAIL}>`,
    to: email,
    subject: "Your OTP Verification Code – Vidyarishi",
    html: otpEmailTemplate({
      otp,
      expiryMinutes: OTP_EXPIRY_MINUTES,
    }),
  });

  return { success: true };
};

// VERIFY OTP
export const verifyEmailOtp = async (email, otp) => {
  const admin = await Admin.findOne({ email });

  if (!admin || !admin.emailOtp || !admin.emailOtpExpiresAt) {
    return { success: false };
  }

  if (
    admin.emailOtp !== otp ||
    admin.emailOtpExpiresAt < new Date()
  ) {
    return { success: false };
  }

  admin.emailOtp = null;
  admin.emailOtpExpiresAt = null;
  await admin.save();

  return { success: true };
};



// // const otpStore = new Map(); // use Redis in prod

// // export const sendOtpEmail = async (email) => {
// //   const otp = Math.floor(1000 + Math.random() * 9000).toString();

// //   otpStore.set(email, {
// //     otp,
// //     expiresAt: Date.now() + 5 * 60 * 1000, // 5 min
// //   });

// //   console.log("EMAIL OTP:", otp); // replace with real email service
// // };

// // export const verifyEmailOtp = async (email, otp) => {
// //   const record = otpStore.get(email);
// //   if (!record) return { success: false };

// //   if (record.expiresAt < Date.now()) {
// //     otpStore.delete(email);
// //     return { success: false };
// //   }

// //   if (record.otp !== otp) return { success: false };

// //   otpStore.delete(email);
// //   return { success: true };
// // };


// global.otpStore = global.otpStore || new Map();
// const otpStore = global.otpStore;

// export const sendOtpEmail = async (email) => {
//   const otp = Math.floor(1000 + Math.random() * 9000).toString();

//   otpStore.set(email, {
//     otp,
//     expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
//   });

//   console.log("EMAIL OTP:", otp);
// };

// export const verifyEmailOtp = async (email, otp) => {
//   const record = otpStore.get(email);

//   if (!record) return { success: false };

//   if (record.expiresAt < Date.now()) {
//     otpStore.delete(email);
//     return { success: false };
//   }

//   if (record.otp !== otp) return { success: false };

//   otpStore.delete(email);
//   return { success: true };
// };
