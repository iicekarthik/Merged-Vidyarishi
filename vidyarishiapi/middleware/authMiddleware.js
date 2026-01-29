import { verifyAccessToken, verifyRefreshToken, generateAccessToken } from "../utils/jwt";
import dbConnect from "../config/db";
import * as cookie from "cookie";
import Admin from "../models/Admin-info/Admin";

export const authMiddleware = (handler) => {
  return async (req, res) => {
    await dbConnect();

    const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
    const accessToken = cookies.accessToken;
    const refreshToken = cookies.refreshToken;

    // Pehle attempt: access token verify karne ki koshish.
    // Agar valid → user mil jayega.
    let user = accessToken ? verifyAccessToken(accessToken) : null;

    // Refresh token verify karo.
    // Agar wo bhi invalid → user NOT authenticated.
    if (!user && refreshToken) {
      const payload = await verifyRefreshToken(refreshToken);
      if (!payload) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Naya access token create ho gaya
      const admin = await Admin.findById(payload.id);
      const newAccess = generateAccessToken(admin);

      res.setHeader("Set-Cookie", [
        `accessToken=${accessToken}; HttpOnly; Path=/; SameSite=Lax`,
        `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax`,
      ]);

      user = { id: payload.id };
    }

    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    req.user = user;
    return handler(req, res);
  };
};

// import { verifyAccessToken, verifyRefreshToken, generateAccessToken } from "../utils/jwt";
// import dbConnect from "../config/db";
// import * as cookie from "cookie";

// export const authMiddleware = (handler) => {
//   return async (req, res) => {
//     await dbConnect();

//     const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
//     const accessToken = cookies.accessToken;
//     const refreshToken = cookies.refreshToken;

//     // Pehle attempt: access token verify karne ki koshish.
//     // Agar valid → user mil jayega.
//     let user = accessToken ? verifyAccessToken(accessToken) : null;

//     // Refresh token verify karo.
//     // Agar wo bhi invalid → user NOT authenticated.
//     if (!user && refreshToken) {
//       const payload = await verifyRefreshToken(refreshToken);
//       if (!payload) {
//         return res.status(401).json({ message: "Unauthorized" });
//       }

//       // Naya access token create ho gaya
//       const admin = await Admin.findById(payload.id);
// const newAccess = generateAccessToken(admin);

//       res.setHeader(
//         "Set-Cookie",
//         `accessToken=${newAccess}; Max-Age=1200; Path=/; HttpOnly; SameSite=None; Secure`
//       );

//       user = { id: payload.id };
//     }

//     if (!user) {
//       return res.status(401).json({ message: "Not authenticated" });
//     }

//     req.user = user;
//     return handler(req, res);
//   };
// };