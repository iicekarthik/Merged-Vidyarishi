// import otpStore from "@/vidyarishiapi/store/otp.store";
// import { sendSMS } from "./sms.service";

// const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

// export const createOtp = async (phone) => {
//   const otp = String(Math.floor(1000 + Math.random() * 9000));

//   // Remove old OTP
//   otpStore.delete(phone);

//   const expiresAt = Date.now() + OTP_EXPIRY_MS;

//   otpStore.set(phone, {
//     otp,
//     expiresAt,
//     attempts: 0,
//     locked: false,
//   });

//   // 🔥 Send OTP via MSG91
//   await sendSMS(phone, otp);

//   return otp;
// };



import otpStore from "@/vidyarishiapi/store/otp.store";
import { sendSMS } from "./sms.service";
import otpGenerator from "otp-generator";

const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS = 5;

export const createOtp = async (phone) => {
  // Generate OTP
  const otp = String(Math.floor(1000 + Math.random() * 9000));

  // const otp = otpGenerator.generate(4, {
  //   digits: true,
  //   alphabets: false,
  //   upperCase: false,
  //   specialChars: false,
  // });

  // Remove any old OTP first
  otpStore.delete(phone);

  const expiresAt = Date.now() + OTP_EXPIRY_MS;

  // Save OTP with attempt counter
  otpStore.set(phone, {
    otp,
    expiresAt,
    attempts: 0,
    locked: false,
  });

  // Send SMS
  await sendSMS(phone, `Your Vidyarishi OTP is ${otp}`);

  return otp;
};



export const checkOtp = async (phone, otp) => {
  const record = otpStore.get(phone);

  // No OTP record found
  if (!record) {
    return { success: false, msg: "OTP not found, request a new one" };
  }

  // OTP locked due to max attempts
  if (record.locked) {
    return { success: false, msg: "Too many attempts. OTP locked." };
  }

  // Expired OTP
  if (Date.now() > record.expiresAt) {
    otpStore.delete(phone);
    return { success: false, msg: "OTP expired. Request a new one." };
  }

  // Incorrect OTP
  if (record.otp !== otp) {
    record.attempts += 1;

    // Lock OTP if max attempts exceeded
    if (record.attempts >= MAX_ATTEMPTS) {
      record.locked = true;
      otpStore.set(phone, record);

      return { success: false, msg: "Too many attempts. OTP locked." };
    }

    otpStore.set(phone, record);
    return {
      success: false,
      msg: `Incorrect OTP. Attempts left: ${
        MAX_ATTEMPTS - record.attempts
      }`,
    };
  }

  // Correct OTP → delete record
  otpStore.delete(phone);

  return { success: true };
};
