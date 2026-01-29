// import axios from "axios";

// export const sendSMS = async (phone, otp) => {
//   try {
//     await axios.post(
//       "https://api.msg91.com/api/v5/otp",
//       {
//         authkey: process.env.MSG91_AUTH_KEY,
//         template_id: process.env.MSG91_TEMPLATE_ID,
//         mobile: `91${phone}`, // ✅ country code required
//         otp,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return true;
//   } catch (error) {
//     console.error("MSG91 SMS Error:", error.response?.data || error.message);
//     throw new Error("OTP sending failed");
//   }
// };


import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendSMS = async (phone, message) => {
  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_FROM_PHONE,
      to: `+91${phone}`, // India numbers
    });

    return true;
  } catch (err) {
    console.error("Twilio SMS Error:", err.message);
    throw new Error("SMS sending failed");
  }
};


// import twilio from "twilio";

// const client = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// export const sendSMS = async (phone, message) => {
//   console.log("\n==============================");
//   console.log("OTP SMS (DEV MODE)");
//   console.log("To:", phone);
//   console.log("Message:", message);
//   console.log("==============================\n");

//   // DO NOT send SMS in dev mode
//   return true;
// };


// export const sendSMS = async (phone, message) => {
//   try {
//     await client.messages.create({
//       body: message,
//       from: process.env.TWILIO_FROM_PHONE, 
//       to: `+91${phone}`,
//     });
//   } catch (err) {
//     console.error("Twilio SMS Error:", err);
//     throw new Error("SMS sending failed");
//   }
// };
