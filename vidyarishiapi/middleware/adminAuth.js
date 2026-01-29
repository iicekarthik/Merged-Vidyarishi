import { parse } from "cookie";
import jwt from "jsonwebtoken";
import AppError from "../lib/AppError";

export const adminAuth = async (req) => {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.accessToken;

  if (!token) throw new Error("Unauthorized");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded.role !== "admin") {
    throw new Error("Forbidden");
  }

  return decoded;
};


// import { parse } from "cookie";
// import jwt from "jsonwebtoken";
// import AppError from "../lib/AppError";

// export const adminAuth = async (req) => {
//   const cookies = parse(req.headers.cookie || "");
//   let token = cookies.accessToken;

//   if (!token) throw new AppError("Unauthorized", 401);

//   let decoded;
//   try {
//     decoded = jwt.verify(token, process.env.JWT_SECRET);
//   } catch {
//     throw new AppError("Session expired", 401);
//   }

//   if (decoded.role !== "admin") {
//     throw new AppError("Forbidden", 403);
//   }

//   return decoded;
// };

