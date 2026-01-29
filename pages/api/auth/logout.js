import { errorHandler } from "@/vidyarishiapi/lib/errorHandler";
import AppError from "@/vidyarishiapi/lib/AppError";

async function handler(req, res) {
  if (req.method !== "POST") throw new AppError("Only POST allowed", 405);

  const commonFlags =
    "Path=/; HttpOnly; SameSite=Strict" +
    (process.env.NODE_ENV === "production" ? "; Secure" : "");

  // Path=/ → Poore website ke liye cookie valid
  // HttpOnly → JS se read nahi ho sakti (secure)
  // SameSite=Strict → Cross-site cookie leaking rokta hai
  // Secure → Production me HTTPS required

  res.setHeader("Set-Cookie", [
    `accessToken=; Max-Age=0; ${commonFlags}`,
    `refreshToken=; Max-Age=0; ${commonFlags}`,
  ]);

  // accessToken= → empty set kar diya
  // refreshToken= → empty set kar diya
  // Max-Age=0 → cookie immediately delete ho jayegi
  // Flags same rakhe gaye security ke liye
  //  Iska matlab user ke tokens poori tarah remove ho gaye, login session khatam.

  return res.status(200).json({ message: "Logged out" });
}

export default errorHandler(handler);