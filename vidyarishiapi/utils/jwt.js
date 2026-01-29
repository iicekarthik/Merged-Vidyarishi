import jwt from "jsonwebtoken";  // token create / verify karne ke liye.
import RefreshToken from "../../vidyarishiapi/models/RefreshToken";
import dbConnect from "../config/db";

export const generateAccessToken = (user) => {
  return jwt.sign(
    // Token ka payload. Isme user ki basic identity hoti hai
    { id: user._id, phone: user.phone,
       role: user.role // ✅ THIS LINE FIXES EVERYTHING
     },
    process.env.JWT_SECRET,
    // { expiresIn: "12h" }
  );
};

export const generateRefreshToken = async (user) => {
  await dbConnect();

  const token = jwt.sign(
    // Refresh token ka payload me sirf user id hoti hai.
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  // Refresh token DB me store ho jata hai.
  await RefreshToken.create({
    userId: user._id,
    token,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return token;
};

// Agar access token valid → decoded payload return karega.
// Agar expire or invalid → null return karega
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error("Access token verification failed:", err.message);
    return null;
  }
};

export const verifyRefreshToken = async (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    // Agar DB me token nahi milta → token valid nahi mana jaayega
    const exists = await RefreshToken.findOne({ token });
    if (!exists) {
      console.warn("Refresh token not found in DB");
      return null;
    }
    return payload;
  } catch (err) {
    console.error("Refresh token verification failed:", err.message);
    return null;
  }
};

